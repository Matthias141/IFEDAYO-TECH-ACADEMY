import {
  Navbar,
  Hero,
  Services,
  Stats,
  About,
  Testimonials,
  FAQ,
  Contact,
  CTA,
  Footer,
} from "@/components/sections";
import { AmbientParticles } from "@/components/ui/three-visualizations";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { CustomCursor } from "@/components/ui/custom-cursor";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <AmbientParticles />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Stats />
        <Services />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
