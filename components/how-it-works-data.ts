/**
 * One night's run, shared by every illustration on the page.
 *
 * The hero scorecard, the config page, the run transcript, the board and
 * the Slack message tell a single story: the rubric names the dimensions,
 * the run cites them while scoring, the board shows the cards moving,
 * and the Slack message reports the same three deltas. Everything that
 * can be derived from the board data is derived — so the illustrations
 * can't drift apart the way hand-authored ones would.
 *
 * The persona is invented. Real companies, invented roles, invented
 * person — same rule as pipeline-board-data.ts.
 *
 * The *shapes* here are not invented. They follow the published
 * skills — plugins/hired/skills/setup-pipeline/SKILL.md for what a
 * rubric contains, and score-roles/SKILL.md for what scoring produces.
 * An earlier version of this file gave each criterion a numeric weight
 * summing to 100, which the plugin has never done: a rubric is
 * dimensions with up/down signals, hard filters that cap, optional
 * standout logic, and tier definitions in the user's own words. Scoring
 * writes a tier and a prose summary, never a number.
 */

import { ROLES, type BoardRole } from "@/components/pipeline-board-data";

/** Cards that did not exist on last night's board. */
export const ARRIVALS: BoardRole[] = ROLES.filter((r) => r.arrivedOvernight);

/** Cards the scoring pass put a tier on for the first time. */
export const NEWLY_SCORED: BoardRole[] = ROLES.filter(
  (r) => r.fitBefore !== undefined && !r.arrivedOvernight
);

/** Cards an ATS email advanced to a new status. */
export const ADVANCED: BoardRole[] = ROLES.filter(
  (r) => r.statusBefore !== undefined
);

export const RUN_TIME = "06:00";
export const NOTIFY_TIME = "6:04 AM";

/**
 * A rubric dimension: a name, and a sentence each on what pushes a role
 * up and what pushes it down. No weights — the plugin asks for signals,
 * not arithmetic, and weighs them by what the user said matters most.
 */
export type Dimension = {
  label: string;
  up: string;
  down: string;
};

/** The user's own rubric — written during setup, cited by the run. */
export const RUBRIC: Dimension[] = [
  {
    label: "0→1 product ownership",
    up: "Shipped something that didn't exist before",
    down: "Iterating on a surface someone else built",
  },
  {
    label: "AI in the core product",
    up: "The model is the product",
    down: "A chatbot bolted onto a settings page",
  },
  {
    label: "Remote-first or NYC",
    up: "Remote-first, or a real New York office",
    down: "More than two days a week in an office",
  },
  {
    label: "Series B through public",
    up: "Past product-market fit, before the process arrives",
    down: "Pre-seed, or an org chart older than I am",
  },
  {
    label: "PM team of five or more",
    up: "Someone senior to learn from",
    down: "Sole PM reporting straight to a founder",
  },
  {
    label: "Design-led culture",
    up: "Design named in the posting's own words",
    down: "Design as a ticket queue",
  },
];

/**
 * Standout logic — the combination that makes this person unusual rather
 * than merely qualified, and what a role hitting it is worth. Optional in
 * the plugin; most people have one and have never written it down.
 */
export const STANDOUT = {
  label: "Consumer marketplace + a ranking model I shipped end to end",
  effect: "Floors at High, however the rest of the dimensions land.",
};

export const HARD_FILTERS = [
  "No on-site 5 days",
  "No crypto",
  "No defense",
  "Not below Senior",
  "US-eligible only",
];

/** What a hard filter actually does to a score. */
export const HARD_FILTER_RULE =
  "A role that trips one of these is capped at the lowest tier no matter what else is true. It still lands on the board — it just can't rank.";

/**
 * Tier definitions and the share of roles expected in each. The plugin
 * asks for both: without a distribution, everything drifts to High and
 * the score stops discriminating.
 */
export const TIERS = [
  { name: "Very High", share: "5%", action: "Drop what I'm doing and tailor." },
  { name: "High", share: "15%", action: "Tailor a full application this week." },
  { name: "Medium", share: "35%", action: "Generic application if the week is quiet." },
  { name: "Low", share: "30%", action: "Log it. Don't apply." },
  { name: "Very Low", share: "15%", action: "Written to the board, never posted." },
];

export const PERSONA = {
  name: "Sam Rivera",
  headline: "Senior PM · 8 years · Brooklyn, NY",
  lookingFor: "Senior / Group PM",
  notLookingFor: "People management, agency, contract",
  compFloor: "$210k base",
  noticePeriod: "Available in 4 weeks",
};

/**
 * What the resume established, as the Experience page stores it. The
 * scoring run cites the first of these by name, so the illustrations
 * agree about what this person has actually done.
 *
 * Invented, like the rest of the persona.
 */
export const EXPERIENCE = {
  source: "Sam-Rivera-resume.pdf · 2 cover letters",
  proofPoints: [
    "Took Loop from nothing to 400k monthly actives in 18 months",
    "Ran the ranking model rollout — 31% lift in session depth",
    "Grew activation 25% by rebuilding onboarding end to end",
  ],
  deep: "Consumer marketplaces · recommendations · growth",
  thin: "Fintech — one payments project, 2021",
};

/**
 * The record the illustrations spotlight — the rest of it (properties,
 * summary, the time it was written) lives on the role itself in
 * pipeline-board-data.ts, so the hero card and the same card opened from
 * the board are the same record rather than two copies of one.
 *
 * The `short*` lines are the summary's claims condensed for the run
 * transcript, kept here rather than in ClaudeRun so the two can't come
 * to disagree.
 */
export const SPOTLIGHT = {
  roleId: "spotify-personalization-pm",
  shortSignal: "0→1 ownership — Loop, 0→400k MAU · remote-first",
  shortGap: "gap: no audio or licensing background",
};
