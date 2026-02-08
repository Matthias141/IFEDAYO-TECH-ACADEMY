"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowingTorus, FloatingParticles } from "@/components/ui/three-visualizations";

export function CTA() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Card container */}
        <div className="relative bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-8 sm:p-12 lg:p-16 overflow-hidden">
          {/* 3D Torus decoration */}
          <div className="absolute -right-16 -top-16 opacity-50">
            <GlowingTorus size={280} />
          </div>

          {/* Floating particles throughout */}
          <div className="absolute inset-0 pointer-events-none opacity-60">
            <FloatingParticles width={800} height={400} />
          </div>

          <div className="relative text-center z-10">
            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              Ready to Start Your<br />
              <span className="text-gray-500">DevOps Journey?</span>
            </h2>

            {/* Subtext */}
            <p className="text-gray-500 max-w-xl mx-auto mb-10 text-sm">
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
                <span className="w-1 h-1 rounded-full bg-white/20" />
                Instant booking
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-white/20" />
                Secure payment
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-white/20" />
                Money-back guarantee
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
