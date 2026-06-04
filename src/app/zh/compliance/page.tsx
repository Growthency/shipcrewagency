import type { Metadata } from "next";
import { CompliancePage } from "@/components/pages/CompliancePage";
import { buildMetadata } from "@/lib/seo";
import { getDict } from "@/i18n";

export function generateMetadata(): Metadata {
  const t = getDict("zh");
  return buildMetadata({
    lang: "zh",
    title: t.compliance.metaTitle,
    description: t.compliance.metaDescription,
    path: "compliance",
  });
}

export default function Page() {
  return <CompliancePage lang="zh" />;
}
