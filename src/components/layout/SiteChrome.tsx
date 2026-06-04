import type { ReactNode } from "react";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { ScrollProgress } from "@/components/fx/ScrollProgress";
import { SiteHeader } from "./SiteHeader";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";
import { getDict, type Lang } from "@/i18n";

export function SiteChrome({
  lang,
  children,
}: {
  lang: Lang;
  children: ReactNode;
}) {
  const dict = getDict(lang);
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <SiteHeader lang={lang} dict={dict} />
      <main id="main-content">{children}</main>
      <Footer lang={lang} dict={dict} />
      <FloatingActions lang={lang} />
    </>
  );
}
