import {
  Brain,
  Code2,
  Database,
  Layers,
  Server,
  Settings2,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { TechTag } from "@/components/ui/Badge";
import { skillGroups } from "@/lib/data/skills";
import type { SkillGroup } from "@/lib/types";

const groupIcons: Record<SkillGroup["icon"], LucideIcon> = {
  code: Code2,
  layout: Layers,
  server: Server,
  brain: Brain,
  database: Database,
  mobile: Smartphone,
  tools: Settings2,
};

/** Technology stack, grouped so it can be scanned rather than decoded. */
export function TechStackGrid() {
  return (
    <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/6 sm:grid-cols-2 lg:grid-cols-3">
      {skillGroups.map((group, index) => {
        const Icon = groupIcons[group.icon];

        return (
          <Reveal
            key={group.title}
            delay={index * 0.04}
            className="bg-ink-950 p-6"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-accent">
                <Icon className="size-4" aria-hidden="true" strokeWidth={1.6} />
              </span>
              <h3 className="text-sm font-semibold tracking-tight text-fg">
                {group.title}
              </h3>
            </div>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li key={item}>
                  <TechTag label={item} />
                </li>
              ))}
            </ul>
          </Reveal>
        );
      })}
    </div>
  );
}
