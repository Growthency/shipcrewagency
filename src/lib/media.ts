// Central image manifest — real maritime photography stored locally in
// /public/images. Swap any value here to re-assign a picture everywhere.

export const IMG = {
  hero: "/images/m-08.jpg",
  who: "/images/crew-05.jpg",
  about: "/images/m-02.jpg",
  contact: "/images/m-07.jpg",
  process: "/images/m-05.jpg",
  cta: "/images/m-01.jpg",
  // inner-page hero backdrops (subtle, behind the teal overlay)
  pageHero: "/images/m-04.jpg",
  // crew category cards
  cat: {
    "deck-crew": "/images/m-03.jpg",
    "engine-crew": "/images/crew-02.jpg",
    "hospitality-crew": "/images/crew-04.jpg",
    "offshore-crew": "/images/m-06.jpg",
  } as Record<string, string>,
  // blog covers, by normalized category key
  blog: {
    guide: "/images/m-01.jpg",
    compliance: "/images/m-09.jpg",
    operations: "/images/crew-01.jpg",
    industry: "/images/m-10.jpg",
    checklist: "/images/crew-03.jpg",
    default: "/images/m-02.jpg",
  } as Record<string, string>,
};

export function catImage(slug: string): string {
  return IMG.cat[slug] ?? IMG.pageHero;
}
