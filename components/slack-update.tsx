import { Badge } from "@/components/ui/badge";
import { NOTIFY_TIME } from "@/components/how-it-works-data";

/**
 * "How it works" block 4 — the Slack notification.
 *
 * Slack's *layout* (channel header, avatar, name + APP badge, block
 * sections, context footer, reactions) in this site's palette, not
 * Slack's aubergine. A pixel-accurate Slack skin would fight every
 * other block on the page and would go stale the moment Slack
 * redesigns.
 *
 * The three items below are the same three deltas the run reported and
 * the board shows.
 */

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-3 first:mt-0">
      <p className="font-mono text-micro uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="mt-1.5 space-y-2">{children}</div>
    </div>
  );
}

function Item({
  company,
  title,
  detail,
  tier,
  status,
}: {
  company: string;
  title: string;
  detail: string;
  tier?: "High" | "Medium" | "Low";
  status?: string;
}) {
  return (
    <div className="flex items-baseline gap-2">
      <span aria-hidden className="mt-[2px] shrink-0 text-muted-foreground-dim">
        •
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-snug">
          <span className="font-semibold text-foreground">{company}</span>
          <span className="text-muted-foreground"> — {title}</span>
          {tier && (
            <>
              {" "}
              <Badge
                variant={
                  tier === "High" ? "solid" : tier === "Medium" ? "surface" : "outline"
                }
                size="sm"
                className="translate-y-[-1px] font-mono"
              >
                {tier}
              </Badge>
            </>
          )}
          {status && (
            <>
              {" "}
              <Badge variant="line" size="sm" className="translate-y-[-1px]">
                {status}
              </Badge>
            </>
          )}
        </p>
        <p className="mt-0.5 text-meta leading-relaxed text-muted-foreground">
          {detail}
        </p>
      </div>
    </div>
  );
}

export function SlackUpdate() {
  return (
    <figure className="w-full max-w-[36rem]">
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
        <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2">
          <span className="font-mono text-micro text-muted-foreground">
            <span aria-hidden className="text-muted-foreground-dim">
              #
            </span>{" "}
            <span className="text-foreground">job-search</span>
          </span>
          <span className="font-mono text-micro text-muted-foreground">
            2 members
          </span>
        </div>

        <div className="flex gap-3 px-4 py-4 sm:px-5">
          <span
            aria-hidden
            className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-primary-solid font-mono text-sm font-bold text-primary-solid-foreground"
          >
            ▸
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-sm font-semibold text-foreground">
                hired
              </span>
              <span className="rounded-[3px] bg-secondary px-1 py-[1px] font-mono text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
                App
              </span>
              <span className="font-mono text-micro text-muted-foreground">
                {NOTIFY_TIME}
              </span>
            </div>

            <p className="mt-1.5 text-sm leading-relaxed text-foreground">
              Overnight run — <strong className="font-semibold">2 new</strong>,
              1 scored, 1 status change.
            </p>

            <div className="mt-3 border-l-2 border-primary-line pl-3">
              <Section label="Worth a look">
                <Item
                  company="Spotify"
                  title="Senior PM, Personalization"
                  tier="High"
                  detail="0→1 ownership · AI in core product · remote-first"
                />
              </Section>

              <Section label="Needs a reply">
                <Item
                  company="Airbnb"
                  title="Senior PM, Trust & Safety"
                  status="Interviewing"
                  detail="Recruiter asked for availability — 2 days ago"
                />
              </Section>

              <Section label="Also new">
                <Item
                  company="Figma"
                  title="Group PM, Collaboration"
                  tier="Medium"
                  detail="Scored for the first time"
                />
                <Item
                  company="Robinhood"
                  title="PM, Growth"
                  tier="Low"
                  detail="Comp below floor — logged, no action needed"
                />
              </Section>
            </div>

            <p className="mt-3 font-mono text-micro text-muted-foreground">
              Board updated ·{" "}
              <span className="text-primary underline underline-offset-2">
                Open Job Pipeline
              </span>
            </p>

            <div className="mt-3 flex gap-1.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card-inset px-2.5 py-1 text-meta text-muted-foreground">
                <span aria-hidden className="text-sm leading-none">
                  👀
                </span>
                1
              </span>
            </div>
          </div>
        </div>
      </div>

    </figure>
  );
}
