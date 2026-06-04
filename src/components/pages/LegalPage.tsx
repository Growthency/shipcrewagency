import { notFound } from "next/navigation";
import { Reveal } from "@/components/fx/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { getDict, type Lang } from "@/i18n";
import { legal, type LegalDocKey } from "@/data/legal";

const DOCS: LegalDocKey[] = ["privacy", "terms", "cookies"];

function isLegalDoc(value: string): value is LegalDocKey {
  return (DOCS as string[]).includes(value);
}

export function LegalPage({ lang, doc }: { lang: Lang; doc: string }) {
  if (!isLegalDoc(doc)) notFound();
  const t = getDict(lang);
  const d = legal[lang][doc];

  return (
    <>
      <PageHero
        lang={lang}
        crumbs={[{ label: t.nav[0].label, to: "" }, { label: d.title }]}
        title={d.title}
        sub={d.updated}
      />

      <section className="content-block">
        <div className="container container--sm">
          <Reveal>
            <div className="article__body">
              {d.sections.map((section) => (
                <div key={section.heading}>
                  <h2>{section.heading}</h2>
                  <div dangerouslySetInnerHTML={{ __html: section.body }} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
