"use client";

import { useEffect } from "react";

type Item = { id: number; code: string; position: string };

// Parse a raw HTML blob and return live DOM nodes. <script> tags are rebuilt
// from scratch because scripts inserted via innerHTML never execute — copying
// the attributes and text onto a fresh <script> makes both external (src) and
// inline tags run.
function prepareNodes(code: string, marker: string): Node[] {
  const tpl = document.createElement("template");
  tpl.innerHTML = code;
  const out: Node[] = [];
  tpl.content.childNodes.forEach((node) => {
    if (node.nodeName === "SCRIPT") {
      const src = node as HTMLScriptElement;
      const s = document.createElement("script");
      Array.from(src.attributes).forEach((a) =>
        s.setAttribute(a.name, a.value),
      );
      s.text = src.textContent || "";
      s.setAttribute("data-ss", marker);
      out.push(s);
    } else {
      const clone = node.cloneNode(true);
      if (clone.nodeType === 1)
        (clone as HTMLElement).setAttribute("data-ss", marker);
      out.push(clone);
    }
  });
  return out;
}

export default function SiteScripts({ items }: { items: Item[] }) {
  useEffect(() => {
    for (const it of items) {
      const marker = `ss-${it.id}`;
      // Guard against double injection (React strict mode, re-renders).
      if (document.querySelector(`[data-ss="${marker}"]`)) continue;
      if (!it.code || !it.code.trim()) continue;

      const nodes = prepareNodes(it.code, marker);
      if (it.position === "head") {
        nodes.forEach((n) => document.head.appendChild(n));
      } else if (it.position === "body_start") {
        const first = document.body.firstChild;
        nodes.forEach((n) => document.body.insertBefore(n, first));
      } else {
        nodes.forEach((n) => document.body.appendChild(n));
      }
    }
  }, [items]);

  return null;
}
