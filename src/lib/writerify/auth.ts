import "server-only";
import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";

/** The shared secret Writerify (or any publisher) must send as a Bearer token. */
export function publishToken(): string | null {
  const t = process.env.WRITERIFY_TOKEN;
  return t && t.trim() ? t.trim() : null;
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

/**
 * Verify the incoming request carries the correct Bearer token.
 * Returns `null` when authorized, or a ready-to-return error response.
 */
export function requirePublisher(req: Request): NextResponse | null {
  const expected = publishToken();
  if (!expected) {
    return NextResponse.json(
      {
        error:
          "Publishing API is not configured on the server (WRITERIFY_TOKEN is missing).",
      },
      { status: 503 },
    );
  }
  const header = req.headers.get("authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  const token = match ? match[1].trim() : "";
  if (!token || !safeEqual(token, expected)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
