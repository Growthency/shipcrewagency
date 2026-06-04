import { Atmosphere } from "@/components/fx/Atmosphere";
import { Icon, LogoMark } from "@/components/icons";
import { LocalizedLink } from "@/components/ui/LocalizedLink";
import { Button } from "@/components/ui/Button";
import type { Lang } from "@/i18n";
import type { Dictionary } from "@/i18n/types";

const LEGAL_SLUGS = ["legal/privacy", "legal/terms", "legal/cookies"];

export function Footer({ lang, dict }: { lang: Lang; dict: Dictionary }) {
  const f = dict.footer;
  return (
    <footer className="footer">
      <Atmosphere grid={false} blobs />
      <div className="container">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <LocalizedLink lang={lang} to="" className="logo">
              <span className="logo__icon">
                <LogoMark />
              </span>
              <span className="logo__text">
                <span className="logo__name">{dict.common.brand}</span>
                <span className="logo__tagline">{dict.common.tagline}</span>
              </span>
            </LocalizedLink>
            <p>{f.blurb}</p>
            <div className="footer__cert-strip">
              {f.certs.map((c) => (
                <span className="footer__cert" key={c}>
                  {c}
                </span>
              ))}
            </div>
            <div className="footer__socials">
              {["linkedin", "facebook", "twitter"].map((s) => (
                <a
                  key={s}
                  className="footer__social"
                  href="#"
                  aria-label={s}
                  rel="noopener noreferrer"
                >
                  <Icon name={s} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="footer__col-title">{f.servicesTitle}</div>
            <div className="footer__links">
              {f.services.map((l) => (
                <LocalizedLink key={l.to} lang={lang} to={l.to} className="footer__link">
                  {l.label}
                </LocalizedLink>
              ))}
            </div>
          </div>

          {/* Categories + Company */}
          <div>
            <div className="footer__col-title">{f.categoriesTitle}</div>
            <div className="footer__links">
              {f.categories.map((l) => (
                <LocalizedLink key={l.to} lang={lang} to={l.to} className="footer__link">
                  {l.label}
                </LocalizedLink>
              ))}
            </div>
            <div className="footer__col-title" style={{ marginTop: 28 }}>
              {f.companyTitle}
            </div>
            <div className="footer__links">
              {f.company.map((l) => (
                <LocalizedLink key={l.to} lang={lang} to={l.to} className="footer__link">
                  {l.label}
                </LocalizedLink>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="footer__col-title">{f.contactTitle}</div>
            <a className="footer__contact-item" href={`mailto:${f.contactEmail}`}>
              <Icon name="mail" />
              <span>{f.contactEmail}</span>
            </a>
            <div className="footer__contact-item">
              <Icon name="phone" />
              <span>
                {f.contactEmergencyLabel}:<br />
                {f.contactEmergency}
              </span>
            </div>
            <div className="footer__contact-item">
              <Icon name="globe" />
              <span>{f.contactWebsite}</span>
            </div>
            <div style={{ marginTop: 24 }}>
              <Button lang={lang} to="contact" variant="primary" full>
                {dict.common.requestCrew}
              </Button>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">{f.copyright}</p>
          <div className="footer__bottom-links">
            {f.bottomLinks.map((label, i) =>
              i < 3 ? (
                <LocalizedLink
                  key={label}
                  lang={lang}
                  to={LEGAL_SLUGS[i]}
                  className="footer__bottom-link"
                >
                  {label}
                </LocalizedLink>
              ) : (
                <a key={label} href="/sitemap.xml" className="footer__bottom-link">
                  {label}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
