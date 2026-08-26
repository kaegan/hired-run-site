/**
 * Illustrative pipeline board data.
 *
 * Real companies, invented roles — never treat this as a real pipeline
 * snapshot. Companies are chosen for broad, global name recognition
 * rather than any particular person's actual job search.
 *
 * Every role carries a fit tier and a status so the same card set can
 * regroup under either view. A handful also carry a "before" value —
 * `arrivedOvernight`, `statusBefore`, `fitBefore` — which the board uses
 * to highlight what a scheduled run just changed. There's no toggle to
 * compare states: Notion doesn't have an overnight-diff feature, so the
 * board only ever shows one honest thing, today's state, with today's
 * changes marked.
 *
 * Every role also carries the rest of its record — location, salary,
 * source, and the score summary — because each card on the board opens
 * the record page it stands for, and a card that opened onto invented
 * filler would be worse than one that didn't open at all. The summaries
 * follow score-roles/SKILL.md: two to four sentences, the strongest fit
 * signal with the evidence named, the context, the real gaps, and the
 * action the tier implies in the user's own words (the tier actions in
 * how-it-works-data.ts, verbatim). They cite this persona's rubric and
 * proof points, so the record pages, the run transcript and the board
 * all describe one job search.
 *
 * The dates have to survive being read, now that a card opens onto one:
 * nothing reaches Interviewing the day it landed, and nothing sits in No
 * Response until it is past the 30-day mark where the sweep moves it
 * there.
 *
 * A summary keeps the action it was written with even after the status
 * moves on — scoring runs once, and the record isn't rewritten because
 * a recruiter replied. That is why an Interviewing card can still say
 * "tailor a full application this week".
 *
 * Unscored roles have no summary at all. They carry `unscoredNote`
 * instead, which says why the scoring pass had nothing to work with.
 *
 * Kept out of content/generated/ on purpose: that directory is synced
 * from the plugin repo on every prebuild and this data is hand-authored.
 */

export type FitTier = "high" | "medium" | "low" | "unscored";
export type RoleStatus =
  | "next-up"
  | "tailoring"
  | "submitted"
  | "interviewing"
  | "offer"
  | "no-response";

export type BoardRole = {
  id: string;
  title: string;
  company: string;
  mark: string;
  host: string;
  path: string;
  /** Days since the record landed on the board; the date is derived. */
  addedDaysAgo: number;
  fit: FitTier;
  /** Fit before this morning's run — set only when scoring just landed. */
  fitBefore?: FitTier;
  status: RoleStatus;
  /** Status before this morning's run — set only when it just advanced. */
  statusBefore?: RoleStatus;
  /** Card did not exist on last night's board at all. */
  arrivedOvernight?: boolean;
  location: string;
  salary: string;
  source: string;
  /** Clock time hired wrote the record, for cards it created this run. */
  writtenAt?: string;
  /** What score-roles appended to the page body. Absent when unscored. */
  summary?: string;
  /** Why there is no summary. Set only on unscored records. */
  unscoredNote?: string;
};

/** Notion's Select options, as the board and the record page both read them. */
export const FIT_LABEL: Record<FitTier, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
  unscored: "Unscored",
};

export const STATUS_LABEL: Record<RoleStatus, string> = {
  "next-up": "Next Up",
  tailoring: "Tailoring",
  submitted: "Submitted",
  interviewing: "Interviewing",
  offer: "Offer",
  "no-response": "No Response",
};

export const ROLES: BoardRole[] = [
  {
    id: "spotify-personalization-pm",
    title: "Senior Product Manager, Personalization",
    company: "Spotify",
    mark: "SP",
    host: "lifeatspotify.com",
    path: "/jobs/6142098",
    addedDaysAgo: 0,
    fit: "high",
    status: "next-up",
    arrivedOvernight: true,
    location: "Remote — US",
    salary: "$215–260k",
    source: "LinkedIn alert",
    writtenAt: "06:02",
    summary:
      "Closest thing on the board to the Loop work — nothing to 400k monthly actives is the build-from-zero scope this posting describes for the personalization surface, and the ranking rollout answers the AI dimension. Remote-first, Senior scope, and $215–260k clears your floor. Nothing in your background covers audio or music licensing, and the posting asks for it twice. Tailor a full application this week.",
  },
  {
    id: "netflix-recs-pm",
    title: "Product Manager, Recommendations",
    company: "Netflix",
    mark: "NF",
    host: "jobs.netflix.com",
    path: "/req/190442",
    addedDaysAgo: 12,
    fit: "high",
    status: "interviewing",
    location: "Remote — US",
    salary: "$240–320k",
    source: "LinkedIn alert",
    summary:
      "The ranking rollout is the whole job here — 31% session depth on a surface you owned end to end is the evidence this team screens for, and the model is the product rather than a feature beside it. Remote, a band well clear of your floor, PM org in the dozens. The posting wants someone who has run experiments at streaming scale, and your largest surface was 400k monthly actives. Tailor a full application this week.",
  },
  {
    id: "airbnb-trust-pm",
    title: "Senior PM, Trust & Safety",
    company: "Airbnb",
    mark: "AB",
    host: "careers.airbnb.com",
    path: "/positions/7714523",
    addedDaysAgo: 9,
    fit: "high",
    status: "interviewing",
    statusBefore: "tailoring",
    location: "Remote — US",
    salary: "$225–280k",
    source: "Recruiter email",
    summary:
      "Consumer marketplace with a ranking surface underneath it — your standout combination, which floors this at High before the rest is weighed. The enforcement work is genuinely 0→1: the posting describes a review queue that does not exist yet. Nothing in eight years of your background is policy or legal-adjacent, and two of the four responsibilities are. Tailor a full application this week.",
  },
  {
    id: "shopify-merchant-pm",
    title: "Product Manager, Merchant Tools",
    company: "Shopify",
    mark: "SH",
    host: "job-boards.greenhouse.io",
    path: "/shopify/jobs/6027741",
    addedDaysAgo: 1,
    fit: "medium",
    status: "submitted",
    location: "Remote — Americas",
    salary: "$180–230k",
    source: "Indeed alert",
    summary:
      "Merchant tooling is marketplace work seen from the supply side, so Loop transfers, but this is iteration on a surface that has shipped for a decade rather than anything built from zero. Remote-first, public company, large PM org. The posting names AI once, in a list of things the team may look at next year. Generic application if the week is quiet.",
  },
  {
    id: "duolingo-engagement-pm",
    title: "Product Manager, Learner Engagement",
    company: "Duolingo",
    mark: "DL",
    host: "job-boards.greenhouse.io",
    path: "/duolingo/jobs/5893310",
    addedDaysAgo: 2,
    fit: "medium",
    status: "next-up",
    location: "Pittsburgh, PA — hybrid",
    salary: "$190–235k",
    source: "Indeed alert",
    summary:
      "Activation is the overlap — you grew it 25% rebuilding onboarding end to end, which is most of what this role is asked to do. Design-led in a way the posting makes obvious, and the PM org is well past five. Two days a week in Pittsburgh, and the ranking side of the product belongs to another team. Generic application if the week is quiet.",
  },
  {
    id: "canva-design-pm",
    title: "Senior Product Manager, Design Tools",
    company: "Canva",
    mark: "CV",
    host: "canva.com",
    path: "/careers/jobs/40218",
    addedDaysAgo: 2,
    fit: "medium",
    status: "submitted",
    location: "Remote — US",
    salary: "$195–240k",
    source: "Indeed alert",
    summary:
      "Design-led is not in question here — the posting says it in its own words, which is one of your dimensions outright, and generative editing puts a model in the core product. Creative tools are a category you have never shipped in, and recommendations and growth sit beside that work rather than inside it. Remote for US candidates, Senior scope. Generic application if the week is quiet.",
  },
  {
    id: "figma-collab-pm",
    title: "Group Product Manager, Collaboration",
    company: "Figma",
    mark: "FG",
    host: "job-boards.greenhouse.io",
    path: "/figma/jobs/4930221",
    addedDaysAgo: 3,
    fit: "medium",
    fitBefore: "unscored",
    status: "tailoring",
    location: "San Francisco, CA — 3 days on-site",
    salary: "$230–290k",
    source: "LinkedIn alert",
    summary:
      "Design-led culture and a PM org far past five clear without argument, and Group scope is a real step up. Three days a week in the San Francisco office is the down signal you wrote for the location dimension, word for word. The collaboration surface is mature and there is no model near the core of it. Generic application if the week is quiet.",
  },
  {
    id: "notion-workspace-pm",
    title: "Product Manager, Workspace Platform",
    company: "Notion",
    mark: "NO",
    host: "job-boards.greenhouse.io",
    path: "/notion/jobs/5771003",
    addedDaysAgo: 3,
    fit: "medium",
    status: "next-up",
    location: "Remote — US",
    salary: "$200–250k",
    source: "Indeed alert",
    summary:
      "The AI dimension holds — model-backed features are in the posting's first paragraph, not its nice-to-haves — and the platform surface is early enough to count as 0→1. Remote-first, past Series B, large PM org. Nothing in your background is developer-facing, and every proof point you have is consumer. Generic application if the week is quiet.",
  },
  {
    id: "robinhood-growth-pm",
    title: "Product Manager, Growth",
    company: "Robinhood",
    mark: "RH",
    host: "job-boards.greenhouse.io",
    path: "/robinhood/jobs/6204417",
    addedDaysAgo: 0,
    fit: "low",
    status: "next-up",
    arrivedOvernight: true,
    location: "Menlo Park, CA — 3 days on-site",
    salary: "$185–225k",
    source: "LinkedIn alert",
    writtenAt: "06:01",
    summary:
      "Growth iteration on a surface that already exists, not the 0→1 scope the rubric asks for, and the band opens below your floor. The role owns the crypto surfaces by name, which trips a hard filter and caps the score whatever else is true. Three days on-site in Menlo Park, and fintech is your thin spot: one payments project in 2021. Log it. Don't apply.",
  },
  {
    id: "stripe-payments-pm",
    title: "Senior Product Manager, Payments",
    company: "Stripe",
    mark: "ST",
    host: "stripe.com",
    path: "/jobs/listing/6180234",
    addedDaysAgo: 7,
    fit: "low",
    status: "next-up",
    location: "Remote — US",
    salary: "$215–265k",
    source: "Indeed alert",
    summary:
      "Remote-first, Senior scope, and a comp band well over your floor, which is most of what keeps this off the bottom. Payments is the one area your file is thin in — a single 2021 project — and the posting asks for years of it. The surface is a mature API business with no model in it. Log it. Don't apply.",
  },
  {
    id: "pinterest-discovery-pm",
    title: "Product Manager, Discovery",
    company: "Pinterest",
    mark: "PN",
    host: "jobs.lever.co",
    path: "/pinterest/f4e1c8a2-91b3",
    addedDaysAgo: 8,
    fit: "low",
    status: "submitted",
    location: "San Francisco, CA — 3 days on-site",
    salary: "$155–185k",
    source: "LinkedIn alert",
    summary:
      "Discovery is ranking work and the model really is the product, which would have scored well on its own. The req is scoped below Senior and the band tops out under your floor, and a hard filter caps a role however the rest of it reads. Three days on-site in San Francisco. Log it. Don't apply.",
  },
  {
    id: "slack-workflow-pm",
    title: "Product Manager, Workflow Automation",
    company: "Slack",
    mark: "SL",
    host: "job-boards.greenhouse.io",
    path: "/slack/jobs/3998341",
    addedDaysAgo: 9,
    fit: "low",
    status: "next-up",
    location: "Remote — US",
    salary: "$175–215k",
    source: "Indeed alert",
    summary:
      "Remote-first and a large PM org are the only dimensions this clears. Workflow automation is enterprise tooling and every proof point in your file is consumer, from Loop to the onboarding rebuild. The posting describes the fourth iteration of an existing builder, with no model in the core product. Log it. Don't apply.",
  },
  {
    id: "asana-collab-pm",
    title: "Product Manager, Collaboration Platform",
    company: "Asana",
    mark: "AS",
    host: "jobs.lever.co",
    path: "/asana/9b21f6c4-1a08",
    addedDaysAgo: 10,
    fit: "low",
    status: "tailoring",
    location: "Remote — US",
    salary: "$170–210k",
    source: "Indeed alert",
    summary:
      "B2B collaboration is a category you have never worked in, and the posting reads as roadmap maintenance rather than new surface. Remote-friendly, public, and nothing here trips a hard filter. The AI features it names are a summarization sidebar, not the product. Log it. Don't apply.",
  },
  {
    id: "dropbox-sync-pm",
    title: "Product Manager, File Sync",
    company: "Dropbox",
    mark: "DB",
    host: "jobs.dropbox.com",
    path: "/jobs/4012209",
    addedDaysAgo: 33,
    fit: "unscored",
    status: "no-response",
    location: "Remote — US",
    salary: "Not listed",
    source: "LinkedIn alert",
    unscoredNote:
      "Applied straight from the alert, before anything had scored it. The posting URL 404s now, so there was never a description to score against — and thirty days of silence moved it here on its own.",
  },
  {
    id: "squarespace-commerce-pm",
    title: "Product Manager, Commerce",
    company: "Squarespace",
    mark: "SQ",
    host: "job-boards.greenhouse.io",
    path: "/squarespace/jobs/5541209",
    addedDaysAgo: 12,
    fit: "low",
    status: "submitted",
    location: "New York, NY — hybrid",
    salary: "$165–200k",
    source: "Indeed alert",
    summary:
      "A real New York office and commerce sits next door to marketplace work, so this isn't far off on paper. The posting describes maintenance of one small surface inside a large suite: no 0→1 scope, no model in the product, and a PM team of three. The band tops out below your floor. Log it. Don't apply.",
  },
  {
    id: "zillow-search-pm",
    title: "Senior Product Manager, Search Experience",
    company: "Zillow",
    mark: "ZL",
    host: "zillow.com",
    path: "/careers/jobs/29841",
    addedDaysAgo: 36,
    fit: "low",
    status: "no-response",
    location: "Seattle, WA — 4 days on-site",
    salary: "$195–240k",
    source: "Indeed alert",
    summary:
      "Search experience is the closest thing to ranking on offer here, and Senior scope and the band both clear. The posting hands the model to a separate ML team and keeps this PM on the surface, which is the down signal on your AI dimension exactly as you wrote it. Four days a week in Seattle. Log it. Don't apply.",
  },
  {
    id: "instacart-marketplace-pm",
    title: "Product Manager, Marketplace",
    company: "Instacart",
    mark: "IC",
    host: "instacart.careers",
    path: "/jobs/70213",
    addedDaysAgo: 21,
    fit: "high",
    status: "offer",
    location: "Remote — US",
    salary: "$210–255k",
    source: "Recruiter email",
    summary:
      "Consumer marketplace with a ranking surface you would own — the standout combination, which floors this at High however the rest lands. Remote-first, and the search relevance work is the same shape as the Loop rollout. Grocery logistics is new to you and the posting leans on it in three places. Tailor a full application this week.",
  },
  {
    id: "reddit-community-pm",
    title: "Product Manager, Community Tools",
    company: "Reddit",
    mark: "RD",
    host: "job-boards.greenhouse.io",
    path: "/reddit/jobs/6091823",
    addedDaysAgo: 41,
    fit: "unscored",
    status: "no-response",
    location: "Remote — US",
    salary: "Not listed",
    source: "Indeed alert",
    unscoredNote:
      "The alert carried a title and a link but no description, and the scoring pass skips a record with nothing to read. Applied to anyway, in the first week of the search, and swept here after thirty days of silence.",
  },
];
