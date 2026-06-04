"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2, X, Menu as MenuIcon } from "lucide-react";
import { useAdminUI } from "@/components/admin/AdminUI";

interface MenuItem {
  id: number;
  language: string;
  location: string;
  label: string;
  url: string;
  target: string;
  sort_order: number;
  enabled: boolean;
}

interface FormState {
  id: number | null;
  language: string;
  location: string;
  label: string;
  url: string;
  target: string;
  sort_order: number;
  enabled: boolean;
}

const LOCATIONS = [
  "header",
  "footer_services",
  "footer_categories",
  "footer_company",
  "footer_bottom",
];

const EMPTY: FormState = {
  id: null,
  language: "en",
  location: "header",
  label: "",
  url: "",
  target: "_self",
  sort_order: 0,
  enabled: true,
};

export default function MenusPage() {
  const { toast, confirm } = useAdminUI();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [saving, setSaving] = useState(false);

  const reload = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/menus", { cache: "no-store" });
      const data = await res.json().catch(() => ({ items: [] }));
      setItems(Array.isArray(data.items) ? data.items : []);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    reload().finally(() => setLoading(false));
  }, [reload]);

  const grouped = useMemo(() => {
    const map = new Map<string, MenuItem[]>();
    for (const it of items) {
      const arr = map.get(it.location) ?? [];
      arr.push(it);
      map.set(it.location, arr);
    }
    return map;
  }, [items]);

  const openNew = () => {
    setForm(EMPTY);
    setOpen(true);
  };
  const openEdit = (it: MenuItem) => {
    setForm({ ...it });
    setOpen(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.label.trim() || !form.url.trim()) {
      toast.error("Label and URL are required");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/menus", {
        method: form.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.error || "Save failed");
        return;
      }
      toast.success(form.id ? "Menu item updated" : "Menu item added");
      setOpen(false);
      await reload();
    } finally {
      setSaving(false);
    }
  };

  const toggleEnabled = async (it: MenuItem) => {
    setItems((prev) =>
      prev.map((x) => (x.id === it.id ? { ...x, enabled: !x.enabled } : x)),
    );
    await fetch("/api/admin/menus", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: it.id, enabled: !it.enabled }),
    });
  };

  const remove = async (it: MenuItem) => {
    const ok = await confirm({
      title: "Delete menu item?",
      message: `Remove "${it.label}". This cannot be undone.`,
      confirmLabel: "Delete",
      tone: "danger",
    });
    if (!ok) return;
    const res = await fetch(`/api/admin/menus?id=${it.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      toast.error("Delete failed");
      return;
    }
    toast.success("Menu item deleted");
    setItems((prev) => prev.filter((x) => x.id !== it.id));
  };

  return (
    <div>
      <div className="a-page-head">
        <div>
          <h1 className="a-page-head__title">Menus</h1>
          <p className="a-page-head__sub">
            Header & footer navigation links per language.
          </p>
        </div>
        <div className="a-page-head__actions">
          <button type="button" className="a-btn a-btn--primary" onClick={openNew}>
            <Plus /> Add Link
          </button>
        </div>
      </div>

      {loading ? (
        <div className="a-loading">
          <span className="a-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="a-card">
          <div className="a-empty">
            <MenuIcon />
            <div className="a-empty__title">No menu items</div>
            <div className="a-empty__text">
              Add navigation links for the header and footer.
            </div>
            <button type="button" className="a-btn a-btn--cyan a-btn--sm" onClick={openNew}>
              <Plus /> Add link
            </button>
          </div>
        </div>
      ) : (
        <div className="a-stack">
          {LOCATIONS.filter((loc) => grouped.has(loc)).map((loc) => (
            <div key={loc} className="a-card">
              <div className="a-card__head">
                <span className="a-card__title">{loc}</span>
              </div>
              <div className="a-table-wrap">
                <table className="a-table">
                  <thead>
                    <tr>
                      <th>Label</th>
                      <th>URL</th>
                      <th>Lang</th>
                      <th>Order</th>
                      <th>Enabled</th>
                      <th className="a-th-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grouped.get(loc)!.map((it) => (
                      <tr key={it.id}>
                        <td className="a-table__title">{it.label}</td>
                        <td className="a-muted">{it.url}</td>
                        <td>
                          <span className="a-badge a-badge--lang">{it.language}</span>
                        </td>
                        <td>{it.sort_order}</td>
                        <td>
                          <label className="a-checkbox">
                            <input
                              type="checkbox"
                              checked={it.enabled}
                              onChange={() => toggleEnabled(it)}
                            />
                          </label>
                        </td>
                        <td>
                          <div className="a-table__actions">
                            <button
                              type="button"
                              className="a-iconbtn"
                              onClick={() => openEdit(it)}
                              title="Edit"
                            >
                              <Pencil />
                            </button>
                            <button
                              type="button"
                              className="a-iconbtn a-iconbtn--danger"
                              onClick={() => remove(it)}
                              title="Delete"
                            >
                              <Trash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="a-modal-overlay" onClick={() => !saving && setOpen(false)}>
          <form
            className="a-modal"
            onSubmit={submit}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="a-modal__head">
              <div className="a-modal__title">
                <span className="a-modal__title-ico">
                  <MenuIcon />
                </span>
                {form.id ? "Edit menu item" : "Add menu item"}
              </div>
              <button
                type="button"
                className="a-iconbtn"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X />
              </button>
            </div>

            <div className="a-modal__body">
              <div className="a-field">
                <label className="a-label">Label *</label>
                <input
                  className="a-input"
                  required
                  autoFocus
                  value={form.label}
                  onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                  placeholder="e.g. Services"
                />
              </div>
              <div className="a-field">
                <label className="a-label">URL *</label>
                <input
                  className="a-input"
                  required
                  value={form.url}
                  onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
                  placeholder="/services or https://…"
                />
              </div>
              <div className="a-row a-row--2">
                <div className="a-field">
                  <label className="a-label">Location</label>
                  <select
                    className="a-select"
                    value={form.location}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, location: e.target.value }))
                    }
                  >
                    {LOCATIONS.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="a-field">
                  <label className="a-label">Language</label>
                  <select
                    className="a-select"
                    value={form.language}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, language: e.target.value }))
                    }
                  >
                    <option value="en">English (en)</option>
                    <option value="zh">中文 (zh)</option>
                  </select>
                </div>
              </div>
              <div className="a-row a-row--2">
                <div className="a-field">
                  <label className="a-label">Target</label>
                  <select
                    className="a-select"
                    value={form.target}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, target: e.target.value }))
                    }
                  >
                    <option value="_self">Same tab (_self)</option>
                    <option value="_blank">New tab (_blank)</option>
                  </select>
                </div>
                <div className="a-field">
                  <label className="a-label">Sort order</label>
                  <input
                    className="a-input"
                    type="number"
                    value={form.sort_order}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        sort_order: Number(e.target.value),
                      }))
                    }
                  />
                </div>
              </div>
              <label className="a-checkbox">
                <input
                  type="checkbox"
                  checked={form.enabled}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, enabled: e.target.checked }))
                  }
                />
                Enabled
              </label>
            </div>

            <div className="a-modal__foot">
              <button
                type="button"
                className="a-btn a-btn--ghost"
                onClick={() => setOpen(false)}
                disabled={saving}
              >
                Cancel
              </button>
              <button type="submit" className="a-btn a-btn--primary" disabled={saving}>
                {saving && <span className="a-spin" style={{ width: 15, height: 15 }} />}
                {form.id ? "Save changes" : "Add link"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
