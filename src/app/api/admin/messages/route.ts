import { NextRequest, NextResponse } from "next/server";
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

const STATUSES = new Set(["new", "read", "archived"]);

export async function GET(req: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;
  const { admin } = guard;

  const url = new URL(req.url);
  const status = url.searchParams.get("status");

  let query = admin
    .from("contact_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (status && STATUSES.has(status)) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) {
    return NextResponse.json(
      { error: error.message, items: [] },
      { status: 500 },
    );
  }
  return NextResponse.json({ items: data ?? [] });
}

export async function PATCH(req: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;
  const { admin } = guard;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const id = Number(body.id);
  const status = String(body.status ?? "");
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }
  if (!STATUSES.has(status)) {
    return NextResponse.json(
      { error: "status must be new, read or archived" },
      { status: 400 },
    );
  }

  const { data, error } = await admin
    .from("contact_requests")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message ?? "Update failed" },
      { status: 500 },
    );
  }
  return NextResponse.json({ item: data });
}

export async function DELETE(req: NextRequest) {
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;
  const { admin } = guard;

  const url = new URL(req.url);
  const id = Number(url.searchParams.get("id"));
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const { error } = await admin
    .from("contact_requests")
    .delete()
    .eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
