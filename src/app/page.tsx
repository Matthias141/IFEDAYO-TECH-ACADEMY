import {
  Navbar,
  Hero,
  Services,
  Stats,
  About,
  Testimonials,
  CTA,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <About />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
