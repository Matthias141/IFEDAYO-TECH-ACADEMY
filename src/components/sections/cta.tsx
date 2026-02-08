"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowingOrb } from "@/components/ui/particle-background";

export function CTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow */}
      <GlowingOrb size={600} color="white" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" blur={150} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Card container */}
        <div className="relative bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 sm:p-12 lg:p-16 text-center">
          {/* Subtle corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-3xl" />

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Ready to Start Your<br />
            <span className="text-gray-400">DevOps Journey?</span>
          </h2>

          {/* Subtext */}
          <p className="text-gray-500 max-w-xl mx-auto mb-10">
            Book your first session today and take the first step towards a
            rewarding career in DevOps. Limited slots available each month.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link href="/book">
              <Button size="lg" className="w-full sm:w-auto group">
                Book Your Session
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="mailto:hello@ifedayotech.com">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Contact Me
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-xs text-gray-600">
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              Instant booking
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              Secure payment
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              Money-back guarantee
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
