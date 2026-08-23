import meta from "@/content/generated/meta.json";
import { CopyButton } from "@/components/copy-button";
import { Eyebrow } from "@/components/eyebrow";

/**
 * The commands, what you need, and what the interview actually covers.
 *
 * Two columns: the commands and the connector list hold a left rail, the
 * interview runs down the right as cards. The steps were a plain ordered
 * list under a narrow column before, which buried the one step that
 * matters most — setup ends by scoring two roles you already have an
 * opinion about, and lets you fix the rubric when it gets them wrong.
 * That step is the last card and the only highlighted one.
 *
 * Step wording follows plugins/hired/skills/setup-pipeline/SKILL.md.
 */

const STEPS = [
  {
    title: "About you",
    body: "Where you'll work and whether that's a hard filter, the titles you're going after, the scope you've carried, deal breakers, and your comp floor.",
  },
  {
    title: "Real postings",
    body: "3–5 you'd actually apply to, plus 1–2 you passed on. It reads them, pulls out the dimensions that vary, and asks about the ones you never mentioned.",
  },
  {
    title: "Your rubric, read back",
    body: "Dimensions and what pushes a role up or down each one, hard filters, standout logic, and what every tier means in your words. Nothing saves until you've heard it.",
  },
  {
    title: "Your board",
    body: "Paste your existing database and it reads your property names and types, then maps to them — adding only what's missing, and only if you say yes. No board yet? It builds one.",
  },
  {
    title: "Inbox scope & schedule",
    body: "You name which job-alert senders may create records, and how often the runs fire. Status mail is scanned more widely, because it can only ever update a role already on your board.",
  },
  {
    title: "Then it proves it",
    body: "Setup doesn't end on a promise. You name two roles you already have an opinion about — one you'd apply to, one you'd skip — and it scores both in front of you. If the scores don't match your gut, you fix the rubric, not the scores.",
    highlight: true,
  },
];

const PREREQS = [
  {
    name: "Claude desktop",
    note: "Required — plugins don't run on web or mobile",
  },
  { name: "Notion", note: "Your board, or setup builds one" },
  { name: "Gmail", note: "Read-only, senders you name" },
  { name: "Slack", note: "Optional, outbound only" },
  {
    name: "Chrome browser tools",
    note: "Optional — most descriptions come from public ATS APIs",
    wide: true,
  },
];

export function Install() {
  const installBlock = meta.install.join("\n");

  return (
    <section id="install" className="border-b border-border">
      <div className="mx-auto grid w-full max-w-6xl gap-x-12 gap-y-12 px-6 py-20 lg:grid-cols-2 lg:items-start">
        <div>
          <Eyebrow>Setup</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Two commands, one interview
          </h2>
          <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-muted-foreground">
            Paste these into Claude desktop, then say{" "}
            <span className="font-mono text-foreground">
              &quot;set up my job search pipeline&quot;
            </span>
            . That starts one conversation, run once — and it ends by proving
            itself on real postings.
          </p>

          <div className="mt-6 overflow-hidden rounded-lg border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
              <span className="font-mono text-micro text-muted-foreground">
                Claude desktop · any session
              </span>
              <CopyButton text={installBlock} />
            </div>
            <pre className="overflow-x-auto px-3 py-3 font-mono text-xs leading-6 sm:text-sm">
              {meta.install.map((cmd) => (
                <div key={cmd}>
                  <span className="select-none text-primary">&gt; </span>
                  {cmd}
                </div>
              ))}
            </pre>
          </div>

          <p className="mt-8 font-mono text-micro uppercase tracking-[0.1em] text-muted-foreground">
            What you need first
          </p>
          <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {PREREQS.map((p) => (
              <li
                key={p.name}
                className={`rounded-lg border border-border bg-card px-4 py-3 ${
                  p.wide ? "sm:col-span-2" : ""
                }`}
              >
                <p className="text-sm font-semibold">{p.name}</p>
                <p className="mt-1 text-meta leading-relaxed text-muted-foreground">
                  {p.note}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-micro uppercase tracking-[0.1em] text-muted-foreground">
            What the interview covers
          </p>
          <ol className="mt-3 space-y-2.5">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                className={`flex gap-4 rounded-lg border px-4 py-3.5 ${
                  s.highlight
                    ? "border-primary-line bg-primary-surface"
                    : "border-border bg-card"
                }`}
              >
                <span
                  className={`mt-0.5 shrink-0 font-mono text-micro ${
                    s.highlight
                      ? "text-primary-surface-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3
                    className={`text-sm font-semibold ${
                      s.highlight ? "text-primary-surface-foreground" : ""
                    }`}
                  >
                    {s.title}
                  </h3>
                  <p
                    className={`mt-1 text-meta leading-relaxed ${
                      s.highlight ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
