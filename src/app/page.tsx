import {
  Navbar,
  Hero,
  Services,
  Stats,
  Journey,
  Roadmap,
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
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import {
  CursorTrail,
  NoiseOverlay,
  ScrollProgress,
  SocialProofNotifications,
} from "@/components/ui/advanced-effects";

export default function Home() {
  return (
    <SmoothScroll>
      <LoadingScreen />
      <CustomCursor />
      <CursorTrail />
      <NoiseOverlay opacity={0.02} />
      <ScrollProgress />
      <SocialProofNotifications />
      <AmbientParticles />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Stats />
        <Services />
        <Journey />
        <Roadmap />
        <About />
        <Testimonials />
        <FAQ />
        <Contact />
        <CTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
