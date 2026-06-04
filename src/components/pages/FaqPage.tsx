import { Reveal } from "@/components/fx/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { CtaStrip } from "@/components/ui/CtaStrip";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { getDict, type Lang } from "@/i18n";

export function FaqPage({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const f = t.faq;

  return (
    <>
      <PageHero
        lang={lang}
        crumbs={[
          { label: t.nav[0].label, to: "" },
          { label: f.breadcrumb },
        ]}
        title={f.title}
        sub={f.sub}
      />

      <section className="content-block">
        <div className="container container--sm">
          <Reveal>
            <FaqAccordion items={f.items} defaultOpen={null} />
          </Reveal>
        </div>
      </section>

      <CtaStrip
        lang={lang}
        title={f.ctaTitle}
        text={f.ctaText}
        actions={[
          { label: t.common.getInTouch, to: "contact", icon: "arrow-right" },
          { label: t.common.requestCrew, to: "contact", variant: "outline-white" },
        ]}
      />
    </>
  );
}
