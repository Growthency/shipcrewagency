import "server-only";
import { getSupabaseAdmin, hasSupabaseConfig } from "./supabase/server";

// Blog categories are managed in one place (site_settings) so every admin, on
// any browser or device, sees and edits the same list.
const KEY = "blog_categories";
const DEFAULTS = [
  "Insights",
  "Industry News",
  "Crew Welfare",
  "Compliance",
  "Recruitment",
  "Maritime Careers",
];

async function readManaged(): Promise<string[]> {
  try {
    const { data } = await getSupabaseAdmin()
      .from("site_settings")
      .select("value")
      .eq("key", KEY)
      .maybeSingle();
    const v = (data as { value?: unknown } | null)?.value;
    if (typeof v !== "string") return [];
    const arr = JSON.parse(v);
    return Array.isArray(arr) ? (arr as string[]) : [];
  } catch {
    return [];
  }
}

async function writeManaged(list: string[]): Promise<void> {
  await getSupabaseAdmin()
    .from("site_settings")
    .upsert(
      {
        key: KEY,
        value: JSON.stringify(list),
        type: "json",
        group_name: "blog",
        label: "Blog categories",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "key" },
    );
}

export async function listCategories(): Promise<string[]> {
  if (!hasSupabaseConfig()) return [...DEFAULTS];
  let managed = await readManaged();
  if (managed.length === 0) {
    // First run: seed from the defaults + any categories already on posts.
    let fromPosts: string[] = [];
    try {
      const { data } = await getSupabaseAdmin()
        .from("blog_posts")
        .select("category");
      fromPosts = (data ?? [])
        .map((r) => String((r as { category?: string }).category ?? "").trim())
        .filter(Boolean);
    } catch {
      /* ignore */
    }
    managed = [...new Set([...DEFAULTS, ...fromPosts])];
    await writeManaged(managed).catch(() => {});
  }
  return [...managed].sort((a, b) => a.localeCompare(b));
}

export async function addCategory(name: string): Promise<string[]> {
  const n = name.trim();
  if (!n) return listCategories();
  const managed = (await readManaged()).length
    ? await readManaged()
    : await listCategories();
  if (!managed.some((c) => c.toLowerCase() === n.toLowerCase())) {
    managed.push(n);
    await writeManaged(managed);
  }
  return listCategories();
}

export async function removeCategory(name: string): Promise<string[]> {
  const managed = (await readManaged()).filter(
    (c) => c.toLowerCase() !== name.trim().toLowerCase(),
  );
  await writeManaged(managed);
  return listCategories();
}
