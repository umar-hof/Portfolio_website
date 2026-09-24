"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ChevronDown, Loader2, Send, TriangleAlert } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { getAttribution, track } from "@/lib/analytics";
import {
  budgetOptions,
  contactFormSchema,
  projectTypeOptions,
  timelineOptions,
  type ContactFormValues,
} from "@/lib/validation/contact";
import { cn, nowMs } from "@/lib/utils";

/* ==========================================================================
   Contact form.

   react-hook-form for state, the shared Zod schema for validation. The server
   re-validates everything, so this layer exists purely to give fast, specific
   feedback rather than to enforce anything.
   ========================================================================== */

const fieldBase =
  "w-full rounded-lg border bg-ink-850/70 px-3.5 text-sm text-fg transition-colors placeholder:text-fg-subtle hover:border-white/16 focus:border-accent/60 disabled:opacity-60";

const fieldIdle = "border-white/10";
const fieldInvalid = "border-red-500/60";

function Field({
  label,
  htmlFor,
  error,
  hint,
  required = false,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-fg">
        {label}
        {required ? (
          <span className="ml-1 text-accent" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 text-xs font-normal text-fg-subtle">optional</span>
        )}
      </label>

      {children}

      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="text-xs text-red-400">
          {error}
        </p>
      ) : hint ? (
        <p id={`${htmlFor}-hint`} className="text-xs text-fg-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  // When the visitor first touched the form. Used together with the honeypot to
  // discard submissions completed faster than a human could type them.
  //
  // Stays 0 when no interaction was ever observed (browser autofill, for
  // example). In that case no timing hint is sent at all, because silently
  // dropping a real enquiry is far worse than letting a bot through a check
  // that the honeypot and rate limiter also cover.
  const [interactionStartedAt, setInteractionStartedAt] = useState(0);

  const markInteraction = () => {
    if (interactionStartedAt === 0) setInteractionStartedAt(nowMs());
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: "",
      budget: "",
      timeline: "",
      message: "",
    },
  });

  const onSubmit = handleSubmit(async (values, event) => {
    setStatus("submitting");
    setServerError(null);

    // The honeypot is intentionally not a controlled field: it must accept
    // whatever a bot writes, so it is read straight off the submitted form.
    const form = event?.target;
    const honeypot =
      form instanceof HTMLFormElement
        ? (form.elements.namedItem("website") as HTMLInputElement | null)?.value ?? ""
        : "";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          honeypot,
          elapsedMs:
            interactionStartedAt > 0 ? nowMs() - interactionStartedAt : undefined,
          attribution: getAttribution(),
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!response.ok || !result?.ok) {
        setStatus("error");
        setServerError(
          result?.error ??
            "Something went wrong. Please try again or contact me directly.",
        );
        track("lead_failed", { status: response.status });
        return;
      }

      track("lead_submitted", {
        project_type: values.projectType,
        budget: values.budget || undefined,
        timeline: values.timeline || undefined,
      });

      setSubmittedEmail(values.email);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setServerError(
        "Could not reach the server. Please check your connection and try again.",
      );
      track("lead_failed", { status: "network" });
    }
  });

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center gap-4 rounded-2xl border border-accent/25 bg-accent/[0.05] px-6 py-12 text-center"
        role="status"
      >
        <span className="grid size-12 place-items-center rounded-full border border-accent/30 bg-accent/10 text-accent">
          <CheckCircle2 className="size-6" aria-hidden="true" />
        </span>

        <h3 className="text-xl font-semibold tracking-tight text-fg">
          Thanks! Your project request has been received.
        </h3>

        <p className="max-w-md text-sm leading-relaxed text-fg-muted">
          {submittedEmail
            ? `I'll review the details and reply to ${submittedEmail} by email.`
            : "I'll review the details and reply by email."}
        </p>

        <Button
          variant="secondary"
          size="sm"
          className="mt-2"
          onClick={() => {
            setStatus("idle");
            setServerError(null);
            setInteractionStartedAt(0);
          }}
        >
          Send another request
        </Button>
      </div>
    );
  }

  const busy = status === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="flex flex-col gap-5"
      // Both bubble from any field inside the form, so the first real
      // interaction with any input records the start of human activity.
      onFocusCapture={markInteraction}
      onChange={markInteraction}
    >
      {/* Honeypot: hidden from people, irresistible to naive bots. */}
      <div
        className="pointer-events-none absolute left-[-9999px] top-0 h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" required error={errors.name?.message}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(fieldBase, "h-11", errors.name ? fieldInvalid : fieldIdle)}
            {...register("name")}
          />
        </Field>

        <Field label="Email" htmlFor="email" required error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(fieldBase, "h-11", errors.email ? fieldInvalid : fieldIdle)}
            {...register("email")}
          />
        </Field>
      </div>

      <Field
        label="Company / Business"
        htmlFor="company"
        error={errors.company?.message}
      >
        <input
          id="company"
          type="text"
          autoComplete="organization"
          placeholder="Company name"
          aria-invalid={Boolean(errors.company)}
          className={cn(fieldBase, "h-11", errors.company ? fieldInvalid : fieldIdle)}
          {...register("company")}
        />
      </Field>

      <Field
        label="Project type"
        htmlFor="projectType"
        required
        error={errors.projectType?.message}
      >
        <div className="relative">
          <select
            id="projectType"
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={errors.projectType ? "projectType-error" : undefined}
            className={cn(
              fieldBase,
              "h-11 appearance-none pr-10",
              errors.projectType ? fieldInvalid : fieldIdle,
            )}
            {...register("projectType")}
          >
            <option value="">Select a project type</option>
            {projectTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-fg-subtle"
            aria-hidden="true"
          />
        </div>
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Budget range" htmlFor="budget" error={errors.budget?.message}>
          <div className="relative">
            <select
              id="budget"
              className={cn(
                fieldBase,
                "h-11 appearance-none pr-10",
                errors.budget ? fieldInvalid : fieldIdle,
              )}
              aria-invalid={Boolean(errors.budget)}
              {...register("budget")}
            >
              <option value="">Prefer not to say</option>
              {budgetOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-fg-subtle"
              aria-hidden="true"
            />
          </div>
        </Field>

        <Field label="Timeline" htmlFor="timeline" error={errors.timeline?.message}>
          <div className="relative">
            <select
              id="timeline"
              className={cn(
                fieldBase,
                "h-11 appearance-none pr-10",
                errors.timeline ? fieldInvalid : fieldIdle,
              )}
              aria-invalid={Boolean(errors.timeline)}
              {...register("timeline")}
            >
              <option value="">Not decided yet</option>
              {timelineOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-fg-subtle"
              aria-hidden="true"
            />
          </div>
        </Field>
      </div>

      <Field
        label="Project description"
        htmlFor="message"
        required
        hint="How can I help you? What are you building, and what problem should it solve?"
        error={errors.message?.message}
      >
        <textarea
          id="message"
          rows={6}
          placeholder="Tell me about your project…"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : "message-hint"}
          className={cn(
            fieldBase,
            "resize-y py-3 leading-relaxed",
            errors.message ? fieldInvalid : fieldIdle,
          )}
          {...register("message")}
        />
      </Field>

      {serverError ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/[0.07] px-4 py-3"
        >
          <TriangleAlert
            className="mt-0.5 size-4 shrink-0 text-red-400"
            aria-hidden="true"
          />
          <p className="text-sm text-red-200/90">{serverError}</p>
        </div>
      ) : null}

      <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          size="lg"
          disabled={busy}
          ctaEvent="contact_submit"
          className="w-full sm:w-auto"
        >
          {busy ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Sending your request…
            </>
          ) : (
            <>
              Send project request
              <Send
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </>
          )}
        </Button>

        <p className="text-xs leading-relaxed text-fg-subtle sm:max-w-xs sm:text-right">
          Your details are used only to reply to this enquiry.
        </p>
      </div>
    </form>
  );
}
