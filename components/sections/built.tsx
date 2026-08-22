import { ArrowUpRight } from "lucide-react";

import meta from "@/content/generated/meta.json";

const DECISIONS = [
  {
    title: "Config is a Notion page, not code",
    body: "Every run reads a Pipeline Config page — profile, rubric, field map, settings. Edit the rubric there and the next run scores by the new rule. No YAML, no redeploys.",
  },
  {
    title: "Humans keep the irreversible steps",
    body: "A scan can advance a status, but only you answer the recruiter. Terminal states like withdrawn are never inferred, and no suppression is silent — every deduped role is itemized in the report.",
  },
  {
    title: "Boring reliability over cleverness",
    body: "Dedup is exact matching on canonical URLs and titles, never semantic search — it silently degrades as the board grows. Descriptions come from public ATS APIs first, a browser only as fallback.",
  },
];

export function Built() {
  return (
    <section
      id="how-its-built"
      className="mx-auto w-full max-w-6xl px-6 py-20"
    >
      <div className="grid gap-x-8 gap-y-3 lg:grid-cols-[3rem_1fr]">
        <span
          aria-hidden
          className="hidden font-mono text-micro text-muted-foreground/50 lg:block"
        >
          04
        </span>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            Design decisions, briefly
          </h2>
          <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-muted-foreground">
            Built by{" "}
            <a
              href="https://kaegan.ai"
              className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
            >
              Kaegan Donnelly
            </a>{" "}
            during his own job search — the core of a personal tool that
            survived months of daily use, generalized so the rubric, board,
            and inbox are yours.
          </p>

          <ol className="mt-8 divide-y divide-border border-t border-border">
            {DECISIONS.map((d, i) => (
              <li key={d.title} className="flex gap-4 py-5">
                <span className="mt-0.5 font-mono text-micro text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{d.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {d.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <a
            href={meta.marketplace.repoUrl}
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-80"
          >
            The whole plugin is four markdown files — read them
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
