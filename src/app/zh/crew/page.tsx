import type { Metadata } from "next";
import { CrewIndexPage } from "@/components/pages/CrewIndexPage";
import { buildMetadata } from "@/lib/seo";
import { getDict } from "@/i18n";

export function generateMetadata(): Metadata {
  const t = getDict("zh");
  return buildMetadata({
    lang: "zh",
    title: t.categoriesIndex.metaTitle,
    description: t.categoriesIndex.metaDescription,
    path: "crew",
  });
}

export default function Page() {
  return <CrewIndexPage lang="zh" />;
}
