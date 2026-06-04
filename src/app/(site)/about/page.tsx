import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";
import { buildMetadata } from "@/lib/seo";
import { getDict } from "@/i18n";

export function generateMetadata(): Metadata {
  const t = getDict("en");
  return buildMetadata({
    lang: "en",
    title: t.about.metaTitle,
    description: t.about.metaDescription,
    path: "about",
  });
}

export default function Page() {
  return <AboutPage lang="en" />;
}
