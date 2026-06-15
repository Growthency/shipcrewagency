"use client";

import { useEffect, useRef } from "react";
import { whatsappHref, enquiryMailto } from "@/lib/company";
import type { Lang } from "@/i18n";

/**
 * The original service pages shipped their own inline <script> (FAQ builders,
 * accordion toggles, tab switchers). React does not execute markup injected via
 * dangerouslySetInnerHTML, so we re-run that script here in global scope after
 * the body mounts. We also redirect the page's call-to-actions to the team:
 * "request crew" links open WhatsApp, and the contact form opens a pre-filled
 * email. Runs once per mount (guarded against StrictMode double-invocation).
 */
export function LegacyRuntime({ script, lang }: { script: string; lang: Lang }) {
  const ran = useRef(false);
  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    if (script) {
      const el = document.createElement("script");
      el.textContent = script;
      document.body.appendChild(el);
      el.remove();
    }

    const root = document.querySelector(".legacy-svc");
    if (root) {
      // "Request crew" CTAs (anchors pointing at the contact section) -> WhatsApp.
      root.querySelectorAll('a[href="#contact"]').forEach((a) => {
        a.setAttribute("href", whatsappHref(lang));
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      });
      // The contact form is a no-op in the original — send it to email instead.
      root.querySelectorAll("form").forEach((f) => {
        f.addEventListener("submit", (e) => {
          e.preventDefault();
          window.location.href = enquiryMailto(lang);
        });
      });
    }
    // The original markup calls submitForm() from an inline onclick.
    (window as unknown as { submitForm?: () => void }).submitForm = () => {
      window.location.href = enquiryMailto(lang);
    };
  }, [script, lang]);

  return null;
}
