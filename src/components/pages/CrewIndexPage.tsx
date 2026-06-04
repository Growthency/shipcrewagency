import { Reveal } from "@/components/fx/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { CtaStrip } from "@/components/ui/CtaStrip";
import { LocalizedLink } from "@/components/ui/LocalizedLink";
import { Icon, type IconName } from "@/components/icons";
import Image from "next/image";
import { CATEGORY_SLUGS, getDict, type Lang } from "@/i18n";
import { catImage } from "@/lib/media";

const CAT_ICONS: IconName[] = ["trending", "settings", "coffee", "layers"];
const CAT_BG = ["deck", "engine", "hosp", "off"];

export function CrewIndexPage({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const ci = t.categoriesIndex;

  return (
    <>
      <PageHero
        lang={lang}
        crumbs={[
          { label: t.nav[0].label, to: "" },
          { label: ci.breadcrumb },
        ]}
        title={ci.title}
        sub={ci.sub}
      />

      <section className="content-block">
        <div className="container">
          <Reveal>
            <div className="crew-cats__grid">
              {CATEGORY_SLUGS.map((slug, i) => {
                const cat = t.categories[slug];
                return (
                  <LocalizedLink
                    key={slug}
                    lang={lang}
                    to={`crew/${slug}`}
                    className="cat-card"
                  >
                    <Image
                      className="cat-card__photo"
                      src={catImage(slug)}
                      alt={cat.title}
                      fill
                      sizes="(max-width: 820px) 100vw, (max-width: 1100px) 50vw, 25vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="cat-card__overlay" />
                    <div className="cat-card__content">
                      <div className="cat-card__icon-wrap">
                        <Icon name={CAT_ICONS[i]} className="cat-card__icon" />
                      </div>
                      <div>
                        <h3>{cat.title}</h3>
                        <ul className="cat-card__roles">
                          {cat.roles.map((r) => (
                            <li key={r.title}>{r.title}</li>
                          ))}
                        </ul>
                        <span className="cat-card__link">
                          {t.common.learnMore}
                          <Icon name="arrow-right" />
                        </span>
                      </div>
                    </div>
                  </LocalizedLink>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaStrip
        lang={lang}
        title={t.about.ctaTitle}
        text={t.about.ctaText}
        actions={[
          { label: t.common.requestCrew, to: "contact", icon: "arrow-right" },
          { label: t.common.getInTouch, to: "contact", variant: "outline-white" },
        ]}
      />
    </>
  );
}
