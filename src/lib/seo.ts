import type { Metadata } from "next";
import { href, getDict, type Lang } from "@/i18n";

/**
 * Resolves the canonical site origin. Order:
 *  1. NEXT_PUBLIC_SITE_URL (set this to your real domain in production)
 *  2. Vercel's stable production domain (auto-set on Vercel)
 *  3. Vercel's per-deployment URL (auto-set on Vercel)
 *  4. localhost-safe default
 * This guarantees canonical URLs and social-share images point at the actual
 * host even before a custom domain / env var is configured.
 */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://shipcrewagency.com";
}

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
  const SITE = siteUrl();
  const canonical = SITE + href(lang, path);
  const brand = getDict(lang).common.brand;
  // Explicit social-share image via the /og route — always on the correct host
  // and carrying the page's own headline (Latin pages only; Chinese falls back
  // to the brand card to avoid missing glyphs in the image renderer).
  const ogParams = new URLSearchParams();
  if (lang === "en" && title) ogParams.set("title", title);
  const qs = ogParams.toString();
  const ogImage = image || `${SITE}/og${qs ? `?${qs}` : ""}`;
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: brand }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
