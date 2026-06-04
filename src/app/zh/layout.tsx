import type { ReactNode } from "react";
import { SiteChrome } from "@/components/layout/SiteChrome";

export default function ZhLayout({ children }: { children: ReactNode }) {
  return <SiteChrome lang="zh">{children}</SiteChrome>;
}
