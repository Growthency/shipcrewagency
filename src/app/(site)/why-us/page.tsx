import type { Metadata } from "next";
import { WhyUsPage } from "@/components/pages/WhyUsPage";
import { buildMetadata } from "@/lib/seo";
import { getDict } from "@/i18n";

export function generateMetadata(): Metadata {
  const t = getDict("en");
  return buildMetadata({
    lang: "en",
    title: t.whyUs.metaTitle,
    description: t.whyUs.metaDescription,
    path: "why-us",
  });
}

export default function Page() {
  return <WhyUsPage lang="en" />;
}
