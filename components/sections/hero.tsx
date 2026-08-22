import meta from "@/content/generated/meta.json";
import { GithubIcon } from "@/components/github-icon";
import { CopyButton } from "@/components/copy-button";

export function Hero() {
  const installBlock = meta.install.join("\n");

  return (
    <header className="mx-auto w-full max-w-6xl px-6 pt-8">
      <nav className="flex items-center justify-between py-4">
        <span className="font-mono text-sm font-semibold">
          <span className="text-primary">▸</span> hired.run
        </span>
        <div className="flex items-center gap-5 text-sm text-muted-foreground">
          <a
            href="/changelog"
            className="transition-colors hover:text-foreground"
          >
            Changelog
          </a>
          <a
            href={meta.marketplace.repoUrl}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <GithubIcon className="size-4" />
            GitHub
          </a>
        </div>
      </nav>

      <div className="grid gap-8 pb-12 pt-10 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div className="max-w-[38ch]">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-display">
            An analyst for your job search.
            <br />
            <span className="text-muted-foreground">Not an apply-bot.</span>
          </h1>

          <p className="mt-5 max-w-[52ch] text-lead leading-relaxed text-muted-foreground">
            <span className="font-mono text-foreground">hired</span> reads
            your inbox, scores each role against a rubric{" "}
            <em className="not-italic text-foreground">you</em> write, and
            keeps a Notion board current. It never applies to anything.
          </p>
        </div>

        <div className="w-full max-w-[46ch] lg:ml-auto">
          <div className="overflow-hidden rounded-lg border border-border bg-card">
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
          <p className="mt-2.5 font-mono text-micro text-muted-foreground">
            then say{" "}
            <span className="text-foreground">
              &quot;set up my job search pipeline&quot;
            </span>
          </p>
        </div>
      </div>
    </header>
  );
}
