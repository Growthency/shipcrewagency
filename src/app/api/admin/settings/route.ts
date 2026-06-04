import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { readSession } from "@/lib/auth/session";
import { getSupabaseAdmin, hasSupabaseConfig } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Guard =
  | { ok: true; admin: ReturnType<typeof getSupabaseAdmin> }
  | { ok: false; response: NextResponse };

async function requireAdmin(): Promise<Guard> {
  const session = await readSession();
  if (!session) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  if (!hasSupabaseConfig()) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Supabase is not configured", items: [] },
        { status: 503 },
      ),
    };
  }
  return { ok: true, admin: getSupabaseAdmin() };
}

function refresh() {
  revalidatePath("/", "layout");
}

export async function GET(req: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  const group = new URL(req.url).searchParams.get("group");
  let query = guard.admin.from("site_settings").select("*").order("key");
  if (group) query = query.eq("group_name", group);

  const { data, error } = await query;
  if (error) {
    return NextResponse.json(
      { error: error.message, items: [] },
      { status: 500 },
    );
  }
  return NextResponse.json({ items: data ?? [] });
}

interface SettingInput {
  key?: unknown;
  value?: unknown;
  type?: unknown;
  group_name?: unknown;
  label?: unknown;
}

function normalize(raw: SettingInput) {
  const key = String(raw.key ?? "").trim();
  if (!key) return null;
  return {
    key,
    value: raw.value === undefined || raw.value === null ? "" : String(raw.value),
    type: String(raw.type ?? "text") || "text",
    group_name: String(raw.group_name ?? "general") || "general",
    label: raw.label !== undefined ? String(raw.label) : key,
    updated_at: new Date().toISOString(),
  };
}

async function upsert(req: NextRequest, guard: Extract<Guard, { ok: true }>) {
  let body: SettingInput | { settings?: SettingInput[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const raw: SettingInput[] = Array.isArray(
    (body as { settings?: SettingInput[] }).settings,
  )
    ? (body as { settings: SettingInput[] }).settings
    : [body as SettingInput];

  const rows = raw
    .map(normalize)
    .filter((r): r is NonNullable<ReturnType<typeof normalize>> => r !== null);

  if (rows.length === 0) {
    return NextResponse.json({ error: "key is required" }, { status: 400 });
  }

  const { data, error } = await guard.admin
    .from("site_settings")
    .upsert(rows, { onConflict: "key" })
    .select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  refresh();
  return NextResponse.json({ items: data ?? [] });
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;
  return upsert(req, guard);
}

export async function PATCH(req: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;
  return upsert(req, guard);
}

export async function DELETE(req: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  const key = new URL(req.url).searchParams.get("key");
  if (!key) {
    return NextResponse.json({ error: "key is required" }, { status: 400 });
  }

  const { error } = await guard.admin
    .from("site_settings")
    .delete()
    .eq("key", key);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  refresh();
  return NextResponse.json({ ok: true });
}
