import type { BlogPost } from "@/lib/blog-types";

// Blog articles are authored and managed in the admin CMS (stored in Supabase).
// The site ships without bundled starter articles; the published posts come
// entirely from the database.
export const blogSeed: BlogPost[] = [];
