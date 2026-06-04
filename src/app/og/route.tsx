import { ImageResponse } from "next/og";

export const runtime = "nodejs";

// Dynamic social-share image. Referenced explicitly from each page's metadata
// (og:image / twitter:image), so the link preview always shows a polished,
// on-brand card. `?title=` injects the page's own headline (Latin only —
// Chinese pages omit it and fall back to the brand card to avoid missing
// glyphs in the image renderer).
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") || "").slice(0, 120).trim();
  const eyebrow = (searchParams.get("cat") || "Global Maritime Manning")
    .slice(0, 40)
    .toUpperCase();
  const headline = title || "Ship Crew Agency";
  const big = headline.length > 64 ? 56 : headline.length > 40 ? 68 : 80;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background: "linear-gradient(135deg, #07343a 0%, #0e6e78 100%)",
          color: "#ffffff",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 12,
            background: "linear-gradient(90deg, #16a0a8, #f0a93b)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#f0a93b",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 4,
            marginTop: 20,
          }}
        >
          <div style={{ width: 52, height: 3, background: "#f0a93b" }} />
          {eyebrow}
        </div>
        <div
          style={{
            fontSize: big,
            fontWeight: 800,
            marginTop: 26,
            lineHeight: 1.08,
            maxWidth: 1020,
          }}
        >
          {headline}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: "auto",
            fontSize: 28,
            color: "#cfe3e0",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 46,
              height: 46,
              borderRadius: 999,
              border: "2px solid #f0a93b",
            }}
          />
          Ship Crew Agency — Global Maritime Manning
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
          {["STCW", "MLC 2006", "IMO", "ISM"].map((c) => (
            <div
              key={c}
              style={{
                display: "flex",
                border: "1px solid rgba(255,255,255,0.28)",
                borderRadius: 8,
                padding: "8px 18px",
                fontSize: 20,
                color: "#cfe3e0",
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
