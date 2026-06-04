import type { MetadataRoute } from "next";
import { href, LANGS, SERVICE_SLUGS, CATEGORY_SLUGS, type Lang } from "@/i18n";
import { getAllPublishedSlugs } from "@/lib/blog";
import { siteUrl } from "@/lib/seo";

const BASE = siteUrl();

// Static path-keys (without language prefix). Priority/frequency tuned per type.
const STATIC_PAGES: {
  to: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { to: "", priority: 1.0, changeFrequency: "weekly" },
  { to: "about", priority: 0.7, changeFrequency: "monthly" },
  { to: "why-us", priority: 0.7, changeFrequency: "monthly" },
  { to: "compliance", priority: 0.7, changeFrequency: "monthly" },
  { to: "process", priority: 0.7, changeFrequency: "monthly" },
  { to: "services", priority: 0.8, changeFrequency: "monthly" },
  { to: "crew", priority: 0.8, changeFrequency: "monthly" },
  { to: "faq", priority: 0.6, changeFrequency: "monthly" },
  { to: "contact", priority: 0.7, changeFrequency: "monthly" },
  { to: "blog", priority: 0.8, changeFrequency: "weekly" },
];

const LEGAL_SLUGS = ["privacy", "terms", "cookies"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  const push = (
    lang: Lang,
    to: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  ) => {
    entries.push({
      url: BASE + href(lang, to),
      lastModified: now,
      changeFrequency,
      priority,
    });
  };

  const blogSlugs = await getAllPublishedSlugs();

  for (const lang of LANGS) {
    // Static pages
    for (const page of STATIC_PAGES) {
      push(lang, page.to, page.priority, page.changeFrequency);
    }
    // Service detail pages
    for (const slug of SERVICE_SLUGS) {
      push(lang, `services/${slug}`, 0.7, "monthly");
    }
    // Crew category pages
    for (const slug of CATEGORY_SLUGS) {
      push(lang, `crew/${slug}`, 0.7, "monthly");
    }
    // Legal pages
    for (const slug of LEGAL_SLUGS) {
      push(lang, `legal/${slug}`, 0.3, "yearly");
    }
    // Blog posts for this language
    for (const { lang: postLang, slug } of blogSlugs) {
      if (postLang === lang) {
        push(lang, `blog/${slug}`, 0.6, "monthly");
      }
    }
  }

  return entries;
}
