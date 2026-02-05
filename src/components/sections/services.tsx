"use client";

import Link from "next/link";
import {
  Video,
  FileText,
  Target,
  GraduationCap,
  Clock,
  ArrowRight,
  Check,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { servicesData } from "@/lib/services-data";
import { formatPrice, formatDuration, getServiceTypeLabel } from "@/lib/utils";

const iconMap: Record<string, typeof Video> = {
  video: Video,
  "file-text": FileText,
  target: Target,
  "graduation-cap": GraduationCap,
};

export function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="primary" className="mb-4">
            Our Services
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Choose Your Path to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Success
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Whether you&apos;re just starting out or looking to level up, we have the
            right service for your DevOps journey.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.icon] || Video;
            const isPopular = service.slug === "devops-mentoring";

            return (
              <Card
                key={service.slug}
                variant="glass"
                hover
                className={`relative overflow-hidden ${
                  isPopular ? "md:col-span-2 lg:col-span-1" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {isPopular && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="accent">Most Popular</Badge>
                  </div>
                )}

                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {service.name}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatDuration(service.duration_minutes)}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {getServiceTypeLabel(service.type)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-400 mb-6">{service.description}</p>

                  <ul className="space-y-2">
                    {service.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-accent shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-white">
                      {formatPrice(service.price_ngn)}
                    </span>
                    {service.type === "video_call" && (
                      <span className="text-gray-500 text-sm ml-1">/ session</span>
                    )}
                  </div>
                  <Link href={`/book?service=${service.slug}`}>
                    <Button variant={isPopular ? "primary" : "outline"} size="sm" className="group">
                      Book Now
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
