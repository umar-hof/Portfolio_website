import Link from "next/link";
import { Mail } from "lucide-react";
import { brandIcons } from "@/components/icons/brand";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import {
  contactChannels,
  cta,
  footerNav,
  footerServiceNav,
  site,
} from "@/lib/data/site";

/**
 * Site footer.
 *
 * Carries the closing CTA, the secondary navigation and the only place the
 * contact channels appear in full. Channels with no configured value render a
 * marked placeholder rather than a dead link, so nothing false is published.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const channels = contactChannels.filter((channel) => channel.href !== null);
  const missingChannels = contactChannels.filter((channel) => channel.href === null);

  return (
    <footer className="relative border-t border-white/8 bg-ink-950/60">
      {/* Closing call to action. */}
      <Container>
        <div className="flex flex-col gap-6 border-b border-white/6 py-14 sm:flex-row sm:items-center sm:justify-between sm:py-16">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              Have an idea? Let&apos;s build it.
            </h2>
            <p className="mt-2 max-w-md text-sm text-fg-muted">
              Tell me what you&apos;re trying to build and I&apos;ll tell you what it
              takes.
            </p>
          </div>

          <Button
            href={cta.primary.href}
            size="lg"
            ctaEvent="footer_cta"
            className="shrink-0 self-start sm:self-auto"
          >
            {cta.primary.label}
          </Button>
        </div>
      </Container>

      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="Home" className="inline-block">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
              {site.role}. I build web applications, backend systems, AI-powered
              products and automation.
            </p>
          </div>

          {/* Site */}
          <nav aria-label="Footer">
            <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-fg-subtle">
              Navigate
            </h2>
            <ul className="mt-4 space-y-2.5">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services">
            <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-fg-subtle">
              Services
            </h2>
            <ul className="mt-4 space-y-2.5">
              {footerServiceNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-fg-subtle">
              Contact
            </h2>

            {channels.length > 0 ? (
              <ul className="mt-4 space-y-2.5">
                {channels.map((channel) => {
                  const Icon = brandIcons[channel.key];
                  return (
                    <li key={channel.key}>
                      <a
                        href={channel.href ?? undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2.5 text-sm text-fg-muted transition-colors hover:text-fg"
                      >
                        {Icon ? (
                          <Icon className="size-4 shrink-0 text-fg-subtle transition-colors group-hover:text-accent" />
                        ) : (
                          <Mail className="size-4 shrink-0 text-fg-subtle" aria-hidden="true" />
                        )}
                        <span className="truncate">{channel.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="mt-4 space-y-2">
                {missingChannels.map((channel) => (
                  <Placeholder
                    key={channel.key}
                    label={`${channel.label} required`}
                    size="sm"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>

      <Container>
        <div className="flex flex-col gap-3 border-t border-white/6 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fg-subtle">
            © {year} {site.brand}
          </p>
          <p className="text-xs text-fg-subtle">{site.role}</p>
        </div>
      </Container>
    </footer>
  );
}
