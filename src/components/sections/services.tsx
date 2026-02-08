"use client";

import Link from "next/link";
import {
  Video,
  FileText,
  Target,
  GraduationCap,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { servicesData } from "@/lib/services-data";
import { formatPrice, formatDuration, getServiceTypeLabel } from "@/lib/utils";
import { ParticleWave3D, GlowingTorus, ParticleSphere3D } from "@/components/ui/three-visualizations";
import { IconCircle } from "@/components/ui/particle-background";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const iconMap: Record<string, typeof Video> = {
  video: Video,
  "file-text": FileText,
  target: Target,
  "graduation-cap": GraduationCap,
};

export function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeUp className="text-center mb-16">
          <p className="text-xs text-gray-600 uppercase tracking-wider mb-3">
            Our Services
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Choose Your Path
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Whether you&apos;re just starting out or looking to level up, we have the
            right service for your DevOps journey.
          </p>
        </FadeUp>

        {/* Bento Grid */}
        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.icon] || Video;
            const isLarge = index === 0;

            return (
              <StaggerItem
                key={service.slug}
                className={isLarge ? "lg:col-span-2 lg:row-span-2" : ""}
              >
                <div
                  className="group relative h-full bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-white/[0.1] overflow-hidden glow-card"
                >
                  {/* 3D Wave visualization for large card - hidden on mobile */}
                  {isLarge && (
                    <div className="absolute bottom-0 left-0 right-0 opacity-40 overflow-hidden rounded-b-2xl hidden sm:block">
                      <ParticleWave3D size={500} height={140} enableBloom={false} />
                    </div>
                  )}

                  {/* 3D decorations for other cards - hidden on mobile */}
                  {index === 1 && (
                    <div className="absolute -right-12 -bottom-12 opacity-30 hidden lg:block">
                      <GlowingTorus size={120} enableBloom={false} />
                    </div>
                  )}
                  {index === 2 && (
                    <div className="absolute -right-10 -top-10 opacity-25 hidden lg:block">
                      <ParticleSphere3D size={100} enableBloom={false} />
                    </div>
                  )}

                  <div className="relative z-10">
                    {/* Icon and Type */}
                    <div className="flex items-start justify-between mb-6">
                      <IconCircle size={48}>
                        <Icon className="w-5 h-5 text-gray-400" />
                      </IconCircle>
                      <span className="text-xs text-gray-600 uppercase tracking-wider">
                        {getServiceTypeLabel(service.type)}
                      </span>
                    </div>

                    {/* Title and Description */}
                    <h3 className={`font-semibold text-white mb-2 ${isLarge ? "text-2xl sm:text-3xl" : "text-xl"}`}>
                      {service.name}
                    </h3>
                    <p className={`text-gray-500 mb-6 ${isLarge ? "text-base" : "text-sm"}`}>
                      {service.description}
                    </p>

                    {/* Features - only show on large card */}
                    {isLarge && (
                      <div className="grid grid-cols-2 gap-3 mb-8">
                        {service.features.slice(0, 4).map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-2 text-sm text-gray-400"
                          >
                            <span className="w-1 h-1 rounded-full bg-white/30" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Duration */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                      <Clock className="w-4 h-4" />
                      {formatDuration(service.duration_minutes)}
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                      <div>
                        <span className="text-2xl font-bold text-white">
                          {formatPrice(service.price_ngn)}
                        </span>
                        {service.type === "video_call" && (
                          <span className="text-gray-600 text-sm ml-1">/ session</span>
                        )}
                      </div>
                      <Link href={`/book?service=${service.slug}`}>
                        <Button variant={isLarge ? "primary" : "outline"} size="sm" className="group/btn">
                          Book
                          <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
