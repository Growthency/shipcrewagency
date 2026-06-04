import type { Metadata } from "next";
import { BlogListPage } from "@/components/pages/BlogListPage";
import { buildMetadata } from "@/lib/seo";
import { getDict } from "@/i18n";

export function generateMetadata(): Metadata {
  const t = getDict("en");
  return buildMetadata({
    lang: "en",
    title: t.blog.metaTitle,
    description: t.blog.metaDescription,
    path: "blog",
  });
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  return <BlogListPage lang="en" page={Number(page) || 1} />;
}
