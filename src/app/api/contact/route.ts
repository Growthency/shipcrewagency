import { NextResponse } from "next/server";
import { getSupabaseAdmin, hasSupabaseConfig } from "@/lib/supabase/server";

export const runtime = "nodejs";

interface ContactPayload {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  vessel_type?: string;
  service_type?: string;
  ranks_required?: string;
  message?: string;
  language?: string;
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields: name, email, message" },
      { status: 400 },
    );
  }

  try {
    // Persist to Supabase when configured. When it is not configured we skip
    // the insert so the demo form still succeeds.
    if (hasSupabaseConfig()) {
      const supabase = getSupabaseAdmin();
      const { error } = await supabase.from("contact_requests").insert({
        name,
        company: body.company?.trim() || null,
        email,
        phone: body.phone?.trim() || null,
        vessel_type: body.vessel_type?.trim() || null,
        service_type: body.service_type?.trim() || null,
        ranks_required: body.ranks_required?.trim() || null,
        message,
        language: body.language === "zh" ? "zh" : "en",
      });
      if (error) throw error;
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unexpected server error";
    return NextResponse.json(
      { ok: false, error: errorMessage },
      { status: 500 },
    );
  }
}
