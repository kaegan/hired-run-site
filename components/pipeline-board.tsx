"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge, type badgeVariants } from "@/components/ui/badge";
import {
  FIT_LABEL,
  ROLES,
  STATUS_LABEL,
  type BoardRole,
  type RoleStatus,
} from "@/components/pipeline-board-data";
import {
  FIT_VARIANT,
  RecordPage,
  STATUS_VARIANT,
} from "@/components/record-page";
import { relativeAge } from "@/lib/board-dates";
import type { VariantProps } from "class-variance-authority";

type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

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
 *  - highlighted: arrived overnight, advanced a status, or got scored for
 *                 the first time — the run's actual output.
 * There is no "before" bucket. The board shows one state, today's, with
 * what changed marked — see the file-level comment in
 * pipeline-board-data.ts for why.
 *
 * The board groups by Status only. An earlier version also offered a Fit
 * Score view behind a tab; it hid the more informative grouping behind a
 * click most readers never made. Fit still rides along on every card.
 *
 * Green on this board belongs to the chips — the fit tier, and the late
 * stages of the status ladder. Cards the run touched used to be filled
 * green as well, which left one colour standing for "the pipeline rates
 * this highly" and "this moved last night" in the same glance. They're
 * marked with a neutral rail and the delta label they already carried
 * instead, so a green card now means a good role rather than a new one.
 *
 * Every card opens its record, the same way a card on a real Notion board
 * does — the board is a view of a database, and a view whose rows go
 * nowhere is the one thing a screenshot of Notion never is. The record it
 * opens is the hero card, rendered from the same role (see RecordPage).
 * That is also what makes the board worth its full-width band: a reader
 * can check any claim the page makes about scoring against the record
 * behind whichever card they doubt.
 */
type ColumnGroups = {
  static: BoardRole[];
  highlighted: BoardRole[];
};

const touchedByRun = (r: BoardRole) =>
  Boolean(r.arrivedOvernight || r.statusBefore !== undefined || r.fitBefore !== undefined);

function partitionByStatus(status: RoleStatus): ColumnGroups {
  const inColumn = ROLES.filter((r) => r.status === status);
  return {
    static: inColumn.filter((r) => !touchedByRun(r)),
    highlighted: inColumn.filter(touchedByRun),
  };
}

function deltaLabelFor(role: BoardRole) {
  if (role.arrivedOvernight) return "new";
  if (role.statusBefore !== undefined) return `→ ${STATUS_LABEL[role.status]}`;
  if (role.fitBefore !== undefined) return `scored ${FIT_LABEL[role.fit]}`;
  return "changed";
}

function RoleCard({
  role,
  onOpen,
  highlighted = false,
  deltaLabel,
}: {
  role: BoardRole;
  onOpen: (role: BoardRole) => void;
  highlighted?: boolean;
  deltaLabel?: string;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onOpen(role)}
        // The label replaces the card's own text for a screen reader, so it
        // carries what the card shows — not just where the click goes.
        aria-label={`Open the record for ${role.title} at ${role.company} — ${
          FIT_LABEL[role.fit]
        } fit, ${STATUS_LABEL[role.status]}`}
        className="group relative flex w-full cursor-pointer flex-col gap-2 rounded-md border border-border bg-card-inset p-3 text-left transition-colors motion-reduce:transition-none hover:border-primary-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {highlighted && (
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-[3px] rounded-l-md bg-foreground/60"
          />
        )}
        {highlighted && deltaLabel && (
          <span
            aria-hidden
            className="absolute right-2 top-2 font-mono text-micro font-semibold text-foreground"
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

        <p className="text-sm font-medium leading-snug text-foreground underline-offset-2 group-hover:underline">
          {role.title}
        </p>

        <p
          aria-hidden
          className="truncate font-mono text-micro text-muted-foreground"
        >
          {role.host}
          <span className="text-muted-foreground-dim">{role.path}</span>
        </p>

        <div className="flex items-center justify-between gap-2 pt-0.5">
          <Badge variant={FIT_VARIANT[role.fit]} size="sm" className="shrink-0">
            {FIT_LABEL[role.fit]}
          </Badge>
          <span className="font-mono text-micro text-muted-foreground">
            {relativeAge(role.addedDaysAgo)}
          </span>
        </div>
      </button>
    </li>
  );
}

/**
 * A native <dialog>, opened with showModal(): Esc, the focus trap and the
 * backdrop come from the platform rather than from a dependency this page
 * doesn't otherwise need. The top layer is also what lets the record
 * escape the board's horizontal scroller.
 *
 * The one thing the platform doesn't give us is a scroll lock — a modal
 * dialog makes the page inert but a wheel over it still scrolls the page
 * underneath, which reads as the record sliding around. The effect below
 * freezes the document while a record is open, and `overscroll-contain`
 * on the record itself stops a long summary from handing its last scroll
 * back to the page.
 */
function RecordDialog({
  role,
  now,
  onClose,
}: {
  role: BoardRole | null;
  now: number;
  onClose: () => void;
}) {
  const ref = React.useRef<HTMLDialogElement>(null);
  const invoker = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (role) {
      if (!el.open) {
        invoker.current = document.activeElement as HTMLElement | null;
        el.showModal();
      }
      return;
    }
    if (el.open) el.close();
    // Chrome restores focus to the invoker on Esc but not on every path
    // out; putting it back by hand means closing always lands the reader
    // on the card they opened, wherever the board is scrolled to.
    invoker.current?.focus();
    invoker.current = null;
  }, [role]);

  React.useEffect(() => {
    if (!role) return;
    const root = document.documentElement;
    const { overflow, paddingRight } = root.style;
    // Hiding the scrollbar reclaims its width, so the page shifts unless
    // that width is padded back. Zero on overlay-scrollbar platforms.
    const gutter = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    if (gutter > 0) root.style.paddingRight = `${gutter}px`;
    return () => {
      root.style.overflow = overflow;
      root.style.paddingRight = paddingRight;
    };
  }, [role]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      // The dialog element itself is the backdrop's click target: anything
      // inside the record stops at the wrapper below.
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-label={role ? `${role.title} at ${role.company}` : undefined}
      className="m-auto w-[min(34rem,calc(100vw-1.5rem))] bg-transparent p-0 text-foreground backdrop:bg-black/60"
    >
      {role && (
        // Only the record scrolls; the close control stays put, or a long
        // summary on a short window scrolls the way out of reach.
        <div className="flex max-h-[85dvh] flex-col gap-2">
          <div className="flex shrink-0 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md border border-border bg-card px-2.5 font-mono text-micro text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="size-3.5" />
              Close
            </button>
          </div>
          <div className="min-h-0 overflow-y-auto overscroll-contain">
            <RecordPage role={role} now={now} />
          </div>
        </div>
      )}
    </dialog>
  );
}

function OverflowRow({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <li
      aria-hidden
      className="px-1 py-1 font-mono text-micro text-muted-foreground-dim"
    >
      +{count} more
    </li>
  );
}

function BoardColumn({
  label,
  variant,
  groups,
  onOpen,
}: {
  label: string;
  variant: BadgeVariant;
  groups: ColumnGroups;
  onOpen: (role: BoardRole) => void;
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
            onOpen={onOpen}
            highlighted
            deltaLabel={deltaLabelFor(role)}
          />
        ))}
        {visibleStatic.map((role) => (
          <RoleCard key={role.id} role={role} onOpen={onOpen} />
        ))}
        <OverflowRow count={overflow} />
      </ul>
    </div>
  );
}

export function PipelineBoard({ now }: { now: number }) {
  const [openRole, setOpenRole] = React.useState<BoardRole | null>(null);

  return (
    <figure>
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card transition-colors motion-reduce:transition-none has-[[data-scroller]:focus-visible]:ring-2 has-[[data-scroller]:focus-visible]:ring-ring">
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
          <span className="py-2.5 font-mono text-xs text-muted-foreground">
            Status
          </span>
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
            <div className="flex w-max gap-3 p-3">
              {STATUS_ORDER.map((status) => (
                <BoardColumn
                  key={status}
                  label={STATUS_LABEL[status]}
                  variant={STATUS_VARIANT[status]}
                  groups={partitionByStatus(status)}
                  onOpen={setOpenRole}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <figcaption className="mt-3 font-mono text-micro text-muted-foreground">
        Open any card to read the record hired wrote for it.
      </figcaption>

      <RecordDialog
        role={openRole}
        now={now}
        onClose={() => setOpenRole(null)}
      />
    </figure>
  );
}
