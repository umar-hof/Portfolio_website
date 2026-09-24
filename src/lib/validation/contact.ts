import { z } from "zod";

/* ==========================================================================
   Contact form contract — shared by the browser and the server.

   The client uses it for instant field-level feedback; the route handler
   re-validates the same schema server-side, because client validation is a
   convenience and never a security boundary.

   No `.transform()` is used anywhere in this schema, so `z.input` and
   `z.output` are identical and the form types stay simple.
   ========================================================================== */

export const projectTypeOptions = [
  { value: "ai-development", label: "AI Development" },
  { value: "web-development", label: "Web Development" },
  { value: "backend", label: "Backend & APIs" },
  { value: "automation", label: "Automation" },
  { value: "full-product", label: "Full Product (idea to launch)" },
  { value: "other", label: "Something else" },
] as const;

export const budgetOptions = [
  { value: "not-sure", label: "Not sure yet" },
  { value: "under-1k", label: "Under $1,000" },
  { value: "1k-5k", label: "$1,000 – $5,000" },
  { value: "5k-15k", label: "$5,000 – $15,000" },
  { value: "15k-50k", label: "$15,000 – $50,000" },
  { value: "50k-plus", label: "$50,000+" },
] as const;

export const timelineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-month", label: "Within a month" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "3-plus-months", label: "3+ months" },
  { value: "flexible", label: "Flexible / still exploring" },
] as const;

// Typed as string[] so `.includes(value)` accepts an arbitrary string.
const projectTypeValues: string[] = projectTypeOptions.map((option) => option.value);
const budgetValues: string[] = budgetOptions.map((option) => option.value);
const timelineValues: string[] = timelineOptions.map((option) => option.value);

const optionalText = (max: number) =>
  z.string().trim().max(max, `Please keep this under ${max} characters.`).optional();

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(120, "Please keep your name under 120 characters."),

  email: z
    .email("Please enter a valid email address.")
    .max(200, "Please keep your email under 200 characters."),

  company: optionalText(160),

  projectType: z
    .string()
    .trim()
    .min(1, "Please choose a project type.")
    .refine((value) => projectTypeValues.includes(value), {
      message: "Please choose a valid project type.",
    }),

  // Selects submit "" when untouched, which is a valid "not specified" value.
  budget: z
    .string()
    .trim()
    .max(80)
    .optional()
    .refine((value) => !value || budgetValues.includes(value), {
      message: "Please choose a valid budget range.",
    }),

  timeline: z
    .string()
    .trim()
    .max(80)
    .optional()
    .refine((value) => !value || timelineValues.includes(value), {
      message: "Please choose a valid timeline.",
    }),

  message: z
    .string()
    .trim()
    .min(20, "Please describe your project in at least 20 characters.")
    .max(5000, "Please keep your description under 5,000 characters."),
});

export type ContactFormValues = z.input<typeof contactFormSchema>;

/* --------------------------------------------------------------------------
   Attribution attached to a submission (see lib/analytics.ts).
   -------------------------------------------------------------------------- */

export const attributionSchema = z.object({
  source: z.string().max(200).nullish(),
  medium: z.string().max(200).nullish(),
  campaign: z.string().max(200).nullish(),
  content: z.string().max(200).nullish(),
  term: z.string().max(200).nullish(),
  landingPage: z.string().max(500).nullish(),
  referrer: z.string().max(500).nullish(),
});

export const contactRequestSchema = contactFormSchema.extend({
  attribution: attributionSchema.optional(),
  /** Hidden field — real people never fill this in. */
  honeypot: z.string().max(200).optional(),
  /** Milliseconds between form mount and submit. Bots submit instantly. */
  elapsedMs: z.number().int().nonnegative().max(86_400_000).optional(),
});

export type ContactRequest = z.input<typeof contactRequestSchema>;

/* --------------------------------------------------------------------------
   Helpers
   -------------------------------------------------------------------------- */

/**
 * Flattens Zod issues into `{ field: message }` for the UI.
 * Only the first issue per field is surfaced — enough to guide the user
 * without shouting at them.
 */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {};

  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (key && !(key in result)) {
      result[key] = issue.message;
    }
  }

  return result;
}

/**
 * Strips control characters and collapses runs of whitespace.
 * Defence in depth for stored text: the UI never renders lead content back,
 * but stored data should still be clean.
 */
export function sanitizeText(value: string) {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\s{3,}/g, "  ")
    .trim();
}
