import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/* ==========================================================================
   Lead storage.

   Both credentials are server-only — neither is prefixed with NEXT_PUBLIC_,
   so neither can ever reach the browser bundle. The service role key is
   preferred; the anon key also works because supabase/schema.sql grants the
   anon role INSERT-only access to `leads` and nothing else.

   When neither is configured every function here degrades to a no-op and the
   route handler logs the lead instead, so the form stays fully testable
   before a database exists.
   ========================================================================== */

const url = process.env.SUPABASE_URL;
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_ANON_KEY;

export function isLeadStorageConfigured(): boolean {
  return Boolean(url && key);
}

let cached: SupabaseClient | null = null;

/** Returns a Supabase client, or null when storage is not configured. */
export function getLeadStore(): SupabaseClient | null {
  if (!url || !key) return null;

  if (!cached) {
    cached = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return cached;
}

export interface LeadRecord {
  name: string;
  email: string;
  company: string | null;
  project_type: string;
  budget: string | null;
  timeline: string | null;
  message: string;
  source: string | null;
  medium: string | null;
  campaign: string | null;
  content: string | null;
  term: string | null;
  landing_page: string | null;
  referrer: string | null;
}

export type LeadStoreResult =
  | { ok: true; persisted: boolean }
  | { ok: false; error: string };

/** Inserts a lead. Falls back to logging when storage is unconfigured. */
export async function storeLead(record: LeadRecord): Promise<LeadStoreResult> {
  const supabase = getLeadStore();

  if (!supabase) {
    // Intentionally not an error: the site must work before Supabase exists.
    console.info(
      "[contact] Supabase is not configured — lead captured but not persisted:",
      JSON.stringify(record, null, 2),
    );
    return { ok: true, persisted: false };
  }

  const { error } = await supabase.from("leads").insert(record);

  if (error) {
    console.error("[contact] Failed to store lead:", error.message);
    return { ok: false, error: error.message };
  }

  return { ok: true, persisted: true };
}
