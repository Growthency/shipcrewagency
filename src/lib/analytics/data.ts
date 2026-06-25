import "server-only";
import { unstable_cache } from "next/cache";
import {
  ga4RunReport,
  gscQuery,
  hasGaConfig,
  hasGscConfig,
  type GaRow,
} from "./google";

export const ANALYTICS_TAG = "analytics";

// Selectable date windows for the top tables / search data. Stat cards stay
// fixed (30d / 7d / today) and the daily chart stays the last 30 days.
export const RANGES = [
  { key: "7d", label: "Last 7 Days" },
  { key: "30d", label: "Last 30 Days" },
  { key: "month", label: "This Month" },
  { key: "lastmonth", label: "Last Month" },
  { key: "365d", label: "Last 365 Days" },
  { key: "lifetime", label: "Lifetime" },
] as const;
export type RangeKey = (typeof RANGES)[number]["key"];

export function normalizeRange(input: unknown): RangeKey {
  return RANGES.some((r) => r.key === input) ? (input as RangeKey) : "30d";
}
export function rangeLabel(key: RangeKey): string {
  return RANGES.find((r) => r.key === key)?.label ?? "Last 30 Days";
}

function fmtDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}
function daysAgo(n: number): Date {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d;
}
/** GA date window (YYYY-MM-DD) for a range. */
function rangeDates(key: RangeKey): { startDate: string; endDate: string } {
  const today = new Date();
  const end = fmtDate(today);
  switch (key) {
    case "7d":
      return { startDate: fmtDate(daysAgo(6)), endDate: end };
    case "365d":
      return { startDate: fmtDate(daysAgo(364)), endDate: end };
    case "month":
      return {
        startDate: fmtDate(
          new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1)),
        ),
        endDate: end,
      };
    case "lastmonth":
      return {
        startDate: fmtDate(
          new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - 1, 1)),
        ),
        endDate: fmtDate(
          new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 0)),
        ),
      };
    case "lifetime":
      return { startDate: "2018-01-01", endDate: end };
    case "30d":
    default:
      return { startDate: fmtDate(daysAgo(29)), endDate: end };
  }
}
/** Search Console window — data lags ~2 days and only ~16 months are kept. */
function gscDates(key: RangeKey): { startDate: string; endDate: string } {
  const r = rangeDates(key);
  const lagEnd = fmtDate(daysAgo(2));
  const earliest = fmtDate(daysAgo(485));
  return {
    startDate: r.startDate > earliest ? r.startDate : earliest,
    endDate: r.endDate < lagEnd ? r.endDate : lagEnd,
  };
}

export type Overview = {
  users30: number;
  users7: number;
  usersToday: number;
  newUsers30: number;
  sessions30: number;
  pageViews30: number;
  activeTotal: number;
};

export type DailyPoint = { date: string; users: number };
export type DailyClick = { date: string; clicks: number };
export type PageRow = { path: string; views: number };
export type CountryRow = { country: string; users: number };
export type KeywordRow = {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};
export type SearchPageRow = {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export type AnalyticsDashboard = {
  ga: boolean;
  gsc: boolean;
  gaError: string | null;
  gscError: string | null;
  range: RangeKey;
  overview: Overview | null;
  daily: DailyPoint[];
  dailyClicks: DailyClick[];
  topPages: PageRow[];
  topCountries: CountryRow[];
  keywords: KeywordRow[];
  searchPages: SearchPageRow[];
};

function num(v: string | undefined): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}
function metric(rows: GaRow[]): string[] {
  return rows[0]?.metricValues?.map((m) => m.value) ?? [];
}

async function rangeTotals(start: string): Promise<number[]> {
  const r = await ga4RunReport({
    metrics: [
      { name: "activeUsers" },
      { name: "newUsers" },
      { name: "sessions" },
      { name: "screenPageViews" },
    ],
    dateRanges: [{ startDate: start, endDate: "today" }],
  });
  return metric(r.rows).map(num);
}

async function loadGa(range: RangeKey): Promise<{
  overview: Overview | null;
  daily: DailyPoint[];
  topPages: PageRow[];
  topCountries: CountryRow[];
  error: string | null;
}> {
  if (!hasGaConfig())
    return { overview: null, daily: [], topPages: [], topCountries: [], error: null };
  try {
    const rd = rangeDates(range);
    const [t30, t7, tToday, dailyRep, pagesRep, countriesRep] =
      await Promise.all([
        rangeTotals("30daysAgo"),
        rangeTotals("7daysAgo"),
        rangeTotals("today"),
        ga4RunReport({
          dimensions: [{ name: "date" }],
          metrics: [{ name: "activeUsers" }],
          dateRanges: [{ startDate: "29daysAgo", endDate: "today" }],
          orderBys: [{ dimension: { dimensionName: "date" } }],
        }),
        ga4RunReport({
          dimensions: [{ name: "pagePath" }],
          metrics: [{ name: "screenPageViews" }],
          dateRanges: [rd],
          orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
          limit: 25,
        }),
        ga4RunReport({
          dimensions: [{ name: "country" }],
          metrics: [{ name: "activeUsers" }],
          dateRanges: [rd],
          orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
          limit: 25,
        }),
      ]);

    const overview: Overview = {
      users30: t30[0] ?? 0,
      users7: t7[0] ?? 0,
      usersToday: tToday[0] ?? 0,
      newUsers30: t30[1] ?? 0,
      sessions30: t30[2] ?? 0,
      pageViews30: t30[3] ?? 0,
      activeTotal: t30[0] ?? 0,
    };

    const daily: DailyPoint[] = dailyRep.rows.map((r) => {
      const d = r.dimensionValues?.[0]?.value ?? "";
      const date =
        d.length === 8 ? `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}` : d;
      return { date, users: num(r.metricValues?.[0]?.value) };
    });

    const topPages: PageRow[] = pagesRep.rows.map((r) => ({
      path: r.dimensionValues?.[0]?.value ?? "/",
      views: num(r.metricValues?.[0]?.value),
    }));
    const topCountries: CountryRow[] = countriesRep.rows.map((r) => ({
      country: r.dimensionValues?.[0]?.value ?? "—",
      users: num(r.metricValues?.[0]?.value),
    }));

    return { overview, daily, topPages, topCountries, error: null };
  } catch (e) {
    return {
      overview: null,
      daily: [],
      topPages: [],
      topCountries: [],
      error: e instanceof Error ? e.message : "GA4 request failed",
    };
  }
}

async function loadGsc(range: RangeKey): Promise<{
  keywords: KeywordRow[];
  searchPages: SearchPageRow[];
  dailyClicks: DailyClick[];
  error: string | null;
}> {
  if (!hasGscConfig())
    return { keywords: [], searchPages: [], dailyClicks: [], error: null };
  try {
    const { startDate, endDate } = gscDates(range);
    const dailyStart = fmtDate(daysAgo(30));
    const dailyEnd = fmtDate(daysAgo(2));
    const [kw, pg, daily] = await Promise.all([
      gscQuery({ startDate, endDate, dimensions: ["query"], rowLimit: 25 }),
      gscQuery({ startDate, endDate, dimensions: ["page"], rowLimit: 25 }),
      gscQuery({
        startDate: dailyStart,
        endDate: dailyEnd,
        dimensions: ["date"],
        rowLimit: 100,
      }),
    ]);
    return {
      keywords: kw.map((r) => ({
        query: r.keys?.[0] ?? "—",
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: r.ctr,
        position: r.position,
      })),
      searchPages: pg.map((r) => ({
        page: r.keys?.[0] ?? "—",
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: r.ctr,
        position: r.position,
      })),
      dailyClicks: daily
        .map((r) => ({ date: r.keys?.[0] ?? "", clicks: r.clicks }))
        .filter((r) => r.date)
        .sort((a, b) => a.date.localeCompare(b.date)),
      error: null,
    };
  } catch (e) {
    return {
      keywords: [],
      searchPages: [],
      dailyClicks: [],
      error: e instanceof Error ? e.message : "Search Console request failed",
    };
  }
}

async function loadDashboard(range: RangeKey): Promise<AnalyticsDashboard> {
  const [ga, gsc] = await Promise.all([loadGa(range), loadGsc(range)]);
  return {
    ga: hasGaConfig(),
    gsc: hasGscConfig(),
    gaError: ga.error,
    gscError: gsc.error,
    range,
    overview: ga.overview,
    daily: ga.daily,
    dailyClicks: gsc.dailyClicks,
    topPages: ga.topPages,
    topCountries: ga.topCountries,
    keywords: gsc.keywords,
    searchPages: gsc.searchPages,
  };
}

// Cached 5 minutes per range; "Clear Cache" busts ANALYTICS_TAG.
export async function getAnalyticsDashboard(
  range: RangeKey = "30d",
): Promise<AnalyticsDashboard> {
  return unstable_cache(
    () => loadDashboard(range),
    ["analytics-dashboard", range],
    { tags: [ANALYTICS_TAG], revalidate: 300 },
  )();
}
