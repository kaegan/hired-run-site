import { boardNow } from "@/lib/board-dates";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Install } from "@/components/sections/install";
import { WontDo } from "@/components/sections/wont-do";
import { Faq } from "@/components/sections/faq";
import { SiteFooter } from "@/components/sections/site-footer";

/**
 * The illustrations date themselves off one clock reading, taken here so
 * every block on the page agrees and a client component can't compute a
 * different "today" than the HTML it hydrates. Hourly revalidation is
 * what keeps a static build's "today" from drifting into last month —
 * see lib/board-dates.ts.
 */
export const revalidate = 3600;

export default async function Home() {
  const now = await boardNow();

  return (
    <main className="flex-1">
      <Hero now={now} />
      <HowItWorks now={now} />
      <Install />
      <WontDo />
      <Faq />
      <SiteFooter />
    </main>
  );
}
