import { Check } from "lucide-react";

import meta from "@/content/generated/meta.json";
import { SectionLabel } from "@/components/section-label";
import { CopyButton } from "@/components/copy-button";

const PREREQS = [
  "The Claude desktop app — plugins do not run on web or mobile",
  "Notion connector — bring your own tracking board, or let setup build one",
  "Gmail connector — read-only, see the section below",
  "Chrome browser tools are optional; most job descriptions come from public ATS APIs",
];

export function Install() {
  return (
    <section id="install" className="mx-auto w-full max-w-3xl px-6 py-16">
      <SectionLabel index="02">Install</SectionLabel>
      <h2 className="text-2xl font-semibold tracking-tight">
        Two commands, one interview
      </h2>

      <div className="mt-8 rounded-lg border border-border bg-card p-5">
        <p className="mb-3 text-sm font-medium">You need</p>
        <ul className="space-y-2">
          {PREREQS.map((p) => (
            <li key={p} className="flex gap-2.5 text-sm text-muted-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>

      <ol className="mt-8 space-y-6">
        {meta.install.map((cmd, i) => (
          <li key={cmd} className="flex items-start gap-4">
            <span className="mt-2 font-mono text-xs text-primary">
              {i + 1}.
            </span>
            <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden rounded-lg border border-border bg-card">
              <pre className="min-w-0 flex-1 overflow-x-auto px-4 py-3 font-mono text-sm">
                {cmd}
              </pre>
              <CopyButton text={cmd} className="mr-2" />
            </div>
          </li>
        ))}
        <li className="flex items-start gap-4">
          <span className="mt-0.5 font-mono text-xs text-primary">3.</span>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Say{" "}
            <span className="font-mono text-foreground">
              &quot;set up my job search pipeline&quot;
            </span>{" "}
            and answer the questions. Bring 3–5 postings that represent what
            you are going after, plus one or two you looked at and passed on.
            Links are fine — and the passes are usually the sharpest signal in
            the whole interview.
          </p>
        </li>
      </ol>

      <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
        Setup takes about 20 minutes, and most of it is the rubric interview.
        It ends by running a live scan and scoring real postings in front of
        you, so you can correct the rubric while it is still cheap to correct.
      </p>
    </section>
  );
}
