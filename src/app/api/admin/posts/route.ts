import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readSession } from "@/lib/auth/session";
import { getSupabaseAdmin, hasSupabaseConfig } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Guard =
  | { ok: true; admin: ReturnType<typeof getSupabaseAdmin> }
  | { ok: false; response: NextResponse };

async function requireAdmin(): Promise<Guard> {
  const session = await readSession();
  if (!session) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  if (!hasSupabaseConfig()) {
    return {
      ok: false,
      response: NextResponse.json(
        {
          error: "Supabase is not configured on the server.",
          posts: [],
          total: 0,
          page: 1,
          totalPages: 0,
        },
        { status: 503 },
      ),
    };
  }
  return { ok: true, admin: getSupabaseAdmin() };
}

const LANGS = new Set(["en", "zh"]);

function revalidateBlog() {
  // Public listing pages (owned by other agents) live at /blog and /zh/blog.
  // Revalidate both languages on every write so either listing stays fresh.
  revalidatePath("/blog");
  revalidatePath("/zh/blog");
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function autoExcerpt(html: string): string {
  if (!html) return "";
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= 160) return text;
  return text.slice(0, 157).replace(/\s+\S*$/, "") + "...";
}

export async function GET(req: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;
  const { admin } = guard;

  const url = new URL(req.url);

  // Distinct categories already used across posts (for the editor's picker).
  if (url.searchParams.get("categories")) {
    const { data } = await admin.from("blog_posts").select("category");
    const categories = Array.from(
      new Set(
        (data ?? [])
          .map((r) => String((r as { category?: string }).category ?? "").trim())
          .filter(Boolean),
      ),
    ).sort((a, b) => a.localeCompare(b));
    return NextResponse.json({ categories });
  }

  const id = url.searchParams.get("id");
  if (id) {
    const { data, error } = await admin
      .from("blog_posts")
      .select("*")
      .eq("id", Number(id))
      .single();
    if (error || !data) {
      return NextResponse.json(
        { error: error?.message ?? "Not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(data);
  }

  const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
  const language = url.searchParams.get("language");
  const status = url.searchParams.get("status");
  const limit = 25;
  const offset = (page - 1) * limit;

  let query = admin
    .from("blog_posts")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (language && LANGS.has(language)) query = query.eq("language", language);
  if (status && status !== "all") query = query.eq("status", status);

  const { data, count, error } = await query.range(offset, offset + limit - 1);
  if (error) {
    return NextResponse.json(
      { error: error.message, posts: [], total: 0, page, totalPages: 0 },
      { status: 500 },
    );
  }

  return NextResponse.json({
    posts: data ?? [],
    total: count ?? 0,
    page,
    totalPages: Math.ceil((count ?? 0) / limit),
  });
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;
  const { admin } = guard;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const title = String(body.title ?? "").trim();
  let slug = String(body.slug ?? "").trim();
  if (!slug && title) slug = slugify(title);

  if (!title || !slug) {
    return NextResponse.json(
      { error: "Title and slug are required" },
      { status: 400 },
    );
  }

  const language = LANGS.has(String(body.language))
    ? String(body.language)
    : "en";
  const status = String(body.status ?? "draft");
  const content = String(body.content ?? "");
  const excerpt =
    String(body.excerpt ?? "").trim() || autoExcerpt(content);

  const { data, error } = await admin
    .from("blog_posts")
    .insert({
      language,
      title,
      slug,
      excerpt,
      content,
      featured_image: String(body.featured_image ?? "").trim() || null,
      category: String(body.category ?? "").trim() || "Insights",
      tag: String(body.tag ?? "").trim() || null,
      read_time: String(body.read_time ?? "").trim() || "5 min read",
      is_premium: Boolean(body.is_premium),
      show_on_blog: body.show_on_blog === undefined ? true : Boolean(body.show_on_blog),
      status,
      author_name: String(body.author_name ?? "").trim() || "Ship Crew Agency",
      author_role:
        String(body.author_role ?? "").trim() || "Maritime Editorial Team",
      meta_title: String(body.meta_title ?? "").trim() || null,
      meta_description: String(body.meta_description ?? "").trim() || null,
      layout: String(body.layout ?? "").trim() || "with-sidebar",
      published_at: status === "published" ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (error) {
    const conflict = error.code === "23505";
    return NextResponse.json(
      {
        error: conflict
          ? "A post with this slug already exists for this language."
          : error.message,
      },
      { status: conflict ? 409 : 500 },
    );
  }

  revalidateBlog();
  return NextResponse.json(data, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;
  const { admin } = guard;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const id = Number(body.id);
  if (!id) {
    return NextResponse.json({ error: "Post ID required" }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  const setStr = (key: string, fallbackNull = false) => {
    if (typeof body[key] === "string") {
      const v = (body[key] as string).trim();
      updates[key] = v || (fallbackNull ? null : v);
    }
  };

  if (typeof body.title === "string") updates.title = body.title.trim();
  if (typeof body.slug === "string") {
    updates.slug = slugify(body.slug) || body.slug.trim();
  }
  if (typeof body.language === "string" && LANGS.has(body.language)) {
    updates.language = body.language;
  }
  if (typeof body.content === "string") {
    updates.content = body.content;
    if (
      !(typeof body.excerpt === "string" && (body.excerpt as string).trim())
    ) {
      updates.excerpt = autoExcerpt(body.content);
    }
  }
  if (typeof body.excerpt === "string" && body.excerpt.trim()) {
    updates.excerpt = body.excerpt.trim();
  }
  setStr("featured_image", true);
  setStr("category");
  setStr("tag", true);
  setStr("read_time");
  setStr("author_name");
  setStr("author_role");
  setStr("meta_title", true);
  setStr("meta_description", true);
  setStr("layout");
  if (typeof body.is_premium === "boolean") updates.is_premium = body.is_premium;
  if (typeof body.show_on_blog === "boolean")
    updates.show_on_blog = body.show_on_blog;
  if (typeof body.status === "string") {
    updates.status = body.status;
    if (body.status === "published") {
      updates.published_at =
        (typeof body.published_at === "string" && body.published_at) ||
        new Date().toISOString();
    }
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  const { data, error } = await admin
    .from("blog_posts")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    const conflict = error.code === "23505";
    return NextResponse.json(
      {
        error: conflict
          ? "A post with this slug already exists for this language."
          : error.message,
      },
      { status: conflict ? 409 : 500 },
    );
  }

  revalidateBlog();
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;
  const { admin } = guard;

  let id: number | undefined;
  const url = new URL(req.url);
  const qId = url.searchParams.get("id");
  if (qId) {
    id = Number(qId);
  } else {
    try {
      const body = await req.json();
      id = Number(body.id);
    } catch {
      /* ignore */
    }
  }
  if (!id) {
    return NextResponse.json({ error: "Post ID required" }, { status: 400 });
  }

  const { error } = await admin.from("blog_posts").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidateBlog();
  return NextResponse.json({ success: true });
}
