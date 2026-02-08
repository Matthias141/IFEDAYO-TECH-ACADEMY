"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FadeUp } from "@/components/ui/motion";

const faqs = [
  {
    question: "Who is this mentoring program for?",
    answer:
      "This program is designed for aspiring DevOps engineers, developers looking to transition into DevOps, system administrators wanting to modernize their skills, and anyone interested in cloud infrastructure and automation. Whether you're a complete beginner or have some experience, we tailor the sessions to your level.",
  },
  {
    question: "How do the 1-on-1 mentoring sessions work?",
    answer:
      "After booking, you'll receive a confirmation email with a Google Meet link. During the session, we'll discuss your goals, assess your current skill level, and create a personalized learning path. Sessions are interactive - we'll work through real problems, review code, and practice hands-on exercises together.",
  },
  {
    question: "What tools and technologies do you cover?",
    answer:
      "We cover the essential DevOps toolkit including Docker, Kubernetes, Terraform, AWS/Azure/GCP, CI/CD pipelines (GitHub Actions, GitLab CI, Jenkins), Linux administration, Python/Bash scripting, monitoring with Prometheus/Grafana, and Infrastructure as Code practices.",
  },
  {
    question: "How long does it take to become job-ready?",
    answer:
      "This varies based on your starting point and dedication. With consistent practice and our structured guidance, most students become job-ready within 3-6 months. We focus on practical skills that employers actually look for, not just theoretical knowledge.",
  },
  {
    question: "What's included in the CV optimization service?",
    answer:
      "Our CV optimization includes a complete review and rewrite of your resume, tailored for DevOps roles. We highlight relevant projects, quantify your achievements, optimize for ATS systems, and provide LinkedIn profile recommendations. You'll receive before/after versions with detailed explanations.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes! If you're not satisfied with your first session, we offer a full refund. We're confident in the value we provide, and your success is our priority. Simply reach out within 24 hours of your session if it didn't meet your expectations.",
  },
  {
    question: "Can I get help with specific projects or problems?",
    answer:
      "Absolutely! Many students come with specific challenges - setting up CI/CD for their project, debugging Kubernetes deployments, or architecting cloud infrastructure. We love working on real-world problems as they provide the best learning opportunities.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major payment methods through Paystack, including debit/credit cards, bank transfers, and USSD. All payments are processed securely in Nigerian Naira (NGN).",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      className="border-b border-white/[0.06] last:border-b-0"
      initial={false}
    >
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-white font-medium pr-8 group-hover:text-gray-300 transition-colors">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-500 text-sm leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeUp className="text-center mb-16">
          <p className="text-xs text-gray-600 uppercase tracking-wider mb-3">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
            Common Questions
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Got questions? We&apos;ve got answers. If you can&apos;t find what you&apos;re
            looking for, feel free to reach out.
          </p>
        </FadeUp>

        {/* FAQ Items */}
        <FadeUp delay={0.2}>
          <div className="bg-[#0a0a0a] border border-white/[0.06] rounded-2xl px-6 sm:px-8">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
