import {
  AlignLeft,
  ArrowUpRight,
  ChevronDown,
  CircleDot,
  Link2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { SPOTLIGHT, type PropertyType } from "@/components/how-it-works-data";
import { ROLES } from "@/components/pipeline-board-data";

/**
 * The hero illustration: one Notion record, after a run scored it.
 *
 * This is a *database record page*, which is a third Notion surface and
 * deliberately not either of the other two — NotionConfig is a document
 * of prose and settings, PipelineBoard is the table. Hero, board, config
 * are one record, all the records, and the rules. Property rows with
 * type icons and Select/Status chips are what makes a record page read
 * as a record page rather than as a card someone drew.
 *
 * Faithful to plugins/hired/skills/score-roles/SKILL.md, which meant
 * leaving out the things the scorecard idiom expects and a real run
 * never emits:
 *
 *  - No number. Scoring writes a tier — Very High, High, Medium, Low,
 *    Very Low — chosen against the user's own tier definitions. There is
 *    no 8.4-out-of-10 anywhere in the plugin, and no per-dimension
 *    sub-score to draw a bar from. The property table is the scannable
 *    grid instead, and every row in it is a real canonical field.
 *  - No weights. The rubric names signals, not percentages.
 *  - The summary is one paragraph, because step 3 writes two to four
 *    sentences of prose under a `## Score Summary` heading. It is the
 *    only thing appended to the page body.
 *  - The green page icon is the one score-roles sets for a High record
 *    (`document_green.svg`), which is why green carries the tier here
 *    and nowhere else on the card.
 */

const ROLE = ROLES.find((r) => r.id === SPOTLIGHT.roleId)!;

/** Notion draws a small type glyph beside every property name. */
const TYPE_ICON: Record<PropertyType, React.ComponentType<{ className?: string }>> = {
  relation: ArrowUpRight,
  select: ChevronDown,
  status: CircleDot,
  text: AlignLeft,
  url: Link2,
};

const CHIP_VARIANT = {
  fit: "solid",
  status: "line",
  neutral: "outline",
} as const;

/** The Notion page icon score-roles sets for a High record. */
function PageIcon() {
  return (
    <span
      aria-hidden
      className="flex size-9 items-center justify-center rounded-md border border-primary-line bg-primary-surface"
    >
      <svg
        viewBox="0 0 16 16"
        className="size-[18px] text-primary-surface-foreground"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9.5 1.5H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5z" />
        <path d="M9.5 1.5V5H13" />
      </svg>
    </span>
  );
}

export function ScoreCard() {
  return (
    <figure className="w-full">
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2 sm:px-5">
          <span className="truncate font-mono text-micro text-muted-foreground">
            Job Search <span className="text-muted-foreground/50">/</span> Job
            Pipeline
          </span>
          <span className="shrink-0 font-mono text-micro text-muted-foreground">
            added by hired · {SPOTLIGHT.writtenAt}
          </span>
        </div>

        <div className="px-4 pb-5 pt-5 sm:px-6">
          <PageIcon />
          <h2 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
            {ROLE.title}
          </h2>

          <dl className="mt-4 border-y border-border py-1.5">
            {SPOTLIGHT.properties.map((p) => {
              const Icon = TYPE_ICON[p.type];
              return (
                <div key={p.label} className="flex items-center gap-3 py-1">
                  <dt className="flex w-[8.5rem] shrink-0 items-center gap-1.5 text-meta text-muted-foreground">
                    <Icon className="size-3.5 shrink-0 text-muted-foreground/60" />
                    {p.label}
                  </dt>
                  <dd className="min-w-0 truncate text-meta text-foreground">
                    {p.chip ? (
                      <Badge variant={CHIP_VARIANT[p.chip]} size="sm">
                        {p.value}
                      </Badge>
                    ) : p.type === "url" ? (
                      <span className="font-mono text-micro text-muted-foreground">
                        {p.value}
                      </span>
                    ) : (
                      p.value
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>

          <h3 className="mt-5 text-sm font-semibold tracking-tight">
            Score Summary
          </h3>
          <p className="mt-1.5 text-meta leading-relaxed text-muted-foreground">
            {SPOTLIGHT.summary}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-border px-4 py-2 font-mono text-micro text-muted-foreground sm:px-5">
          <span>fit_score → {SPOTLIGHT.tier}</span>
          <span>score-roles</span>
        </div>
      </div>
    </figure>
  );
}
