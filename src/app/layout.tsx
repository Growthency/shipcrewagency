import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import "./sections.css";
import "./theme.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://shipcrewagency.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ship Crew Agency — Global Ship Crew Manning Agency",
    template: "%s",
  },
  description:
    "Ship Crew Agency is a trusted global ship crew manning agency with 17 years experience supplying STCW-certified seafarers worldwide.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Ship Crew Agency",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const lang = h.get("x-lang") === "zh" ? "zh-CN" : "en";
  return (
    <html lang={lang}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('scma-theme')||'light';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
