import { Atmosphere } from "@/components/fx/Atmosphere";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/fx/Reveal";
import type { Lang } from "@/i18n";
import type { IconName } from "@/components/icons";

interface Action {
  label: string;
  to: string;
  variant?: "primary" | "secondary" | "outline-white" | "outline-brand";
  icon?: IconName;
  iconRight?: IconName;
}

export function CtaStrip({
  lang,
  title,
  text,
  actions,
}: {
  lang: Lang;
  title: string;
  text?: string;
  actions: Action[];
}) {
  return (
    <section className="page-cta-strip">
      <Atmosphere grid={false} />
      <div className="container">
        <Reveal>
          <h2>{title}</h2>
          {text && <p>{text}</p>}
          <div className="cta-btns">
            {actions.map((a, i) => (
              <Button
                key={i}
                lang={lang}
                to={a.to}
                variant={a.variant ?? (i === 0 ? "primary" : "outline-white")}
                icon={a.icon}
                iconRight={a.iconRight}
              >
                {a.label}
              </Button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
