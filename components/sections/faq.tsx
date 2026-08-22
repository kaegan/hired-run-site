import { SectionLabel } from "@/components/section-label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Why the desktop app only?",
    a: "Plugins and connectors (Notion, Gmail) run in the Claude desktop app. You can read your board from anywhere — Notion is Notion — but the pipeline itself needs the desktop app to run.",
  },
  {
    q: "Does it work with my existing Notion board?",
    a: "Yes. Setup reads your property names and types, maps them to what the pipeline needs, offers to add anything missing, and uses your status vocabulary throughout. It never renames, retypes, or deletes anything you already have.",
  },
  {
    q: "What does it cost?",
    a: "The plugin is free and MIT-licensed. You pay for your own Claude subscription; Notion and Gmail are your own accounts. Nothing touches a server of ours — there isn't one.",
  },
  {
    q: "Will it apply to jobs for me?",
    a: "No, on purpose. Auto-applied volume reads as spam to recruiters and applicant tracking systems, and it turns your search into a numbers game you lose. The bet here is the opposite: better decisions about fewer applications. The pipeline triages; you apply.",
  },
  {
    q: "Can I change the rubric later?",
    a: "Yes — the rubric is a plain-language Notion page. Edit it whenever a score annoys you and the next run scores by the new rules. When a score is wrong, fix the rule that produced it, not the score.",
  },
  {
    q: "How do I update the plugin?",
    a: "New versions are published to the GitHub marketplace. Run /plugin in Claude to manage your installed plugins and marketplaces and pull the latest version.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto w-full max-w-3xl px-6 py-16">
      <SectionLabel index="05">FAQ</SectionLabel>
      <h2 className="text-2xl font-semibold tracking-tight">
        Reasonable questions
      </h2>

      <Accordion type="single" collapsible className="mt-8">
        {FAQS.map((f) => (
          <AccordionItem key={f.q} value={f.q}>
            <AccordionTrigger>{f.q}</AccordionTrigger>
            <AccordionContent className="leading-relaxed">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
