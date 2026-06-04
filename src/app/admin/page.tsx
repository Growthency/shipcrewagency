import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  FileEdit,
  Mail,
  Lock,
  Plus,
  Inbox,
  Languages,
  Database,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { getSupabaseAdmin, hasSupabaseConfig } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

interface RecentPost {
  id: number;
  title: string;
  language: string;
  status: string;
  category: string | null;
  created_at: string;
}
interface RecentMessage {
  id: number;
  name: string | null;
  company: string | null;
  service_type: string | null;
  status: string;
  created_at: string;
}

interface DashboardData {
  postsTotal: number;
  postsPublished: number;
  postsDrafts: number;
  postsEn: number;
  postsZh: number;
  messagesTotal: number;
  messagesNew: number;
  vaultTotal: number;
  recentPosts: RecentPost[];
  recentMessages: RecentMessage[];
}

async function loadDashboard(): Promise<DashboardData> {
  const sb = getSupabaseAdmin();
  const head = { count: "exact" as const, head: true };

  const [
    postsTotal,
    postsPublished,
    postsDrafts,
    postsEn,
    postsZh,
    messagesTotal,
    messagesNew,
    vaultTotal,
    recentPostsRes,
    recentMessagesRes,
  ] = await Promise.all([
    sb.from("blog_posts").select("*", head),
    sb.from("blog_posts").select("*", head).eq("status", "published"),
    sb.from("blog_posts").select("*", head).eq("status", "draft"),
    sb.from("blog_posts").select("*", head).eq("language", "en"),
    sb.from("blog_posts").select("*", head).eq("language", "zh"),
    sb.from("contact_requests").select("*", head),
    sb.from("contact_requests").select("*", head).eq("status", "new"),
    sb.from("vault_credentials").select("*", head),
    sb
      .from("blog_posts")
      .select("id,title,language,status,category,created_at")
      .order("created_at", { ascending: false })
      .limit(6),
    sb
      .from("contact_requests")
      .select("id,name,company,service_type,status,created_at")
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  return {
    postsTotal: postsTotal.count ?? 0,
    postsPublished: postsPublished.count ?? 0,
    postsDrafts: postsDrafts.count ?? 0,
    postsEn: postsEn.count ?? 0,
    postsZh: postsZh.count ?? 0,
    messagesTotal: messagesTotal.count ?? 0,
    messagesNew: messagesNew.count ?? 0,
    vaultTotal: vaultTotal.count ?? 0,
    recentPosts: (recentPostsRes.data as RecentPost[]) ?? [],
    recentMessages: (recentMessagesRes.data as RecentMessage[]) ?? [],
  };
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function Tile({
  icon,
  label,
  value,
  hint,
  variant,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  hint?: string;
  variant?: "blue" | "green" | "amber" | "navy";
}) {
  return (
    <div className="a-tile">
      <div className="a-tile__top">
        <span className="a-tile__label">{label}</span>
        <span
          className={`a-tile__icon${variant ? ` a-tile__icon--${variant}` : ""}`}
        >
          {icon}
        </span>
      </div>
      <div className="a-tile__value">{value}</div>
      {hint && <div className="a-tile__hint">{hint}</div>}
    </div>
  );
}

export default async function AdminDashboardPage() {
  const configured = hasSupabaseConfig();
  const data = configured ? await loadDashboard().catch(() => null) : null;

  return (
    <div>
      <div className="a-page-head">
        <div>
          <h1 className="a-page-head__title">Dashboard</h1>
          <p className="a-page-head__sub">
            Overview of content, enquiries and the vault.
          </p>
        </div>
        <div className="a-page-head__actions">
          <Link href="/admin/posts/new" className="a-btn a-btn--primary">
            <Plus />
            New Post
          </Link>
        </div>
      </div>

      {!configured && (
        <div className="a-notice">
          <span className="a-notice__icon">
            <Database />
          </span>
          <div>
            <div className="a-notice__title">Connect Supabase to view live data</div>
            <p className="a-notice__text">
              Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
              <code>SUPABASE_SERVICE_ROLE_KEY</code> (see the README), then run
              the schema in <code>supabase/schema.sql</code>. The admin works
              now, but counts and lists stay empty until the database is wired
              up.
            </p>
          </div>
        </div>
      )}

      {/* Stat tiles */}
      <div className="a-stats">
        <Tile
          icon={<FileText />}
          variant="blue"
          label="Total Posts"
          value={data?.postsTotal ?? 0}
          hint={
            data
              ? `${data.postsEn} EN · ${data.postsZh} ZH`
              : "Awaiting Supabase"
          }
        />
        <Tile
          icon={<CheckCircle2 />}
          variant="green"
          label="Published"
          value={data?.postsPublished ?? 0}
        />
        <Tile
          icon={<FileEdit />}
          variant="amber"
          label="Drafts"
          value={data?.postsDrafts ?? 0}
        />
        <Tile
          icon={<Mail />}
          variant="navy"
          label="New Messages"
          value={data?.messagesNew ?? 0}
          hint={data ? `${data.messagesTotal} total` : undefined}
        />
      </div>

      <div className="a-stats" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
        <Tile
          icon={<Inbox />}
          variant="blue"
          label="Total Enquiries"
          value={data?.messagesTotal ?? 0}
        />
        <Tile
          icon={<Lock />}
          variant="navy"
          label="Vault Credentials"
          value={data?.vaultTotal ?? 0}
        />
      </div>

      {/* Recent activity */}
      <div
        style={{
          display: "grid",
          gap: 18,
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        }}
      >
        {/* Recent messages */}
        <div className="a-card">
          <div className="a-card__head">
            <span className="a-card__title">
              <Mail /> Recent Messages
            </span>
            <Link href="/admin/messages" className="a-link">
              View all →
            </Link>
          </div>
          {!data || data.recentMessages.length === 0 ? (
            <div className="a-empty">
              <Inbox />
              <div className="a-empty__title">No messages yet</div>
              <div className="a-empty__text">
                Enquiries from the contact form appear here.
              </div>
            </div>
          ) : (
            <ul className="a-list">
              {data.recentMessages.map((m) => (
                <li key={m.id} className="a-list__item">
                  <div className="a-list__main">
                    <div className="a-list__title">
                      {m.name || "Anonymous"}
                      {m.company ? ` · ${m.company}` : ""}
                    </div>
                    <div className="a-list__meta">
                      <span>{m.service_type || "General"}</span>
                      <span>·</span>
                      <span>
                        <Calendar /> {fmtDate(m.created_at)}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`a-badge a-badge--${
                      m.status === "new"
                        ? "new"
                        : m.status === "archived"
                          ? "archived"
                          : "read"
                    }`}
                  >
                    {m.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent posts */}
        <div className="a-card">
          <div className="a-card__head">
            <span className="a-card__title">
              <FileText /> Recent Posts
            </span>
            <Link href="/admin/posts" className="a-link">
              View all →
            </Link>
          </div>
          {!data || data.recentPosts.length === 0 ? (
            <div className="a-empty">
              <FileText />
              <div className="a-empty__title">No posts yet</div>
              <div className="a-empty__text">
                Create your first blog post to get started.
              </div>
              <Link href="/admin/posts/new" className="a-btn a-btn--cyan a-btn--sm">
                <Plus /> Create post
              </Link>
            </div>
          ) : (
            <ul className="a-list">
              {data.recentPosts.map((p) => (
                <li key={p.id} className="a-list__item">
                  <div className="a-list__main">
                    <div className="a-list__title">{p.title}</div>
                    <div className="a-list__meta">
                      <span className="a-badge a-badge--lang">
                        <Languages /> {p.language}
                      </span>
                      <span>{p.category || "Insights"}</span>
                      <span>·</span>
                      <span>{fmtDate(p.created_at)}</span>
                    </div>
                  </div>
                  <Link
                    href={`/admin/posts/edit?id=${p.id}`}
                    className="a-link"
                    style={{ display: "inline-flex", alignItems: "center", gap: 3 }}
                  >
                    Edit <ArrowRight style={{ width: 13, height: 13 }} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
