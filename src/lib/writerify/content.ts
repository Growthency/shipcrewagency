import "server-only";
import { marked } from "marked";

/** URL-safe slug from a title. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Does the string already look like HTML markup (vs. Markdown)?
function looksLikeHtml(s: string): boolean {
  return /<(p|h[1-6]|ul|ol|li|div|section|article|img|figure|table|blockquote|pre|br|strong|em|a)[\s>/]/i.test(
    s,
  );
}

/**
 * Normalise incoming article body to HTML. Writerify's Git mode ships Markdown,
 * while some setups POST HTML — accept either. Existing HTML is passed through
 * (the public blog sanitises it at render time); Markdown is converted.
 */
export function toHtml(raw: string): string {
  const s = (raw || "").trim();
  if (!s) return "";
  if (looksLikeHtml(s)) return s;
  return marked.parse(s, { async: false }) as string;
}

/** Plain-text summary from an HTML body, capped to ~160 chars. */
export function autoExcerpt(html: string): string {
  if (!html) return "";
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= 160) return text;
  return text.slice(0, 157).replace(/\s+\S*$/, "") + "...";
}

/** Rough reading time from an HTML body (~200 wpm). */
export function readTimeFor(html: string): string {
  const words = html
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}
