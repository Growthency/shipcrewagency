import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/pages/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { getDict } from "@/i18n";
import { legal, type LegalDocKey } from "@/data/legal";

const DOCS: LegalDocKey[] = ["privacy", "terms", "cookies"];

export function generateStaticParams() {
  return DOCS.map((doc) => ({ doc }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ doc: string }>;
}): Promise<Metadata> {
  const { doc } = await params;
  if (!(DOCS as string[]).includes(doc)) return {};
  const d = legal.en[doc as LegalDocKey];
  const t = getDict("en");
  return buildMetadata({
    lang: "en",
    title: `${d.title} | ${t.common.brand}`,
    description: `${d.title} — ${t.common.brand}. ${d.updated}.`,
    path: `legal/${doc}`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ doc: string }>;
}) {
  const { doc } = await params;
  if (!(DOCS as string[]).includes(doc)) notFound();
  return <LegalPage lang="en" doc={doc} />;
}
