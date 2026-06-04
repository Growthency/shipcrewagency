// Shared blog post shape — safe to import from both server data layer
// (src/lib/blog.ts) and the static seed (src/data/blog-seed.ts).

export type PostLang = "en" | "zh";

export interface BlogPost {
  id: number | string;
  language: PostLang;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // sanitized HTML body
  featured_image: string | null;
  category: string;
  tag: string | null;
  read_time: string;
  status: "draft" | "published" | "scheduled";
  author_name: string;
  author_role: string;
  meta_title: string | null;
  meta_description: string | null;
  views: number;
  created_at: string; // ISO
  published_at: string | null; // ISO
}

export type BlogPostInput = Omit<BlogPost, "id" | "views">;
