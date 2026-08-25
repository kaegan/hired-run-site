import trust from "@/content/generated/trust.json";
import meta from "@/content/generated/meta.json";
import { Eyebrow } from "@/components/eyebrow";

/**
 * The four promises. scripts/sync-content.mjs matches each one against a
 * line in the published plugin and fails the build when it drifts.
 *
 * Each card states the claim in plain prose, then shows the source line
 * under it as a file excerpt: path, line number, monospace, no quotation
 * marks. These were blockquotes with curly quotes and a green rule, which
 * is how a site styles a testimonial. Readers took them for praise
 * someone wrote about the product. They are the literal text of a file,
 * so the whole excerpt links to that line on GitHub.
 */
export function WontDo() {
  return (
    <section id="wont-do" className="border-b border-border bg-card py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div className="max-w-[52ch]">
            <Eyebrow>Guarantees</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Check any of these against the source
            </h2>
          </div>
          <p className="font-mono text-micro leading-relaxed text-muted-foreground sm:text-right">
            The build re-reads these files
            <br />
            hired@{meta.plugin.version} · {trust.length}/{trust.length} lines
            matched
          </p>
        </div>

        <ul className="mt-8 grid gap-x-10 sm:grid-cols-2">
          {trust.map((t) => {
            const line = t.sourceUrl.split("#L")[1];

            return (
              <li key={t.id} className="border-t border-border py-5">
                <h3 className="text-sm font-semibold">{t.title}</h3>
                <p className="mt-1.5 max-w-[52ch] text-meta leading-relaxed text-muted-foreground">
                  {t.note}
                </p>

                <a
                  href={t.sourceUrl}
                  className="group mt-3 block overflow-hidden rounded-md border border-border bg-card-inset transition-colors hover:border-primary-line"
                >
                  <span className="flex items-center justify-between gap-3 border-b border-border px-3 py-1.5 font-mono text-micro text-muted-foreground transition-colors group-hover:text-primary">
                    <span className="truncate">
                      {t.sourcePath}
                      {line ? `:${line}` : ""}
                    </span>
                    <span
                      aria-hidden
                      className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      ↗
                    </span>
                  </span>
                  <span className="block px-3 py-2.5 font-mono text-xs leading-relaxed text-muted-foreground">
                    {t.quote}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
