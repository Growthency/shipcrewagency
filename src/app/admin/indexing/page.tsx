import {
  Globe,
  FileStack,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { readIndexReport } from "@/lib/indexing/scan";
import { hasGscConfig } from "@/lib/analytics/google";
import { siteUrl } from "@/lib/seo";
import { IndexScanButton } from "@/components/admin/IndexScanButton";
import { IndexBoostTools } from "@/components/admin/IndexBoostTools";
import { IndexReportView } from "@/components/admin/IndexReportView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function IndexingPage() {
  const report = await readIndexReport();
  const gsc = hasGscConfig();
  const notIndexed = report ? report.notIndexed : 0;

  return (
    <div>
      <div className="a-page-head">
        <div>
          <h1 className="a-page-head__title">
            <Globe size={20} style={{ verticalAlign: "-3px", marginRight: 8, color: "var(--a-navy-800)" }} />
            Indexing Report
          </h1>
          <p className="a-page-head__sub">
            Monitor &amp; manage your Google search index.
          </p>
        </div>
        <div className="a-page-head__actions">
          {report && (
            <span className="a-muted" style={{ alignSelf: "center" }}>
              Last scan: {new Date(report.scannedAt).toLocaleString("en-US")}
            </span>
          )}
          <IndexScanButton hasData={Boolean(report)} />
        </div>
      </div>

      {/* SEO boost tools */}
      <div className="a-card" style={{ marginBottom: 20 }}>
        <div className="a-card__head">
          <h2 className="a-card__title">SEO Boost Tools</h2>
          <span className="a-muted">IndexNow · Sitemap Submit · RSS Feed</span>
        </div>
        <IndexBoostTools notIndexedCount={notIndexed} gsc={gsc} />
      </div>

      {!gsc && (
        <div className="an-error" style={{ background: "rgba(217,138,26,0.08)", borderColor: "rgba(217,138,26,0.3)", color: "var(--a-warning)" }}>
          <AlertTriangle size={16} />
          <div>
            Connect Google Search Console (the same service account as Analytics)
            to see real indexed / not-indexed status per page. IndexNow and the
            RSS feed above work without it.
          </div>
        </div>
      )}

      {!report ? (
        <div className="a-card an-connect">
          <div className="an-connect__icon">
            <Globe size={26} />
          </div>
          <div>
            <h2 className="an-connect__title">Run your first index scan</h2>
            <p className="an-connect__text">
              Click <strong>Run first scan</strong> to check every page in your
              sitemap. {gsc ? "Status comes from Google Search Console." : "Connect Search Console to get real index status."}
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="sh-stats">
            <StatCard icon={<FileStack size={18} />} tone="info" label="Total Pages" value={report.total} />
            <StatCard icon={<CheckCircle2 size={18} />} tone="passed" label="Indexed" value={report.indexed} />
            <StatCard icon={<XCircle size={18} />} tone="critical" label="Not Indexed" value={report.notIndexed} />
            <StatCard icon={<ShieldCheck size={18} />} tone="warning" label="Index Rate" value={`${report.indexRate}%`} />
          </div>

          <IndexReportView report={report} origin={siteUrl()} />
        </>
      )}
    </div>
  );
}

function StatCard({
  icon,
  tone,
  label,
  value,
}: {
  icon: React.ReactNode;
  tone: string;
  label: string;
  value: number | string;
}) {
  return (
    <div className={`sh-stat sh-stat--${tone}`}>
      <span className="sh-stat__icon">{icon}</span>
      <div>
        <div className="sh-stat__value">{value}</div>
        <div className="sh-stat__label">{label}</div>
      </div>
    </div>
  );
}
