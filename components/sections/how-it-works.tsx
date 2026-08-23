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
 *
 * The four blocks are full-bleed bands separated by hairlines and
 * alternating surfaces, not a `space-y` stack. Four long blocks divided
 * only by whitespace read as four unrelated pages; ruled off, they read
 * as one night, in order.
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
  /** Every other band sits on --card-inset, so the sequence has a beat.
   * Not --card: the illustrations are themselves --card, and a card on a
   * card-coloured band survives only as a border. Page → inset → card is
   * a three-step ladder that holds in both themes. */
  tint?: boolean;
};

function Block({
  step,
  when,
  title,
  body,
  footer,
  children,
  stacked,
  tint,
}: BlockProps) {
  const text = (
    <div className={stacked ? "max-w-[62ch]" : "lg:self-start"}>
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

  const inner = stacked ? (
    <div>
      {text}
      <div className="mt-8 overflow-hidden">{children}</div>
    </div>
  ) : (
    <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(16rem,21rem)_minmax(0,1fr)] lg:items-start">
      {text}
      <div className="min-w-0">{children}</div>
    </div>
  );

  return (
    <div
      className={
        tint
          ? "border-b border-border bg-card-inset"
          : "border-b border-border"
      }
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">{inner}</div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works">
      <div className="border-t border-border">
        <Block
          step="01"
          when="You, once"
          title="It interviews you, then writes it down"
          body={
            <>
              <p>
                Setup is a simple conversation. Teach Hired what you&apos;re
                looking for by answering some questions, providing a resume,
                and showing it some postings of the type of job you&apos;re
                looking for.
              </p>
              <p className="mt-3">
                What comes out of it is an ordinary Notion page that you can
                read and edit. As Hired pulls jobs for it, you or it can hone
                in the rubric more to your taste.
              </p>
            </>
          }
          footer={<BlockFooter slugs={["setup-pipeline", "load-experience"]} />}
        >
          <NotionConfig />
        </Block>

        <Block
          step="02"
          tint
          when="06:00, daily"
          title="Then it runs without you"
          body={
            <p>
              A scheduled run opens your inbox, pulls the full posting for
              anything new, and scores it against the rubric you wrote.
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
          title="You wake up to new job opportunities"
          body={
            <p>
              Your board automatically updates multiple times through the
              day, adding new opportunities, and moving existing ones
              through the board as updates come in from recruiters.
            </p>
          }
          footer={<BlockFooter label="the result" />}
          stacked
        >
          <PipelineBoard />
        </Block>

        <Block
          step="04"
          tint
          when="06:04"
          title="Get updates on high fit new roles right away"
          body={
            <p>
              Every run posts what happened to a Slack channel you picked
              during setup. Most mornings you can read what happened from
              your phone without having to even open the board.
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
