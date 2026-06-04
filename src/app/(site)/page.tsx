import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { buildMetadata } from "@/lib/seo";
import { getDict } from "@/i18n";

export function generateMetadata(): Metadata {
  const t = getDict("en");
  return buildMetadata({
    lang: "en",
    title: t.home.metaTitle,
    description: t.home.metaDescription,
    path: "",
  });
}

export default function Page() {
  return <HomePage lang="en" />;
}
