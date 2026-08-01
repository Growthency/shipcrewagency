import { NextResponse } from "next/server";
import sharp from "sharp";
import { getSupabaseAdmin, hasSupabaseConfig } from "@/lib/supabase/server";
import { requirePublisher } from "@/lib/writerify/auth";

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
const MAX_BYTES = 15 * 1024 * 1024;

export async function POST(req: Request) {
  const denied = requirePublisher(req);
  if (denied) return denied;

  if (!hasSupabaseConfig()) {
    return NextResponse.json(
      { error: "Supabase is not configured on the server." },
      { status: 503 },
    );
  }

  const form = await req.formData();
  // Writerify may name the part "file", "image" or "upload".
  const file =
    (form.get("file") as File | null) ||
    (form.get("image") as File | null) ||
    (form.get("upload") as File | null);
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: "Invalid file type." },
      { status: 400 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 15MB)." }, {
      status: 400,
    });
  }

  const timestamp = Date.now();
  const safeName = file.name
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .toLowerCase()
    .slice(0, 50);

  const input = Buffer.from(await file.arrayBuffer());

  let out: Buffer = input;
  let contentType = file.type;
  let ext = "svg";
  if (file.type !== "image/svg+xml") {
    try {
      out = await sharp(input)
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

  const fileName = `blog/${timestamp}-${safeName || "image"}.${ext}`;
  const admin = getSupabaseAdmin();
  const { error } = await admin.storage
    .from("images")
    .upload(fileName, out, {
      contentType,
      cacheControl: "31536000",
      upsert: false,
    });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = admin.storage.from("images").getPublicUrl(fileName);
  // Return several common key names so any client picks up the URL.
  return NextResponse.json({
    url: data.publicUrl,
    src: data.publicUrl,
    location: data.publicUrl,
    path: fileName,
  });
}
