import meta from "@/content/generated/meta.json";

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-border">
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
          <span className="font-mono text-micro text-muted-foreground/70">
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
