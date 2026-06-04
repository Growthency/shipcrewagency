import type { Metadata } from "next";
import { href, getDict, type Lang } from "@/i18n";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://shipcrewagency.com";

export function buildMetadata({
  lang,
  title,
  description,
  path = "",
  image,
}: {
  lang: Lang;
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const canonical = SITE + href(lang, path);
  const brand = getDict(lang).common.brand;
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: SITE + href("en", path),
        "zh-CN": SITE + href("zh", path),
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: brand,
      locale: lang === "zh" ? "zh_CN" : "en_US",
      type: "website",
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export function siteUrl(): string {
  return SITE;
}
