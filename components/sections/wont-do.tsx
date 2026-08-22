import { ExternalLink } from "lucide-react";

import trust from "@/content/generated/trust.json";
import { SectionLabel } from "@/components/section-label";

export function WontDo() {
  return (
    <section id="wont-do" className="mx-auto w-full max-w-3xl px-6 py-16">
      <SectionLabel index="03">What it won&apos;t do</SectionLabel>
      <h2 className="text-2xl font-semibold tracking-tight">
        The guarantees are in the source
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Every quote below is pulled verbatim from the skill files at build
        time and verified against the published plugin — if the plugin stops
        making a promise, this page fails to build. Each link goes to the
        exact line.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {trust.map((t) => (
          <div
            key={t.id}
            className="flex flex-col rounded-lg border border-border bg-card p-5"
          >
            <h3 className="text-sm font-semibold">{t.title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              {t.note}
            </p>
            <blockquote className="mt-4 border-l-2 border-primary pl-3 text-xs italic leading-relaxed text-muted-foreground">
              “{t.quote}”
            </blockquote>
            <a
              href={t.sourceUrl}
              className="mt-auto inline-flex items-center gap-1 pt-4 font-mono text-[11px] text-muted-foreground transition-colors hover:text-primary"
            >
              {t.sourcePath.replace("/SKILL.md", "")}
              <ExternalLink className="size-3" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
