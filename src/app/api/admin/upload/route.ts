import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { readSession } from "@/lib/auth/session";
import { getSupabaseAdmin, hasSupabaseConfig } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "image/tiff",
  "image/svg+xml",
];
// Generous source limit — everything raster is recompressed to WebP below.
const MAX_BYTES = 15 * 1024 * 1024;

export async function POST(req: NextRequest) {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasSupabaseConfig()) {
    return NextResponse.json(
      { error: "Supabase is not configured on the server." },
      { status: 503 },
    );
  }

  const admin = getSupabaseAdmin();
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: "Invalid file type. Use JPG, PNG, WebP, GIF, AVIF, TIFF, or SVG." },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "File too large. Maximum 15MB." },
      { status: 400 },
    );
  }

  const timestamp = Date.now();
  const safeName = file.name
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .toLowerCase()
    .slice(0, 50);

  const input = Buffer.from(await file.arrayBuffer());

  // SVG stays vector; every raster format is optimized to WebP.
  let body: Buffer = input;
  let contentType = file.type;
  let ext = "svg";
  if (file.type !== "image/svg+xml") {
    try {
      body = await sharp(input)
        .rotate()
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();
      contentType = "image/webp";
      ext = "webp";
    } catch {
      return NextResponse.json(
        { error: "Could not process image." },
        { status: 400 },
      );
    }
  }

  const fileName = `blog/${timestamp}-${safeName}.${ext}`;
  const { error } = await admin.storage.from("images").upload(fileName, body, {
    contentType,
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: urlData } = admin.storage.from("images").getPublicUrl(fileName);
  return NextResponse.json({ url: urlData.publicUrl, path: fileName });
}
