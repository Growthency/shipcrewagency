import type { Metadata } from "next";
import { ProcessPage } from "@/components/pages/ProcessPage";
import { buildMetadata } from "@/lib/seo";
import { getDict } from "@/i18n";

export function generateMetadata(): Metadata {
  const t = getDict("zh");
  return buildMetadata({
    lang: "zh",
    title: t.process.metaTitle,
    description: t.process.metaDescription,
    path: "process",
  });
}

export default function Page() {
  return <ProcessPage lang="zh" />;
}
