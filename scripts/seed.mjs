// Seed the bundled blog articles into Supabase so they become editable in the
// admin. The public site already shows these articles without seeding (it falls
// back to the bundled content), so this step is OPTIONAL.
//
// Run:  node --env-file=.env.local --experimental-strip-types scripts/seed.mjs
//
// (The blog-seed module's only import is a type-only import, which Node's
//  type-stripping erases, so it loads cleanly here.)
import { createClient } from "@supabase/supabase-js";
import { blogSeed } from "../src/data/blog-seed.ts";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "Missing Supabase env. Run with: node --env-file=.env.local --experimental-strip-types scripts/seed.mjs",
  );
  process.exit(1);
}

const sb = createClient(url, key, { auth: { persistSession: false } });

let ok = 0;
let fail = 0;
for (const post of blogSeed) {
  const row = { ...post };
  delete row.id; // bigserial — let the DB assign
  const { error } = await sb
    .from("blog_posts")
    .upsert(row, { onConflict: "language,slug" });
  if (error) {
    console.error("  ✗", post.language, post.slug, "—", error.message);
    fail++;
  } else {
    console.log("  ✓", post.language, post.slug);
    ok++;
  }
}

console.log(`\nDone. Seeded ${ok} article(s), ${fail} failed.`);
process.exit(fail ? 1 : 0);
