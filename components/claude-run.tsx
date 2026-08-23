import { Badge } from "@/components/ui/badge";
import { RUN_TIME, SPOTLIGHT } from "@/components/how-it-works-data";

/**
 * "How it works" block 2 — what a scheduled run looks like in Claude.
 *
 * Not a live terminal and not a typing loop: a static transcript in the
 * same card language as every other illustration. The tool lines are
 * set dressing; the summary row at the bottom is the payload, and it
 * has to match the board's delta and the Slack message exactly.
 */

type Line =
  | { kind: "prompt"; text: string }
  | { kind: "skill"; text: string; meta?: string }
  | { kind: "tool"; text: string; meta?: string }
  | { kind: "add"; text: string }
  | { kind: "move"; text: string }
  | { kind: "score"; text: string; tier: "High" | "Medium" | "Low" }
  | { kind: "reason"; text: string }
  | { kind: "blank" };

const LINES: Line[] = [
  { kind: "prompt", text: "check my email for new roles" },
  { kind: "blank" },
  { kind: "skill", text: "email-scan", meta: "gmail" },
  { kind: "tool", text: 'search "jobs" newer_than:1d', meta: "14 messages" },
  { kind: "add", text: "Spotify — Senior Product Manager, Personalization" },
  { kind: "add", text: "Robinhood — Product Manager, Growth" },
  { kind: "move", text: "Airbnb — Senior PM, Trust & Safety → Interviewing" },
  { kind: "blank" },
  { kind: "skill", text: "fetch-jd", meta: "3 postings" },
  { kind: "tool", text: "lifeatspotify.com/jobs/6142098", meta: "4.1k" },
  { kind: "tool", text: "greenhouse.io/robinhood/jobs/6204417", meta: "3.3k" },
  { kind: "tool", text: "greenhouse.io/figma/jobs/4930221", meta: "5.2k" },
  { kind: "blank" },
  { kind: "skill", text: "score-roles", meta: "6 dimensions · your resume" },
  { kind: "score", text: "Spotify — Senior PM, Personalization", tier: "High" },
  { kind: "reason", text: SPOTLIGHT.shortSignal },
  { kind: "reason", text: SPOTLIGHT.shortGap },
  { kind: "score", text: "Figma — Group PM, Collaboration", tier: "Medium" },
  { kind: "reason", text: "big PM org, design-led · three days in office" },
  { kind: "score", text: "Robinhood — PM, Growth", tier: "Low" },
  { kind: "reason", text: "growth iteration, not 0→1 · comp below floor" },
  { kind: "blank" },
  { kind: "skill", text: "notify-slack", meta: "#job-search" },
];

const TIER_VARIANT = {
  High: "solid",
  Medium: "surface",
  Low: "outline",
} as const;

function TranscriptLine({ line }: { line: Line }) {
  if (line.kind === "blank") {
    return <div className="h-3" aria-hidden />;
  }

  if (line.kind === "prompt") {
    return (
      <div className="text-foreground">
        <span aria-hidden className="select-none text-primary">
          &gt;{" "}
        </span>
        {line.text}
      </div>
    );
  }

  if (line.kind === "skill") {
    return (
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-semibold text-foreground">
          <span aria-hidden className="text-primary">
            ▸{" "}
          </span>
          {line.text}
        </span>
        {line.meta && (
          <span className="shrink-0 text-micro text-muted-foreground">
            {line.meta}
          </span>
        )}
      </div>
    );
  }

  if (line.kind === "tool") {
    return (
      <div className="flex items-baseline justify-between gap-4 text-muted-foreground">
        <span className="truncate">
          <span aria-hidden className="text-muted-foreground/50">
            ⎿{" "}
          </span>
          {line.text}
        </span>
        {line.meta && (
          <span className="shrink-0 text-micro text-muted-foreground/60">
            {line.meta}
          </span>
        )}
      </div>
    );
  }

  if (line.kind === "add" || line.kind === "move") {
    return (
      <div className="text-foreground">
        <span aria-hidden className="text-primary">
          {line.kind === "add" ? "+ " : "↻ "}
        </span>
        {line.text}
      </div>
    );
  }

  if (line.kind === "score") {
    return (
      <div className="flex items-baseline justify-between gap-4">
        <span className="truncate text-foreground">
          <span aria-hidden className="text-muted-foreground/50">
            ⎿{" "}
          </span>
          {line.text}
        </span>
        <Badge
          variant={TIER_VARIANT[line.tier]}
          size="sm"
          className="shrink-0 font-mono"
        >
          {line.tier}
        </Badge>
      </div>
    );
  }

  return <div className="pl-4 text-muted-foreground/70">{line.text}</div>;
}

export function ClaudeRun() {
  return (
    <figure className="w-full">
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2">
          <span className="font-mono text-micro text-muted-foreground">
            <span aria-hidden className="text-primary">
              ▸
            </span>{" "}
            Claude · scheduled run
          </span>
          <span className="font-mono text-micro text-muted-foreground">
            {RUN_TIME} · 41s
          </span>
        </div>

        <div className="overflow-x-auto px-4 py-4 font-mono text-xs leading-6 sm:px-5 sm:text-[13px]">
          <div className="min-w-[30rem]">
            {LINES.map((line, i) => (
              <TranscriptLine key={i} line={line} />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-primary-line bg-primary-surface px-4 py-2.5 sm:px-5">
          <span className="font-mono text-xs font-semibold text-primary-surface-foreground">
            2 new · 1 scored · 1 status change
          </span>
          <span className="font-mono text-micro text-primary-surface-foreground/70">
            board updated
          </span>
        </div>
      </div>

    </figure>
  );
}
