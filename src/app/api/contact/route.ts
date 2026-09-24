import { NextResponse } from "next/server";
import { z } from "zod";
import { storeLead, type LeadRecord } from "@/lib/supabase/server";
import {
  contactRequestSchema,
  fieldErrors,
  sanitizeText,
} from "@/lib/validation/contact";

/* ==========================================================================
   POST /api/contact — lead intake.

   Layered defence, cheapest checks first:

     1. Body size cap        — refuse oversized payloads before parsing.
     2. Schema validation    — the same Zod contract the browser uses.
     3. Honeypot             — a field only a bot would fill in.
     4. Minimum fill time    — humans do not complete this form in <1.5s.
     5. Per-IP rate limit    — sliding window, in-memory.

   On (3) and (4) the request is answered with success and dropped silently:
   telling a bot it was detected only teaches it to try harder.
   ========================================================================== */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MIN_FILL_TIME_MS = 1500;

/**
 * In-memory sliding window.
 *
 * NOTE: this is per server instance. On a single long-running Node server it is
 * exact; on horizontally scaled or serverless deployments each instance keeps
 * its own window. It is a spam speed bump layered on top of the honeypot and
 * timing checks, not a distributed quota — move it to a shared store (Upstash
 * Redis, Supabase table) if you need a hard global limit.
 */
const submissions = new Map<string, number[]>();

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0];
    if (first) return first.trim();
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;

  // Opportunistic cleanup so the map cannot grow without bound.
  if (submissions.size > 5000) {
    for (const [entryKey, timestamps] of submissions) {
      if (timestamps.every((time) => time < cutoff)) submissions.delete(entryKey);
    }
  }

  const recent = (submissions.get(key) ?? []).filter((time) => time > cutoff);

  if (recent.length >= RATE_LIMIT_MAX) {
    submissions.set(key, recent);
    return true;
  }

  recent.push(now);
  submissions.set(key, recent);
  return false;
}

function jsonError(message: string, status: number, errors?: Record<string, string>) {
  return NextResponse.json({ ok: false, error: message, fieldErrors: errors }, { status });
}

export async function POST(request: Request) {
  // 1. Size guard — reject before doing any parsing work.
  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (declaredLength > MAX_BODY_BYTES) {
    return jsonError("That submission is too large. Please shorten your message.", 413);
  }

  let raw: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) {
      return jsonError("That submission is too large. Please shorten your message.", 413);
    }
    raw = JSON.parse(text);
  } catch {
    return jsonError("We could not read that request. Please try again.", 400);
  }

  // 2. Validation.
  const parsed = contactRequestSchema.safeParse(raw);
  if (!parsed.success) {
    return jsonError(
      "Please check the highlighted fields and try again.",
      422,
      fieldErrors(parsed.error as z.ZodError),
    );
  }

  const data = parsed.data;

  // 3. Honeypot — silently accept and discard.
  if (data.honeypot && data.honeypot.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  // 4. Timing — an instant submission is not a human.
  if (typeof data.elapsedMs === "number" && data.elapsedMs < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: true });
  }

  // 5. Rate limit.
  if (isRateLimited(clientKey(request))) {
    return jsonError(
      "Too many requests. Please wait a few minutes, or email me directly.",
      429,
    );
  }

  const attribution = data.attribution;

  const record: LeadRecord = {
    name: sanitizeText(data.name),
    email: sanitizeText(data.email).toLowerCase(),
    company: data.company ? sanitizeText(data.company) : null,
    project_type: data.projectType,
    budget: data.budget ? sanitizeText(data.budget) : null,
    timeline: data.timeline ? sanitizeText(data.timeline) : null,
    message: sanitizeText(data.message),
    source: attribution?.source ?? null,
    medium: attribution?.medium ?? null,
    campaign: attribution?.campaign ?? null,
    content: attribution?.content ?? null,
    term: attribution?.term ?? null,
    landing_page: attribution?.landingPage ?? null,
    referrer: attribution?.referrer ?? null,
  };

  const stored = await storeLead(record);

  if (!stored.ok) {
    return jsonError(
      "Something went wrong on my end. Please try again, or contact me directly.",
      500,
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

/** Explicitly reject other verbs so the endpoint has one clear contract. */
export function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
