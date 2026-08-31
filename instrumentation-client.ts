import posthog from "posthog-js";

// PostHog runs from `instrumentation-client.ts` rather than a provider component
// in the layout: Next.js executes this file after the document loads but *before*
// React hydration, so the recorder is already listening for the first paint and
// the first click instead of joining a few hundred milliseconds late. It also
// keeps the root layout a server component — no "use client" boundary added just
// to hold an analytics provider.
//
// The key is a public, write-only project key (that's why it's NEXT_PUBLIC_): it
// can capture events but can't read anything back, so shipping it to the browser
// is the intended design and not a leak. It is inlined as the default rather
// than left to the env var alone because an unset variable fails silently — the
// site builds, deploys, and reports nothing, with no error anywhere. That is
// exactly how mindthegap.fyi went dark for a week. The env var still wins when
// set, so a fork can point this at its own project.
const KEY =
  process.env.NEXT_PUBLIC_POSTHOG_KEY ||
  "phc_AUrkittVM6MeGMKDPF4sebuniygNnwZoPRsx3CA4QaWA";

if (KEY) {
  try {
    posthog.init(KEY, {
      // Same first-party proxy the other sites use: `/ingest` is rewritten to
      // PostHog in next.config.ts, so the requests are same-origin and don't
      // get eaten by ad blockers. ui_host is what the toolbar and the "view in
      // PostHog" links point at, since api_host is no longer a real address.
      api_host: "/ingest",
      ui_host: "https://us.posthog.com",

      // Pin the behaviour snapshot instead of inheriting whatever a future
      // posthog-js decides the defaults should be. This one gives us
      // `capture_pageview: 'history_change'`, which is what makes pageviews work
      // under the App Router: client-side navigations to /privacy and /changelog
      // never reload the document, so a load-time-only pageview would report the
      // whole site as a single view of "/". Bump this date deliberately, after
      // reading what changed — never silently.
      defaults: "2026-08-30",

      // Carried over from the other sites: JS errors land in PostHog instead of
      // only in a visitor's console, and init is chatty in dev so a broken key
      // shows up while you're working rather than in production.
      capture_exceptions: true,
      debug: process.env.NODE_ENV === "development",

      session_recording: {
        // Mask every input's text by default and opt individual fields back in
        // with data-ph-unmask. This site has no forms today, but the default
        // protects whatever gets added later — a replay tool that records
        // keystrokes by default is one form away from capturing something it
        // shouldn't.
        maskInputFn: (text, element) =>
          element?.hasAttribute("data-ph-unmask") ? text : "*".repeat(text.length),
      },
    });
  } catch {
    // Analytics must never break the page.
  }
}
