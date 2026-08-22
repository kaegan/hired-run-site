import {
  RUBRIC,
  PERSONA,
  HARD_FILTERS,
  EXPERIENCE,
  RUN_TIME,
} from "@/components/how-it-works-data";

/**
 * "How it works" block 1 — the config page setup writes to Notion.
 *
 * Deliberately dressed as a *document*, not a database: page icon,
 * headings, property rows, a rubric table, a callout. PipelineBoard is
 * the database look, and if these two read the same the story
 * collapses into "two screenshots of Notion".
 *
 * Scrolls inside its own box so the page can show a page — the fade at
 * the bottom is the only thing implying there's more.
 */

function PropertyRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 py-1.5 text-sm">
      <span className="w-[11rem] shrink-0 text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mt-7 mb-2 text-base font-semibold tracking-tight text-foreground">
      {children}
    </h4>
  );
}

export function NotionConfig() {
  return (
    <figure className="w-full">
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        {/* Notion chrome */}
        <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2">
          <span className="truncate font-mono text-micro text-muted-foreground">
            Private <span className="text-muted-foreground/50">/</span> Job
            Search <span className="text-muted-foreground/50">/</span>{" "}
            <span className="text-foreground">Config</span>
          </span>
          <span className="hidden shrink-0 font-mono text-micro text-muted-foreground sm:inline">
            Edited by you
          </span>
        </div>

        <div className="relative">
          <div
            tabIndex={0}
            role="group"
            aria-label="Job Search Config page, scrollable"
            className="max-h-[30rem] overflow-y-auto overscroll-y-contain px-6 py-6 focus-visible:outline-none [scrollbar-color:var(--border)_transparent] [scrollbar-width:thin] sm:px-10"
          >
            <div className="mx-auto max-w-[46rem]">
              <span aria-hidden className="block text-3xl leading-none">
                🎯
              </span>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                Job Search Config
              </h3>

              <div className="mt-4 border-y border-border py-2">
                <PropertyRow label="Owner" value={PERSONA.name} />
                <PropertyRow label="Board" value="Job Pipeline" />
                <PropertyRow
                  label="Runs"
                  value={`Daily ${RUN_TIME} · Weekly Sun ${RUN_TIME}`}
                />
              </div>

              <SectionHeading>Who I am</SectionHeading>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {PERSONA.headline}. Setup asked for this once, in a
                conversation, and wrote the answers here. Edit the page and
                the next run uses the new version — there is no settings
                screen anywhere else.
              </p>
              <div className="mt-3">
                <PropertyRow label="Looking for" value={PERSONA.lookingFor} />
                <PropertyRow label="Not looking for" value={PERSONA.notLookingFor} />
                <PropertyRow label="Comp floor" value={PERSONA.compFloor} />
                <PropertyRow label="Timing" value={PERSONA.noticePeriod} />
              </div>

              <SectionHeading>What I&apos;ve done</SectionHeading>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Read once from a resume, kept on its own page. Scoring cites
                these; it never treats them as things I want.
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-foreground">
                {EXPERIENCE.proofPoints.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span aria-hidden className="text-muted-foreground/50">
                      •
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-3">
                <PropertyRow label="Deep" value={EXPERIENCE.deep} />
                <PropertyRow label="Adjacent, not deep" value={EXPERIENCE.thin} />
                <PropertyRow label="Read from" value={EXPERIENCE.source} />
              </div>

              <SectionHeading>My rubric</SectionHeading>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Six criteria, weights summing to 100. These are the only
                things scoring is allowed to reward.
              </p>
              <div className="mt-3 overflow-hidden rounded-md border border-border">
                <div className="flex items-center gap-3 border-b border-border bg-card-inset px-3 py-2">
                  <span className="flex-1 font-mono text-micro text-muted-foreground">
                    Criterion
                  </span>
                  <span className="w-12 shrink-0 text-right font-mono text-micro text-muted-foreground">
                    Weight
                  </span>
                </div>
                {RUBRIC.map((c) => (
                  <div
                    key={c.label}
                    className="flex items-baseline gap-3 border-b border-border px-3 py-2.5 last:border-b-0"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {c.label}
                      </p>
                      <p className="mt-0.5 text-meta leading-relaxed text-muted-foreground">
                        {c.note}
                      </p>
                    </div>
                    <span className="w-12 shrink-0 text-right font-mono text-sm text-foreground">
                      {c.weight}
                    </span>
                  </div>
                ))}
              </div>

              <SectionHeading>Hard filters</SectionHeading>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Anything matching these is scored Low and never surfaced,
                regardless of the rubric.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {HARD_FILTERS.map((f) => (
                  <span
                    key={f}
                    className="rounded-[4px] bg-secondary px-2 py-1 text-meta text-secondary-foreground"
                  >
                    {f}
                  </span>
                ))}
              </div>

              <SectionHeading>Where to look</SectionHeading>
              <ul className="mt-1 space-y-1.5 text-sm text-muted-foreground">
                {[
                  "Gmail — job alert digests and ATS mail",
                  "Greenhouse, Lever, Ashby public boards",
                  "12 saved companies (see Companies DB)",
                ].map((line) => (
                  <li key={line} className="flex gap-2">
                    <span aria-hidden className="text-muted-foreground/50">
                      •
                    </span>
                    {line}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex gap-3 rounded-md border border-primary-line bg-primary-surface px-4 py-3">
                <span aria-hidden className="text-base leading-tight">
                  💡
                </span>
                <p className="text-meta leading-relaxed text-primary-surface-foreground">
                  Change a weight and the next scoring run re-reads this page.
                  Nothing is compiled, cached, or stored anywhere else.
                </p>
              </div>

              <div className="h-10" />
            </div>
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-card to-transparent"
          />
        </div>
      </div>

    </figure>
  );
}
