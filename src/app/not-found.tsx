import Link from "next/link";
import { Atmosphere } from "@/components/fx/Atmosphere";
import { Icon } from "@/components/icons";
import { getDict } from "@/i18n";

export default function NotFound() {
  const t = getDict("en");
  const nf = t.notFound;

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(140deg, var(--brand-900) 0%, var(--brand-800) 60%, var(--brand-700) 100%)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        padding: "40px 20px",
      }}
    >
      <Atmosphere />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 560 }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(4rem, 12vw, 7rem)",
            fontWeight: 700,
            color: "var(--cyan-300)",
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          404
        </div>
        <h1 style={{ color: "var(--white)", marginBottom: 14 }}>{nf.title}</h1>
        <p
          style={{
            color: "var(--steel-light)",
            fontSize: "1.05rem",
            fontWeight: 300,
            marginBottom: 36,
          }}
        >
          {nf.text}
        </p>
        <Link href="/" className="btn btn--primary">
          <Icon name="arrow-right" />
          <span>{nf.cta}</span>
        </Link>
      </div>
    </main>
  );
}
