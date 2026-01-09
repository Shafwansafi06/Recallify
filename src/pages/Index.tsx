import { useEffect } from "react";
import { ExperienceHero } from "@/components/ui/experience-hero";
import Lenis from "lenis";

const Index = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="dark min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <main className="relative w-full overflow-x-hidden">
        <ExperienceHero />
        <div className="fixed inset-0 pointer-events-none bento-mask opacity-10 z-[100]" />
      </main>
    </div>
  );
};

export default Index;
