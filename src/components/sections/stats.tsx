"use client";

import { ParticleSphere, DotGrid } from "@/components/ui/particle-background";

const stats = [
  {
    value: "50+",
    label: "Students Mentored",
    hasDecoration: true,
  },
  {
    value: "200+",
    label: "Hours Delivered",
    hasDecoration: false,
  },
  {
    value: "95%",
    label: "Success Rate",
    hasDecoration: false,
  },
  {
    value: "5+",
    label: "Years Experience",
    hasDecoration: true,
  },
];

export function Stats() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="relative bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 overflow-hidden"
            >
              {/* Decorations for specific cards */}
              {index === 0 && (
                <div className="absolute -right-8 -bottom-8 opacity-30">
                  <ParticleSphere size={100} />
                </div>
              )}
              {index === 3 && (
                <div className="absolute right-2 bottom-2 opacity-20">
                  <DotGrid cols={5} rows={5} spacing={12} />
                </div>
              )}

              <div className="relative">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
