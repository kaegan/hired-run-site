# hired.run

Marketing and install site for [hired](https://github.com/kaegan/hired-run), a job-search
pipeline plugin for Claude. Live at [hired.run](https://hired.run).

## The site cannot drift from the plugin

All product copy — skill descriptions, install commands, the version badge, the changelog,
and every quote in the "What it won't do" section — is pulled from the published plugin
repo at build time by `scripts/sync-content.mjs`. The trust quotes are verified verbatim
against the fetched skill files and get line-anchored GitHub links; if the plugin stops
making a promise this page claims, the build fails.

```
npm run sync    # refresh content/generated/ from kaegan/hired-run@main
npm run dev     # local dev
npm run build   # sync + production build
```

## Stack

Next.js (App Router) · Tailwind v4 · shadcn/ui · Vercel Analytics. No other third-party
scripts, no backend, no CMS.

## License

MIT © 2026 Kaegan Donnelly
