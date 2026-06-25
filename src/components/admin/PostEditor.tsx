"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ArrowLeft,
  Save,
  Send,
  Trash2,
  Upload,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react";
import { useAdminUI } from "./AdminUI";

const RichEditor = dynamic(() => import("./RichEditor"), { ssr: false });

type Lang = "en" | "zh";
type Layout = "with-sidebar" | "full-page";
type Status = "draft" | "published";

interface PostForm {
  language: Lang;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category: string;
  tag: string;
  read_time: string;
  author_name: string;
  author_role: string;
  meta_title: string;
  meta_description: string;
  layout: Layout;
  is_premium: boolean;
  show_on_blog: boolean;
  status: Status;
}

const EMPTY: PostForm = {
  language: "en",
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featured_image: "",
  category: "Insights",
  tag: "",
  read_time: "5 min read",
  author_name: "Ship Crew Agency",
  author_role: "Maritime Editorial Team",
  meta_title: "",
  meta_description: "",
  layout: "with-sidebar",
  is_premium: false,
  show_on_blog: true,
  status: "draft",
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function PostEditor({ postId }: { postId?: number }) {
  const router = useRouter();
  const { toast, confirm } = useAdminUI();
  const isEdit = typeof postId === "number";

  const [form, setForm] = useState<PostForm>(EMPTY);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [autoSlug, setAutoSlug] = useState(!isEdit);
  const [editorKey, setEditorKey] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef("");

  // Load the categories already in use so they can be picked from the list.
  useEffect(() => {
    let active = true;
    fetch("/api/admin/posts?categories=1")
      .then((r) => r.json())
      .then((d) => {
        if (active && Array.isArray(d.categories)) setCategories(d.categories);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const set = <K extends keyof PostForm>(key: K, val: PostForm[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  useEffect(() => {
    if (!isEdit) return;
    let active = true;
    fetch(`/api/admin/posts?id=${postId}`)
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        if (data.error) {
          setError(data.error);
          setLoading(false);
          return;
        }
        const loaded: PostForm = {
          language: data.language === "zh" ? "zh" : "en",
          title: data.title ?? "",
          slug: data.slug ?? "",
          excerpt: data.excerpt ?? "",
          content: data.content ?? "",
          featured_image: data.featured_image ?? "",
          category: data.category ?? "Insights",
          tag: data.tag ?? "",
          read_time: data.read_time ?? "5 min read",
          author_name: data.author_name ?? "Ship Crew Agency",
          author_role: data.author_role ?? "Maritime Editorial Team",
          meta_title: data.meta_title ?? "",
          meta_description: data.meta_description ?? "",
          layout: data.layout === "full-page" ? "full-page" : "with-sidebar",
          is_premium: Boolean(data.is_premium),
          show_on_blog: data.show_on_blog !== false,
          status: data.status === "published" ? "published" : "draft",
        };
        setForm(loaded);
        contentRef.current = loaded.content;
        setEditorKey((k) => k + 1);
        setLoading(false);
      })
      .catch(() => {
        if (active) {
          setError("Failed to load post");
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [isEdit, postId]);

  const onTitle = (val: string) => {
    set("title", val);
    if (autoSlug) set("slug", slugify(val));
  };

  const onContent = (html: string) => {
    contentRef.current = html;
    set("content", html);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      set("featured_image", data.url);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const save = async (publish: boolean) => {
    const title = form.title.trim();
    if (!title) {
      setError("Title is required");
      return;
    }
    const slug = (form.slug.trim() || slugify(title)).trim();
    if (!slug) {
      setError("Slug is required");
      return;
    }
    setError("");
    setSaving(true);

    const status: Status = publish ? "published" : form.status;
    const payload = {
      ...form,
      title,
      slug,
      content: contentRef.current || form.content,
      status,
    };

    try {
      const res = await fetch("/api/admin/posts", {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEdit ? { id: postId, ...payload } : payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      toast.success(
        publish ? "Post published" : isEdit ? "Post saved" : "Draft created",
      );
      router.push("/admin/posts");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!isEdit) return;
    const ok = await confirm({
      title: "Delete post?",
      message: "This permanently removes the post. This cannot be undone.",
      confirmLabel: "Delete",
      tone: "danger",
    });
    if (!ok) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/posts?id=${postId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Delete failed");
      }
      toast.success("Post deleted");
      router.push("/admin/posts");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="a-loading">
        <span className="a-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="a-page-head">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/admin/posts" className="a-iconbtn" aria-label="Back">
            <ArrowLeft />
          </Link>
          <div>
            <h1 className="a-page-head__title">
              {isEdit ? "Edit Post" : "New Post"}
            </h1>
            <p className="a-page-head__sub">
              {isEdit ? `Post #${postId}` : "Create a blog post"}
            </p>
          </div>
        </div>
        <div className="a-page-head__actions">
          {isEdit && (
            <button
              type="button"
              className="a-btn a-btn--danger"
              onClick={remove}
              disabled={saving}
            >
              <Trash2 /> Delete
            </button>
          )}
          <button
            type="button"
            className="a-btn a-btn--ghost"
            onClick={() => save(false)}
            disabled={saving}
          >
            <Save /> Save Draft
          </button>
          <button
            type="button"
            className="a-btn a-btn--primary"
            onClick={() => save(true)}
            disabled={saving}
          >
            {saving ? <span className="a-spin" style={{ width: 16, height: 16 }} /> : <Send />}
            Publish
          </button>
        </div>
      </div>

      {error && (
        <div className="a-alert a-alert--error">
          <AlertCircle />
          <span>{error}</span>
        </div>
      )}

      <div className="a-editor-grid">
        {/* Main column */}
        <div className="a-stack">
          <div className="a-card a-card--pad">
            <div className="a-field">
              <label className="a-label">Title</label>
              <input
                className="a-input"
                value={form.title}
                onChange={(e) => onTitle(e.target.value)}
                placeholder="Enter post title…"
                style={{ fontSize: 17, fontWeight: 600 }}
              />
            </div>
            <div className="a-field" style={{ marginBottom: 0 }}>
              <label className="a-label">Slug (permalink)</label>
              <input
                className="a-input a-input--mono"
                value={form.slug}
                onChange={(e) => {
                  setAutoSlug(false);
                  set("slug", e.target.value);
                }}
                placeholder="auto-generated-from-title"
              />
              <p className="a-hint">
                Unique per language. Used at /blog/{form.slug || "…"}.
              </p>
            </div>
          </div>

          <div className="a-card a-card--pad">
            <label className="a-label">Featured Image</label>
            <div className="a-input-group">
              <input
                className="a-input"
                value={form.featured_image}
                onChange={(e) => set("featured_image", e.target.value)}
                placeholder="https://… or upload"
              />
              <button
                type="button"
                className="a-btn a-btn--ghost a-btn--sm"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? (
                  <span className="a-spin" style={{ width: 15, height: 15 }} />
                ) : (
                  <Upload />
                )}
                Upload
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                onChange={handleUpload}
                style={{ display: "none" }}
              />
            </div>
            {form.featured_image && (
              <div className="a-img-preview">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.featured_image} alt="Featured preview" />
              </div>
            )}
          </div>

          <div>
            <label className="a-label">Content</label>
            <RichEditor
              value={form.content}
              onChange={onContent}
              resetKey={editorKey}
            />
          </div>

          <div className="a-card a-card--pad">
            <label className="a-label">Excerpt</label>
            <textarea
              className="a-textarea"
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              placeholder="Short summary. Leave blank to auto-generate from content."
              rows={3}
            />
          </div>
        </div>

        {/* Sidebar column */}
        <div className="a-stack">
          <div className="a-card a-card--pad">
            <h3 className="a-section-title">Publish</h3>
            <div className="a-field">
              <label className="a-label">Status</label>
              <select
                className="a-select"
                value={form.status}
                onChange={(e) => set("status", e.target.value as Status)}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="a-field" style={{ marginBottom: 0 }}>
              <label className="a-label">Language</label>
              <select
                className="a-select"
                value={form.language}
                onChange={(e) => set("language", e.target.value as Lang)}
              >
                <option value="en">English (en)</option>
                <option value="zh">中文 (zh)</option>
              </select>
            </div>
          </div>

          <div className="a-card a-card--pad">
            <h3 className="a-section-title">Organize</h3>
            <div className="a-field">
              <label className="a-label">Category</label>
              <input
                className="a-input"
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                placeholder="Insights"
                list="post-categories"
              />
              <datalist id="post-categories">
                {Array.from(
                  new Set([
                    ...categories,
                    "Insights",
                    "Industry News",
                    "Crew Welfare",
                    "Compliance",
                    "Recruitment",
                    "Maritime Careers",
                  ]),
                ).map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
              <p className="a-hint">
                Pick an existing category, or type a new name to create one.
              </p>
            </div>
            <div className="a-field">
              <label className="a-label">Tag</label>
              <input
                className="a-input"
                value={form.tag}
                onChange={(e) => set("tag", e.target.value)}
                placeholder="e.g. STCW, manning"
              />
            </div>
            <div className="a-field" style={{ marginBottom: 0 }}>
              <label className="a-label">Read time</label>
              <input
                className="a-input"
                value={form.read_time}
                onChange={(e) => set("read_time", e.target.value)}
                placeholder="5 min read"
              />
            </div>
          </div>

          <div className="a-card a-card--pad">
            <h3 className="a-section-title">Layout & Access</h3>
            <div className="a-field">
              <label className="a-label">Layout</label>
              <select
                className="a-select"
                value={form.layout}
                onChange={(e) => set("layout", e.target.value as Layout)}
              >
                <option value="with-sidebar">With sidebar</option>
                <option value="full-page">Full page</option>
              </select>
            </div>
            <label className="a-checkbox" style={{ marginBottom: 12 }}>
              <input
                type="checkbox"
                checked={form.is_premium}
                onChange={(e) => set("is_premium", e.target.checked)}
              />
              Premium (gated) content
            </label>
            <label className="a-checkbox">
              <input
                type="checkbox"
                checked={form.show_on_blog}
                onChange={(e) => set("show_on_blog", e.target.checked)}
              />
              Show on blog listing
            </label>
          </div>

          <div className="a-card a-card--pad">
            <h3 className="a-section-title">Author</h3>
            <div className="a-field">
              <label className="a-label">Name</label>
              <input
                className="a-input"
                value={form.author_name}
                onChange={(e) => set("author_name", e.target.value)}
              />
            </div>
            <div className="a-field" style={{ marginBottom: 0 }}>
              <label className="a-label">Role</label>
              <input
                className="a-input"
                value={form.author_role}
                onChange={(e) => set("author_role", e.target.value)}
              />
            </div>
          </div>

          <div className="a-card a-card--pad">
            <h3 className="a-section-title">SEO</h3>
            <div className="a-field">
              <label className="a-label">Meta title</label>
              <input
                className="a-input"
                value={form.meta_title}
                onChange={(e) => set("meta_title", e.target.value)}
                placeholder={form.title || "Defaults to title"}
              />
              <p className="a-hint">{form.meta_title.length}/60 characters</p>
            </div>
            <div className="a-field" style={{ marginBottom: 0 }}>
              <label className="a-label">Meta description</label>
              <textarea
                className="a-textarea"
                value={form.meta_description}
                onChange={(e) => set("meta_description", e.target.value)}
                placeholder="Description for search results…"
                rows={3}
              />
              <p className="a-hint">
                {form.meta_description.length}/155 characters
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
