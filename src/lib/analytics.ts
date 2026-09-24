/* ==========================================================================
   Analytics — attribution capture and conversion events.

   Deliberately dependency-free and privacy-conscious:

   • No cookies are set by this code. Attribution lives in `sessionStorage`
     and disappears when the tab closes.
   • Nothing is collected unless you configure GA/GTM (see components/
     analytics/Analytics.tsx). Without those env vars the tracking calls below
     become no-ops and no third-party script is ever loaded.
   • No personal data is placed in event payloads — only campaign labels and
     the name of the action.

   All functions are safe to call on the server: they no-op without `window`.
   ========================================================================== */

export interface Attribution {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  content: string | null;
  term: string | null;
  /** Entry path (with query string) of the first page in this session. */
  landingPage: string | null;
  /** External referrer, if the visitor arrived from somewhere else. */
  referrer: string | null;
}

const STORAGE_KEY = "uad:attribution";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function emptyAttribution(): Attribution {
  return {
    source: null,
    medium: null,
    campaign: null,
    content: null,
    term: null,
    landingPage: null,
    referrer: null,
  };
}

function clean(value: string | null | undefined, maxLength = 180) {
  if (!value) return null;
  const trimmed = value.trim().slice(0, maxLength);
  return trimmed.length > 0 ? trimmed : null;
}

function readStored(): Attribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Attribution>;
    return { ...emptyAttribution(), ...parsed };
  } catch {
    return null;
  }
}

/**
 * Records how this visitor arrived. Call once per page load.
 *
 * First touch wins: if a campaign was already captured in this session, later
 * internal navigation does not overwrite it. This is the attribution model
 * that matches how the lead is later reported in the CRM.
 */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  try {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const existing = readStored();

    const incoming: Attribution = {
      source: clean(params.get("utm_source")),
      medium: clean(params.get("utm_medium")),
      campaign: clean(params.get("utm_campaign")),
      content: clean(params.get("utm_content")),
      term: clean(params.get("utm_term")),
      landingPage: clean(`${url.pathname}${url.search}`, 300),
      referrer: clean(document.referrer, 300),
    };

    // Once we have a campaign source, keep it for the rest of the session.
    const merged: Attribution =
      existing && (existing.source || existing.campaign)
        ? {
            ...incoming,
            source: existing.source ?? incoming.source,
            medium: existing.medium ?? incoming.medium,
            campaign: existing.campaign ?? incoming.campaign,
            content: existing.content ?? incoming.content,
            term: existing.term ?? incoming.term,
            landingPage: existing.landingPage ?? incoming.landingPage,
            referrer: existing.referrer ?? incoming.referrer,
          }
        : incoming;

    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // Storage can be unavailable (private mode, blocked cookies). Attribution
    // is a nice-to-have; never break the page over it.
  }
}

/** Reads the attribution captured for this session, if any. */
export function getAttribution(): Attribution {
  return readStored() ?? emptyAttribution();
}

/* ==========================================================================
   Event tracking
   ========================================================================== */

type EventName =
  | "cta_click"
  | "lead_submitted"
  | "lead_failed"
  | "case_study_viewed"
  | "service_viewed"
  | "outbound_click";

/** Pushes an event to GTM/GA if either is configured. Otherwise no-op. */
export function track(name: EventName, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;

  const payload = { event: name, ...params };

  try {
    window.dataLayer?.push(payload);
    window.gtag?.("event", name, params);
  } catch {
    // Never let analytics break a user interaction.
  }
}
