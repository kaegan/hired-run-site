import { Hero } from "@/components/sections/hero";
import { PipelineBoard } from "@/components/pipeline-board";
import { Pipeline } from "@/components/sections/pipeline";
import { Install } from "@/components/sections/install";
import { WontDo } from "@/components/sections/wont-do";
import { Built } from "@/components/sections/built";
import { Faq } from "@/components/sections/faq";
import { SiteFooter } from "@/components/sections/site-footer";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      {/* data-pipeline scopes the board-to-skill-card cross-highlight
       * (see globals.css). It has to wrap both the full-bleed board and
       * the skill list further down — :has() only matches descendants —
       * even though the board itself breaks out of the page shell. */}
      <div data-pipeline>
        <div
          className="w-full overflow-hidden"
          style={{
            paddingLeft: "max(1.5rem, calc((100vw - 1152px) / 2))",
          }}
        >
          <PipelineBoard />
        </div>
        <Pipeline />
      </div>
      <Install />
      <WontDo />
      <Built />
      <Faq />
      <SiteFooter />
    </main>
  );
}
