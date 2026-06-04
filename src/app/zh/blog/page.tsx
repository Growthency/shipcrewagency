import type { Metadata } from "next";
import { BlogListPage } from "@/components/pages/BlogListPage";
import { buildMetadata } from "@/lib/seo";
import { getDict } from "@/i18n";

export function generateMetadata(): Metadata {
  const t = getDict("zh");
  return buildMetadata({
    lang: "zh",
    title: t.blog.metaTitle,
    description: t.blog.metaDescription,
    path: "blog",
  });
}

export default async function Page() {
  return <BlogListPage lang="zh" />;
}
