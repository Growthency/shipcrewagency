import { Reveal } from "@/components/fx/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { CtaStrip } from "@/components/ui/CtaStrip";
import { getDict, type Lang } from "@/i18n";

export function CompliancePage({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const c = t.compliance;

  return (
    <>
      <PageHero
        lang={lang}
        crumbs={[
          { label: t.nav[0].label, to: "" },
          { label: c.breadcrumb },
        ]}
        title={c.title}
        sub={c.sub}
      />

      <section className="content-block">
        <div className="container">
          <div className="two-col" style={{ alignItems: "start" }}>
            <Reveal>
              <div>
                <div className="tag">{c.tag}</div>
                <h2 style={{ color: "var(--brand-900)", marginBottom: 20 }}>
                  {c.sectionTitle}
                </h2>
                {c.paragraphs.map((p, i) => (
                  <p key={i} style={{ marginBottom: 18 }}>
                    {p}
                  </p>
                ))}
                <div className="steps-list" style={{ marginTop: 32 }}>
                  {c.steps.map((step, i) => (
                    <div className="step-item" key={step.title}>
                      <div className="step-num">{i + 1}</div>
                      <div className="step-body">
                        <h4>{step.title}</h4>
                        <p>{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div
                className="cert-cards"
                style={{ gridTemplateColumns: "1fr", gap: 16 }}
              >
                {c.certCards.map((cert) => (
                  <div
                    className="cert-card"
                    key={cert.abbr}
                    style={{ textAlign: "left" }}
                  >
                    <span className="cert-card__abbr">{cert.abbr}</span>
                    <span className="cert-card__name">{cert.name}</span>
                    <p className="cert-card__desc">{cert.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaStrip
        lang={lang}
        title={c.ctaTitle}
        text={c.ctaText}
        actions={[
          { label: t.common.requestCrew, to: "contact", icon: "arrow-right" },
          { label: t.common.getInTouch, to: "contact", variant: "outline-white" },
        ]}
      />
    </>
  );
}
