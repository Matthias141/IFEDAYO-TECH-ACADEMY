"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Chinedu Okonkwo",
    role: "Junior DevOps Engineer",
    company: "Fintech Startup",
    image: null,
    content:
      "Ifedayo's mentoring was a game-changer. Within 3 months of our sessions, I landed my first DevOps role. His practical approach and real-world examples made complex concepts easy to understand.",
    rating: 5,
  },
  {
    id: 2,
    name: "Amaka Eze",
    role: "Cloud Engineer",
    company: "Tech Company",
    image: null,
    content:
      "The CV review service was incredible. Ifedayo not only optimized my CV but also gave me insights into what recruiters look for. I started getting callbacks within weeks!",
    rating: 5,
  },
  {
    id: 3,
    name: "Tunde Adeyemi",
    role: "Software Developer",
    company: "E-commerce Platform",
    image: null,
    content:
      "The DevOps Fundamentals Course gave me a solid foundation. The hands-on projects were especially valuable - I could immediately apply what I learned at work.",
    rating: 5,
  },
  {
    id: 4,
    name: "Blessing Nwachukwu",
    role: "DevOps Engineer",
    company: "Banking Sector",
    image: null,
    content:
      "The career strategy session helped me map out a clear path from backend development to DevOps. Ifedayo's industry insights and networking tips were invaluable.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-20 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="accent" className="mb-4">
            Testimonials
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Success Stories From{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Our Students
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Don&apos;t just take our word for it. Here&apos;s what our students have to say
            about their experience.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              variant="glass"
              className="relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-6">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-primary/20">
                  <Quote className="w-10 h-10" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-300 leading-relaxed mb-6">
                  &quot;{testimonial.content}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">
                      {testimonial.role} @ {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
