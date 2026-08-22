import skills from "@/content/generated/skills.json";
import { NotionConfig } from "@/components/notion-config";
import { ClaudeRun } from "@/components/claude-run";
import { SlackUpdate } from "@/components/slack-update";
import { PipelineBoard } from "@/components/pipeline-board";

/**
 * "One morning with hired" — four illustrations of one night's run,
 * each grounded in the same invented dataset (see how-it-works-data.ts
 * and pipeline-board-data.ts) so the story can't drift block to block.
 *
 * Replaces the old full-bleed board + skill-list pairing: this section
 * cites each skill from the synced plugin content instead of listing
 * them separately, and shows the board as chapter three of the story
 * rather than as a standalone hero visualization.
 */

const SKILLS_BY_SLUG = Object.fromEntries(
  skills.map((skill) => [skill.slug, skill])
);

function SkillLink({ slug }: { slug: string }) {
  const skill = SKILLS_BY_SLUG[slug];
  if (!skill) return <span>{slug}</span>;
  return (
    <a
      href={skill.sourceUrl}
      className="transition-colors hover:text-foreground hover:underline"
    >
      {slug}
    </a>
  );
}

function BlockFooter({ slugs, label }: { slugs?: string[]; label?: string }) {
  return (
    <p className="mt-5 border-t border-border pt-3 font-mono text-micro text-muted-foreground">
      {slugs
        ? slugs.map((slug, i) => (
            <span key={slug}>
              {i > 0 && " · "}
              <SkillLink slug={slug} />
            </span>
          ))
        : label}
    </p>
  );
}

type BlockProps = {
  step: string;
  when: string;
  title: string;
  body: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
  /** Stacks the text above a full-width illustration instead of beside
   * it. The board is the one illustration that genuinely needs the
   * width — in a side column it shows two and a half columns and stops
   * reading as a board at all. */
  stacked?: boolean;
};

function Block({ step, when, title, body, footer, children, stacked }: BlockProps) {
  const text = (
    <div className={stacked ? "max-w-[62ch]" : "lg:sticky lg:top-12 lg:self-start"}>
      <p className="font-mono text-micro text-muted-foreground/50">{step}</p>
      <p className="mt-1.5 font-mono text-xs font-semibold text-primary">
        {when}
      </p>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h3>
      <div className="mt-3 text-base leading-relaxed text-muted-foreground">
        {body}
      </div>
      {footer}
    </div>
  );

  if (stacked) {
    return (
      <div>
        {text}
        <div className="mt-8 overflow-hidden">{children}</div>
      </div>
    );
  }

  return (
    <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(16rem,21rem)_minmax(0,1fr)] lg:items-start">
      {text}
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="max-w-[62ch]">
        <h2 className="text-3xl font-semibold tracking-tight">
          One morning with hired
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Setup interviews you once. After that, a scheduled run does the
          reading and scoring — you mostly just wake up to a board that
          moved.
        </p>
      </div>

      <div className="mt-16 space-y-24">
        <Block
          step="01"
          when="You, once"
          title="It interviews you, then writes it down"
          body={
            <p>
              Setup is a conversation, not a form. What comes out of it is
              an ordinary Notion page you can read and edit — your profile,
              your weighted rubric, your hard filters. There is no settings
              screen, because this is the settings screen.
            </p>
          }
          footer={<BlockFooter slugs={["setup-pipeline"]} />}
        >
          <NotionConfig />
        </Block>

        <Block
          step="02"
          when="06:00, daily"
          title="Then it runs without you"
          body={
            <p>
              A scheduled run opens your inbox, pulls the full posting for
              anything new, and scores it against the rubric you wrote —
              citing the criteria by name, so you can argue with it. Forty
              seconds, and nobody applied to anything.
            </p>
          }
          footer={
            <BlockFooter slugs={["email-scan", "fetch-jd", "score-roles"]} />
          }
        >
          <ClaudeRun />
        </Block>

        <Block
          step="03"
          when="06:04"
          title="You wake up to a board that moved"
          body={
            <p>
              Two roles that weren&apos;t there last night, one scored for
              the first time, one that advanced because a recruiter
              replied — each one marked right on the board you already
              use. Nothing to compare against; the run already did that
              part.
            </p>
          }
          footer={<BlockFooter label="the result" />}
          stacked
        >
          <PipelineBoard />
        </Block>

        <Block
          step="04"
          when="06:04"
          title="And a message where you already are"
          body={
            <p>
              Every run posts what changed to the Slack channel you picked
              during setup — what&apos;s worth a look, what needs a reply
              from you, and what it handled without bothering you. Most
              mornings you read three lines on your phone and never open
              the board.
            </p>
          }
          footer={<BlockFooter slugs={["notify-slack"]} />}
        >
          <SlackUpdate />
        </Block>
      </div>
    </section>
  );
}
