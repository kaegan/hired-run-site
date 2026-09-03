import {
  AlignLeft,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  CircleDot,
  Link2,
} from "lucide-react";

import { Badge, type badgeVariants } from "@/components/ui/badge";
import {
  FIT_LABEL,
  STATUS_LABEL,
  type BoardRole,
  type FitTier,
  type RoleStatus,
} from "@/components/pipeline-board-data";
import { dateAdded } from "@/lib/board-dates";
import type { VariantProps } from "class-variance-authority";

/**
 * One Notion database record page, as a run leaves it.
 *
 * This is a *database record page*, which is a third Notion surface and
 * deliberately not either of the other two — NotionConfig is a document
 * of prose and settings, PipelineBoard is the table. Hero, board, config
 * are one record, all the records, and the rules. Property rows with
 * type icons and Select/Status chips are what makes a record page read
 * as a record page rather than as a card someone drew.
 *
 * Rendered twice: as the hero illustration (ScoreCard, which pins it to
 * the spotlight role) and behind every card on the board, which opens
 * the record it stands for. Both read the same fields off the same role,
 * so the card a reader clicks and the card in the hero cannot disagree.
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
 *  - An unscored record has no summary and doesn't pretend to. It says
 *    what the run couldn't read, and the footer names fetch-jd rather
 *    than score-roles, because that is the skill that came up empty.
 *  - The green page icon is the one score-roles sets for a High record
 *    (`document_green.svg`), which is why green carries the tier here
 *    and nowhere else on the card.
 */

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

/**
 * The badge ladder, shared with the board: a chip means the same thing
 * on a card, in a column header, and in a property row.
 */
export const FIT_VARIANT: Record<FitTier, BadgeVariant> = {
  high: "solid",
  medium: "surface",
  low: "outline",
  unscored: "dashed",
};

export const STATUS_VARIANT: Record<RoleStatus, BadgeVariant> = {
  "next-up": "outline",
  tailoring: "outline",
  submitted: "surface",
  interviewing: "line",
  offer: "solid",
  "no-response": "dashed",
};

/** Notion draws a small type glyph beside every property name. */
type PropertyType = "date" | "relation" | "select" | "status" | "text" | "url";

const TYPE_ICON: Record<PropertyType, React.ComponentType<{ className?: string }>> = {
  date: CalendarDays,
  relation: ArrowUpRight,
  select: ChevronDown,
  status: CircleDot,
  text: AlignLeft,
  url: Link2,
};

/**
 * The canonical field map from setup-pipeline/SKILL.md, not invented
 * board columns. `fit_score` is a Select and `status` is a Status, which
 * is why those two render as chips and the rest render as plain values:
 * that is how Notion draws them, and getting it wrong is the tell that a
 * mockup was never a screenshot.
 */
function properties(role: BoardRole, now: number, compact = false) {
  const all = [
    { label: "Company", type: "relation" as const, value: role.company },
    {
      label: "Fit score",
      type: "select" as const,
      value: FIT_LABEL[role.fit],
      variant: FIT_VARIANT[role.fit],
    },
    {
      label: "Status",
      type: "status" as const,
      value: STATUS_LABEL[role.status],
      variant: STATUS_VARIANT[role.status],
    },
    { label: "Location", type: "text" as const, value: role.location },
    { label: "Salary range", type: "text" as const, value: role.salary },
    {
      label: "Source",
      type: "select" as const,
      value: role.source,
      variant: "outline" as const,
      texture: true,
    },
    {
      label: "Date added",
      type: "date" as const,
      value: dateAdded(role.addedDaysAgo, now, role.writtenAt),
      texture: true,
    },
    {
      label: "Posting URL",
      type: "url" as const,
      value: `${role.host}${role.path}`,
      texture: true,
    },
  ];
  return compact ? all.filter((p) => !p.texture) : all;
}

/** Notion page icons carry the tier — green for High, plain otherwise. */
const ICON_STYLE: Record<FitTier, string> = {
  high: "border-primary-line bg-primary-surface text-primary-surface-foreground",
  medium: "border-border bg-secondary text-muted-foreground",
  low: "border-border bg-card-inset text-muted-foreground",
  unscored: "border-dashed border-border text-muted-foreground-dim",
};

function PageIcon({ fit }: { fit: FitTier }) {
  return (
    <span
      aria-hidden
      className={`flex size-9 items-center justify-center rounded-md border ${ICON_STYLE[fit]}`}
    >
      <svg
        viewBox="0 0 16 16"
        className="size-[18px]"
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

/**
 * `compact` is the hero rendering. It drops the three rows that are
 * texture rather than verdict — source, date added, posting URL — and
 * the mono footer, so a stranger's first read lands on the tier chip and
 * the summary instead of on a property table. The board's dialog shows
 * the full record.
 */
export function RecordPage({
  role,
  now,
  compact = false,
}: {
  role: BoardRole;
  now: number;
  compact?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
      <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2 sm:px-5">
        <span className="truncate font-mono text-micro text-muted-foreground">
          Job Search <span className="text-muted-foreground-dim">/</span> Job
          Pipeline
        </span>
        <span className="shrink-0 font-mono text-micro text-muted-foreground">
          added by hired
        </span>
      </div>

      <div className="px-4 pb-5 pt-5 sm:px-6">
        <PageIcon fit={role.fit} />
        <h2 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
          {role.title}
        </h2>

        <dl className="mt-4 border-y border-border py-1.5">
          {properties(role, now, compact).map((p) => {
            const Icon = TYPE_ICON[p.type];
            return (
              <div key={p.label} className="flex items-center gap-3 py-1">
                <dt className="flex w-28 shrink-0 items-center gap-1.5 text-meta text-muted-foreground sm:w-[8.5rem]">
                  <Icon className="size-3.5 shrink-0 text-muted-foreground-dim" />
                  {p.label}
                </dt>
                {/* Values wrap rather than truncate: a location clipped to
                  * "Menlo Park, CA — 3 days on-…" loses the thing the rubric
                  * actually scored. The URL is the exception — it's texture,
                  * and wrapping a bare URL over two lines reads as breakage. */}
                <dd className="min-w-0 text-meta text-foreground">
                  {p.variant ? (
                    <Badge variant={p.variant} size="sm">
                      {p.value}
                    </Badge>
                  ) : p.type === "url" ? (
                    <span className="block truncate font-mono text-micro text-muted-foreground">
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
          {role.summary ? "Score Summary" : "Not scored"}
        </h3>
        <p className="mt-1.5 text-meta leading-relaxed text-muted-foreground">
          {role.summary ?? role.unscoredNote}
        </p>
      </div>

      {!compact && (
        <div className="flex items-center justify-between gap-4 border-t border-border px-4 py-2 font-mono text-micro text-muted-foreground sm:px-5">
          <span>fit_score → {FIT_LABEL[role.fit]}</span>
          <span>{role.summary ? "score-roles" : "fetch-jd"}</span>
        </div>
      )}
    </div>
  );
}
