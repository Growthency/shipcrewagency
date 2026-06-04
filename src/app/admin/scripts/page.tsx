"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Code2 } from "lucide-react";
import { useAdminUI } from "@/components/admin/AdminUI";

interface Script {
  id: number;
  name: string;
  code: string;
  position: string;
  sort_order: number;
  enabled: boolean;
}

interface FormState {
  id: number | null;
  name: string;
  code: string;
  position: string;
  sort_order: number;
  enabled: boolean;
}

const POSITIONS = [
  { value: "head", label: "Head (<head>)" },
  { value: "body_start", label: "Body start (after <body>)" },
  { value: "body_end", label: "Body end (before </body>)" },
];

const EMPTY: FormState = {
  id: null,
  name: "",
  code: "",
  position: "head",
  sort_order: 0,
  enabled: true,
};

export default function ScriptsPage() {
  const { toast, confirm } = useAdminUI();
  const [items, setItems] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [saving, setSaving] = useState(false);

  const reload = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/scripts", { cache: "no-store" });
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

  const openNew = () => {
    setForm(EMPTY);
    setOpen(true);
  };
  const openEdit = (s: Script) => {
    setForm({ ...s });
    setOpen(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.code.trim()) {
      toast.error("Name and code are required");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/scripts", {
        method: form.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.error || "Save failed");
        return;
      }
      toast.success(form.id ? "Script updated" : "Script added");
      setOpen(false);
      await reload();
    } finally {
      setSaving(false);
    }
  };

  const toggleEnabled = async (s: Script) => {
    setItems((prev) =>
      prev.map((x) => (x.id === s.id ? { ...x, enabled: !x.enabled } : x)),
    );
    await fetch("/api/admin/scripts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: s.id, enabled: !s.enabled }),
    });
  };

  const remove = async (s: Script) => {
    const ok = await confirm({
      title: "Delete script?",
      message: `Remove "${s.name}". This cannot be undone.`,
      confirmLabel: "Delete",
      tone: "danger",
    });
    if (!ok) return;
    const res = await fetch(`/api/admin/scripts?id=${s.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      toast.error("Delete failed");
      return;
    }
    toast.success("Script deleted");
    setItems((prev) => prev.filter((x) => x.id !== s.id));
  };

  return (
    <div>
      <div className="a-page-head">
        <div>
          <h1 className="a-page-head__title">Scripts</h1>
          <p className="a-page-head__sub">
            Inject custom code (analytics, pixels, widgets).
          </p>
        </div>
        <div className="a-page-head__actions">
          <button type="button" className="a-btn a-btn--primary" onClick={openNew}>
            <Plus /> Add Script
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
            <Code2 />
            <div className="a-empty__title">No scripts</div>
            <div className="a-empty__text">
              Add a script to inject into your site&apos;s head or body.
            </div>
            <button type="button" className="a-btn a-btn--cyan a-btn--sm" onClick={openNew}>
              <Plus /> Add script
            </button>
          </div>
        </div>
      ) : (
        <div className="a-card">
          <div className="a-table-wrap">
            <table className="a-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Order</th>
                  <th>Enabled</th>
                  <th className="a-th-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((s) => (
                  <tr key={s.id}>
                    <td className="a-table__title">{s.name}</td>
                    <td>
                      <span className="a-badge a-badge--lang">{s.position}</span>
                    </td>
                    <td>{s.sort_order}</td>
                    <td>
                      <label className="a-checkbox">
                        <input
                          type="checkbox"
                          checked={s.enabled}
                          onChange={() => toggleEnabled(s)}
                        />
                      </label>
                    </td>
                    <td>
                      <div className="a-table__actions">
                        <button
                          type="button"
                          className="a-iconbtn"
                          onClick={() => openEdit(s)}
                          title="Edit"
                        >
                          <Pencil />
                        </button>
                        <button
                          type="button"
                          className="a-iconbtn a-iconbtn--danger"
                          onClick={() => remove(s)}
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
                  <Code2 />
                </span>
                {form.id ? "Edit script" : "Add script"}
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
              <div className="a-row a-row--2">
                <div className="a-field">
                  <label className="a-label">Name *</label>
                  <input
                    className="a-input"
                    required
                    autoFocus
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Meta Pixel"
                  />
                </div>
                <div className="a-field">
                  <label className="a-label">Position</label>
                  <select
                    className="a-select"
                    value={form.position}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, position: e.target.value }))
                    }
                  >
                    {POSITIONS.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="a-field">
                <label className="a-label">Code *</label>
                <textarea
                  className="a-textarea a-textarea--mono"
                  rows={8}
                  spellCheck={false}
                  value={form.code}
                  onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
                  placeholder="<script>…</script>"
                />
                <p className="a-hint">
                  Raw HTML/JS. Injected verbatim — only add code you trust.
                </p>
              </div>
              <div className="a-row a-row--2">
                <div className="a-field" style={{ marginBottom: 0 }}>
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
                <div
                  className="a-field"
                  style={{
                    marginBottom: 0,
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
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
              </div>
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
                {form.id ? "Save changes" : "Add script"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
