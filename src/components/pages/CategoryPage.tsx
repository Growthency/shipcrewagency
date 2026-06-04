import { notFound } from "next/navigation";
import { RevealGroup, RevealItem } from "@/components/fx/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PageHero } from "@/components/ui/PageHero";
import { CtaStrip } from "@/components/ui/CtaStrip";
import { getDict, type Lang } from "@/i18n";

export function CategoryPage({ lang, slug }: { lang: Lang; slug: string }) {
  const t = getDict(lang);
  const c = t.categories[slug];
  if (!c) notFound();

  return (
    <>
      <PageHero
        lang={lang}
        crumbs={[
          { label: t.nav[0].label, to: "" },
          { label: t.categoriesIndex.breadcrumb, to: "crew" },
          { label: c.breadcrumb },
        ]}
        title={c.title}
        sub={c.sub}
      />

      <section className="content-block">
        <div className="container">
          <SectionHeader tag={c.introTag} title={c.introTitle} text={c.introText} />
          <RevealGroup className="four-col">
            {c.roles.map((role) => (
              <RevealItem className="dark-card text-center" key={role.title}>
                <h3>{role.title}</h3>
                <p>{role.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaStrip
        lang={lang}
        title={c.ctaTitle}
        text={c.ctaText}
        actions={[
          { label: c.ctaPrimary, to: "contact", icon: "arrow-right" },
          { label: t.common.getInTouch, to: "contact", variant: "outline-white" },
        ]}
      />
    </>
  );
}
