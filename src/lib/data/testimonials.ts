import type { Testimonial } from "@/lib/types";

/* ==========================================================================
   TESTIMONIALS — intentionally empty.

   No client names, quotes, ratings or results are invented. The testimonials
   section is hidden entirely while this array is empty (see
   components/shared/Testimonials.tsx), so nothing false is ever published.

   Add an entry only when a real, attributable review exists — ideally with a
   `source` linking to where it was posted:

     {
       quote: "…",                       // their words, not a rewrite
       author: "Jane Doe",
       role: "Operations Director",
       company: "Acme Ltd",
       source: "https://…",              // or null if not linkable
     }

   The section appears automatically as soon as one entry is added.
   ========================================================================== */

export const testimonials: Testimonial[] = [];

export const hasTestimonials = testimonials.length > 0;
