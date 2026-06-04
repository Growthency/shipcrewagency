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

const POSITIONS = new Set(["head", "body_start", "body_end"]);

function refresh() {
  revalidatePath("/", "layout");
}

export async function GET() {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  const { data, error } = await guard.admin
    .from("site_scripts")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) {
    return NextResponse.json(
      { error: error.message, items: [] },
      { status: 500 },
    );
  }
  return NextResponse.json({ items: data ?? [] });
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const code = String(body.code ?? "");
  if (!name || !code.trim()) {
    return NextResponse.json(
      { error: "name and code are required" },
      { status: 400 },
    );
  }
  const position = String(body.position ?? "head");

  const { data, error } = await guard.admin
    .from("site_scripts")
    .insert({
      name,
      code,
      position: POSITIONS.has(position) ? position : "head",
      sort_order: Number(body.sort_order ?? 0),
      enabled: body.enabled === undefined ? true : Boolean(body.enabled),
    })
    .select("*")
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message ?? "Insert failed" },
      { status: 500 },
    );
  }
  refresh();
  return NextResponse.json({ item: data }, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const id = Number(body.id);
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const patch: Record<string, unknown> = {};
  if (typeof body.name === "string") patch.name = body.name.trim();
  if (typeof body.code === "string") patch.code = body.code;
  if (typeof body.position === "string" && POSITIONS.has(body.position)) {
    patch.position = body.position;
  }
  if (body.sort_order !== undefined) patch.sort_order = Number(body.sort_order);
  if (typeof body.enabled === "boolean") patch.enabled = body.enabled;

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  const { data, error } = await guard.admin
    .from("site_scripts")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message ?? "Update failed" },
      { status: 500 },
    );
  }
  refresh();
  return NextResponse.json({ item: data });
}

export async function DELETE(req: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  const id = Number(new URL(req.url).searchParams.get("id"));
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const { error } = await guard.admin.from("site_scripts").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  refresh();
  return NextResponse.json({ ok: true });
}
