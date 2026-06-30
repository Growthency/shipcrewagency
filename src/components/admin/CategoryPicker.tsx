"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Plus, X, Check } from "lucide-react";
import { useAdminUI } from "./AdminUI";

export function CategoryPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const { toast } = useAdminUI();
  const [open, setOpen] = useState(false);
  const [cats, setCats] = useState<string[]>([]);
  const [newName, setNewName] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d.categories)) setCats(d.categories);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const add = async () => {
    const n = newName.trim();
    if (!n) return;
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: n }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || "Failed");
      setCats(d.categories ?? cats);
      onChange(n);
      setNewName("");
      toast.success("Category added");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not add category");
    }
  };

  const remove = async (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch(
        `/api/admin/categories?name=${encodeURIComponent(name)}`,
        { method: "DELETE" },
      );
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || "Failed");
      setCats(d.categories ?? []);
      if (value === name) onChange(d.categories?.[0] ?? "");
      toast.success("Category removed");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not remove");
    }
  };

  return (
    <div className="cat-picker" ref={ref}>
      <button
        type="button"
        className="cat-picker__btn"
        onClick={() => setOpen((o) => !o)}
      >
        <span className={value ? "" : "cat-picker__ph"}>
          {value || "Select a category"}
        </span>
        <ChevronDown size={16} />
      </button>
      {open && (
        <div className="cat-picker__menu">
          <div className="cat-picker__items">
            {cats.length === 0 && (
              <div className="cat-picker__empty">No categories yet</div>
            )}
            {cats.map((c) => (
              <div
                key={c}
                className={`cat-picker__item${c === value ? " is-active" : ""}`}
                onClick={() => {
                  onChange(c);
                  setOpen(false);
                }}
              >
                {c === value ? (
                  <Check size={14} className="cat-picker__check" />
                ) : (
                  <span className="cat-picker__check" />
                )}
                <span className="cat-picker__name">{c}</span>
                <button
                  type="button"
                  className="cat-picker__rm"
                  title="Remove category"
                  onClick={(e) => remove(c, e)}
                >
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>
          <div className="cat-picker__add">
            <input
              className="a-input"
              placeholder="New category…"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  add();
                }
              }}
            />
            <button
              type="button"
              className="a-btn a-btn--cyan a-btn--sm"
              onClick={add}
            >
              <Plus size={14} /> Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
