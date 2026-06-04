import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPage } from "@/components/pages/CategoryPage";
import { buildMetadata } from "@/lib/seo";
import { getDict, CATEGORY_SLUGS } from "@/i18n";

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getDict("zh");
  const c = t.categories[slug];
  if (!c) return {};
  return buildMetadata({
    lang: "zh",
    title: c.metaTitle,
    description: c.metaDescription,
    path: `crew/${slug}`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getDict("zh").categories[slug]) notFound();
  return <CategoryPage lang="zh" slug={slug} />;
}
