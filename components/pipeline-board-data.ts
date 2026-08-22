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
  age: string;
  fit: FitTier;
  /** Fit before this morning's run — set only when scoring just landed. */
  fitBefore?: FitTier;
  status: RoleStatus;
  /** Status before this morning's run — set only when it just advanced. */
  statusBefore?: RoleStatus;
  /** Card did not exist on last night's board at all. */
  arrivedOvernight?: boolean;
};

export const ROLES: BoardRole[] = [
  {
    id: "spotify-personalization-pm",
    title: "Senior Product Manager, Personalization",
    company: "Spotify",
    mark: "SP",
    host: "lifeatspotify.com",
    path: "/jobs/6142098",
    age: "Today",
    fit: "high",
    status: "next-up",
    arrivedOvernight: true,
  },
  {
    id: "netflix-recs-pm",
    title: "Product Manager, Recommendations",
    company: "Netflix",
    mark: "NF",
    host: "jobs.netflix.com",
    path: "/req/190442",
    age: "Today",
    fit: "high",
    status: "interviewing",
  },
  {
    id: "airbnb-trust-pm",
    title: "Senior PM, Trust & Safety",
    company: "Airbnb",
    mark: "AB",
    host: "careers.airbnb.com",
    path: "/positions/7714523",
    age: "Yesterday",
    fit: "high",
    status: "interviewing",
    statusBefore: "tailoring",
  },
  {
    id: "shopify-merchant-pm",
    title: "Product Manager, Merchant Tools",
    company: "Shopify",
    mark: "SH",
    host: "job-boards.greenhouse.io",
    path: "/shopify/jobs/6027741",
    age: "Yesterday",
    fit: "medium",
    status: "submitted",
  },
  {
    id: "duolingo-engagement-pm",
    title: "Product Manager, Learner Engagement",
    company: "Duolingo",
    mark: "DL",
    host: "job-boards.greenhouse.io",
    path: "/duolingo/jobs/5893310",
    age: "2d",
    fit: "medium",
    status: "next-up",
  },
  {
    id: "canva-design-pm",
    title: "Senior Product Manager, Design Tools",
    company: "Canva",
    mark: "CV",
    host: "canva.com",
    path: "/careers/jobs/40218",
    age: "2d",
    fit: "medium",
    status: "submitted",
  },
  {
    id: "figma-collab-pm",
    title: "Group Product Manager, Collaboration",
    company: "Figma",
    mark: "FG",
    host: "job-boards.greenhouse.io",
    path: "/figma/jobs/4930221",
    age: "3d",
    fit: "medium",
    fitBefore: "unscored",
    status: "tailoring",
  },
  {
    id: "notion-workspace-pm",
    title: "Product Manager, Workspace Platform",
    company: "Notion",
    mark: "NO",
    host: "job-boards.greenhouse.io",
    path: "/notion/jobs/5771003",
    age: "3d",
    fit: "medium",
    status: "next-up",
  },
  {
    id: "robinhood-growth-pm",
    title: "Product Manager, Growth",
    company: "Robinhood",
    mark: "RH",
    host: "job-boards.greenhouse.io",
    path: "/robinhood/jobs/6204417",
    age: "Today",
    fit: "low",
    status: "next-up",
    arrivedOvernight: true,
  },
  {
    id: "stripe-payments-pm",
    title: "Senior Product Manager, Payments",
    company: "Stripe",
    mark: "ST",
    host: "stripe.com",
    path: "/jobs/listing/6180234",
    age: "Last week",
    fit: "low",
    status: "next-up",
  },
  {
    id: "pinterest-discovery-pm",
    title: "Product Manager, Discovery",
    company: "Pinterest",
    mark: "PN",
    host: "jobs.lever.co",
    path: "/pinterest/f4e1c8a2-91b3",
    age: "Last week",
    fit: "low",
    status: "submitted",
  },
  {
    id: "slack-workflow-pm",
    title: "Product Manager, Workflow Automation",
    company: "Slack",
    mark: "SL",
    host: "job-boards.greenhouse.io",
    path: "/slack/jobs/3998341",
    age: "Last week",
    fit: "low",
    status: "next-up",
  },
  {
    id: "asana-collab-pm",
    title: "Product Manager, Collaboration Platform",
    company: "Asana",
    mark: "AS",
    host: "jobs.lever.co",
    path: "/asana/9b21f6c4-1a08",
    age: "Last week",
    fit: "low",
    status: "tailoring",
  },
  {
    id: "dropbox-sync-pm",
    title: "Product Manager, File Sync",
    company: "Dropbox",
    mark: "DB",
    host: "jobs.dropbox.com",
    path: "/jobs/4012209",
    age: "Last week",
    fit: "unscored",
    status: "no-response",
  },
  {
    id: "squarespace-commerce-pm",
    title: "Product Manager, Commerce",
    company: "Squarespace",
    mark: "SQ",
    host: "job-boards.greenhouse.io",
    path: "/squarespace/jobs/5541209",
    age: "Last week",
    fit: "low",
    status: "submitted",
  },
  {
    id: "zillow-search-pm",
    title: "Senior Product Manager, Search Experience",
    company: "Zillow",
    mark: "ZL",
    host: "zillow.com",
    path: "/careers/jobs/29841",
    age: "2 weeks",
    fit: "low",
    status: "no-response",
  },
  {
    id: "instacart-marketplace-pm",
    title: "Product Manager, Marketplace",
    company: "Instacart",
    mark: "IC",
    host: "instacart.careers",
    path: "/jobs/70213",
    age: "3 weeks",
    fit: "low",
    status: "offer",
  },
  {
    id: "reddit-community-pm",
    title: "Product Manager, Community Tools",
    company: "Reddit",
    mark: "RD",
    host: "job-boards.greenhouse.io",
    path: "/reddit/jobs/6091823",
    age: "3 weeks",
    fit: "unscored",
    status: "no-response",
  },
];
