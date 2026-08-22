import { ArrowRight } from "lucide-react";

import skills from "@/content/generated/skills.json";
import { SectionLabel } from "@/components/section-label";
import { PipelineBoard } from "@/components/pipeline-board";

const SKILL_TARGETS: Record<string, string> = {
  "setup-pipeline": "defines the columns above",
  "email-scan": "creates the card",
  "fetch-jd": "fills in the posting link",
  "score-roles": "writes the fit chip",
};

export function Pipeline() {
  return (
    <section id="how-it-works" className="mx-auto w-full max-w-3xl px-6 py-16">
      <SectionLabel index="01">How it works</SectionLabel>
      <h2 className="text-2xl font-semibold tracking-tight">
        Four skills, one pipeline
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Setup interviews you once. After that, two scheduled runs keep the board
        current on their own — you mostly just read it.
      </p>

      <div data-pipeline>
        <PipelineBoard />

        <p className="mt-8 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
          Every card above got there in four steps
        </p>

        <ol className="mt-3 space-y-3">
          {skills.map((skill, i) => (
            <li key={skill.slug} className="relative">
              <div
                data-skill={skill.slug}
                className="rounded-lg border border-border bg-card p-5 transition-colors motion-reduce:transition-none hover:border-primary/40"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-primary">
                      {String(skill.step).padStart(2, "0")}
                    </span>
                    <a
                      href={skill.sourceUrl}
                      className="font-mono text-sm font-semibold hover:text-primary hover:underline"
                    >
                      {skill.slug}
                    </a>
                  </div>
                  <code className="font-mono text-xs text-muted-foreground">
                    {skill.say}
                  </code>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {skill.does}
                </p>
                {SKILL_TARGETS[skill.slug] && (
                  <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                    <span aria-hidden>↑ </span>
                    {SKILL_TARGETS[skill.slug]}
                  </p>
                )}
              </div>
              {i < skills.length - 1 && (
                <div
                  aria-hidden
                  className="flex justify-center py-1 text-muted-foreground/50"
                >
                  <ArrowRight className="size-3.5 rotate-90" />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
