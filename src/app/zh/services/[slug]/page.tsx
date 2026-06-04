import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/pages/ServicePage";
import { buildMetadata } from "@/lib/seo";
import { getDict, SERVICE_SLUGS } from "@/i18n";

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getDict("zh");
  const s = t.services[slug];
  if (!s) return {};
  return buildMetadata({
    lang: "zh",
    title: s.metaTitle,
    description: s.metaDescription,
    path: `services/${slug}`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getDict("zh").services[slug]) notFound();
  return <ServicePage lang="zh" slug={slug} />;
}
