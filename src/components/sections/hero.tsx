"use client";

import Link from "next/link";
import { ArrowRight, Users, FileText, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParticleSphere, ParticleBlob, ParticleTorus, CircleRing, IconCircle, DotGrid } from "@/components/ui/particle-background";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-20 pb-12">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Hero Card - spans 7 columns */}
          <div className="lg:col-span-7 lg:row-span-2 bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-8 sm:p-12 relative overflow-hidden min-h-[450px] flex flex-col justify-center">
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

          {/* Particle Sphere Card */}
          <div className="lg:col-span-5 bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 flex items-center justify-center relative overflow-hidden min-h-[220px]">
            <ParticleSphere size={160} />
            <div className="absolute bottom-4 left-4">
              <p className="text-xs text-gray-600 uppercase tracking-wider">Expert Guidance</p>
            </div>
          </div>

          {/* Stats Cards Row */}
          <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-5 flex flex-col justify-between min-h-[120px]">
            <div className="text-2xl sm:text-3xl font-bold text-white">95%</div>
            <p className="text-xs text-gray-600 uppercase tracking-wider">Success Rate</p>
          </div>

          <div className="lg:col-span-3 bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-5 flex flex-col justify-between min-h-[120px] relative overflow-hidden">
            <div className="absolute right-2 bottom-2 opacity-15">
              <DotGrid cols={4} rows={4} spacing={10} />
            </div>
            <div className="relative">
              <div className="text-2xl sm:text-3xl font-bold text-white">200+</div>
              <p className="text-xs text-gray-600 uppercase tracking-wider">Hours Delivered</p>
            </div>
          </div>

          {/* Feature cards with icons */}
          <div className="lg:col-span-4 bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute -right-12 -bottom-12 opacity-30">
              <CircleRing size={140} />
            </div>
            <div className="relative">
              <IconCircle size={40} className="mb-4">
                <Users className="w-4 h-4 text-gray-400" />
              </IconCircle>
              <h3 className="text-base font-semibold text-white mb-1">1-on-1 Mentoring</h3>
              <p className="text-sm text-gray-500">Personalized sessions for your goals</p>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 opacity-20">
              <ParticleTorus size={120} />
            </div>
            <div className="relative">
              <IconCircle size={40} className="mb-4">
                <FileText className="w-4 h-4 text-gray-400" />
              </IconCircle>
              <h3 className="text-base font-semibold text-white mb-1">CV Optimization</h3>
              <p className="text-sm text-gray-500">Get noticed by top recruiters</p>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6">
            <IconCircle size={40} className="mb-4">
              <Target className="w-4 h-4 text-gray-400" />
            </IconCircle>
            <h3 className="text-base font-semibold text-white mb-1">Career Strategy</h3>
            <p className="text-sm text-gray-500">Map your path to DevOps</p>
          </div>
        </div>
      </div>
    </section>
  );
}
