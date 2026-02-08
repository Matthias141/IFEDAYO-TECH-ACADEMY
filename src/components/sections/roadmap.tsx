"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  GitBranch,
  Container,
  Cloud,
  Shield,
  BarChart3,
  ChevronRight,
  Check,
} from "lucide-react";
import { FadeUp } from "@/components/ui/motion";
import { ParticleSphere3D } from "@/components/ui/three-visualizations";

const roadmapData = [
  {
    id: "fundamentals",
    title: "Fundamentals",
    icon: Terminal,
    color: "#3b82f6",
    skills: [
      { name: "Linux Administration", level: "essential" },
      { name: "Bash Scripting", level: "essential" },
      { name: "Networking Basics", level: "essential" },
      { name: "Python Programming", level: "recommended" },
      { name: "Git & Version Control", level: "essential" },
    ],
    description: "Build a solid foundation with core system administration and scripting skills.",
  },
  {
    id: "containers",
    title: "Containerization",
    icon: Container,
    color: "#8b5cf6",
    skills: [
      { name: "Docker", level: "essential" },
      { name: "Docker Compose", level: "essential" },
      { name: "Container Security", level: "recommended" },
      { name: "Image Optimization", level: "recommended" },
    ],
    description: "Master containerization to package and deploy applications consistently.",
  },
  {
    id: "cicd",
    title: "CI/CD Pipelines",
    icon: GitBranch,
    color: "#06b6d4",
    skills: [
      { name: "GitHub Actions", level: "essential" },
      { name: "GitLab CI", level: "recommended" },
      { name: "Jenkins", level: "optional" },
      { name: "ArgoCD", level: "advanced" },
    ],
    description: "Automate testing and deployment with continuous integration and delivery.",
  },
  {
    id: "cloud",
    title: "Cloud Platforms",
    icon: Cloud,
    color: "#10b981",
    skills: [
      { name: "AWS (EC2, S3, RDS)", level: "essential" },
      { name: "Terraform / IaC", level: "essential" },
      { name: "Kubernetes", level: "essential" },
      { name: "Azure / GCP", level: "optional" },
    ],
    description: "Deploy and manage infrastructure at scale using cloud services.",
  },
  {
    id: "security",
    title: "Security & Compliance",
    icon: Shield,
    color: "#f59e0b",
    skills: [
      { name: "Security Scanning", level: "essential" },
      { name: "Secrets Management", level: "essential" },
      { name: "SAST/DAST", level: "recommended" },
      { name: "Compliance (SOC2, etc)", level: "advanced" },
    ],
    description: "Implement security best practices throughout the development lifecycle.",
  },
  {
    id: "monitoring",
    title: "Monitoring & Observability",
    icon: BarChart3,
    color: "#ec4899",
    skills: [
      { name: "Prometheus", level: "essential" },
      { name: "Grafana", level: "essential" },
      { name: "ELK Stack", level: "recommended" },
      { name: "Distributed Tracing", level: "advanced" },
    ],
    description: "Build visibility into systems with metrics, logs, and tracing.",
  },
];

const levelColors = {
  essential: "bg-green-500/20 text-green-400 border-green-500/30",
  recommended: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  optional: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  advanced: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

export function Roadmap() {
  const [activeSection, setActiveSection] = useState(roadmapData[0].id);

  const activeData = roadmapData.find((item) => item.id === activeSection);

  return (
    <section id="roadmap" className="relative py-20 sm:py-28">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeUp className="text-center mb-16">
          <p className="text-xs text-gray-600 uppercase tracking-wider mb-3">
            Learning Path
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            DevOps Roadmap
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            A structured path to becoming a DevOps engineer. Click each stage to explore the skills you&apos;ll master.
          </p>
        </FadeUp>

        {/* Mobile: Horizontal scrolling tabs */}
        <div className="lg:hidden mb-6 -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 pb-2 min-w-max">
            {roadmapData.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-white/[0.08] border border-white/[0.15]"
                      : "bg-white/[0.02] border border-white/[0.06]"
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <Icon
                      className="w-3.5 h-3.5"
                      style={{ color: item.color }}
                    />
                  </div>
                  <span className={`text-xs font-medium ${isActive ? "text-white" : "text-gray-400"}`}>
                    {item.title}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Desktop: Sidebar Navigation */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-4 sticky top-24">
              {roadmapData.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all ${
                      isActive
                        ? "bg-white/[0.05] border border-white/[0.1]"
                        : "hover:bg-white/[0.02]"
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: item.color }}
                      />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${isActive ? "text-white" : "text-gray-400"}`}>
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-600">
                        {item.skills.length} skills
                      </p>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isActive ? "text-white rotate-90" : "text-gray-600"
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {activeData && (
                <motion.div
                  key={activeData.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl p-5 sm:p-6 lg:p-8 relative overflow-hidden"
                >
                  {/* Background decoration - hidden on mobile */}
                  <div className="absolute -right-16 -top-16 opacity-20 hidden lg:block">
                    <ParticleSphere3D size={180} enableBloom={false} />
                  </div>

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                      <div
                        className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${activeData.color}20` }}
                      >
                        <activeData.icon
                          className="w-5 h-5 sm:w-7 sm:h-7"
                          style={{ color: activeData.color }}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-2xl font-bold text-white">
                          {activeData.title}
                        </h3>
                        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                          {activeData.description}
                        </p>
                      </div>
                    </div>

                    {/* Skills grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {activeData.skills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between p-3 sm:p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:border-white/[0.1] transition-colors"
                        >
                          <div className="flex items-center gap-2 sm:gap-3">
                            <Check
                              className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0"
                              style={{ color: activeData.color }}
                            />
                            <span className="text-white text-xs sm:text-sm">
                              {skill.name}
                            </span>
                          </div>
                          <span
                            className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border whitespace-nowrap ${
                              levelColors[skill.level as keyof typeof levelColors]
                            }`}
                          >
                            {skill.level}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Legend */}
                    <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-white/[0.06]">
                      <p className="text-[10px] sm:text-xs text-gray-600 uppercase tracking-wider mb-2 sm:mb-3">
                        Skill Levels
                      </p>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {Object.entries(levelColors).map(([level, classes]) => (
                          <span
                            key={level}
                            className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full border ${classes}`}
                          >
                            {level}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
