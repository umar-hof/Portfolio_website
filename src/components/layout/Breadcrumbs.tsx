import { ChevronRight } from "lucide-react";
import Link from "next/link";

export interface Crumb {
  name: string;
  path: string;
}

/** Breadcrumb trail. Semantic list inside a labelled nav; last item is current. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-fg-subtle">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;

          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight className="size-3" aria-hidden="true" />
              ) : null}

              {isLast ? (
                <span aria-current="page" className="text-fg-muted">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.path}
                  className="transition-colors hover:text-fg"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
