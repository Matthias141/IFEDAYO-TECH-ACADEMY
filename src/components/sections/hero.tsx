"use client";

import Link from "next/link";
import { ArrowRight, Users, FileText, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowingParticleBlob, ParticleSphere3D, GlowingTorus, ParticleWave3D } from "@/components/ui/three-visualizations";
import { DotGrid, IconCircle } from "@/components/ui/particle-background";
import { TextReveal, MagneticButton, RevealOnScroll, FloatingElement } from "@/components/ui/advanced-effects";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-20 pb-12">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Main Hero Card - spans 7 columns */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 lg:row-span-2 bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 sm:p-8 lg:p-12 relative overflow-hidden min-h-[400px] sm:min-h-[450px] flex flex-col justify-center glow-card"
          >
            {/* 3D Particle Blob in background - hidden on small mobile */}
            <div className="absolute -top-10 -right-10 opacity-60 hidden sm:block">
              <FloatingElement amplitude={15} duration={4}>
                <GlowingParticleBlob size={280} />
              </FloatingElement>
            </div>

            <div className="relative z-10">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-green-500"
                />
                <span className="text-xs text-gray-400">
                  50+ Nigerian tech talents trained
                </span>
              </motion.div>

              {/* Main Headline with Text Reveal */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-[1.1] tracking-tight">
                <TextReveal delay={0.5}>Break Into</TextReveal>
                <br />
                <span className="text-gray-500">
                  <TextReveal delay={0.7}>DevOps</TextReveal>
                </span>
              </h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-gray-500 max-w-md mb-8 text-sm sm:text-base"
              >
                Get personalized mentoring, CV optimization, and career coaching
                from an experienced DevOps engineer.
              </motion.p>

              {/* CTA Buttons with Magnetic Effect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <MagneticButton strength={0.2}>
                  <Link href="/book">
                    <Button size="lg" className="w-full sm:w-auto group">
                      Book Your Session
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </MagneticButton>
                <MagneticButton strength={0.2}>
                  <Link href="#services">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Explore Services
                    </Button>
                  </Link>
                </MagneticButton>
              </motion.div>
            </div>
          </motion.div>

          {/* 3D Particle Sphere Card - hidden on mobile for performance */}
          <RevealOnScroll direction="right" className="hidden sm:block lg:col-span-5">
            <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 flex items-center justify-center relative overflow-hidden min-h-[220px] lg:min-h-[260px] glow-card">
              <FloatingElement amplitude={10} duration={5}>
                <ParticleSphere3D size={180} />
              </FloatingElement>
              <div className="absolute bottom-4 left-4">
                <p className="text-xs text-gray-600 uppercase tracking-wider">Expert Guidance</p>
              </div>
            </div>
          </RevealOnScroll>

          {/* Stats Cards Row - grid layout for mobile */}
          <div className="grid grid-cols-2 gap-4 sm:contents">
            <RevealOnScroll direction="up">
              <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-4 sm:p-5 flex flex-col justify-between min-h-[100px] sm:min-h-[120px] glow-card">
                <div className="text-2xl sm:text-3xl font-bold text-white">95%</div>
                <p className="text-[10px] sm:text-xs text-gray-600 uppercase tracking-wider">Success Rate</p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="up">
              <div className="lg:col-span-3 bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-4 sm:p-5 flex flex-col justify-between min-h-[100px] sm:min-h-[120px] relative overflow-hidden glow-card">
                <div className="absolute right-2 bottom-2 opacity-15 hidden sm:block">
                  <DotGrid cols={4} rows={4} spacing={10} />
                </div>
                <div className="relative">
                  <div className="text-2xl sm:text-3xl font-bold text-white">200+</div>
                  <p className="text-[10px] sm:text-xs text-gray-600 uppercase tracking-wider">Hours Delivered</p>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Glowing Torus Card - hidden on mobile for performance */}
          <RevealOnScroll direction="left" className="hidden sm:block lg:col-span-5">
            <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl flex items-center justify-center relative overflow-hidden min-h-[180px] lg:min-h-[200px] glow-card">
              <FloatingElement amplitude={8} duration={6}>
                <GlowingTorus size={160} />
              </FloatingElement>
              <div className="absolute bottom-4 left-4">
                <p className="text-xs text-gray-600 uppercase tracking-wider">Continuous Growth</p>
              </div>
            </div>
          </RevealOnScroll>

          {/* Feature cards with icons - grid on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:contents">
            <RevealOnScroll direction="up">
              <div className="lg:col-span-4 bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-5 sm:p-6 relative overflow-hidden glow-card hover:border-white/[0.1] transition-colors">
                <div className="relative flex sm:block items-center gap-4">
                  <IconCircle size={36} className="sm:mb-4 flex-shrink-0">
                    <Users className="w-4 h-4 text-gray-400" />
                  </IconCircle>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-white mb-0.5 sm:mb-1">1-on-1 Mentoring</h3>
                    <p className="text-xs sm:text-sm text-gray-500">Personalized sessions for your goals</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="up">
              <div className="lg:col-span-4 bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-5 sm:p-6 relative overflow-hidden glow-card hover:border-white/[0.1] transition-colors">
                <div className="relative flex sm:block items-center gap-4">
                  <IconCircle size={36} className="sm:mb-4 flex-shrink-0">
                    <FileText className="w-4 h-4 text-gray-400" />
                  </IconCircle>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-white mb-0.5 sm:mb-1">CV Optimization</h3>
                    <p className="text-xs sm:text-sm text-gray-500">Get noticed by top recruiters</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="up">
              <div className="lg:col-span-4 bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-5 sm:p-6 glow-card hover:border-white/[0.1] transition-colors">
                <div className="flex sm:block items-center gap-4">
                  <IconCircle size={36} className="sm:mb-4 flex-shrink-0">
                    <Target className="w-4 h-4 text-gray-400" />
                  </IconCircle>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-white mb-0.5 sm:mb-1">Career Strategy</h3>
                    <p className="text-xs sm:text-sm text-gray-500">Map your path to DevOps</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Wave visualization spanning full width - hidden on mobile */}
          <RevealOnScroll direction="up" className="hidden sm:block lg:col-span-12">
            <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl relative overflow-hidden min-h-[140px] lg:min-h-[180px] flex items-center justify-center glow-card">
              <ParticleWave3D size={600} height={140} />
              <div className="absolute bottom-4 left-6">
                <p className="text-xs text-gray-600 uppercase tracking-wider">Your Journey Starts Here</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
