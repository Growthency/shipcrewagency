import { LocalizedLink } from "@/components/ui/LocalizedLink";
import { Icon } from "@/components/icons";
import type { Lang } from "@/i18n";

function pageItems(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const items: (number | "…")[] = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);
  if (left > 2) items.push("…");
  for (let p = left; p <= right; p++) items.push(p);
  if (right < total - 1) items.push("…");
  items.push(total);
  return items;
}

/** base is a path-key, e.g. "blog" → /blog?page=N (or /zh/blog?page=N). */
export function Pagination({
  lang,
  base,
  current,
  total,
}: {
  lang: Lang;
  base: string;
  current: number;
  total: number;
}) {
  if (total <= 1) return null;
  const to = (p: number) => (p <= 1 ? base : `${base}?page=${p}`);

  return (
    <nav className="pagination" aria-label="Pagination">
      {current > 1 ? (
        <LocalizedLink
          lang={lang}
          to={to(current - 1)}
          className="pagination__btn"
          aria-label="Previous page"
        >
          <Icon name="arrow-right" style={{ transform: "rotate(180deg)" }} />
        </LocalizedLink>
      ) : (
        <span className="pagination__btn is-disabled" aria-hidden="true">
          <Icon name="arrow-right" style={{ transform: "rotate(180deg)" }} />
        </span>
      )}

      {pageItems(current, total).map((it, i) =>
        it === "…" ? (
          <span key={`e${i}`} className="pagination__ellipsis">
            …
          </span>
        ) : (
          <LocalizedLink
            key={it}
            lang={lang}
            to={to(it)}
            className={`pagination__page${it === current ? " is-active" : ""}`}
            aria-current={it === current ? "page" : undefined}
          >
            {it}
          </LocalizedLink>
        ),
      )}

      {current < total ? (
        <LocalizedLink
          lang={lang}
          to={to(current + 1)}
          className="pagination__btn"
          aria-label="Next page"
        >
          <Icon name="arrow-right" />
        </LocalizedLink>
      ) : (
        <span className="pagination__btn is-disabled" aria-hidden="true">
          <Icon name="arrow-right" />
        </span>
      )}
    </nav>
  );
}
