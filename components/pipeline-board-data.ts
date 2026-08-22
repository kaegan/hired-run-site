/**
 * Illustrative pipeline board data.
 *
 * Real companies, invented roles — never treat this as a real pipeline
 * snapshot. Companies are chosen for broad, global name recognition
 * rather than any particular person's actual job search. Every role
 * carries both a fit tier and a status so the same card set can
 * regroup under either view without re-fetching anything.
 *
 * Kept out of content/generated/ on purpose: that directory is synced
 * from the plugin repo on every prebuild and this data is hand-authored.
 */

export type FitTier = "high" | "medium" | "low" | "unscored";
export type RoleStatus =
  | "next-up"
  | "tailoring"
  | "submitted"
  | "interviewing";

export type BoardRole = {
  id: string;
  title: string;
  company: string;
  mark: string;
  host: string;
  path: string;
  age: string;
  fit: FitTier;
  status: RoleStatus;
  isNew?: boolean;
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
    isNew: true,
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
    status: "tailoring",
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
    id: "dropbox-sync-pm",
    title: "Product Manager, File Sync",
    company: "Dropbox",
    mark: "DB",
    host: "jobs.dropbox.com",
    path: "/jobs/4012209",
    age: "Last week",
    fit: "unscored",
    status: "next-up",
  },
];
