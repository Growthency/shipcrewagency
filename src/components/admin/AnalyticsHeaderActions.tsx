"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { RefreshCw } from "lucide-react";
import { MiniDropdown } from "./MiniDropdown";
import type { RangeKey } from "@/lib/analytics/data";

// Kept in sync with RANGES in lib/analytics/data.ts (which is server-only, so
// its runtime value can't be imported into this client component).
const RANGE_OPTIONS = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "month", label: "This Month" },
  { value: "lastmonth", label: "Last Month" },
  { value: "365d", label: "Last 365 Days" },
  { value: "lifetime", label: "Lifetime" },
];

export function AnalyticsHeaderActions({ range }: { range: RangeKey }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [clearing, setClearing] = useState(false);

  const changeRange = (v: string) => {
    startTransition(() => {
      router.push(`/admin/analytics?range=${v}`);
    });
  };

  const clearCache = async () => {
    setClearing(true);
    try {
      await fetch("/api/admin/analytics/refresh", { method: "POST" });
    } catch {
      /* ignore — refresh below still re-pulls */
    } finally {
      router.refresh();
      setTimeout(() => setClearing(false), 600);
    }
  };

  return (
    <div className="an-actions">
      <button
        type="button"
        className="an-btn-clear"
        onClick={clearCache}
        disabled={clearing}
      >
        <RefreshCw size={15} className={clearing ? "an-spin" : ""} />
        {clearing ? "Clearing…" : "Clear Cache"}
      </button>
      <div className={pending ? "an-dd-wrap is-pending" : "an-dd-wrap"}>
        <MiniDropdown
          value={range}
          options={RANGE_OPTIONS}
          onChange={changeRange}
          ariaLabel="Date range"
        />
      </div>
    </div>
  );
}
