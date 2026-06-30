"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Languages,
  ExternalLink,
} from "lucide-react";
import { useAdminUI } from "@/components/admin/AdminUI";

interface Post {
  id: number;
  title: string;
  slug: string;
  language: string;
  status: string;
  category: string | null;
  created_at: string;
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

function StatusBadge({ status }: { status: string }) {
  const cls =
    status === "published"
      ? "a-badge--published"
      : status === "scheduled"
        ? "a-badge--scheduled"
        : "a-badge--draft";
  return <span className={`a-badge ${cls}`}>{status}</span>;
}

export default function AdminPostsPage() {
  const { toast, confirm } = useAdminUI();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [language, setLanguage] = useState("all");
  const [status, setStatus] = useState("all");
  const [deleting, setDeleting] = useState<number | null>(null);
  const [counts, setCounts] = useState<{
    byStatus: Record<string, number>;
    byLang: Record<string, number>;
  }>({ byStatus: {}, byLang: {} });

  const loadCounts = useCallback(() => {
    fetch("/api/admin/posts?counts=1", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d.byStatus && d.byLang)
          setCounts({ byStatus: d.byStatus, byLang: d.byLang });
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    loadCounts();
  }, [loadCounts]);

  const sCount = (k: string) => counts.byStatus[k] ?? 0;
  const lCount = (k: string) => counts.byLang[k] ?? 0;

  const load = useCallback(
    async (p: number) => {
      setLoading(true);
      const params = new URLSearchParams({ page: String(p) });
      if (language !== "all") params.set("language", language);
      if (status !== "all") params.set("status", status);
      try {
        const res = await fetch(`/api/admin/posts?${params.toString()}`, {
          cache: "no-store",
        });
        const data = await res.json().catch(() => ({}));
        setPosts(Array.isArray(data.posts) ? data.posts : []);
        setTotalPages(typeof data.totalPages === "number" ? data.totalPages : 1);
        setTotal(typeof data.total === "number" ? data.total : 0);
        setPage(typeof data.page === "number" ? data.page : p);
      } catch {
        setPosts([]);
        setTotalPages(1);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    },
    [language, status],
  );

  useEffect(() => {
    load(1);
  }, [load]);

  const remove = async (post: Post) => {
    const ok = await confirm({
      title: "Delete post?",
      message: `Remove "${post.title}". This cannot be undone.`,
      confirmLabel: "Delete",
      tone: "danger",
    });
    if (!ok) return;
    setDeleting(post.id);
    try {
      const res = await fetch(`/api/admin/posts?id=${post.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Delete failed");
      }
      toast.success("Post deleted");
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
      setTotal((t) => Math.max(0, t - 1));
      loadCounts();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <div className="a-page-head">
        <div>
          <h1 className="a-page-head__title">Blog Posts</h1>
          <p className="a-page-head__sub">{total} total posts</p>
        </div>
        <div className="a-page-head__actions">
          <Link href="/admin/posts/new" className="a-btn a-btn--primary">
            <Plus /> New Post
          </Link>
        </div>
      </div>

      <div className="a-toolbar" style={{ marginBottom: 18 }}>
        <select
          className="a-select"
          style={{ width: 170 }}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="all">All languages ({lCount("all")})</option>
          <option value="en">English ({lCount("en")})</option>
          <option value="zh">中文 ({lCount("zh")})</option>
        </select>
        <select
          className="a-select"
          style={{ width: 190 }}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All statuses ({sCount("all")})</option>
          <option value="draft">Draft ({sCount("draft")})</option>
          <option value="published">Published ({sCount("published")})</option>
          <option value="scheduled">Scheduled ({sCount("scheduled")})</option>
        </select>
      </div>

      <div className="a-card">
        {loading ? (
          <div className="a-loading">
            <span className="a-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="a-empty">
            <FileText />
            <div className="a-empty__title">No posts found</div>
            <div className="a-empty__text">
              Try a different filter or create a new post.
            </div>
            <Link href="/admin/posts/new" className="a-btn a-btn--cyan a-btn--sm">
              <Plus /> Create post
            </Link>
          </div>
        ) : (
          <div className="a-table-wrap">
            <table className="a-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Language</th>
                  <th>Status</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th className="a-th-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <div className="a-table__title">{post.title}</div>
                      <div className="a-table__sub">/{post.slug}</div>
                    </td>
                    <td>
                      <span className="a-badge a-badge--lang">
                        <Languages /> {post.language}
                      </span>
                    </td>
                    <td>
                      <StatusBadge status={post.status} />
                    </td>
                    <td>{post.category || "—"}</td>
                    <td>{fmtDate(post.created_at)}</td>
                    <td>
                      <div className="a-table__actions">
                        <a
                          href={
                            post.language === "zh"
                              ? `/zh/blog/${post.slug}`
                              : `/blog/${post.slug}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="a-iconbtn"
                          title="View on website"
                        >
                          <ExternalLink />
                        </a>
                        <Link
                          href={`/admin/posts/edit?id=${post.id}`}
                          className="a-iconbtn"
                          title="Edit"
                        >
                          <Pencil />
                        </Link>
                        <button
                          type="button"
                          className="a-iconbtn a-iconbtn--danger"
                          onClick={() => remove(post)}
                          disabled={deleting === post.id}
                          title="Delete"
                        >
                          {deleting === post.id ? (
                            <span
                              className="a-spin"
                              style={{ width: 15, height: 15 }}
                            />
                          ) : (
                            <Trash2 />
                          )}
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

      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 18,
          }}
        >
          <span className="a-muted" style={{ fontSize: 12 }}>
            Page {page} of {totalPages}
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            <button
              type="button"
              className="a-btn a-btn--ghost a-btn--sm"
              onClick={() => load(page - 1)}
              disabled={page <= 1}
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              className="a-btn a-btn--ghost a-btn--sm"
              onClick={() => load(page + 1)}
              disabled={page >= totalPages}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
