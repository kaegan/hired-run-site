import meta from "@/content/generated/meta.json";
import { CopyButton } from "@/components/copy-button";

/**
 * The page used to end on the last FAQ answer, which meant the only
 * install commands on it were 3,000 pixels up in the hero. The closing
 * band repeats them rather than inventing a second call to action —
 * someone who read to the bottom is exactly the person who wants them.
 */
export function SiteFooter() {
  const installBlock = meta.install.join("\n");

  return (
    <footer>
      <div className="border-y border-border bg-card">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-14 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-2xl font-semibold tracking-tight">
              Two commands, one interview.
            </p>
            <p className="mt-2 max-w-[46ch] text-base leading-relaxed text-muted-foreground">
              Free and {meta.plugin.license}-licensed. Runs on your own Claude,
              Notion and Gmail — it never applies to anything.
            </p>
          </div>

          <div className="w-full max-w-[46ch] lg:shrink-0">
            <div className="overflow-hidden rounded-lg border border-border bg-background shadow-card">
              <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
                <span className="font-mono text-micro text-muted-foreground">
                  Claude desktop · any session
                </span>
                <CopyButton text={installBlock} />
              </div>
              <pre className="overflow-x-auto px-3 py-3 font-mono text-xs leading-6 sm:text-sm">
                {meta.install.map((cmd) => (
                  <div key={cmd}>
                    <span className="select-none text-primary">&gt; </span>
                    {cmd}
                  </div>
                ))}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <a
            href={meta.marketplace.repoUrl}
            className="transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href="/changelog"
            className="transition-colors hover:text-foreground"
          >
            Changelog
          </a>
          <a
            href="/privacy"
            className="transition-colors hover:text-foreground"
          >
            Privacy
          </a>
          <span className="font-mono text-micro text-muted-foreground-dim">
            v{meta.plugin.version} · {meta.plugin.license} · runs in the
            Claude desktop app
          </span>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          built by{" "}
          <a
            href="https://kaegan.ai"
            className="text-foreground transition-colors hover:text-primary"
          >
            Kaegan Donnelly
          </a>
        </p>
      </div>
    </footer>
  );
}
