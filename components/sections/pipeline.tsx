import skills from "@/content/generated/skills.json";
import { Badge } from "@/components/ui/badge";

const SKILL_TARGETS: Record<string, string> = {
  "setup-pipeline": "defines the columns above",
  "email-scan": "creates the card",
  "fetch-jd": "fills in the posting link",
  "score-roles": "writes the fit chip",
};

const coreSkills = skills.filter((skill) => !("optional" in skill));
const optionalSkills = skills.filter((skill) => "optional" in skill);

export function Pipeline() {
  return (
    <section
      id="how-it-works"
      className="mx-auto w-full max-w-6xl px-6 py-20"
    >
      <div className="grid gap-x-8 gap-y-3 lg:grid-cols-[3rem_1fr]">
        <span
          aria-hidden
          className="hidden font-mono text-micro text-muted-foreground/50 lg:block"
        >
          01
        </span>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            Five skills, one pipeline
          </h2>
          <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-muted-foreground">
            Setup interviews you once. After that, two scheduled runs keep the
            board current — you mostly just read it.
          </p>

          <ol className="mt-8 divide-y divide-border border-t border-border">
            {coreSkills.map((skill) => (
              <li
                key={skill.slug}
                data-skill={skill.slug}
                className="flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <div className="flex items-baseline gap-3 sm:w-[15rem] sm:shrink-0">
                  <span className="font-mono text-micro text-muted-foreground">
                    {String(skill.step).padStart(2, "0")}
                  </span>
                  <a
                    href={skill.sourceUrl}
                    className="font-mono text-sm font-semibold hover:text-primary hover:underline"
                  >
                    {skill.slug}
                  </a>
                </div>
                <div className="flex-1">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {skill.does}
                  </p>
                  {SKILL_TARGETS[skill.slug] && (
                    <p className="mt-1 font-mono text-micro text-muted-foreground/70">
                      <span aria-hidden>↑ </span>
                      {SKILL_TARGETS[skill.slug]}
                    </p>
                  )}
                </div>
                <code className="font-mono text-micro text-muted-foreground sm:w-[15rem] sm:shrink-0 sm:text-right">
                  {skill.say}
                </code>
              </li>
            ))}
          </ol>

          {optionalSkills.map((skill) => (
            <div
              key={skill.slug}
              data-skill={skill.slug}
              className="flex flex-col gap-2 border-t border-dashed border-border py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <div className="flex items-baseline gap-3 sm:w-[15rem] sm:shrink-0">
                <Badge variant="outline" size="sm">
                  optional
                </Badge>
                <a
                  href={skill.sourceUrl}
                  className="font-mono text-sm font-semibold hover:text-primary hover:underline"
                >
                  {skill.slug}
                </a>
              </div>
              <div className="flex-1">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {skill.does}
                </p>
              </div>
              <code className="font-mono text-micro text-muted-foreground sm:w-[15rem] sm:shrink-0 sm:text-right">
                {skill.say}
              </code>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
