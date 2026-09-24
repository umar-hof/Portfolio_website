# Content checklist — replace before launch

Nothing on this site is invented. Every fact that has not been supplied is
rendered as a visible marker such as `[PROJECT SUMMARY REQUIRED]`, so a gap can
never ship unnoticed.

To find every remaining marker:

```bash
grep -rn "REQUIRED" src/
grep -rn "placeholder" src/lib/data/
```

Everything below is in `src/lib/data/` unless stated otherwise.

---

## 1. Identity and contact details — `src/lib/data/site.ts`

Currently `null`, so the contact section and footer show marked placeholders
instead of dead links. Set `value` **and** `href` to make each one appear
automatically everywhere it is used:

| Channel  | `value` example              | `href` example                              |
| -------- | ---------------------------- | ------------------------------------------- |
| Email    | `hello@yourdomain.com`       | `mailto:hello@yourdomain.com`                |
| LinkedIn | `linkedin.com/in/your-handle`| `https://linkedin.com/in/your-handle`        |
| WhatsApp | `+44 7000 000000`            | `https://wa.me/447000000000`                 |
| GitHub   | `github.com/your-handle`     | `https://github.com/your-handle`             |

Removing a channel entirely is fine — leave it out of the array. The footer,
contact section and mobile menu all adapt to however many are present.

Also worth a look: `site.name` (currently `"Umar"`) and `site.brand`
(`"Umar_AI_Devs"`).

---

## 2. Projects — `src/lib/data/projects.ts`

Six placeholder entries. For each one:

1. Replace `title`, `summary`, `category` and `technologies`.
2. Fill every `[.. REQUIRED]` marker inside `caseStudy`:
   `problem`, `solution`, `features`, `role`, `challenges`.
3. Set `image` to a screenshot in `public/` (e.g. `/work/assistant.png`).
   While it is `null`, generated placeholder art is shown instead.
4. Set `liveUrl` / `githubUrl`, or leave them `null` — they render as markers.
5. Set `ownership` honestly: `client` | `professional` | `personal` | `practice`.
6. Set `year`.
7. Flip **`placeholder: false`** once no markers remain.

`results` is deliberately empty. Add entries only for outcomes you actually
measured — the section says "no verified outcomes measured yet" instead of
inventing a number.

Delete any entry you do not want, and adjust `order` to set the running order.
`featured` controls the homepage selection; `order` controls everything.

---

## 3. Testimonials — `src/lib/data/testimonials.ts`

The array is empty and **the entire section is hidden while it is empty**. Add a
real, attributable review and it appears automatically. Never add a review
without a real author.

---

## 4. Environment — copy `.env.example` to `.env.local`

| Variable                        | Required | Effect if unset                                      |
| ------------------------------- | -------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | **Yes**  | Canonical URLs, sitemap and OG tags fall back to localhost |
| `SUPABASE_URL` + a key          | No       | Leads are logged to the server console, not stored   |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No       | No Google Analytics, no third-party scripts          |
| `NEXT_PUBLIC_GTM_ID`            | No       | No Tag Manager (takes precedence over GA if both set) |

Without Supabase the contact form still validates and confirms normally, so it
is fully testable before a database exists.

### Setting up lead storage

1. Create a project at [supabase.com](https://supabase.com).
2. Open **SQL Editor** and run `supabase/schema.sql`.
3. Copy the project URL and either the service role key or the anon key into
   `.env.local`.

The schema grants the anon role **INSERT only** on `leads` — no read, update or
delete — so even a leaked anon key cannot expose submitted enquiries. Both keys
are server-only and are never prefixed with `NEXT_PUBLIC_`.

---

## 5. Before you deploy

- [ ] `NEXT_PUBLIC_SITE_URL` set to the real production origin.
- [ ] Every `[.. REQUIRED]` marker gone (`grep -rn "REQUIRED" src/`).
- [ ] Every project flipped to `placeholder: false`, or removed.
- [ ] Contact channels filled in, and the contact form tested end to end.
- [ ] At least one real project screenshot in `public/`.
- [ ] `npm run lint && npm run typecheck && npm run build` all pass.
