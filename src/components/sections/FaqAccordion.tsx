"use client";
import { useState } from "react";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/i18n/types";

export function FaqAccordion({
  items,
  defaultOpen = 0,
}: {
  items: FaqItem[];
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <div className="faq__list">
      {items.map((it, i) => (
        <div className="faq-item" key={i}>
          <button
            className={cn("faq-q", open === i && "open")}
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            {it.q}
            <Icon name="chevron-down" />
          </button>
          <div className={cn("faq-a", open === i && "open")}>
            <p>{it.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
