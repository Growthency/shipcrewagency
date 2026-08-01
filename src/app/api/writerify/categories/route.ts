import { NextResponse } from "next/server";
import { getSupabaseAdmin, hasSupabaseConfig } from "@/lib/supabase/server";
import { listCategories } from "@/lib/blog-categories";
import { slugify } from "@/lib/writerify/content";
import { requirePublisher } from "@/lib/writerify/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const denied = requirePublisher(req);
  if (denied) return denied;

  if (!hasSupabaseConfig()) {
    return NextResponse.json({ categories: [] });
  }

  const names = await listCategories();

  // Count published posts per category so Writerify can show usage.
  const counts: Record<string, number> = {};
  try {
    const { data } = await getSupabaseAdmin()
      .from("blog_posts")
      .select("category");
    for (const r of data ?? []) {
      const c = String((r as { category?: string }).category ?? "").trim();
      if (c) counts[c] = (counts[c] ?? 0) + 1;
    }
  } catch {
    /* counts are best-effort */
  }

  const categories = names.map((name) => ({
    id: slugify(name),
    name,
    slug: slugify(name),
    count: counts[name] ?? 0,
  }));

  return NextResponse.json({ categories });
}
