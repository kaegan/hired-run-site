/**
 * One night's run, shared by every illustration in the "How it works"
 * section.
 *
 * The four blocks tell a single story: the rubric on the config page
 * names the criteria, the run cites them while scoring, the board shows
 * the cards moving, and the Slack message reports the same three
 * deltas. Everything that can be derived from the board data is
 * derived — so the four illustrations can't drift apart the way four
 * hand-authored ones would.
 *
 * The persona is invented. Real companies, invented roles, invented
 * person — same rule as pipeline-board-data.ts.
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

export type Criterion = {
  label: string;
  weight: number;
  note: string;
};

/** The user's own rubric — written during setup, cited by the run. */
export const RUBRIC: Criterion[] = [
  {
    label: "0→1 product ownership",
    weight: 25,
    note: "Shipped something that didn't exist, not just iterated on it",
  },
  {
    label: "AI in the core product",
    weight: 20,
    note: "Not a chatbot bolted onto a settings page",
  },
  {
    label: "Remote-first or NYC",
    weight: 20,
    note: "More than two days in office gets marked down",
  },
  {
    label: "Series B through public",
    weight: 15,
    note: "Past product-market fit, before the process arrives",
  },
  {
    label: "PM team of five or more",
    weight: 10,
    note: "Someone senior to learn from",
  },
  {
    label: "Design-led culture",
    weight: 10,
    note: "Soft signal — read the tone of the posting",
  },
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
 * scoring run in ClaudeRun cites the first of these by name, so the two
 * illustrations agree about what this person has actually done.
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

export const HARD_FILTERS = [
  "No on-site 5 days",
  "No crypto",
  "No defense",
  "Not below Senior",
  "US-eligible only",
];
