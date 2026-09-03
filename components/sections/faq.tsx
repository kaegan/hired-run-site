import { Eyebrow } from "@/components/eyebrow";

/**
 * Answers open, in two columns.
 *
 * These were behind an accordion, which is the wrong control for six
 * questions whose answers are the reassurance the page exists to give.
 * Collapsed, every one reads as something being kept back — and the two
 * about the resume are exactly the ones a reader wants answered without
 * having to ask for them.
 */
const FAQS = [
  {
    q: "Why the desktop app only?",
    a: "Plugins and connectors — Notion, Gmail — run in the Claude desktop app. You can read your board from anywhere; running the pipeline itself needs the app.",
  },
  {
    q: "Does it work with my existing Notion board?",
    a: "Yes. Setup reads your property names and types, maps them to what it needs, and offers to add anything missing. It never renames, retypes, or deletes what you already have.",
  },
  {
    q: "What does it cost?",
    a: "Free and MIT-licensed. You pay for your own Claude subscription; Notion and Gmail are your own accounts. Nothing touches a server of ours — there isn't one.",
  },
  {
    q: "Can I change the rubric later?",
    a: "Yes — the rubric is a plain-language Notion page. Edit it whenever a score annoys you; the next run scores by the new rule. If a score is wrong because a fact about you is wrong, that's the Experience page instead, and the difference matters: editing the rubric around a stale fact leaves a rule that misfires on every future role.",
  },
  {
    q: "Do I have to give it my resume?",
    a: "No. Without one it scores off the proof points you give it during setup. With one, summaries get specific: which of your accomplishments maps to the posting, and what the posting wants that nothing in your background covers. Cover letters you actually sent help too — they show how you pitch yourself.",
  },
  {
    q: "What happens to my resume?",
    a: "It gets read. The extracted profile lands on a Notion page next to your rubric, in your own workspace, and that is the only place it goes — not to Slack, not to a job application, not to a server of ours. Nothing edits or rewrites the file, and the rubric still decides what matters: your resume says what is true about you, never what you want.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto w-full max-w-6xl px-6 py-20">
      <Eyebrow>Questions</Eyebrow>
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight">
        Before you install
      </h2>

      <dl className="mt-8 grid gap-x-12 sm:grid-cols-2">
        {FAQS.map((f) => (
          <div key={f.q} className="border-t border-border py-5">
            <dt className="text-base font-semibold">{f.q}</dt>
            <dd className="mt-2 max-w-[56ch] text-base leading-relaxed text-muted-foreground">
              {f.a}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
