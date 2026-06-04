import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";
import { buildMetadata } from "@/lib/seo";
import { getDict } from "@/i18n";

export function generateMetadata(): Metadata {
  const t = getDict("zh");
  return buildMetadata({
    lang: "zh",
    title: t.contact.metaTitle,
    description: t.contact.metaDescription,
    path: "contact",
  });
}

export default function Page() {
  return <ContactPage lang="zh" />;
}
