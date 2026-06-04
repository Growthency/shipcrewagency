import type { Dictionary, Lang } from "./types";
import { en } from "./en";
import { zh } from "./zh";

export type { Dictionary, Lang } from "./types";

export const LANGS: Lang[] = ["en", "zh"];

const DICTS: Record<Lang, Dictionary> = { en, zh };

export function getDict(lang: Lang): Dictionary {
  return DICTS[lang] ?? en;
}

export function isLang(value: string): value is Lang {
  return value === "en" || value === "zh";
}

/**
 * Build a localized href from a path key (without language prefix).
 * en: "" -> "/",  "about" -> "/about"
 * zh: "" -> "/zh", "about" -> "/zh/about"
 */
export function href(lang: Lang, to: string): string {
  const clean = (to || "").replace(/^\/+/, "");
  if (lang === "zh") {
    return clean ? `/zh/${clean}` : "/zh";
  }
  return clean ? `/${clean}` : "/";
}

/** The "other language" toggle target for the current path key. */
export function otherLangHref(lang: Lang, to: string): string {
  return href(lang === "en" ? "zh" : "en", to);
}

// Canonical slug lists (shared across languages — URLs stay English).
export const SERVICE_SLUGS = [
  "crew-manning",
  "seafarer-recruitment",
  "crew-replacement",
  "crew-change",
  "offshore-manning",
  "emergency-crew",
] as const;

export const CATEGORY_SLUGS = [
  "deck-crew",
  "engine-crew",
  "hospitality-crew",
  "offshore-crew",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
export type CategorySlug = (typeof CATEGORY_SLUGS)[number];
