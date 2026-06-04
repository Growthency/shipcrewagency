import { Reveal, RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PageHero } from "@/components/ui/PageHero";
import { CtaStrip } from "@/components/ui/CtaStrip";
import { Icon, type IconName } from "@/components/icons";
import { getDict, type Lang } from "@/i18n";

const CARD_ICONS: IconName[] = [
  "zap",
  "shield",
  "globe",
  "check-circle",
  "file",
  "clock",
];

export function WhyUsPage({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const w = t.whyUs;

  return (
    <>
      <PageHero
        lang={lang}
        crumbs={[
          { label: t.nav[0].label, to: "" },
          { label: w.breadcrumb },
        ]}
        title={w.title}
        sub={w.sub}
      />

      <section className="content-block">
        <div className="container">
          <SectionHeader tag={w.tag} title={w.sectionTitle} />

          <RevealGroup className="stat-grid">
            {w.stats.map((s) => (
              <RevealItem className="stat-box stat-box--solid" key={s.label}>
                <span className="stat-box__num">{s.value}</span>
                <span className="stat-box__lab">{s.label}</span>
              </RevealItem>
            ))}
          </RevealGroup>

          <div style={{ marginTop: 28 }}>
            <RevealGroup className="three-col">
              {w.cards.map((c, i) => (
                <RevealItem className="content-card" key={c.title}>
                  <div className="icon-wrap">
                    <Icon name={CARD_ICONS[i]} />
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      <CtaStrip
        lang={lang}
        title={w.ctaTitle}
        text={w.ctaText}
        actions={[
          { label: t.common.requestCrew, to: "contact", icon: "arrow-right" },
          { label: t.common.getInTouch, to: "contact", variant: "outline-white" },
        ]}
      />
    </>
  );
}
