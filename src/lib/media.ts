// Central image manifest — real maritime photography stored locally in
// /public/images (all WebP). Swap any value here to re-assign a picture.
// Editorial author portrait (author.webp): Royal Navy photograph via Wikimedia
// Commons, Open Government Licence v3.0 (UK MOD / Crown copyright).

export const IMG = {
  hero: "/images/m-08.webp",
  who: "/images/crew-05.webp",
  about: "/images/m-02.webp",
  contact: "/images/m-07.webp",
  process: "/images/m-05.webp",
  cta: "/images/m-01.webp",
  author: "/images/author.webp",
  // inner-page hero backdrops (subtle, behind the teal overlay)
  pageHero: "/images/m-04.webp",
  // crew category cards
  cat: {
    "deck-crew": "/images/m-03.webp",
    "engine-crew": "/images/crew-02.webp",
    "hospitality-crew": "/images/crew-04.webp",
    "offshore-crew": "/images/m-06.webp",
  } as Record<string, string>,
  // blog covers, by normalized category key
  blog: {
    guide: "/images/m-01.webp",
    compliance: "/images/m-09.webp",
    operations: "/images/crew-01.webp",
    industry: "/images/m-10.webp",
    checklist: "/images/crew-03.webp",
    welfare: "/images/crew-06.webp",
    default: "/images/m-02.webp",
  } as Record<string, string>,
};

export function catImage(slug: string): string {
  return IMG.cat[slug] ?? IMG.pageHero;
}
