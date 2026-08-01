import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin, hasSupabaseConfig } from "@/lib/supabase/server";
import { requirePublisher } from "@/lib/writerify/auth";
import {
  slugify,
  toHtml,
  autoExcerpt,
  readTimeFor,
} from "@/lib/writerify/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LANGS = new Set(["en", "zh"]);

// Read the first present value from a list of possible field names.
function pick(body: Record<string, unknown>, keys: string[]): string {
  for (const k of keys) {
    const v = body[k];
    if (typeof v === "string" && v.trim()) return v.trim();
    if (typeof v === "number") return String(v);
  }
  return "";
}

// Map whatever status word Writerify sends onto our three states.
function normalizeStatus(raw: string): "draft" | "published" | "scheduled" {
  const s = raw.toLowerCase();
  if (/draft/.test(s)) return "draft";
  if (/schedul/.test(s)) return "scheduled";
  if (/publish|live|public/.test(s)) return "published";
  return "published"; // this endpoint's default action is to publish
}

function publishedAtFor(
  status: string,
  scheduledAt: string,
): string | null {
  if (status === "published") return new Date().toISOString();
  if (status === "scheduled") {
    const d = scheduledAt ? new Date(scheduledAt) : null;
    if (d && !Number.isNaN(d.getTime())) return d.toISOString();
    return new Date().toISOString();
  }
  return null;
}

// Lightweight health check so Writerify's "Test connection" gets a 200.
export async function GET(req: Request) {
  const denied = requirePublisher(req);
  if (denied) return denied;
  return NextResponse.json({
    ok: true,
    endpoint: "publish",
    supabase: hasSupabaseConfig(),
  });
}

export async function POST(req: Request) {
  const denied = requirePublisher(req);
  if (denied) return denied;

  if (!hasSupabaseConfig()) {
    return NextResponse.json(
      { error: "Supabase is not configured on the server." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const title = pick(body, ["title", "name", "heading"]);
  if (!title) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  const slug =
    slugify(pick(body, ["slug", "permalink"])) || slugify(title);

  const langRaw = pick(body, ["language", "lang", "locale"]).slice(0, 2);
  const language = LANGS.has(langRaw) ? langRaw : "en";

  const rawContent = pick(body, [
    "content",
    "html",
    "body",
    "markdown",
    "md",
    "contentHtml",
  ]);
  const content = toHtml(rawContent);

  const excerpt =
    pick(body, ["excerpt", "description", "summary", "metaDescription"]) ||
    autoExcerpt(content);

  const featured_image =
    pick(body, [
      "featured_image",
      "featuredImage",
      "image",
      "coverImage",
      "cover",
      "thumbnail",
    ]) || null;

  // tags may arrive as an array or a comma string
  let tag = pick(body, ["tag", "tags"]);
  if (!tag && Array.isArray(body.tags)) {
    tag = (body.tags as unknown[]).map(String).join(", ");
  }

  let category = pick(body, ["category"]);
  if (!category && Array.isArray(body.categories) && body.categories.length) {
    category = String(body.categories[0]);
  }

  const status = normalizeStatus(pick(body, ["status", "state"]));
  const scheduledAt = pick(body, [
    "scheduledAt",
    "publishAt",
    "scheduled_at",
    "published_at",
    "date",
  ]);

  const row = {
    language,
    title,
    slug,
    excerpt,
    content,
    featured_image,
    category: category || "Insights",
    tag: tag || null,
    read_time: pick(body, ["read_time", "readTime"]) || readTimeFor(content),
    status,
    author_name: pick(body, ["author_name", "author"]) || "Ship Crew Agency",
    author_role: pick(body, ["author_role"]) || "Maritime Editorial Team",
    meta_title: pick(body, ["meta_title", "metaTitle", "seoTitle"]) || null,
    meta_description:
      pick(body, ["meta_description", "metaDescription", "seoDescription"]) ||
      null,
    show_on_blog: true,
    scheduled_at: status === "scheduled" && scheduledAt ? scheduledAt : null,
    published_at: publishedAtFor(status, scheduledAt),
  };

  const admin = getSupabaseAdmin();

  // Re-publishing the same article (same language + slug) updates it in place,
  // so Writerify can push edits without creating duplicates.
  const { data, error } = await admin
    .from("blog_posts")
    .upsert(row, { onConflict: "language,slug" })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/blog");
  revalidatePath("/zh/blog");
  revalidatePath(`/${language === "zh" ? "zh/" : ""}blog/${slug}`);

  const base = process.env.NEXT_PUBLIC_SITE_URL || "";
  const url = `${base}/${language === "zh" ? "zh/" : ""}blog/${slug}`;
  return NextResponse.json(
    { ok: true, id: data.id, slug: data.slug, status: data.status, url },
    { status: 201 },
  );
}
