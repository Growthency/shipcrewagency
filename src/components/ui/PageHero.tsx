import { Atmosphere } from "@/components/fx/Atmosphere";
import { Reveal } from "@/components/fx/Reveal";
import { LocalizedLink } from "@/components/ui/LocalizedLink";
import { IMG } from "@/lib/media";
import type { Lang } from "@/i18n";

export interface Crumb {
  label: string;
  to?: string;
}

export function PageHero({
  lang,
  crumbs,
  title,
  sub,
  image = IMG.pageHero,
}: {
  lang: Lang;
  crumbs: Crumb[];
  title: string;
  sub?: string;
  image?: string;
}) {
  return (
    <section className="page-hero">
      <div className="media-layer">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" aria-hidden="true" />
      </div>
      <Atmosphere />
      <div className="wave-line" />
      <div className="container">
        <div className="page-hero__content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            {crumbs.map((c, i) => {
              const last = i === crumbs.length - 1;
              return (
                <span key={i} style={{ display: "contents" }}>
                  {c.to !== undefined && !last ? (
                    <LocalizedLink lang={lang} to={c.to}>
                      {c.label}
                    </LocalizedLink>
                  ) : (
                    <span className={last ? "current" : undefined}>{c.label}</span>
                  )}
                  {!last && <span className="sep">/</span>}
                </span>
              );
            })}
          </nav>
          <Reveal>
            <h1>{title}</h1>
            {sub && <p className="page-hero__sub">{sub}</p>}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
