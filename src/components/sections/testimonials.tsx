"use client";

import { Quote } from "lucide-react";
import { ParticleSphere3D, GlowingParticleBlob } from "@/components/ui/three-visualizations";

const testimonials = [
  {
    id: 1,
    name: "Chinedu Okonkwo",
    role: "Junior DevOps Engineer",
    company: "Fintech Startup",
    content:
      "Ifedayo's mentoring was a game-changer. Within 3 months of our sessions, I landed my first DevOps role. His practical approach made complex concepts easy to understand.",
  },
  {
    id: 2,
    name: "Amaka Eze",
    role: "Cloud Engineer",
    company: "Tech Company",
    content:
      "The CV review service was incredible. Ifedayo not only optimized my CV but also gave me insights into what recruiters look for. I started getting callbacks within weeks!",
  },
  {
    id: 3,
    name: "Tunde Adeyemi",
    role: "Software Developer",
    company: "E-commerce Platform",
    content:
      "The DevOps Fundamentals Course gave me a solid foundation. The hands-on projects were especially valuable - I could immediately apply what I learned at work.",
  },
  {
    id: 4,
    name: "Blessing Nwachukwu",
    role: "DevOps Engineer",
    company: "Banking Sector",
    content:
      "The career strategy session helped me map out a clear path from backend development to DevOps. Ifedayo's industry insights and networking tips were invaluable.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20 sm:py-28">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs text-gray-600 uppercase tracking-wider mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Success Stories
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Don&apos;t just take our word for it. Here&apos;s what our students have to say.
          </p>
        </div>

        {/* Testimonials Grid - Bento style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`group relative bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-white/[0.1] ${
                index === 0 ? "md:row-span-2" : ""
              } overflow-hidden`}
            >
              {/* 3D decoration for featured card */}
              {index === 0 && (
                <div className="absolute -right-20 -bottom-20 opacity-30">
                  <GlowingParticleBlob size={250} />
                </div>
              )}
              {index === 3 && (
                <div className="absolute -right-16 -top-16 opacity-25">
                  <ParticleSphere3D size={180} />
                </div>
              )}

              {/* Quote Icon */}
              <div className="mb-6 relative z-10">
                <Quote className="w-8 h-8 text-white/[0.08]" />
              </div>

              {/* Content */}
              <p className={`text-gray-400 leading-relaxed mb-8 relative z-10 ${index === 0 ? "text-base" : "text-sm"}`}>
                &quot;{testimonial.content}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-full bg-[#111] border border-white/[0.08] flex items-center justify-center text-gray-500 text-sm font-medium">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-medium text-white text-sm">{testimonial.name}</p>
                  <p className="text-xs text-gray-600">
                    {testimonial.role} @ {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
