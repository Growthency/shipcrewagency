import { Reveal } from "@/components/fx/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { CtaStrip } from "@/components/ui/CtaStrip";
import { LocalizedLink } from "@/components/ui/LocalizedLink";
import { Icon, type IconName } from "@/components/icons";
import { SERVICE_SLUGS, getDict, type Lang } from "@/i18n";

const SVC_ICONS: IconName[] = [
  "users",
  "search",
  "refresh",
  "briefcase",
  "layers",
  "zap",
];

export function ServicesIndexPage({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const si = t.servicesIndex;

  return (
    <>
      <PageHero
        lang={lang}
        crumbs={[
          { label: t.nav[0].label, to: "" },
          { label: si.breadcrumb },
        ]}
        title={si.title}
        sub={si.sub}
      />

      <section className="content-block">
        <div className="container">
          <Reveal>
            <div className="services__grid">
              {SERVICE_SLUGS.map((slug, i) => {
                const svc = t.services[slug];
                return (
                  <LocalizedLink
                    key={slug}
                    lang={lang}
                    to={`services/${slug}`}
                    className="svc-card"
                  >
                    <div className="svc-card__icon">
                      <Icon name={SVC_ICONS[i]} />
                    </div>
                    <h3>{svc.title}</h3>
                    <p>{svc.sub}</p>
                    <span className="svc-card__link">
                      {t.common.exploreService}
                      <Icon name="arrow-right" />
                    </span>
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
