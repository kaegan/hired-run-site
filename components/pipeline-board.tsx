import { Badge, type badgeVariants } from "@/components/ui/badge";
import { ROLES, type BoardRole, type FitTier, type RoleStatus } from "@/components/pipeline-board-data";
import type { VariantProps } from "class-variance-authority";

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

const FIT_LABEL: Record<FitTier, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
  unscored: "Unscored",
};

const FIT_VARIANT: Record<FitTier, BadgeVariant> = {
  high: "solid",
  medium: "surface",
  low: "outline",
  unscored: "dashed",
};

const FIT_ORDER: FitTier[] = ["high", "medium", "low", "unscored"];

const STATUS_LABEL: Record<RoleStatus, string> = {
  "next-up": "Next Up",
  tailoring: "Tailoring",
  submitted: "Submitted",
  interviewing: "Interviewing",
  offer: "Offer",
  "no-response": "No Response",
};

const STATUS_VARIANT: Record<RoleStatus, BadgeVariant> = {
  "next-up": "outline",
  tailoring: "outline",
  submitted: "surface",
  interviewing: "line",
  offer: "solid",
  "no-response": "dashed",
};

const STATUS_ORDER: RoleStatus[] = [
  "next-up",
  "tailoring",
  "submitted",
  "interviewing",
  "offer",
  "no-response",
];

const VISIBLE_CAP = 4;

/**
 * Every column groups its roles into two buckets:
 *  - static:      unaffected by the run
 *  - highlighted: arrived overnight, or scored/advanced into this column
 *                 for the first time — the run's actual output.
 * There is no "before" bucket. The board shows one state, today's, with
 * what changed marked — see the file-level comment in
 * pipeline-board-data.ts for why.
 */
type ColumnGroups = {
  static: BoardRole[];
  highlighted: BoardRole[];
};

function partitionByFit(tier: FitTier): ColumnGroups {
  return {
    static: ROLES.filter(
      (r) => !r.arrivedOvernight && r.fitBefore === undefined && r.fit === tier
    ),
    highlighted: ROLES.filter(
      (r) =>
        r.fit === tier &&
        (r.arrivedOvernight || (r.fitBefore !== undefined && r.fitBefore !== tier))
    ),
  };
}

function partitionByStatus(status: RoleStatus): ColumnGroups {
  return {
    static: ROLES.filter(
      (r) =>
        !r.arrivedOvernight && r.statusBefore === undefined && r.status === status
    ),
    highlighted: ROLES.filter(
      (r) =>
        r.status === status &&
        (r.arrivedOvernight ||
          (r.statusBefore !== undefined && r.statusBefore !== status))
    ),
  };
}

function deltaLabelFor(role: BoardRole, dimension: "fit" | "status") {
  if (role.arrivedOvernight) return "new";
  if (dimension === "fit" && role.fitBefore !== undefined) {
    return `scored ${FIT_LABEL[role.fit]}`;
  }
  if (dimension === "status" && role.statusBefore !== undefined) {
    return `→ ${STATUS_LABEL[role.status]}`;
  }
  return "changed";
}

function RoleCard({
  role,
  highlighted = false,
  deltaLabel,
}: {
  role: BoardRole;
  highlighted?: boolean;
  deltaLabel?: string;
}) {
  return (
    <li>
      <div
        className={`relative flex flex-col gap-2 rounded-md border p-3 transition-colors motion-reduce:transition-none ${
          highlighted
            ? "border-primary-line-strong bg-primary-surface"
            : "border-border bg-card-inset"
        }`}
      >
        {highlighted && deltaLabel && (
          <span
            aria-hidden
            className="absolute right-2 top-2 font-mono text-micro font-semibold text-primary-surface-foreground"
          >
            {deltaLabel}
          </span>
        )}
        <div className="flex items-center gap-1.5">
          <span
            aria-hidden
            className="flex size-4 shrink-0 items-center justify-center rounded-[3px] bg-secondary font-mono text-[9px] font-semibold text-muted-foreground"
          >
            {role.mark}
          </span>
          <span className="truncate text-xs text-muted-foreground">
            {role.company}
          </span>
        </div>

        <p className="text-sm font-medium leading-snug text-foreground">
          {role.title}
        </p>

        <p
          aria-hidden
          className="truncate font-mono text-micro text-muted-foreground"
        >
          {role.host}
          <span className="text-muted-foreground/60">{role.path}</span>
        </p>

        <div className="flex items-center justify-between gap-2 pt-0.5">
          <Badge variant={FIT_VARIANT[role.fit]} size="sm" className="shrink-0">
            {FIT_LABEL[role.fit]}
          </Badge>
          <span className="font-mono text-micro text-muted-foreground">
            {role.age}
          </span>
        </div>
      </div>
    </li>
  );
}

function OverflowRow({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <li
      aria-hidden
      className="px-1 py-1 font-mono text-micro text-muted-foreground/70"
    >
      +{count} more
    </li>
  );
}

function BoardColumn({
  label,
  variant,
  groups,
  dimension,
}: {
  label: string;
  variant: BadgeVariant;
  groups: ColumnGroups;
  dimension: "fit" | "status";
}) {
  const { static: staticRoles, highlighted } = groups;
  const hasChanges = highlighted.length > 0;

  // A column touched by the overnight run renders every card it holds
  // rather than truncating — the point is to see the change, not to
  // hide it behind a "+N more" row.
  const visibleStatic = hasChanges
    ? staticRoles
    : staticRoles.slice(0, VISIBLE_CAP);
  const overflow = hasChanges ? 0 : staticRoles.length - visibleStatic.length;
  const count = staticRoles.length + highlighted.length;

  return (
    <div className="w-64 shrink-0">
      <div className="mb-2 flex items-center gap-2 px-0.5">
        <Badge variant={variant} size="sm">
          {label}
        </Badge>
        <span className="font-mono text-micro text-muted-foreground">
          {count}
        </span>
      </div>
      <ul aria-label={`${label} roles`} className="space-y-2">
        {highlighted.map((role) => (
          <RoleCard
            key={role.id}
            role={role}
            highlighted
            deltaLabel={deltaLabelFor(role, dimension)}
          />
        ))}
        {visibleStatic.map((role) => (
          <RoleCard key={role.id} role={role} />
        ))}
        <OverflowRow count={overflow} />
      </ul>
    </div>
  );
}

export function PipelineBoard() {
  return (
    <figure data-pipeline>
      <div className="overflow-hidden rounded-lg border border-border bg-card transition-colors motion-reduce:transition-none has-[[data-scroller]:focus-visible]:ring-2 has-[[data-scroller]:focus-visible]:ring-ring">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-border px-4 py-2">
          <span className="font-mono text-xs text-muted-foreground">
            <span className="text-primary" aria-hidden>
              ▸
            </span>{" "}
            Job Pipeline
          </span>
          <span className="font-mono text-micro text-muted-foreground">
            Last edited 06:04 today
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-border px-4">
          <fieldset className="flex gap-4">
            <legend className="sr-only">Group roles by</legend>
            <div className="flex items-center">
              <input
                type="radio"
                name="board-view"
                id="board-view-fit"
                data-board-view="fit"
                defaultChecked
                className="peer/fit sr-only"
              />
              <label
                htmlFor="board-view-fit"
                className="-mb-px cursor-pointer border-b-2 border-transparent py-2.5 font-mono text-xs text-muted-foreground transition-colors motion-reduce:transition-none peer-checked/fit:border-primary peer-checked/fit:text-foreground peer-focus-visible/fit:ring-2 peer-focus-visible/fit:ring-ring"
              >
                Fit Score
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="board-view"
                id="board-view-status"
                data-board-view="status"
                className="peer/status sr-only"
              />
              <label
                htmlFor="board-view-status"
                className="-mb-px cursor-pointer border-b-2 border-transparent py-2.5 font-mono text-xs text-muted-foreground transition-colors motion-reduce:transition-none peer-checked/status:border-primary peer-checked/status:text-foreground peer-focus-visible/status:ring-2 peer-focus-visible/status:ring-ring"
              >
                Status
              </label>
            </div>
          </fieldset>
          <span className="hidden font-mono text-micro text-muted-foreground sm:inline">
            06:00 scheduled run
          </span>
        </div>

        <div className="min-w-0 mask-r-from-92% mask-r-to-100%">
          <div
            data-scroller
            tabIndex={0}
            role="group"
            aria-label="Job pipeline board, scrollable"
            className="overflow-x-auto overscroll-x-contain focus-visible:outline-none [scrollbar-color:var(--border)_transparent] [scrollbar-width:thin]"
          >
            <div className="flex w-max gap-3 p-3 board-status:hidden">
              {FIT_ORDER.map((fit) => (
                <BoardColumn
                  key={fit}
                  label={FIT_LABEL[fit]}
                  variant={FIT_VARIANT[fit]}
                  groups={partitionByFit(fit)}
                  dimension="fit"
                />
              ))}
            </div>
            <div className="hidden w-max gap-3 p-3 board-status:flex">
              {STATUS_ORDER.map((status) => (
                <BoardColumn
                  key={status}
                  label={STATUS_LABEL[status]}
                  variant={STATUS_VARIANT[status]}
                  groups={partitionByStatus(status)}
                  dimension="status"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <figcaption className="mt-3 font-mono text-micro text-muted-foreground">
        Illustration — real companies, invented roles.
      </figcaption>
    </figure>
  );
}
