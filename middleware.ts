import { NextResponse, type NextRequest } from "next/server";

/**
 * Sets an `x-lang` request header from the path so the root layout can render
 * the correct <html lang>. Admin auth is enforced in the admin layout
 * (verifySession), not here, to keep middleware edge-safe.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isZh = pathname === "/zh" || pathname.startsWith("/zh/");
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-lang", isZh ? "zh" : "en");
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
