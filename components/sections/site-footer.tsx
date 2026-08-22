import meta from "@/content/generated/meta.json";

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-border">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5 text-sm text-muted-foreground">
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
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          {meta.plugin.license} · built by{" "}
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
