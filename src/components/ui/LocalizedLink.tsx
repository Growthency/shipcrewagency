import Link from "next/link";
import type { ComponentProps } from "react";
import { href as buildHref, type Lang } from "@/i18n";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  lang: Lang;
  to: string;
};

/** Next <Link> that resolves a path-key to the correct language tree.
 *  Internal links open in a new tab by default; pass target="_self" to opt out. */
export function LocalizedLink({ lang, to, children, ...rest }: Props) {
  return (
    <Link
      href={buildHref(lang, to)}
      target="_blank"
      rel="noopener"
      {...rest}
    >
      {children}
    </Link>
  );
}
