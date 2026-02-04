"use client";

import { Users, Clock, TrendingUp, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "50+",
    label: "Students Mentored",
    description: "Across Nigeria and beyond",
  },
  {
    icon: Clock,
    value: "200+",
    label: "Hours of Sessions",
    description: "1-on-1 coaching delivered",
  },
  {
    icon: TrendingUp,
    value: "95%",
    label: "Success Rate",
    description: "Students landed tech roles",
  },
  {
    icon: Award,
    value: "5+",
    label: "Years Experience",
    description: "In DevOps & Cloud",
  },
];

export function Stats() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/20 transition-colors"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-gray-300 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-gray-500">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
