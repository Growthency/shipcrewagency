import { ImageResponse } from "next/og";

export const alt = "Ship Crew Agency — Global Ship Crew Manning Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social-share card. Applies to every page (the per-page title and
// description come from each page's metadata), so a shared link on WhatsApp,
// Facebook, X, LinkedIn, etc. always renders a polished, on-brand preview.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #07343a 0%, #0e6e78 100%)",
          color: "#ffffff",
          padding: "70px 80px",
          position: "relative",
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
            gap: 18,
            color: "#f0a93b",
            fontSize: 26,
            letterSpacing: 5,
            fontWeight: 700,
            marginTop: 24,
          }}
        >
          <div style={{ width: 56, height: 3, background: "#f0a93b" }} />
          GLOBAL MARITIME MANNING
        </div>
        <div style={{ fontSize: 102, fontWeight: 800, marginTop: 26, lineHeight: 1.04 }}>
          Ship Crew Agency
        </div>
        <div
          style={{
            fontSize: 34,
            color: "#cfe3e0",
            marginTop: 26,
            maxWidth: 920,
            lineHeight: 1.42,
          }}
        >
          STCW-certified seafarers for shipowners and vessel operators worldwide
          — 17 years of trusted ship crew manning.
        </div>
        <div style={{ display: "flex", gap: 14, marginTop: "auto" }}>
          {["STCW", "MLC 2006", "IMO", "ISM"].map((c) => (
            <div
              key={c}
              style={{
                display: "flex",
                border: "1px solid rgba(255,255,255,0.28)",
                borderRadius: 10,
                padding: "12px 22px",
                fontSize: 24,
                color: "#cfe3e0",
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
