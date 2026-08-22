import { ArrowUpRight } from "lucide-react";

import meta from "@/content/generated/meta.json";
import { SectionLabel } from "@/components/section-label";

const DECISIONS = [
  {
    title: "The rubric is interviewed, not templated",
    body: "Setup asks for 3–5 real postings you want and 1–2 you passed on before it asks a single question, because what people describe and what they actually apply to are different things. The rubric ships empty and nothing goes into it that you didn't say — an invented dimension feels right during setup and quietly distorts every score afterward.",
  },
  {
    title: "Config is a Notion page, not code",
    body: "Every run starts by reading a Pipeline Config page — profile, rubric, field map, settings. Editing the rubric there changes scoring on the next run. No YAML, no redeploys, and the config lives where you already look every day.",
  },
  {
    title: "Prompt injection is a product constraint",
    body: "The scanner reads untrusted text from strangers, so the skill file itself — the thing that binds behavior, not the marketing page — declares email content data to classify, never instructions to follow. A message that tries to steer the assistant gets flagged in the report and changes nothing.",
  },
  {
    title: "Humans keep the irreversible steps",
    body: "A scan can advance a status, but only you answer the recruiter. Terminal states like withdrawn or passed are never inferred. And no suppression is silent: every deduped role is itemized in the report, so “nothing new today” and “we hid six roles you already decided on” can never look the same.",
  },
  {
    title: "Boring reliability over cleverness",
    body: "Dedup is exact matching on canonical URLs and normalized titles — never semantic search, which caps its result set and silently degrades as the board grows. Job descriptions come from public ATS JSON APIs first, a browser only for the awkward career pages. Errors are loud; empty results are not errors.",
  },
];

export function Built() {
  return (
    <section id="how-its-built" className="mx-auto w-full max-w-3xl px-6 py-16">
      <SectionLabel index="04">How it&apos;s built</SectionLabel>
      <h2 className="text-2xl font-semibold tracking-tight">
        Design decisions, briefly
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Built by{" "}
        <a
          href="https://kaegan.ai"
          className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-primary"
        >
          Kaegan Donnelly
        </a>{" "}
        during his own job search. The personal version kept growing skills;
        this is the core that survived months of daily use, generalized so the
        rubric, the board, and the inbox are all yours.
      </p>

      <dl className="mt-10 space-y-8">
        {DECISIONS.map((d, i) => (
          <div key={d.title} className="flex gap-4">
            <span className="mt-0.5 font-mono text-xs text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <dt className="text-sm font-semibold">{d.title}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {d.body}
              </dd>
            </div>
          </div>
        ))}
      </dl>

      <a
        href={meta.marketplace.repoUrl}
        className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-80"
      >
        The whole plugin is four markdown files — read them
        <ArrowUpRight className="size-4" />
      </a>
    </section>
  );
}
