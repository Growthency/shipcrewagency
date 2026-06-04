import type { Metadata } from "next";
import { BlogPostPage } from "@/components/pages/BlogPostPage";
import { buildMetadata } from "@/lib/seo";
import { getDict } from "@/i18n";
import { getPostBySlug, getAllPublishedSlugs } from "@/lib/blog";

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs();
  return slugs
    .filter((s) => s.lang === "en")
    .map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getDict("en");
  const post = await getPostBySlug("en", slug);
  if (!post) {
    return { title: t.notFound.title, description: t.notFound.text };
  }
  return buildMetadata({
    lang: "en",
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    path: `blog/${slug}`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogPostPage lang="en" slug={slug} />;
}
