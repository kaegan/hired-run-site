import { Hero } from "@/components/sections/hero";
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
      <Pipeline />
      <Install />
      <WontDo />
      <Built />
      <Faq />
      <SiteFooter />
    </main>
  );
}
