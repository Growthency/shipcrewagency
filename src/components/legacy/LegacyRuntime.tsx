"use client";

import { useEffect, useRef } from "react";
import { whatsappHref, enquiryMailto, COMPANY } from "@/lib/company";
import type { Lang } from "@/i18n";

// Does this button/link text look like a call-to-action (vs. an FAQ/accordion
// toggle, which we must leave alone)?
function isCta(text: string): boolean {
  return /request|call|phone|e-?mail|mail|contact|submit|crew|quote|get in touch|speak|specialist|deploy|hire|enquir|whats ?app|consult|reach us|talk to|book|apply/i.test(
    text,
  );
}

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
      const tel = `tel:${COMPANY.callTel}`;
      const mail = enquiryMailto(lang);
      const wa = whatsappHref(lang);
      // Pick a destination from the CTA's wording: "call" -> phone, "email" ->
      // mail, everything else (request/contact/submit/get in touch…) -> WhatsApp.
      const destFor = (text: string): string => {
        const t = text.toLowerCase();
        if (/call|phone|dial|hotline|ring us/.test(t)) return tel;
        if (/e-?mail|mail us|write to us|send.*mail/.test(t)) return mail;
        return wa;
      };

      // Rewire placeholder CTA links (#, #contact, empty, javascript:) by intent.
      // Real links and FAQ/accordion anchors (non-CTA text) are left untouched.
      root.querySelectorAll("a").forEach((a) => {
        const href = a.getAttribute("href");
        const dead =
          !href ||
          href === "#" ||
          href === "#contact" ||
          href.trim() === "" ||
          /^javascript:/i.test(href);
        const text = (a.textContent || "").trim();
        if (!dead || !isCta(text)) return;
        const dest = destFor(text);
        a.setAttribute("href", dest);
        if (dest.startsWith("http")) {
          a.setAttribute("target", "_blank");
          a.setAttribute("rel", "noopener noreferrer");
        } else {
          a.removeAttribute("target");
        }
      });

      // Standalone CTA buttons (not inside a form) — wire their click to phone /
      // mail / WhatsApp. Buttons inside a form fall through to the form handler.
      root.querySelectorAll("button").forEach((b) => {
        if (b.closest("form")) return;
        const text = (b.textContent || "").trim();
        if (!isCta(text)) return;
        const dest = destFor(text);
        b.addEventListener("click", (e) => {
          e.preventDefault();
          if (dest.startsWith("http"))
            window.open(dest, "_blank", "noopener,noreferrer");
          else window.location.href = dest;
        });
        (b as HTMLElement).style.cursor = "pointer";
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
