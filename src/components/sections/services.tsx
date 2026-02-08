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
import { GlowingOrb } from "@/components/ui/particle-background";

const iconMap: Record<string, typeof Video> = {
  video: Video,
  "file-text": FileText,
  target: Target,
  "graduation-cap": GraduationCap,
};

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Subtle background glow */}
      <GlowingOrb size={500} color="white" className="-top-48 left-1/2 -translate-x-1/2" blur={150} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm text-gray-500 uppercase tracking-wider mb-3">
            Our Services
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Choose Your Path
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Whether you&apos;re just starting out or looking to level up, we have the
            right service for your DevOps journey.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.icon] || Video;
            const isLarge = index === 0;

            return (
              <div
                key={service.slug}
                className={`group relative bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 sm:p-8 transition-all duration-500 hover:border-white/[0.1] hover:bg-white/[0.03] ${
                  isLarge ? "lg:col-span-2 lg:row-span-2" : ""
                }`}
              >
                {/* Subtle corner glow on hover */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/[0.02] rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  {/* Icon and Type */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gray-400" />
                    </div>
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
                          <span className="w-1 h-1 rounded-full bg-gray-600" />
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
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
