import trust from "@/content/generated/trust.json";
import meta from "@/content/generated/meta.json";
import { Eyebrow } from "@/components/eyebrow";

/**
 * The four promises, each quoted from the published plugin and matched
 * at build time by scripts/sync-content.mjs.
 *
 * Laid out as a two-column grid with the verification stamp aligned to
 * the heading. As a single full-width ordered list the four quotes ran
 * the length of a screen for four short sentences, and the "01..04"
 * numbering implied a sequence that does not exist — these are four
 * independent guarantees, not four steps.
 */
export function WontDo() {
  return (
    <section id="wont-do" className="border-b border-border bg-card py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div className="max-w-[52ch]">
            <Eyebrow>Guarantees</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              The guarantees are in the source
            </h2>
          </div>
          <p className="font-mono text-micro leading-relaxed text-muted-foreground sm:text-right">
            Verified at build time
            <br />
            hired@{meta.plugin.version} · {trust.length}/{trust.length} quotes
            matched
          </p>
        </div>

        <ul className="mt-8 grid gap-x-10 sm:grid-cols-2">
          {trust.map((t) => (
            <li key={t.id} className="group border-t border-border py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-sm font-semibold">{t.title}</h3>
                <a
                  href={t.sourceUrl}
                  className="font-mono text-micro text-muted-foreground transition-colors group-hover:text-primary"
                >
                  {t.sourcePath.replace("/SKILL.md", "")}
                  <span className="ml-1 opacity-0 transition-opacity group-hover:opacity-100">
                    ↗
                  </span>
                </a>
              </div>
              <blockquote className="mt-2.5 border-l-2 border-primary-line pl-3 font-mono text-xs leading-relaxed text-muted-foreground">
                “{t.quote}”
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
