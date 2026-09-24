import {
  Brain,
  Globe,
  Rocket,
  Server,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIconKey } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Single place where service icon keys become components. */
const serviceIcons: Record<ServiceIconKey, LucideIcon> = {
  ai: Brain,
  web: Globe,
  backend: Server,
  automation: Workflow,
  product: Rocket,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: ServiceIconKey;
  className?: string;
}) {
  const Icon = serviceIcons[name];

  return (
    <span
      className={cn(
        "relative grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-accent edge-light transition-colors duration-300 group-hover:border-accent/30 group-hover:bg-accent/[0.08] group-hover:text-accent-bright",
        className,
      )}
    >
      <Icon className="size-5" aria-hidden="true" strokeWidth={1.6} />
    </span>
  );
}
