"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  BookOpen,
  Code,
  Cloud,
  Rocket,
  Trophy,
  Users,
} from "lucide-react";
import { GlowingParticleBlob, GlowingTorus } from "@/components/ui/three-visualizations";

const journeySteps = [
  {
    icon: BookOpen,
    title: "Learn Fundamentals",
    description: "Master Linux, networking, and scripting basics that form the foundation of DevOps.",
    color: "from-blue-500/20 to-transparent",
  },
  {
    icon: Code,
    title: "Build Skills",
    description: "Dive into Docker, CI/CD pipelines, and Infrastructure as Code with hands-on projects.",
    color: "from-purple-500/20 to-transparent",
  },
  {
    icon: Cloud,
    title: "Cloud Mastery",
    description: "Deploy and manage applications on AWS, Azure, or GCP with real-world scenarios.",
    color: "from-cyan-500/20 to-transparent",
  },
  {
    icon: Users,
    title: "Get Mentored",
    description: "Receive personalized guidance, CV optimization, and interview preparation.",
    color: "from-green-500/20 to-transparent",
  },
  {
    icon: Rocket,
    title: "Land Your Role",
    description: "Apply confidently with a strong portfolio and proven interview strategies.",
    color: "from-orange-500/20 to-transparent",
  },
  {
    icon: Trophy,
    title: "Achieve Success",
    description: "Join our community of successful DevOps engineers across Nigeria and beyond.",
    color: "from-yellow-500/20 to-transparent",
  },
];

export function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"]);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-10 opacity-20">
            <GlowingParticleBlob size={300} enableBloom={false} />
          </div>
          <div className="absolute bottom-1/4 right-10 opacity-20">
            <GlowingTorus size={250} enableBloom={false} />
          </div>
        </div>

        <div className="w-full">
          {/* Section header */}
          <div className="text-center mb-12 px-4">
            <p className="text-xs text-gray-600 uppercase tracking-wider mb-3">
              Your Journey
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              From Beginner to <span className="text-gray-500">DevOps Pro</span>
            </h2>
          </div>

          {/* Horizontal scroll container */}
          <motion.div
            style={{ x }}
            className="flex gap-8 pl-[10vw]"
          >
            {journeySteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  className="flex-shrink-0 w-[80vw] sm:w-[60vw] md:w-[40vw] lg:w-[30vw]"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-8 h-full overflow-hidden group hover:border-white/[0.1] transition-colors">
                    {/* Gradient background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    {/* Step number */}
                    <div className="absolute top-4 right-4 text-6xl font-bold text-white/[0.03]">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-6 group-hover:border-white/[0.15] transition-colors">
                        <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-semibold text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {step.description}
                      </p>

                      {/* Progress line */}
                      {index < journeySteps.length - 1 && (
                        <div className="absolute -right-4 top-1/2 w-8 h-[2px] bg-gradient-to-r from-white/20 to-transparent hidden lg:block" />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="text-center mt-12"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="text-xs text-gray-600 uppercase tracking-wider">
              Scroll to explore your journey
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
