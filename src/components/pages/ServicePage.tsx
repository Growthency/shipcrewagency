import { notFound } from "next/navigation";
import { LEGACY_CSS } from "@/content/services/legacy-css";
import { LEGACY_BODY_EN } from "@/content/services/legacy-bodies";
import { LEGACY_BODY_ZH } from "@/content/services/legacy-bodies.zh";
import { LEGACY_SCRIPTS } from "@/content/services/legacy-scripts";
import { LEGACY_SCRIPTS_ZH } from "@/content/services/legacy-scripts.zh";
import { LegacyRuntime } from "@/components/legacy/LegacyRuntime";
import type { Lang } from "@/i18n";

// The service pages reproduce the client's own source pages 1:1 — same markup
// and styling — recoloured to the site palette and scoped under .legacy-svc so
// they sit cleanly inside the shared nav + footer. Each language has its own
// body; the original fonts (Barlow Condensed + Inter) are kept as designed.
export function ServicePage({ lang, slug }: { lang: Lang; slug: string }) {
  const css = LEGACY_CSS[slug];
  const body = (lang === "en" ? LEGACY_BODY_EN : LEGACY_BODY_ZH)[slug];
  const script = (lang === "en" ? LEGACY_SCRIPTS : LEGACY_SCRIPTS_ZH)[slug];
  if (!css || !body) notFound();

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap"
      />
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="legacy-svc" dangerouslySetInnerHTML={{ __html: body }} />
      <LegacyRuntime script={script} lang={lang} />
    </>
  );
}
