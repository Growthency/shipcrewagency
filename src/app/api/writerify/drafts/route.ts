import { NextResponse } from "next/server";
import { getSupabaseAdmin, hasSupabaseConfig } from "@/lib/supabase/server";
import { requirePublisher } from "@/lib/writerify/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const denied = requirePublisher(req);
  if (denied) return denied;

  if (!hasSupabaseConfig()) {
    return NextResponse.json({ drafts: [] });
  }

  const { data, error } = await getSupabaseAdmin()
    .from("blog_posts")
    .select("id, title, excerpt, slug, language")
    .eq("status", "draft")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const drafts = (data ?? []).map((d) => ({
    id: (d as { id: number | string }).id,
    title: (d as { title?: string }).title ?? "",
    excerpt: (d as { excerpt?: string }).excerpt ?? "",
    slug: (d as { slug?: string }).slug ?? "",
    language: (d as { language?: string }).language ?? "en",
  }));

  return NextResponse.json({ drafts });
}
