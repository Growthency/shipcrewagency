import "server-only";
import { getSupabaseAdmin, hasSupabaseConfig } from "./supabase/server";
import { blogSeed } from "@/data/blog-seed";
import type { BlogPost, PostLang } from "./blog-types";

function bySeed(lang: PostLang): BlogPost[] {
  return blogSeed
    .filter((p) => p.language === lang && p.status === "published")
    .sort((a, b) =>
      (b.published_at || b.created_at).localeCompare(
        a.published_at || a.created_at,
      ),
    );
}

/** Published posts for a language. DB when configured & populated, else the
 *  bundled seed so the site is fully populated out of the box. */
export async function getPublishedPosts(lang: PostLang): Promise<BlogPost[]> {
  if (!hasSupabaseConfig()) return bySeed(lang);
  try {
    const sb = getSupabaseAdmin();
    const { data, error } = await sb
      .from("blog_posts")
      .select("*")
      .eq("language", lang)
      .eq("status", "published")
      .eq("show_on_blog", true)
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return bySeed(lang);
    return data as BlogPost[];
  } catch {
    return bySeed(lang);
  }
}

export async function getPostBySlug(
  lang: PostLang,
  slug: string,
): Promise<BlogPost | null> {
  if (hasSupabaseConfig()) {
    try {
      const sb = getSupabaseAdmin();
      const { data } = await sb
        .from("blog_posts")
        .select("*")
        .eq("language", lang)
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      if (data) {
        // best-effort view increment (non-blocking)
        sb.from("blog_posts")
          .update({ views: (data.views ?? 0) + 1 })
          .eq("id", data.id)
          .then(() => {});
        return data as BlogPost;
      }
    } catch {
      /* fall through to seed */
    }
  }
  return bySeed(lang).find((p) => p.slug === slug) ?? null;
}

export async function getRelatedPosts(
  lang: PostLang,
  slug: string,
  limit = 4,
): Promise<BlogPost[]> {
  const all = await getPublishedPosts(lang);
  return all.filter((p) => p.slug !== slug).slice(0, limit);
}

export async function getAllPublishedSlugs(): Promise<
  { lang: PostLang; slug: string }[]
> {
  const out: { lang: PostLang; slug: string }[] = [];
  for (const lang of ["en", "zh"] as PostLang[]) {
    const posts = await getPublishedPosts(lang);
    for (const p of posts) out.push({ lang, slug: p.slug });
  }
  return out;
}
