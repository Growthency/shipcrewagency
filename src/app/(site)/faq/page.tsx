import type { Metadata } from "next";
import { FaqPage } from "@/components/pages/FaqPage";
import { buildMetadata } from "@/lib/seo";
import { getDict } from "@/i18n";

export function generateMetadata(): Metadata {
  const t = getDict("en");
  return buildMetadata({
    lang: "en",
    title: t.faq.metaTitle,
    description: t.faq.metaDescription,
    path: "faq",
  });
}

export default function Page() {
  return <FaqPage lang="en" />;
}
