"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Mail,
  Inbox,
  Trash2,
  Archive,
  MailOpen,
  RotateCcw,
  Building2,
  Phone,
  Ship,
  Tag,
  Languages,
} from "lucide-react";
import { useAdminUI } from "@/components/admin/AdminUI";

interface Message {
  id: number;
  name: string | null;
  company: string | null;
  email: string | null;
  phone: string | null;
  vessel_type: string | null;
  service_type: string | null;
  ranks_required: string | null;
  message: string | null;
  language: string | null;
  status: string;
  created_at: string;
}

const FILTERS = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "read", label: "Read" },
  { value: "archived", label: "Archived" },
] as const;

const fmtDateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const fmtShort = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === "new"
      ? "a-badge--new"
      : status === "archived"
        ? "a-badge--archived"
        : "a-badge--read";
  return <span className={`a-badge ${cls}`}>{status}</span>;
}

export default function MessagesPage() {
  const { toast, confirm } = useAdminUI();
  const [items, setItems] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["value"]>("all");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter !== "all") params.set("status", filter);
    try {
      const res = await fetch(`/api/admin/messages?${params.toString()}`, {
        cache: "no-store",
      });
      const data = await res.json().catch(() => ({ items: [] }));
      const list: Message[] = Array.isArray(data.items) ? data.items : [];
      setItems(list);
      setSelectedId((prev) =>
        prev && list.some((m) => m.id === prev) ? prev : (list[0]?.id ?? null),
      );
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  const setStatus = async (id: number, status: string) => {
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Update failed");
      }
      setItems((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status } : m)),
      );
      toast.success(`Marked as ${status}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    }
  };

  const remove = async (msg: Message) => {
    const ok = await confirm({
      title: "Delete message?",
      message: `Delete the enquiry from ${msg.name || "this sender"}. This cannot be undone.`,
      confirmLabel: "Delete",
      tone: "danger",
    });
    if (!ok) return;
    try {
      const res = await fetch(`/api/admin/messages?id=${msg.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Message deleted");
      setItems((prev) => prev.filter((m) => m.id !== msg.id));
      if (selectedId === msg.id) setSelectedId(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  };

  // Auto-mark "new" as "read" when opened.
  const openMessage = (msg: Message) => {
    setSelectedId(msg.id);
    if (msg.status === "new") setStatus(msg.id, "read");
  };

  const selected = items.find((m) => m.id === selectedId) ?? null;

  return (
    <div>
      <div className="a-page-head">
        <div>
          <h1 className="a-page-head__title">Messages</h1>
          <p className="a-page-head__sub">Crew & manning enquiries.</p>
        </div>
        <div className="a-page-head__actions">
          <select
            className="a-select"
            style={{ width: 160 }}
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as (typeof FILTERS)[number]["value"])
            }
          >
            {FILTERS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="a-loading">
          <span className="a-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="a-card">
          <div className="a-empty">
            <Inbox />
            <div className="a-empty__title">No messages</div>
            <div className="a-empty__text">
              Enquiries submitted through the contact form will show up here.
            </div>
          </div>
        </div>
      ) : (
        <div className="a-msg-grid">
          {/* List */}
          <div className="a-card">
            <div className="a-msg-list">
              {items.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`a-msg-item${m.id === selectedId ? " is-active" : ""}`}
                  onClick={() => openMessage(m)}
                >
                  <div className="a-msg-item__top">
                    <span
                      className={`a-msg-item__name${m.status === "new" ? " is-unread" : ""}`}
                    >
                      {m.name || "Anonymous"}
                    </span>
                    <span className="a-msg-item__time">
                      {fmtShort(m.created_at)}
                    </span>
                  </div>
                  <span className="a-msg-item__preview">
                    {m.company ? `${m.company} — ` : ""}
                    {m.message || m.service_type || "No message"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Detail */}
          <div className="a-card a-card--pad">
            {selected ? (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: "var(--a-ink)",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      {selected.name || "Anonymous"}{" "}
                      <StatusBadge status={selected.status} />
                    </h2>
                    <p className="a-muted" style={{ fontSize: 12.5, marginTop: 4 }}>
                      {fmtDateTime(selected.created_at)}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {selected.status !== "read" && (
                      <button
                        type="button"
                        className="a-btn a-btn--ghost a-btn--sm"
                        onClick={() => setStatus(selected.id, "read")}
                      >
                        <MailOpen /> Mark read
                      </button>
                    )}
                    {selected.status !== "archived" ? (
                      <button
                        type="button"
                        className="a-btn a-btn--ghost a-btn--sm"
                        onClick={() => setStatus(selected.id, "archived")}
                      >
                        <Archive /> Archive
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="a-btn a-btn--ghost a-btn--sm"
                        onClick={() => setStatus(selected.id, "new")}
                      >
                        <RotateCcw /> Restore
                      </button>
                    )}
                    <button
                      type="button"
                      className="a-btn a-btn--danger a-btn--sm"
                      onClick={() => remove(selected)}
                    >
                      <Trash2 /> Delete
                    </button>
                  </div>
                </div>

                <div className="a-detail__rows">
                  <Field label="Email">
                    {selected.email ? (
                      <a href={`mailto:${selected.email}`}>{selected.email}</a>
                    ) : (
                      "—"
                    )}
                  </Field>
                  <Field label="Phone" icon={<Phone />}>
                    {selected.phone ? (
                      <a href={`tel:${selected.phone}`}>{selected.phone}</a>
                    ) : (
                      "—"
                    )}
                  </Field>
                  <Field label="Company" icon={<Building2 />}>
                    {selected.company || "—"}
                  </Field>
                  <Field label="Service" icon={<Tag />}>
                    {selected.service_type || "—"}
                  </Field>
                  <Field label="Vessel type" icon={<Ship />}>
                    {selected.vessel_type || "—"}
                  </Field>
                  <Field label="Ranks required">
                    {selected.ranks_required || "—"}
                  </Field>
                  <Field label="Language" icon={<Languages />}>
                    {selected.language || "en"}
                  </Field>
                </div>

                <div className="a-detail__field-label">Message</div>
                <div className="a-detail__message">
                  {selected.message || "No message provided."}
                </div>
              </>
            ) : (
              <div className="a-empty">
                <Mail />
                <div className="a-empty__title">Select a message</div>
                <div className="a-empty__text">
                  Choose an enquiry from the list to read it.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="a-detail__field-label">{label}</div>
      <div
        className="a-detail__field-val"
        style={{ display: "flex", alignItems: "center", gap: 6 }}
      >
        {icon && (
          <span style={{ color: "var(--a-ink-muted)", display: "inline-flex" }}>
            {icon}
          </span>
        )}
        {children}
      </div>
    </div>
  );
}
