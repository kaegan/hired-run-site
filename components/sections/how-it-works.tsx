import skills from "@/content/generated/skills.json";
import { Eyebrow } from "@/components/eyebrow";
import { NotionConfig } from "@/components/notion-config";
import { ClaudeRun } from "@/components/claude-run";
import { SlackUpdate } from "@/components/slack-update";
import { PipelineBoard } from "@/components/pipeline-board";

/**
 * "One morning with hired" — four illustrations of one night's run,
 * each grounded in the same invented dataset (see how-it-works-data.ts
 * and pipeline-board-data.ts) so the story can't drift block to block.
 *
 * The section opens with a real heading. It used to start on a faint
 * "01", which left the nav's "How it works" and the hero's primary
 * button pointing at a destination with no name — and let the FAQ's
 * old title claim the job instead.
 *
 * The four chapters are full-bleed bands separated by hairlines and
 * alternating surfaces, not a `space-y` stack. Four long blocks divided
 * only by whitespace read as four unrelated pages; ruled off, they read
 * as one night, in order. Chapter titles sit one step below the section
 * h2, so the page reads as sections containing chapters rather than as
 * eight equal sections.
 *
 * Each chapter used to carry a mono footer naming the skills it ran.
 * Those links are useful to exactly one reader — the one about to open
 * the source — and noise to everyone else, so they now sit once, at the
 * end of the section, in the order the skills fire.
 */

const SKILLS_BY_SLUG = Object.fromEntries(
  skills.map((skill) => [skill.slug, skill])
);

const SKILL_ORDER = [
  "setup-pipeline",
  "load-experience",
  "email-scan",
  "fetch-jd",
  "score-roles",
  "notify-slack",
];

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

type BlockProps = {
  when: string;
  title: string;
  body: React.ReactNode;
  children: React.ReactNode;
  /** Stacks the text above a full-width illustration instead of beside
   * it. The board is the one illustration that genuinely needs the
   * width — in a side column it shows two and a half columns and stops
   * reading as a board at all. */
  stacked?: boolean;
  /** Every other band sits on --band, so the sequence has a beat. Not
   * --card: the illustrations are themselves --card, and a card on a
   * card-coloured band survives only as a border. Page → band → card is
   * a three-step ladder that holds in both themes. */
  tint?: boolean;
};

function Block({
  when,
  title,
  body,
  children,
  stacked,
  tint,
}: BlockProps) {
  const text = (
    <div className={stacked ? "max-w-[62ch]" : "lg:self-start"}>
      <p className="font-mono text-xs font-semibold text-primary">{when}</p>
      <h3 className="mt-3 text-balance text-2xl font-semibold tracking-tight">
        {title}
      </h3>
      <div className="mt-3 text-[17px] leading-7 text-muted-foreground">
        {body}
      </div>
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
        tint ? "border-b border-border bg-band" : "border-b border-border"
      }
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">{inner}</div>
    </div>
  );
}

export function HowItWorks({ now }: { now: number }) {
  return (
    <section id="how-it-works">
      <div className="mx-auto w-full max-w-6xl px-6 pb-4 pt-20">
        <Eyebrow>How it works</Eyebrow>
        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight">
          One morning with hired
        </h2>
      </div>

      <div>
        <Block
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
        >
          <NotionConfig />
        </Block>

        <Block
          tint
          when="06:00, daily"
          title="Then it runs without you"
          body={
            <p>
              A scheduled run opens your inbox, pulls the full posting for
              anything new, and scores it against the rubric you wrote.
            </p>
          }
        >
          <ClaudeRun />
        </Block>

        <Block
          when="06:04"
          title="You wake up to new job opportunities"
          body={
            <p>
              Your board automatically updates multiple times through the
              day, adding new opportunities, and moving existing ones
              through the board as updates come in from recruiters.
            </p>
          }
          stacked
        >
          <PipelineBoard now={now} />
        </Block>

        <Block
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
        >
          <SlackUpdate />
        </Block>
      </div>

      <div className="border-b border-border">
        <p className="mx-auto w-full max-w-6xl px-6 py-6 font-mono text-micro text-muted-foreground">
          <span className="text-muted-foreground-dim">
            Skills, in the order they run
          </span>
          {" · "}
          {SKILL_ORDER.map((slug, i) => (
            <span key={slug}>
              {i > 0 && " · "}
              <SkillLink slug={slug} />
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
