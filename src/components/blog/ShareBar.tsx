"use client";

import { useState } from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Link2,
  Check,
} from "lucide-react";
import type { Lang } from "@/i18n";

// Reader-facing share buttons for a blog post (Facebook, X, LinkedIn, WhatsApp,
// and copy-link). These let visitors share the post to their own networks.
export function ShareBar({
  url,
  title,
  label,
  lang,
}: {
  url: string;
  title: string;
  label: string;
  lang: Lang;
}) {
  const [copied, setCopied] = useState(false);
  const e = encodeURIComponent;
  const copyLabel = lang === "zh" ? "复制链接" : "Copy link";
  const copiedLabel = lang === "zh" ? "已复制" : "Copied";

  const links = [
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${e(url)}`,
      icon: <Facebook size={17} />,
    },
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?url=${e(url)}&text=${e(title)}`,
      icon: <Twitter size={17} />,
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${e(url)}`,
      icon: <Linkedin size={17} />,
    },
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${e(`${title} ${url}`)}`,
      icon: <MessageCircle size={17} />,
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="share-bar">
      <span className="share-bar__label">{label}</span>
      <div className="share-bar__btns">
        {links.map((l) => (
          <a
            key={l.name}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="share-bar__btn"
            aria-label={`${label} — ${l.name}`}
            title={l.name}
          >
            {l.icon}
          </a>
        ))}
        <button
          type="button"
          className={`share-bar__btn${copied ? " is-copied" : ""}`}
          onClick={copy}
          aria-label={copied ? copiedLabel : copyLabel}
          title={copied ? copiedLabel : copyLabel}
        >
          {copied ? <Check size={17} /> : <Link2 size={17} />}
        </button>
      </div>
    </div>
  );
}
