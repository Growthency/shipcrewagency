import { NextRequest, NextResponse } from "next/server";
import { readSession } from "@/lib/auth/session";
import { hasSupabaseConfig } from "@/lib/supabase/server";
import {
  listCategories,
  addCategory,
  removeCategory,
} from "@/lib/blog-categories";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function guard() {
  const session = await readSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasSupabaseConfig())
    return NextResponse.json({ categories: [] }, { status: 200 });
  return null;
}

export async function GET() {
  const denied = await guard();
  if (denied) return denied;
  return NextResponse.json({ categories: await listCategories() });
}

export async function POST(req: NextRequest) {
  const denied = await guard();
  if (denied) return denied;
  const body = await req.json().catch(() => ({}));
  const name = String(body.name ?? "").trim();
  if (!name)
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  return NextResponse.json({ categories: await addCategory(name) });
}

export async function DELETE(req: NextRequest) {
  const denied = await guard();
  if (denied) return denied;
  const name = new URL(req.url).searchParams.get("name") ?? "";
  if (!name)
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  return NextResponse.json({ categories: await removeCategory(name) });
}
