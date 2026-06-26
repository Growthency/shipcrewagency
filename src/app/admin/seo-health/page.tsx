import {
  ShieldCheck,
  AlertTriangle,
  XCircle,
  Info,
  CheckCircle2,
} from "lucide-react";
import { readSeoAudit } from "@/lib/seo-audit/store";
import { SeoRescanButton } from "@/components/admin/SeoRescanButton";
import { SeoHealthTabs } from "@/components/admin/SeoHealthTabs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function scoreLabel(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 50) return "Needs work";
  return "Poor";
}

export default async function SeoHealthPage() {
  const audit = await readSeoAudit();

  return (
    <div>
      <div className="a-page-head">
        <div>
          <h1 className="a-page-head__title">
            <ShieldCheck size={20} style={{ verticalAlign: "-3px", marginRight: 8, color: "var(--a-navy-800)" }} />
            SEO Health
          </h1>
          <p className="a-page-head__sub">
            Technical SEO audit across all your pages.
          </p>
        </div>
        <div className="a-page-head__actions">
          <SeoRescanButton hasData={Boolean(audit)} />
        </div>
      </div>

      {!audit ? (
        <div className="a-card an-connect">
          <div className="an-connect__icon">
            <ShieldCheck size={26} />
          </div>
          <div>
            <h2 className="an-connect__title">Run your first SEO scan</h2>
            <p className="an-connect__text">
              Click <strong>Run scan</strong> to crawl every page on your site and
              check titles, meta descriptions, headings, image alt text, Open
              Graph, structured data and more. The result is saved here.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Score summary */}
          <div className="a-card sh-summary">
            <div className="sh-ring" data-score={audit.score}>
              <svg viewBox="0 0 120 120" className="sh-ring__svg">
                <circle className="sh-ring__bg" cx="60" cy="60" r="52" />
                <circle
                  className="sh-ring__fg"
                  cx="60"
                  cy="60"
                  r="52"
                  strokeDasharray={`${(audit.score / 100) * 326.7} 326.7`}
                />
              </svg>
              <div className="sh-ring__num">
                <span>{audit.score}</span>
                <small>/ 100</small>
              </div>
            </div>
            <div className="sh-summary__body">
              <h2 className="sh-summary__title">{scoreLabel(audit.score)}</h2>
              <p className="sh-summary__sub">
                {audit.pagesScanned} pages scanned · {audit.topIssues.reduce((s, i) => s + i.count, 0)} issues found
              </p>
              <div className="sh-pills">
                <span className="sh-pill sh-pill--critical">{audit.counts.critical} Critical</span>
                <span className="sh-pill sh-pill--warning">{audit.counts.warning} Warnings</span>
                <span className="sh-pill sh-pill--info">{audit.counts.info} Info</span>
                <span className="sh-pill sh-pill--passed">{audit.counts.passed} Pages passed</span>
              </div>
              <div className="sh-scanned">
                Last scanned:{" "}
                {new Date(audit.scannedAt).toLocaleString("en-US")}
              </div>
            </div>
          </div>

          {/* Stat cards */}
          <div className="sh-stats">
            <StatCard icon={<XCircle size={18} />} tone="critical" label="Critical" value={audit.counts.critical} />
            <StatCard icon={<AlertTriangle size={18} />} tone="warning" label="Warnings" value={audit.counts.warning} />
            <StatCard icon={<Info size={18} />} tone="info" label="Info" value={audit.counts.info} />
            <StatCard icon={<CheckCircle2 size={18} />} tone="passed" label="Pages Passed" value={audit.counts.passed} />
          </div>

          <SeoHealthTabs audit={audit} />
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
  value: number;
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
