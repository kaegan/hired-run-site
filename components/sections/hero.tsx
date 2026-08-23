import meta from "@/content/generated/meta.json";
import { GithubIcon } from "@/components/github-icon";
import { ScoreCard } from "@/components/score-card";

/** In-page nav. The page is long and every section below is a real
 * destination — without these the only way down is the scroll bar. */
const NAV = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#install", label: "Setup" },
  { href: "#wont-do", label: "Guarantees" },
  { href: "#faq", label: "Questions" },
];

/**
 * The hero used to lead with the two install commands, which put the
 * least interesting thing about the product above the fold and asked a
 * stranger to run something before they knew what it did. The commands
 * now sit in Setup and in the closing band; the hero shows the one thing
 * the pipeline actually produces — a scored record on your board.
 */
export function Hero() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-6 pt-8">
        <nav className="flex items-center justify-between gap-6 py-4">
          <span className="font-mono text-sm font-semibold">
            <span className="text-primary">▸</span> hired.run
          </span>
          <div className="flex items-center gap-5 text-sm text-muted-foreground">
            <div className="hidden items-center gap-5 lg:flex">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
              <span aria-hidden className="text-border">
                ·
              </span>
            </div>
            <a
              href="/changelog"
              className="transition-colors hover:text-foreground"
            >
              Changelog
            </a>
            <a
              href={meta.marketplace.repoUrl}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <GithubIcon className="size-4" />
              GitHub
            </a>
          </div>
        </nav>

        <div className="grid gap-10 pb-16 pt-10 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          {/* min-w-0: the record card holds an unbreakable posting URL, and a
            * grid track sizes to min-content without it. */}
          <div className="min-w-0">
            <h1 className="max-w-[16ch] text-4xl font-semibold tracking-tight sm:text-5xl lg:text-display">
              An analyst for your job search.
              <br />
              <span className="text-muted-foreground">Not an apply-bot.</span>
            </h1>

            <p className="mt-5 max-w-[52ch] text-lead leading-relaxed text-muted-foreground">
              <span className="font-mono text-foreground">hired</span> reads
              your inbox, scores each role against a rubric{" "}
              <em className="not-italic text-foreground">you</em> write, and
              keeps a Notion board current with all of your opportunities.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#how-it-works"
                className="inline-flex h-11 items-center gap-2.5 rounded-md bg-primary-solid px-5 text-sm font-semibold text-primary-solid-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                See a morning with hired
                <span aria-hidden className="opacity-70">
                  →
                </span>
              </a>
              <a
                href="#install"
                className="inline-flex h-11 items-center rounded-md border border-border px-4 text-sm font-medium transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Install in two commands
              </a>
            </div>

            <p className="mt-5 text-meta leading-relaxed text-muted-foreground">
              Free and {meta.plugin.license}-licensed. Runs on your own Claude,
              Notion and Gmail.
            </p>
          </div>

          <div className="w-full min-w-0 max-w-[30rem] lg:ml-auto">
            <ScoreCard />
          </div>
        </div>
      </div>
    </header>
  );
}
