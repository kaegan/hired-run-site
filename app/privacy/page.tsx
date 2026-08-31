import type { Metadata } from "next";

import { SiteFooter } from "@/components/sections/site-footer";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What this site and the hired plugin do with your data.",
};

export default function PrivacyPage() {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-12">
        <a
          href="/"
          className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="text-primary">▸</span> hired.run
        </a>
        <h1 className="mt-10 text-3xl font-semibold tracking-tight">Privacy</h1>

        <div className="mt-6 max-w-[62ch] space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            <strong className="text-foreground">This site</strong> measures
            two things: anonymous, cookie-less page counts (Vercel Analytics),
            and how the page actually gets read (PostHog), which records
            pageviews, clicks, and scrolling as a replayable session. No
            accounts, no ads, no data sold or shared. PostHog stores an
            identifier in your browser so a second visit isn&apos;t counted as
            a stranger, and its requests are proxied through hired.run rather
            than sent to a third-party domain. Sessions are anonymous — no
            name, no email, and the text of any input is masked before it
            leaves your browser — and they are deleted after 30 days.
          </p>
          <p>
            <strong className="text-foreground">The plugin</strong> runs
            entirely inside your own Claude desktop app, using your own
            Notion, Gmail, and (if you turn it on) Slack connections. Your
            email, your board, and your rubric never touch a server we
            control — there isn&apos;t one. The plugin is a set of markdown
            instruction files; you can read every line of what it does on{" "}
            <a
              href="https://github.com/kaegan/hired-run"
              className="text-primary underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
          <p>
            <strong className="text-foreground">
              Your resume and cover letters
            </strong>{" "}
            are optional, and read-only. If you point the plugin at them, it
            reads them and writes the extracted profile to a page in your own
            Notion, beside your rubric. It never edits or rewrites the file,
            never posts its contents to Slack, and never attaches it to an
            application — this plugin does not apply to jobs at all.
          </p>
          <p>
            Gmail access is read-only by design: the plugin never sends,
            replies, forwards, deletes, archives, or labels mail. Slack
            access is optional and outbound only: if you enable it during
            setup, the plugin posts run results to a channel you pick and
            never reads a channel or treats anything posted there as an
            instruction. See{" "}
            <a
              href="/#wont-do"
              className="text-primary underline underline-offset-4"
            >
              What it won&apos;t do
            </a>{" "}
            for the verbatim commitments and links to the exact lines in the
            source.
          </p>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
