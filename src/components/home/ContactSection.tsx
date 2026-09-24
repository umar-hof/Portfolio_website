import { Mail } from "lucide-react";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import { brandIcons } from "@/components/icons/brand";
import { ContactForm } from "@/components/shared/ContactForm";
import { Placeholder } from "@/components/ui/Placeholder";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactChannels } from "@/lib/data/site";

/**
 * Contact / lead generation.
 *
 * The conversion target for every CTA on the site. The left column removes
 * friction (what happens next, how else to reach me); the right column is the
 * form. Both are needed — some visitors want to write, others want to see a
 * human address first.
 */

const nextSteps = [
  { step: "01", text: "You send the details of what you're building." },
  { step: "02", text: "I review it and reply with questions or a proposed plan." },
  { step: "03", text: "We agree scope, milestones and cost — then work begins." },
];

export function ContactSection({
  id = "contact",
  heading = "Have a project in mind?",
  intro = "Tell me what you're trying to build. The more context you give me, the more useful my reply will be — and there's no obligation on either side.",
  breadcrumb,
  headingAs = "h2",
}: {
  id?: string;
  heading?: string;
  intro?: string;
  /** Rendered above the heading when this section is a page's primary content. */
  breadcrumb?: Crumb[];
  /**
   * Heading level. Use "h1" when this section is a page's main content (for
   * example on /contact); "h2" when it is one section among many.
   */
  headingAs?: "h1" | "h2";
}) {
  const channels = contactChannels.filter((channel) => channel.href !== null);
  const missing = contactChannels.filter((channel) => channel.href === null);

  return (
    <Section id={id} divided={!breadcrumb}>
      {breadcrumb && breadcrumb.length > 0 ? (
        <Breadcrumbs trail={breadcrumb} />
      ) : null}

      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        {/* Context */}
        <div>
          <SectionHeading
            as={headingAs}
            eyebrow="Contact"
            title={heading}
            description={intro}
          />

          {/* What happens next */}
          <Reveal delay={0.06}>
            <ol className="mt-10 flex flex-col gap-4">
              {nextSteps.map((item) => (
                <li key={item.step} className="flex gap-3.5">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-accent/25 bg-accent/[0.07] font-mono text-[0.6rem] text-accent">
                    {item.step}
                  </span>
                  <p className="text-sm leading-relaxed text-fg-muted">
                    {item.text}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* Alternative routes in */}
          <Reveal delay={0.12}>
            <div className="mt-10 border-t border-white/6 pt-8">
              <h3 className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-fg-subtle">
                Prefer another way?
              </h3>

              {channels.length > 0 ? (
                <ul className="mt-4 flex flex-col gap-3">
                  {channels.map((channel) => {
                    const Icon = brandIcons[channel.key];

                    return (
                      <li key={channel.key}>
                        <a
                          href={channel.href ?? undefined}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cta={`contact_channel_${channel.key}`}
                          className="group inline-flex items-center gap-3 text-sm text-fg-muted transition-colors hover:text-fg"
                        >
                          <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-fg-subtle transition-colors group-hover:border-accent/30 group-hover:text-accent">
                            {Icon ? (
                              <Icon className="size-4" />
                            ) : (
                              <Mail className="size-4" aria-hidden="true" />
                            )}
                          </span>
                          <span className="flex flex-col">
                            <span className="text-xs text-fg-subtle">
                              {channel.label}
                            </span>
                            <span className="text-fg-muted group-hover:text-fg">
                              {channel.value}
                            </span>
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="mt-4 flex flex-wrap gap-2">
                  {missing.map((channel) => (
                    <Placeholder
                      key={channel.key}
                      label={`${channel.label} required`}
                      size="sm"
                    />
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal delay={0.08} y={12}>
          <div className="rounded-2xl border border-white/8 bg-ink-900/50 p-5 edge-light sm:p-7">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
