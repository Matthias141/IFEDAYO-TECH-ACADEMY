"use client";

import {
  Cloud,
  Container,
  GitBranch,
  Shield,
  Server,
  Workflow,
} from "lucide-react";
import { NetworkDecoration, IconCircle } from "@/components/ui/particle-background";

const skills = [
  { icon: Container, label: "Docker" },
  { icon: Cloud, label: "AWS" },
  { icon: GitBranch, label: "CI/CD" },
  { icon: Server, label: "Terraform" },
  { icon: Shield, label: "Security" },
  { icon: Workflow, label: "Automation" },
];

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Visual Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-8 min-h-[400px] flex items-center justify-center overflow-hidden">
              {/* Network decoration background */}
              <NetworkDecoration className="absolute inset-0 opacity-60" />

              {/* Central element */}
              <div className="relative">
                {/* Outer ring */}
                <div className="w-48 h-48 rounded-full border border-white/[0.1] flex items-center justify-center">
                  {/* Middle ring */}
                  <div className="w-36 h-36 rounded-full border border-white/[0.08] flex items-center justify-center">
                    {/* Inner circle */}
                    <div className="w-24 h-24 rounded-full bg-[#111] border border-white/[0.1] flex items-center justify-center">
                      <span className="text-2xl font-bold text-white/80">ITA</span>
                    </div>
                  </div>
                </div>

                {/* Floating skill icons around the circle */}
                {skills.map((skill, index) => {
                  const angle = (index * 60 - 90) * (Math.PI / 180);
                  const radius = 130;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;

                  return (
                    <div
                      key={skill.label}
                      className="absolute"
                      style={{
                        left: `calc(50% + ${x}px - 18px)`,
                        top: `calc(50% + ${y}px - 18px)`,
                      }}
                      title={skill.label}
                    >
                      <IconCircle size={36}>
                        <skill.icon className="w-4 h-4 text-gray-500" />
                      </IconCircle>
                    </div>
                  );
                })}
              </div>

              {/* Floating badges */}
              <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-[#111] border border-white/[0.08] text-gray-500 text-xs">
                AWS Certified
              </div>
              <div className="absolute bottom-6 left-6 px-3 py-1.5 rounded-full bg-[#111] border border-white/[0.08] text-gray-500 text-xs">
                5+ Years
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <p className="text-xs text-gray-600 uppercase tracking-wider mb-3">
              About Me
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              Your Guide to a<br />
              <span className="text-gray-500">DevOps Career</span>
            </h2>

            <div className="space-y-4 text-gray-500 leading-relaxed text-sm">
              <p>
                Hi, I&apos;m Ifedayo. Over the past 5+ years, I&apos;ve worked as a DevOps
                Engineer across multiple industries, helping companies build
                scalable infrastructure and streamline their deployment processes.
              </p>
              <p>
                I&apos;ve seen firsthand how difficult it can be to break into DevOps,
                especially in Nigeria where resources and mentorship are scarce.
                That&apos;s why I started this academy - to provide the guidance I wish
                I had when I started.
              </p>
              <p>
                My approach is practical and personalized. Whether you&apos;re
                transitioning from development, system administration, or starting
                fresh, I&apos;ll help you build the skills and confidence you need.
              </p>
            </div>

            {/* Skills as minimal tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {["Docker", "Kubernetes", "Terraform", "AWS", "CI/CD", "Linux", "Python", "Bash"].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs text-gray-600 border border-white/[0.08] rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
