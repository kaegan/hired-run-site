import { Badge, type badgeVariants } from "@/components/ui/badge";
import { ROLES, type BoardRole, type FitTier, type RoleStatus } from "@/components/pipeline-board-data";
import type { VariantProps } from "class-variance-authority";

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

const FIT_COLUMNS: { key: FitTier; label: string; variant: BadgeVariant }[] = [
  { key: "high", label: "High", variant: "accent" },
  { key: "medium", label: "Medium", variant: "secondary" },
  { key: "low", label: "Low", variant: "muted" },
  { key: "unscored", label: "No score", variant: "outline" },
];

const STATUS_COLUMNS: {
  key: RoleStatus;
  label: string;
  variant: BadgeVariant;
}[] = [
  { key: "next-up", label: "Next Up", variant: "muted" },
  { key: "tailoring", label: "Tailoring", variant: "secondary" },
  { key: "submitted", label: "Submitted", variant: "accent" },
  { key: "interviewing", label: "Interviewing", variant: "default" },
];

const FIT_BADGE: Record<FitTier, { label: string; variant: BadgeVariant }> = {
  high: { label: "High", variant: "accent" },
  medium: { label: "Medium", variant: "secondary" },
  low: { label: "Low", variant: "muted" },
  unscored: { label: "No score", variant: "outline" },
};

function RoleCard({ role }: { role: BoardRole }) {
  const fit = FIT_BADGE[role.fit];
  return (
    <li>
      <div
        className={`relative flex flex-col gap-2 rounded-md border p-3 transition motion-reduce:transition-none skill-scan:border-primary/30 ${
          role.isNew
            ? "border-primary/40 bg-primary/5 skill-scan:border-primary/70 skill-scan:bg-primary/10"
            : "border-border bg-background/40"
        }`}
      >
        {role.isNew && (
          <span
            aria-hidden
            className="absolute right-2 top-2 size-1.5 rounded-full bg-primary/50 skill-scan:bg-primary"
          />
        )}
        <div className="flex items-center gap-1.5">
          <span
            aria-hidden
            className="flex size-4 shrink-0 items-center justify-center rounded-[3px] bg-secondary font-mono text-[8px] font-semibold text-muted-foreground"
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
          className="truncate font-mono text-[11px] text-muted-foreground skill-jd:text-primary skill-jd:underline skill-jd:decoration-primary/40 skill-jd:underline-offset-2"
        >
          {role.host}
          <span className="text-muted-foreground/60">{role.path}</span>
        </p>

        <div className="flex items-center justify-between gap-2 pt-0.5">
          <Badge
            variant={fit.variant}
            size="sm"
            className="shrink-0 skill-score:ring-1 skill-score:ring-primary/60 skill-score:ring-offset-1 skill-score:ring-offset-card"
          >
            {fit.label}
          </Badge>
          <span className="font-mono text-[10px] text-muted-foreground">
            {role.age}
          </span>
        </div>
      </div>
    </li>
  );
}

function BoardColumn({
  label,
  variant,
  roles,
}: {
  label: string;
  variant: BadgeVariant;
  roles: BoardRole[];
}) {
  return (
    <div className="w-48 shrink-0">
      <div className="mb-2 flex items-center gap-2 px-0.5 skill-setup:[&>*]:ring-1 skill-setup:[&>*]:ring-primary/50 skill-setup:[&>*]:ring-offset-2 skill-setup:[&>*]:ring-offset-card">
        <Badge variant={variant} size="sm">
          {label}
        </Badge>
        <span className="font-mono text-[10px] text-muted-foreground">
          {roles.length}
        </span>
      </div>
      <ul aria-label={`${label} — ${roles.length} roles`} className="space-y-2">
        {roles.map((role) => (
          <RoleCard key={role.id} role={role} />
        ))}
      </ul>
    </div>
  );
}

export function PipelineBoard() {
  const byFit = (fit: FitTier) => ROLES.filter((r) => r.fit === fit);
  const byStatus = (status: RoleStatus) =>
    ROLES.filter((r) => r.status === status);

  return (
    <figure className="mt-10">
      <div className="overflow-hidden rounded-lg border border-border bg-card transition motion-reduce:transition-none skill-any:border-primary/40 has-[[data-scroller]:focus-visible]:ring-2 has-[[data-scroller]:focus-visible]:ring-ring">
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <span className="font-mono text-xs text-muted-foreground">
            <span className="text-primary" aria-hidden>
              ▸
            </span>{" "}
            Job Pipeline
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            {ROLES.length} roles
          </span>
        </div>

        <div className="border-b border-border px-4">
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
              {FIT_COLUMNS.map((col) => (
                <BoardColumn
                  key={col.key}
                  label={col.label}
                  variant={col.variant}
                  roles={byFit(col.key)}
                />
              ))}
            </div>
            <div className="hidden w-max gap-3 p-3 board-status:flex">
              {STATUS_COLUMNS.map((col) => (
                <BoardColumn
                  key={col.key}
                  label={col.label}
                  variant={col.variant}
                  roles={byStatus(col.key)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <figcaption className="mt-3 font-mono text-xs text-muted-foreground">
        Illustration — real companies, invented roles.
      </figcaption>
    </figure>
  );
}
