"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Share2,
  Save,
  Settings,
} from "lucide-react";
import { useAdminUI } from "@/components/admin/AdminUI";

interface SocialLink {
  id: number;
  label: string;
  href: string;
  icon: string;
  sort_order: number;
  enabled: boolean;
}

interface SocialForm {
  id: number | null;
  label: string;
  href: string;
  icon: string;
  sort_order: number;
  enabled: boolean;
}

const EMPTY: SocialForm = {
  id: null,
  label: "",
  href: "",
  icon: "globe",
  sort_order: 0,
  enabled: true,
};

const ICONS = ["globe", "linkedin", "facebook", "twitter", "mail", "phone"];

// Editable footer text fields stored in site_settings.
const SETTING_FIELDS = [
  { key: "footer_tagline", label: "Footer tagline", type: "textarea" },
  { key: "footer_copyright", label: "Copyright line", type: "text" },
  { key: "contact_email", label: "Contact email", type: "email" },
  { key: "contact_phone", label: "Contact phone", type: "text" },
  { key: "contact_address", label: "Office address", type: "textarea" },
] as const;

export default function FooterPage() {
  const { toast, confirm } = useAdminUI();

  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<SocialForm>(EMPTY);
  const [saving, setSaving] = useState(false);

  const [settings, setSettings] = useState<Record<string, string>>({});
  const [savingSettings, setSavingSettings] = useState(false);

  const reload = useCallback(async () => {
    try {
      const [socialRes, settingsRes] = await Promise.all([
        fetch("/api/admin/social", { cache: "no-store" }),
        fetch("/api/admin/settings?group=footer", { cache: "no-store" }),
      ]);
      const socialData = await socialRes.json().catch(() => ({ items: [] }));
      const settingsData = await settingsRes.json().catch(() => ({ items: [] }));
      setLinks(Array.isArray(socialData.items) ? socialData.items : []);
      const map: Record<string, string> = {};
      for (const s of settingsData.items ?? []) map[s.key] = s.value ?? "";
      setSettings(map);
    } catch {
      setLinks([]);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    reload().finally(() => setLoading(false));
  }, [reload]);

  const openNew = () => {
    setForm(EMPTY);
    setOpen(true);
  };
  const openEdit = (l: SocialLink) => {
    setForm({ ...l });
    setOpen(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.label.trim() || !form.href.trim()) {
      toast.error("Label and URL are required");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/social", {
        method: form.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.error || "Save failed");
        return;
      }
      toast.success(form.id ? "Link updated" : "Link added");
      setOpen(false);
      await reload();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (l: SocialLink) => {
    const ok = await confirm({
      title: "Delete social link?",
      message: `Remove "${l.label}". This cannot be undone.`,
      confirmLabel: "Delete",
      tone: "danger",
    });
    if (!ok) return;
    const res = await fetch(`/api/admin/social?id=${l.id}`, { method: "DELETE" });
    if (!res.ok) {
      toast.error("Delete failed");
      return;
    }
    toast.success("Link deleted");
    setLinks((prev) => prev.filter((x) => x.id !== l.id));
  };

  const saveSettings = async () => {
    setSavingSettings(true);
    try {
      const payload = {
        settings: SETTING_FIELDS.map((f) => ({
          key: f.key,
          value: settings[f.key] ?? "",
          type: f.type,
          group_name: "footer",
          label: f.label,
        })),
      };
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.error || "Save failed");
        return;
      }
      toast.success("Footer settings saved");
    } finally {
      setSavingSettings(false);
    }
  };

  return (
    <div>
      <div className="a-page-head">
        <div>
          <h1 className="a-page-head__title">Footer &amp; Social</h1>
          <p className="a-page-head__sub">
            Social links and editable footer content.
          </p>
        </div>
      </div>

      {/* Footer settings */}
      <div className="a-card a-card--pad" style={{ marginBottom: 22 }}>
        <h3 className="a-section-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Settings style={{ width: 16, height: 16, color: "var(--a-cyan-500)" }} />
          Footer content
        </h3>
        <div className="a-row a-row--2">
          {SETTING_FIELDS.map((f) => (
            <div className="a-field" key={f.key}>
              <label className="a-label">{f.label}</label>
              {f.type === "textarea" ? (
                <textarea
                  className="a-textarea"
                  rows={2}
                  value={settings[f.key] ?? ""}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, [f.key]: e.target.value }))
                  }
                />
              ) : (
                <input
                  className="a-input"
                  type={f.type === "email" ? "email" : "text"}
                  value={settings[f.key] ?? ""}
                  onChange={(e) =>
                    setSettings((s) => ({ ...s, [f.key]: e.target.value }))
                  }
                />
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          className="a-btn a-btn--primary"
          onClick={saveSettings}
          disabled={savingSettings}
        >
          {savingSettings ? (
            <span className="a-spin" style={{ width: 16, height: 16 }} />
          ) : (
            <Save />
          )}
          Save settings
        </button>
      </div>

      {/* Social links */}
      <div className="a-card">
        <div className="a-card__head">
          <span className="a-card__title">
            <Share2 /> Social links
          </span>
          <button type="button" className="a-btn a-btn--cyan a-btn--sm" onClick={openNew}>
            <Plus /> Add link
          </button>
        </div>

        {loading ? (
          <div className="a-loading">
            <span className="a-spin" />
          </div>
        ) : links.length === 0 ? (
          <div className="a-empty">
            <Share2 />
            <div className="a-empty__title">No social links</div>
            <div className="a-empty__text">Add your social profiles.</div>
          </div>
        ) : (
          <div className="a-table-wrap">
            <table className="a-table">
              <thead>
                <tr>
                  <th>Label</th>
                  <th>URL</th>
                  <th>Icon</th>
                  <th>Order</th>
                  <th>Enabled</th>
                  <th className="a-th-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {links.map((l) => (
                  <tr key={l.id}>
                    <td className="a-table__title">{l.label}</td>
                    <td className="a-muted">{l.href}</td>
                    <td>
                      <span className="a-badge a-badge--lang">{l.icon}</span>
                    </td>
                    <td>{l.sort_order}</td>
                    <td>
                      <span
                        className={`a-badge ${l.enabled ? "a-badge--published" : "a-badge--off"}`}
                      >
                        {l.enabled ? "on" : "off"}
                      </span>
                    </td>
                    <td>
                      <div className="a-table__actions">
                        <button
                          type="button"
                          className="a-iconbtn"
                          onClick={() => openEdit(l)}
                          title="Edit"
                        >
                          <Pencil />
                        </button>
                        <button
                          type="button"
                          className="a-iconbtn a-iconbtn--danger"
                          onClick={() => remove(l)}
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
        )}
      </div>

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
                  <Share2 />
                </span>
                {form.id ? "Edit social link" : "Add social link"}
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
                  placeholder="e.g. LinkedIn"
                />
              </div>
              <div className="a-field">
                <label className="a-label">URL *</label>
                <input
                  className="a-input"
                  required
                  value={form.href}
                  onChange={(e) => setForm((f) => ({ ...f, href: e.target.value }))}
                  placeholder="https://…"
                />
              </div>
              <div className="a-row a-row--2">
                <div className="a-field">
                  <label className="a-label">Icon</label>
                  <select
                    className="a-select"
                    value={form.icon}
                    onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                  >
                    {ICONS.map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
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
