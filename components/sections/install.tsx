/**
 * What setup actually does, step by step. The earlier version listed the
 * prerequisites and left the interview itself as one vague sentence —
 * the part people most want to know before running a plugin against
 * their inbox and their board.
 */

const STEPS = [
  {
    title: "It asks about you",
    body: "Where you'll work and whether location is a hard filter, the titles you're going after, years and scope, deal breakers, and your comp floor.",
  },
  {
    title: "You paste real postings",
    body: "3–5 you'd actually apply to, plus 1–2 you passed on. It reads them, pulls out the dimensions that vary, and asks about the ones you didn't mention.",
  },
  {
    title: "It writes your rubric",
    body: "Dimensions, hard filters, company signals, and what High or Low mean in your words. It reads the draft back before saving anything.",
  },
  {
    title: "It maps your Notion board",
    body: "Paste your existing database and it reads your property names and types, then maps to them — adding only what's missing, and only if you say yes. No board yet? It builds one.",
  },
  {
    title: "You set the inbox scope",
    body: "You name which job-alert senders are allowed to create records. Status mail is scanned more widely, because it can only ever update a role already on your board.",
  },
  {
    title: "It schedules the runs",
    body: "A scan and a scoring pass, at a frequency you choose — every couple of hours if you're searching hard, daily if you're watching.",
  },
  {
    title: "Then it proves it",
    body: "Setup doesn't end on a promise. It runs the scan live, scores what it found in front of you, and asks whether the scores match your gut. If they don't, you fix the rubric right there.",
  },
];

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
            Run the two commands above, then say{" "}
            <span className="font-mono text-foreground">
              &quot;set up my job search pipeline&quot;
            </span>
            . That starts one conversation, run once. Here is every part
            of it, in order.
          </p>

          <ol className="mt-8 max-w-[70ch] divide-y divide-border border-t border-border">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4 py-5">
                <span className="mt-0.5 font-mono text-micro text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-10 font-mono text-micro uppercase tracking-[0.1em] text-muted-foreground">
            What you need first
          </p>
          <ul className="mt-3 max-w-[70ch] divide-y divide-border border-t border-border">
            {PREREQS.map((p) => (
              <li
                key={p}
                className="py-3 text-sm leading-relaxed text-muted-foreground"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
