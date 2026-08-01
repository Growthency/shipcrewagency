import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin, hasSupabaseConfig } from "@/lib/supabase/server";
import { requirePublisher } from "@/lib/writerify/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

  const id = body.id;
  if (id === undefined || id === null || id === "") {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const when = String(body.scheduledAt ?? body.publishAt ?? "").trim();
  const statusRaw = String(body.status ?? "scheduled").toLowerCase();

  const updates: Record<string, unknown> = {};

  if (/publish|live/.test(statusRaw)) {
    updates.status = "published";
    updates.published_at = new Date().toISOString();
    updates.scheduled_at = null;
  } else if (/draft/.test(statusRaw)) {
    updates.status = "draft";
    updates.published_at = null;
    updates.scheduled_at = null;
  } else {
    // schedule for a future time
    const d = when ? new Date(when) : null;
    if (!d || Number.isNaN(d.getTime())) {
      return NextResponse.json(
        { error: "scheduledAt / publishAt must be a valid date." },
        { status: 400 },
      );
    }
    updates.status = "scheduled";
    updates.scheduled_at = d.toISOString();
    updates.published_at = d.toISOString();
  }

  const { data, error } = await getSupabaseAdmin()
    .from("blog_posts")
    .update(updates)
    .eq("id", id)
    .select("id, slug, status, language, scheduled_at, published_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/blog");
  revalidatePath("/zh/blog");

  return NextResponse.json({ ok: true, post: data });
}
