import { Reveal, RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PageHero } from "@/components/ui/PageHero";
import { CtaStrip } from "@/components/ui/CtaStrip";
import { Icon, type IconName } from "@/components/icons";
import { getDict, type Lang } from "@/i18n";

const VALUE_ICONS: IconName[] = [
  "shield",
  "zap",
  "info",
  "globe",
  "check-circle",
  "users",
];

export function AboutPage({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const a = t.about;

  return (
    <>
      <PageHero
        lang={lang}
        crumbs={[
          { label: t.nav[0].label, to: "" },
          { label: a.breadcrumb },
        ]}
        title={a.title}
        sub={a.sub}
      />

      {/* ===================== STORY ===================== */}
      <section className="content-block">
        <div className="container">
          <div className="two-col">
            <Reveal>
              <div>
                <div className="tag">{a.storyTag}</div>
                <h2 style={{ color: "var(--brand-900)", marginBottom: 20 }}>
                  {a.storyTitle}
                </h2>
                {a.storyParagraphs.map((p, i) => (
                  <p key={i} style={{ marginBottom: 18 }}>
                    {p}
                  </p>
                ))}
                <div style={{ marginTop: 28, display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <Button lang={lang} to="contact" variant="primary" icon="arrow-right">
                    {t.common.requestCrew}
                  </Button>
                  <Button lang={lang} to="why-us" variant="outline-brand">
                    {t.common.learnMore}
                  </Button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="dark-card">
                <h3>{a.missionTitle}</h3>
                <p>{a.missionText}</p>
                <div className="role-list">
                  {a.missionList.map((li) => (
                    <div className="role-item" key={li}>
                      <Icon name="check" />
                      <span>{li}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== JOURNEY / TIMELINE ===================== */}
      <section className="content-block content-block--alt">
        <div className="container container--sm">
          <SectionHeader tag={a.journeyTag} title={a.journeyTitle} />
          <Reveal>
            <div className="about-timeline">
              {a.timeline.map((item) => (
                <div className="tl-item" key={item.title}>
                  <div className="tl-dot">{item.marker}</div>
                  <div className="tl-body">
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== VALUES ===================== */}
      <section className="content-block">
        <div className="container">
          <SectionHeader tag={a.valuesTag} title={a.valuesTitle} />
          <RevealGroup className="values-grid">
            {a.values.map((v, i) => (
              <RevealItem className="value-card" key={v.title}>
                <div className="value-card__ico">
                  <Icon name={VALUE_ICONS[i]} />
                </div>
                <h4>{v.title}</h4>
                <p>{v.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaStrip
        lang={lang}
        title={a.ctaTitle}
        text={a.ctaText}
        actions={[
          { label: t.common.getInTouch, to: "contact", icon: "arrow-right" },
          { label: t.whyUs.breadcrumb, to: "why-us", variant: "outline-white" },
        ]}
      />
    </>
  );
}
