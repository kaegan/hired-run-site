const PREREQS = [
  "The Claude desktop app — plugins do not run on web or mobile",
  "Notion connector — bring your own tracking board, or let setup build one",
  "Gmail connector — read-only, see the section below",
  "Chrome browser tools are optional; most descriptions come from public ATS APIs",
  "Slack connector — optional, outbound only, posts run results to a channel you pick",
];

export function Install() {
  return (
    <section id="install" className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="grid gap-x-8 gap-y-3 lg:grid-cols-[3rem_1fr]">
        <span
          aria-hidden
          className="hidden font-mono text-micro text-muted-foreground/50 lg:block"
        >
          02
        </span>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            Two commands, one interview
          </h2>
          <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-muted-foreground">
            Run the two commands above, then say the line under them.
          </p>

          <ul className="mt-8 divide-y divide-border border-t border-border">
            {PREREQS.map((p) => (
              <li
                key={p}
                className="py-3 text-sm leading-relaxed text-muted-foreground"
              >
                {p}
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
            Answer the interview with{" "}
            <span className="font-mono text-foreground">
              &quot;set up my job search pipeline&quot;
            </span>
            . Bring 3–5 postings you want and 1–2 you passed on — the passes
            are usually the sharper signal. Setup ends by scoring real
            postings in front of you, so the rubric is cheap to correct while
            it&apos;s still wrong.
          </p>
        </div>
      </div>
    </section>
  );
}
