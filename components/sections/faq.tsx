import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    a: "Yes — the rubric is a plain-language Notion page. Edit it whenever a score annoys you; the next run scores by the new rule.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto w-full max-w-6xl px-6 py-14">
      <div className="grid gap-x-8 gap-y-3 lg:grid-cols-[3rem_1fr]">
        <span
          aria-hidden
          className="hidden font-mono text-micro text-muted-foreground/50 lg:block"
        >
          04
        </span>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            Reasonable questions
          </h2>

          <Accordion type="single" collapsible className="mt-6 max-w-[62ch]">
            {FAQS.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent className="leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
