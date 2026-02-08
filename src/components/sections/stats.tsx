"use client";

import { ParticleSphere3D, NetworkVisualization3D } from "@/components/ui/three-visualizations";
import { DotGrid } from "@/components/ui/particle-background";
import { FadeUp, StaggerContainer, StaggerItem, AnimatedCounter } from "@/components/ui/motion";

const stats = [
  {
    value: 50,
    suffix: "+",
    label: "Students Mentored",
  },
  {
    value: 200,
    suffix: "+",
    label: "Hours Delivered",
  },
  {
    value: 95,
    suffix: "%",
    label: "Success Rate",
  },
  {
    value: 5,
    suffix: "+",
    label: "Years Experience",
  },
];

export function Stats() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StaggerItem key={stat.label}>
              <div className="relative bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 overflow-hidden glow-card group hover:border-white/[0.1] transition-colors">
                {/* 3D decorations for specific cards */}
                {index === 0 && (
                  <div className="absolute -right-10 -bottom-10 opacity-40">
                    <ParticleSphere3D size={140} enableBloom={false} />
                  </div>
                )}
                {index === 3 && (
                  <div className="absolute right-2 bottom-2 opacity-20">
                    <DotGrid cols={5} rows={5} spacing={12} />
                  </div>
                )}

                <div className="relative">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      duration={2}
                    />
                  </div>
                  <div className="text-xs text-gray-600 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Large Network Visualization Card */}
        <FadeUp delay={0.4}>
          <div className="mt-4 bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-8 flex items-center justify-center min-h-[300px] relative overflow-hidden glow-card hover:border-white/[0.1] transition-colors">
            <NetworkVisualization3D size={350} />
            <div className="absolute bottom-6 left-6">
              <p className="text-xs text-gray-600 uppercase tracking-wider">Building Connections</p>
            </div>
            <div className="absolute bottom-6 right-6">
              <p className="text-xs text-gray-600 uppercase tracking-wider">Growing Network</p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
