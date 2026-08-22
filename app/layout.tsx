import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hired.run"),
  title: {
    default: "Hired.run — a job-search pipeline for Claude",
    template: "%s — Hired.run",
  },
  description:
    "A Claude plugin that reads your inbox for new roles, fetches the real job description, scores each one against a rubric you write, and tracks it all on your own Notion board. It never applies for you.",
  keywords: [
    "job search",
    "claude plugin",
    "notion",
    "gmail",
    "job scoring",
    "pipeline",
  ],
  openGraph: {
    title: "Hired.run",
    description:
      "An analyst for your job search, not an apply-bot. A Claude plugin that triages roles from your inbox into a scored Notion board.",
    url: "https://hired.run",
    siteName: "Hired.run",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hired.run",
    description:
      "An analyst for your job search, not an apply-bot. A Claude plugin that triages roles from your inbox into a scored Notion board.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
