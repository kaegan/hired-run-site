import meta from "@/content/generated/meta.json";
import { GithubIcon } from "@/components/github-icon";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/copy-button";

export function Hero() {
  const installBlock = meta.install.join("\n");

  return (
    <header className="mx-auto w-full max-w-3xl px-6 pt-8">
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

      <div className="pb-16 pt-16 sm:pt-24">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs">
            v{meta.plugin.version}
          </Badge>
          <Badge variant="outline" className="font-mono text-xs">
            {meta.plugin.license}
          </Badge>
          <Badge variant="outline" className="font-mono text-xs">
            Runs in the Claude desktop app
          </Badge>
        </div>

        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          An analyst for your job search.
          <br />
          <span className="text-muted-foreground">Not an apply-bot.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          <span className="font-mono text-foreground">hired</span> is a Claude
          plugin that reads your inbox for new roles, fetches the real job
          description, scores each one against a rubric{" "}
          <em className="not-italic text-foreground">you</em> write, and keeps
          it all on a Notion board you own. Every morning: one sorted view, a
          two-sentence reason per role. It never applies to anything.
        </p>

        <div className="mt-10 overflow-hidden rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-2">
            <span className="font-mono text-xs text-muted-foreground">
              Claude desktop · any session
            </span>
            <CopyButton text={installBlock} />
          </div>
          <pre className="overflow-x-auto px-4 py-4 font-mono text-sm leading-7">
            {meta.install.map((cmd) => (
              <div key={cmd}>
                <span className="select-none text-primary">&gt; </span>
                {cmd}
              </div>
            ))}
          </pre>
        </div>
        <p className="mt-3 font-mono text-xs text-muted-foreground">
          then say{" "}
          <span className="text-foreground">
            &quot;set up my job search pipeline&quot;
          </span>
        </p>
      </div>
    </header>
  );
}
