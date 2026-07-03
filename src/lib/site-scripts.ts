import "server-only";
import { unstable_cache } from "next/cache";
import { getSupabaseAdmin, hasSupabaseConfig } from "./supabase/server";

// Custom code (Google Analytics, Meta Pixel, chat widgets…) that admins manage
// on the Scripts page. Cached so the public site does not hit the database on
// every request; busted via revalidateTag when a script is added/edited.
export const SITE_SCRIPTS_TAG = "site-scripts";

export type PublicScript = { id: number; code: string; position: string };

async function read(): Promise<PublicScript[]> {
  if (!hasSupabaseConfig()) return [];
  try {
    const { data } = await getSupabaseAdmin()
      .from("site_scripts")
      .select("id, code, position, enabled, sort_order")
      .eq("enabled", true)
      .order("sort_order", { ascending: true });
    return (data ?? [])
      .filter(
        (s) =>
          typeof (s as { code?: unknown }).code === "string" &&
          String((s as { code?: unknown }).code).trim(),
      )
      .map((s) => ({
        id: Number((s as { id?: unknown }).id),
        code: String((s as { code?: unknown }).code),
        position: String((s as { position?: unknown }).position ?? "head"),
      }));
  } catch {
    return [];
  }
}

export const getEnabledScripts = unstable_cache(read, ["site-scripts"], {
  tags: [SITE_SCRIPTS_TAG],
  revalidate: 300,
});
