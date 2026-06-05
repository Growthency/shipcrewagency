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

/** Published posts for a language. ALWAYS includes the bundled starter
 *  articles, MERGED with anything created in the admin (DB). A DB post with
 *  the same slug overrides the bundled one; newer posts sort first. This way a
 *  new admin post never makes the original articles disappear. */
export async function getPublishedPosts(lang: PostLang): Promise<BlogPost[]> {
  const seed = bySeed(lang);
  if (!hasSupabaseConfig()) return seed;
  try {
    const sb = getSupabaseAdmin();
    const { data, error } = await sb
      .from("blog_posts")
      .select("*")
      .eq("language", lang)
      .eq("status", "published")
      .eq("show_on_blog", true);
    if (error || !data) return seed;
    const dbPosts = data as BlogPost[];
    const dbSlugs = new Set(dbPosts.map((p) => p.slug));
    const merged = [...dbPosts, ...seed.filter((s) => !dbSlugs.has(s.slug))];
    merged.sort((a, b) =>
      (b.published_at || b.created_at).localeCompare(
        a.published_at || a.created_at,
      ),
    );
    return merged;
  } catch {
    return seed;
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
