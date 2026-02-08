"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleSphere, ParticleBlob, CircleRing } from "@/components/ui/particle-background";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-20 pb-12">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Main Hero Card - spans 7 columns */}
          <div className="lg:col-span-7 bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-8 sm:p-12 relative overflow-hidden min-h-[400px] flex flex-col justify-center">
            {/* Subtle particle blob in background */}
            <div className="absolute -top-20 -right-20 opacity-30">
              <ParticleBlob size={300} />
            </div>

            <div className="relative">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                <span className="text-xs text-gray-400">
                  50+ Nigerian tech talents trained
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-[1.1] tracking-tight">
                Break Into
                <br />
                <span className="text-gray-500">DevOps</span>
              </h1>

              {/* Subheadline */}
              <p className="text-gray-500 max-w-md mb-8 text-sm sm:text-base">
                Get personalized mentoring, CV optimization, and career coaching
                from an experienced DevOps engineer.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
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
            </div>
          </div>

          {/* Right side cards - 5 columns */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 lg:gap-6">
            {/* Particle Sphere Card */}
            <div className="col-span-2 bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 flex items-center justify-center relative overflow-hidden min-h-[220px]">
              <ParticleSphere size={180} />
              <div className="absolute bottom-4 left-4">
                <p className="text-xs text-gray-600 uppercase tracking-wider">Expert Guidance</p>
              </div>
            </div>

            {/* Stats Card 1 */}
            <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 flex flex-col justify-between min-h-[140px]">
              <div className="text-3xl sm:text-4xl font-bold text-white">95%</div>
              <p className="text-xs text-gray-600 uppercase tracking-wider">Success Rate</p>
            </div>

            {/* Stats Card 2 */}
            <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 flex flex-col justify-between min-h-[140px]">
              <div className="text-3xl sm:text-4xl font-bold text-white">200+</div>
              <p className="text-xs text-gray-600 uppercase tracking-wider">Hours Delivered</p>
            </div>
          </div>

          {/* Bottom row - feature cards */}
          <div className="lg:col-span-4 bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 relative overflow-hidden min-h-[180px]">
            <div className="absolute -right-10 -bottom-10 opacity-40">
              <CircleRing size={150} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">1-on-1 Mentoring</h3>
            <p className="text-sm text-gray-500">Personalized sessions tailored to your career goals</p>
          </div>

          <div className="lg:col-span-4 bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 min-h-[180px]">
            <h3 className="text-lg font-semibold text-white mb-2">CV Optimization</h3>
            <p className="text-sm text-gray-500">Get your CV noticed by top tech recruiters</p>
          </div>

          <div className="lg:col-span-4 bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 min-h-[180px]">
            <h3 className="text-lg font-semibold text-white mb-2">Career Strategy</h3>
            <p className="text-sm text-gray-500">Map out your path to a DevOps career</p>
          </div>
        </div>
      </div>
    </section>
  );
}
