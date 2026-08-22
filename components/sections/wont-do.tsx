import trust from "@/content/generated/trust.json";
import meta from "@/content/generated/meta.json";

export function WontDo() {
  return (
    <section
      id="wont-do"
      className="border-y border-border bg-card py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-x-8 gap-y-3 lg:grid-cols-[3rem_1fr]">
          <span
            aria-hidden
            className="hidden font-mono text-micro text-muted-foreground/50 lg:block"
          >
            03
          </span>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              The guarantees are in the source
            </h2>

            <p className="mt-4 font-mono text-micro uppercase tracking-[0.1em] text-muted-foreground">
              Verified at build time · hired@{meta.plugin.version} ·{" "}
              {trust.length}/{trust.length} quotes matched
            </p>

            <ol className="mt-4 divide-y divide-border border-t border-border">
              {trust.map((t, i) => (
                <li key={t.id} className="group py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-micro text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-sm font-semibold">{t.title}</h3>
                    </div>
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
                  <blockquote className="mt-2.5 border-l-2 border-border pl-3 font-mono text-xs leading-relaxed text-muted-foreground sm:ml-7">
                    “{t.quote}”
                  </blockquote>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
