import { Reveal } from "@/components/fx/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PageHero } from "@/components/ui/PageHero";
import { CtaStrip } from "@/components/ui/CtaStrip";
import { getDict, type Lang } from "@/i18n";

export function ProcessPage({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const p = t.process;

  return (
    <>
      <PageHero
        lang={lang}
        crumbs={[
          { label: t.nav[0].label, to: "" },
          { label: p.breadcrumb },
        ]}
        title={p.title}
        sub={p.sub}
      />

      <section className="content-block">
        <div className="container">
          <SectionHeader tag={p.tag} title={p.sectionTitle} text={p.sectionText} />
          <Reveal>
            <div className="steps-list" style={{ maxWidth: 780, margin: "0 auto" }}>
              {p.steps.map((step, i) => (
                <div className="step-item" key={step.title}>
                  <div className="step-num">{i + 1}</div>
                  <div className="step-body">
                    <h4>{step.title}</h4>
                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaStrip
        lang={lang}
        title={p.ctaTitle}
        text={p.ctaText}
        actions={[
          { label: t.common.requestCrew, to: "contact", icon: "arrow-right" },
          { label: t.common.getInTouch, to: "contact", variant: "outline-white" },
        ]}
      />
    </>
  );
}
