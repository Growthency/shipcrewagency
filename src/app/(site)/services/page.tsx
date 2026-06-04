import type { Metadata } from "next";
import { ServicesIndexPage } from "@/components/pages/ServicesIndexPage";
import { buildMetadata } from "@/lib/seo";
import { getDict } from "@/i18n";

export function generateMetadata(): Metadata {
  const t = getDict("en");
  return buildMetadata({
    lang: "en",
    title: t.servicesIndex.metaTitle,
    description: t.servicesIndex.metaDescription,
    path: "services",
  });
}

export default function Page() {
  return <ServicesIndexPage lang="en" />;
}
