"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleBackground, GlowingOrb } from "@/components/ui/particle-background";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Particle Background */}
      <ParticleBackground particleCount={60} connectionDistance={120} />

      {/* Glowing Orbs */}
      <GlowingOrb size={600} color="white" className="top-1/4 -left-48" blur={120} />
      <GlowingOrb size={400} color="blue" className="bottom-1/4 -right-32" blur={100} />
      <GlowingOrb size={300} color="white" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" blur={150} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-white/40 animate-pulse" />
            <span className="text-sm text-gray-400 font-medium">
              Join 50+ Nigerian tech talents
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up tracking-tight">
            Break Into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
              DevOps
            </span>
            <br />
            <span className="text-gray-400">With Expert Guidance</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed animate-slide-up [animation-delay:100ms]">
            Get personalized mentoring, CV optimization, and career coaching from
            an experienced DevOps engineer. Start your cloud journey today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up [animation-delay:200ms]">
            <Link href="/book">
              <Button size="lg" className="w-full sm:w-auto group">
                Book Your Session
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#services">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Services
              </Button>
            </Link>
          </div>

          {/* Social Proof Quick Stats */}
          <div className="mt-20 pt-8 border-t border-white/[0.05] animate-fade-in [animation-delay:400ms]">
            <div className="flex flex-wrap justify-center gap-12 sm:gap-16">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">50+</div>
                <div className="text-sm text-gray-600">Students Mentored</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">200+</div>
                <div className="text-sm text-gray-600">Hours of Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 rounded-full border border-white/[0.15] flex items-start justify-center p-1.5">
          <div className="w-0.5 h-1.5 bg-white/30 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
