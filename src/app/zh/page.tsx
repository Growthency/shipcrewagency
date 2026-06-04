import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { buildMetadata } from "@/lib/seo";
import { getDict } from "@/i18n";

export function generateMetadata(): Metadata {
  const t = getDict("zh");
  return buildMetadata({
    lang: "zh",
    title: t.home.metaTitle,
    description: t.home.metaDescription,
    path: "",
  });
}

export default function Page() {
  return <HomePage lang="zh" />;
}
