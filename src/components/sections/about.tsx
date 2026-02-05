"use client";

import { Badge } from "@/components/ui/badge";
import {
  Cloud,
  Container,
  GitBranch,
  Shield,
  Server,
  Workflow,
} from "lucide-react";

const skills = [
  { icon: Container, label: "Docker & Kubernetes" },
  { icon: Cloud, label: "AWS / Azure / GCP" },
  { icon: GitBranch, label: "CI/CD Pipelines" },
  { icon: Server, label: "Infrastructure as Code" },
  { icon: Shield, label: "Security & Compliance" },
  { icon: Workflow, label: "Automation" },
];

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image / Visual */}
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto lg:max-w-none rounded-3xl bg-gradient-to-br from-primary/20 via-zinc-900 to-accent/20 p-1">
              <div className="w-full h-full rounded-3xl bg-zinc-900 overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  {/* Abstract visual */}
                  <div className="relative w-48 h-48 mx-auto mb-8">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 animate-pulse" />
                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 animate-pulse [animation-delay:300ms]" />
                    <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/60 to-accent/60 animate-pulse [animation-delay:600ms]" />
                    <div className="absolute inset-12 rounded-full bg-zinc-900 flex items-center justify-center">
                      <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                        ITA
                      </span>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {skills.map((skill) => (
                      <div
                        key={skill.label}
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                      >
                        <skill.icon className="w-6 h-6 mx-auto text-gray-400 group-hover:text-primary transition-colors" />
                        <p className="text-[10px] text-gray-500 mt-2 group-hover:text-gray-300 transition-colors">
                          {skill.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-medium animate-float">
              AWS Certified
            </div>
            <div className="absolute -bottom-4 -left-4 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent-300 text-sm font-medium animate-float [animation-delay:2s]">
              5+ Years Exp
            </div>
          </div>

          {/* Content */}
          <div>
            <Badge variant="primary" className="mb-4">
              About Me
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Your Guide to a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                DevOps Career
              </span>
            </h2>

            <div className="space-y-4 text-gray-400 leading-relaxed">
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
                fresh, I&apos;ll help you build the skills and confidence you need to
                land your dream DevOps role.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Badge variant="outline">Docker</Badge>
              <Badge variant="outline">Kubernetes</Badge>
              <Badge variant="outline">Terraform</Badge>
              <Badge variant="outline">AWS</Badge>
              <Badge variant="outline">CI/CD</Badge>
              <Badge variant="outline">Linux</Badge>
              <Badge variant="outline">Python</Badge>
              <Badge variant="outline">Bash</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
