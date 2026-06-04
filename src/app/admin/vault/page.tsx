"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Lock,
  Plus,
  Search,
  Eye,
  EyeOff,
  Copy,
  Check,
  Pencil,
  Trash2,
  Globe,
  ExternalLink,
  X,
  User as UserIcon,
  KeyRound,
} from "lucide-react";
import { useAdminUI } from "@/components/admin/AdminUI";

interface Credential {
  id: number;
  site_name: string;
  site_url: string;
  username: string;
  password: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

interface FormState {
  id: number | null;
  site_name: string;
  site_url: string;
  username: string;
  password: string;
  notes: string;
}

const EMPTY_FORM: FormState = {
  id: null,
  site_name: "",
  site_url: "",
  username: "",
  password: "",
  notes: "",
};

export default function VaultPage() {
  const { toast, confirm } = useAdminUI();
  const [items, setItems] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [revealed, setRevealed] = useState<Record<number, string>>({});

  const reload = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/credentials", { cache: "no-store" });
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

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.site_name.toLowerCase().includes(q) ||
        i.site_url.toLowerCase().includes(q) ||
        i.username.toLowerCase().includes(q) ||
        i.notes.toLowerCase().includes(q),
    );
  }, [items, search]);

  const openNew = () => {
    setForm(EMPTY_FORM);
    setFormOpen(true);
  };

  const openEdit = (c: Credential) => {
    setForm({
      id: c.id,
      site_name: c.site_name,
      site_url: c.site_url,
      username: c.username,
      password: "",
      notes: c.notes,
    });
    setFormOpen(true);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.site_name.trim()) {
      toast.error("Site name is required");
      return;
    }
    if (!form.id && !form.password) {
      toast.error("Password is required");
      return;
    }
    setSaving(true);
    try {
      const body: Record<string, unknown> = {
        site_name: form.site_name,
        site_url: form.site_url,
        username: form.username,
        notes: form.notes,
      };
      if (form.id) body.id = form.id;
      if (form.password) body.password = form.password;
      const res = await fetch("/api/admin/credentials", {
        method: form.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.error || "Save failed");
        return;
      }
      toast.success(form.id ? "Credential updated" : "Credential added");
      setFormOpen(false);
      setForm(EMPTY_FORM);
      await reload();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (c: Credential) => {
    const ok = await confirm({
      title: "Delete credential?",
      message: `Remove "${c.site_name}" from the vault. This cannot be undone.`,
      confirmLabel: "Delete",
      tone: "danger",
    });
    if (!ok) return;
    const res = await fetch(`/api/admin/credentials?id=${c.id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      toast.error("Delete failed");
      return;
    }
    toast.success("Credential deleted");
    setItems((prev) => prev.filter((x) => x.id !== c.id));
    setRevealed((r) => {
      const n = { ...r };
      delete n[c.id];
      return n;
    });
  };

  const fetchPassword = async (id: number): Promise<string> => {
    if (revealed[id] !== undefined) return revealed[id];
    const res = await fetch(`/api/admin/credentials?id=${id}&reveal=1`, {
      cache: "no-store",
    });
    if (!res.ok) {
      toast.error("Could not fetch password");
      return "";
    }
    const data = await res.json().catch(() => ({ item: null }));
    const pw = data.item?.password ?? "";
    setRevealed((r) => ({ ...r, [id]: pw }));
    return pw;
  };

  const toggleReveal = async (c: Credential) => {
    if (revealed[c.id] !== undefined) {
      setRevealed((r) => {
        const n = { ...r };
        delete n[c.id];
        return n;
      });
      return;
    }
    await fetchPassword(c.id);
  };

  const copyPassword = async (c: Credential) => {
    const pw = await fetchPassword(c.id);
    try {
      await navigator.clipboard.writeText(pw);
      toast.success("Password copied");
    } catch {
      toast.error("Clipboard blocked");
    }
  };

  const copyText = async (text: string, label: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied`);
    } catch {
      toast.error("Clipboard blocked");
    }
  };

  return (
    <div>
      <div className="a-page-head">
        <div>
          <h1 className="a-page-head__title">
            Secure Vault <Lock style={{ width: 19, height: 19, color: "var(--a-cyan-500)" }} />
          </h1>
          <p className="a-page-head__sub">
            Encrypted credential store (AES-256-GCM at rest).
          </p>
        </div>
        <div className="a-page-head__actions">
          <div className="a-search">
            <Search />
            <input
              className="a-input"
              style={{ width: 240 }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search credentials…"
            />
          </div>
          <button type="button" className="a-btn a-btn--primary" onClick={openNew}>
            <Plus /> Add New
          </button>
        </div>
      </div>

      {loading ? (
        <div className="a-loading">
          <span className="a-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="a-card">
          <div className="a-empty">
            <Lock />
            <div className="a-empty__title">
              {search ? "No matches found" : "Vault is empty"}
            </div>
            <div className="a-empty__text">
              {search
                ? "Try a different search term."
                : "Add your first credential to get started."}
            </div>
            {!search && (
              <button type="button" className="a-btn a-btn--cyan a-btn--sm" onClick={openNew}>
                <Plus /> Add credential
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="a-vault-grid">
          {filtered.map((c) => (
            <CredCard
              key={c.id}
              c={c}
              revealedPw={revealed[c.id]}
              onToggle={() => toggleReveal(c)}
              onCopyPw={() => copyPassword(c)}
              onCopyUser={() => copyText(c.username, "Username")}
              onEdit={() => openEdit(c)}
              onDelete={() => remove(c)}
            />
          ))}
        </div>
      )}

      {formOpen && (
        <div
          className="a-modal-overlay"
          onClick={() => !saving && setFormOpen(false)}
        >
          <form
            className="a-modal"
            onSubmit={submit}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="a-modal__head">
              <div className="a-modal__title">
                <span className="a-modal__title-ico">
                  <Lock />
                </span>
                {form.id ? "Edit credential" : "Add credential"}
              </div>
              <button
                type="button"
                className="a-iconbtn"
                onClick={() => setFormOpen(false)}
                aria-label="Close"
              >
                <X />
              </button>
            </div>

            <div className="a-modal__body">
              <div className="a-field">
                <label className="a-label">Site name *</label>
                <input
                  className="a-input"
                  required
                  autoFocus
                  value={form.site_name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, site_name: e.target.value }))
                  }
                  placeholder="e.g. Crew Portal, AWS, GoDaddy"
                />
              </div>
              <div className="a-field">
                <label className="a-label">Site URL</label>
                <input
                  className="a-input"
                  type="url"
                  value={form.site_url}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, site_url: e.target.value }))
                  }
                  placeholder="https://…"
                />
              </div>
              <div className="a-field">
                <label className="a-label">Username / Email</label>
                <input
                  className="a-input"
                  value={form.username}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, username: e.target.value }))
                  }
                  placeholder="user@example.com"
                />
              </div>
              <div className="a-field">
                <label className="a-label">
                  {form.id ? "Password (blank = keep current)" : "Password *"}
                </label>
                <input
                  className="a-input a-input--mono"
                  type="text"
                  required={!form.id}
                  value={form.password}
                  autoComplete="new-password"
                  onChange={(e) =>
                    setForm((f) => ({ ...f, password: e.target.value }))
                  }
                  placeholder="••••••••"
                />
              </div>
              <div className="a-field" style={{ marginBottom: 0 }}>
                <label className="a-label">Notes</label>
                <textarea
                  className="a-textarea"
                  rows={2}
                  value={form.notes}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, notes: e.target.value }))
                  }
                  placeholder="Optional: API keys, recovery codes, etc."
                />
              </div>
            </div>

            <div className="a-modal__foot">
              <button
                type="button"
                className="a-btn a-btn--ghost"
                onClick={() => setFormOpen(false)}
                disabled={saving}
              >
                Cancel
              </button>
              <button type="submit" className="a-btn a-btn--primary" disabled={saving}>
                {saving && <span className="a-spin" style={{ width: 15, height: 15 }} />}
                {form.id ? "Save changes" : "Add to vault"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function CredCard({
  c,
  revealedPw,
  onToggle,
  onCopyPw,
  onCopyUser,
  onEdit,
  onDelete,
}: {
  c: Credential;
  revealedPw: string | undefined;
  onToggle: () => void;
  onCopyPw: () => void;
  onCopyUser: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [favicon, setFavicon] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!c.site_url) {
      setFavicon(null);
      return;
    }
    try {
      const u = new URL(c.site_url);
      setFavicon(
        `https://www.google.com/s2/favicons?domain=${u.hostname}&sz=64`,
      );
    } catch {
      setFavicon(null);
    }
  }, [c.site_url]);

  const isRevealed = revealedPw !== undefined;
  const pwDisplay = isRevealed ? revealedPw || "—" : "••••••••••••";

  const handleCopyPw = () => {
    onCopyPw();
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="a-vault-card">
      <div className="a-vault-card__head">
        <span className="a-vault-card__logo">
          {favicon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={favicon} alt="" onError={() => setFavicon(null)} />
          ) : (
            <Globe />
          )}
        </span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div className="a-vault-card__name">{c.site_name}</div>
          {c.site_url && (
            <a
              href={c.site_url}
              target="_blank"
              rel="noopener noreferrer"
              className="a-vault-card__url"
            >
              Visit <ExternalLink />
            </a>
          )}
        </div>
        <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
          <button type="button" className="a-iconbtn" onClick={onEdit} title="Edit">
            <Pencil />
          </button>
          <button
            type="button"
            className="a-iconbtn a-iconbtn--danger"
            onClick={onDelete}
            title="Delete"
          >
            <Trash2 />
          </button>
        </div>
      </div>

      <div className="a-vault-row">
        <UserIcon />
        <span className="a-vault-row__val">{c.username || "—"}</span>
        {c.username && (
          <button
            type="button"
            className="a-iconbtn"
            style={{ width: 28, height: 28 }}
            onClick={onCopyUser}
            title="Copy username"
          >
            <Copy />
          </button>
        )}
      </div>

      <div className="a-vault-row">
        <KeyRound />
        <span className="a-vault-row__val a-vault-row__val--mono">{pwDisplay}</span>
        <button
          type="button"
          className="a-iconbtn"
          style={{ width: 28, height: 28 }}
          onClick={onToggle}
          title={isRevealed ? "Hide" : "Reveal"}
        >
          {isRevealed ? <EyeOff /> : <Eye />}
        </button>
        <button
          type="button"
          className="a-iconbtn"
          style={{ width: 28, height: 28, color: copied ? "var(--a-success)" : undefined }}
          onClick={handleCopyPw}
          title="Copy password"
        >
          {copied ? <Check /> : <Copy />}
        </button>
      </div>

      {c.notes && <p className="a-vault-card__notes">{c.notes}</p>}
    </div>
  );
}
