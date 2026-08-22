import type { Metadata } from "next";
import { marked } from "marked";

import changelog from "@/content/generated/changelog.json";
import { SiteFooter } from "@/components/sections/site-footer";

export const metadata: Metadata = {
  title: "Changelog",
  description: "What changed in each version of the hired plugin.",
};

export default function ChangelogPage() {
  const html = marked.parse(changelog.markdown, { async: false });

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-12">
        <a
          href="/"
          className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="text-primary">▸</span> hired.run
        </a>
        <div
          className="mt-10 max-w-[62ch] [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h2]:mt-12 [&_h2]:border-b [&_h2]:border-border [&_h2]:pb-2 [&_h2]:font-mono [&_h2]:text-lg [&_h2]:font-semibold [&_li]:mt-2 [&_li]:text-base [&_li]:leading-relaxed [&_li]:text-muted-foreground [&_p]:mt-4 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      <SiteFooter />
    </main>
  );
}
