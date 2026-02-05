"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-zinc-950 to-accent/10" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid-size opacity-20" />

      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-8 animate-float">
          <Sparkles className="w-8 h-8 text-white" />
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Start Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-300 to-accent">
            DevOps Journey?
          </span>
        </h2>

        {/* Subtext */}
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Book your first session today and take the first step towards a
          rewarding career in DevOps. Limited slots available each month.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/book">
            <Button size="lg" className="w-full sm:w-auto group">
              Book Your Session Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="mailto:hello@ifedayotech.com">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Have Questions? Contact Me
            </Button>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Instant booking confirmation
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Secure payment via Paystack
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Money-back guarantee
          </span>
        </div>
      </div>
    </section>
  );
}
