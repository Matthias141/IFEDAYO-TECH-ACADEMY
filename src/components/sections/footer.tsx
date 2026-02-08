"use client";

import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";

const footerLinks = {
  services: [
    { label: "DevOps Mentoring", href: "/book?service=devops-mentoring" },
    { label: "CV Review", href: "/book?service=cv-review" },
    { label: "Career Strategy", href: "/book?service=career-strategy" },
    { label: "DevOps Course", href: "/book?service=devops-fundamentals" },
  ],
  company: [
    { label: "About", href: "#about" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "mailto:hello@ifedayotech.com" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/ifedayotech", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/in/ifedayotech", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/ifedayotech", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                <span className="text-sm font-bold text-white">IT</span>
              </div>
              <span className="text-sm font-medium text-white">
                Ifedayo Tech
              </span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Helping Nigerian tech talents break into DevOps with expert guidance.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-gray-600 hover:text-white hover:border-white/[0.1] transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-4">Stay Updated</h4>
            <p className="text-gray-600 text-sm mb-4">
              Get DevOps tips delivered to your inbox.
            </p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-white/[0.15] transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-white text-black text-sm font-medium py-2.5 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Ifedayo Tech Academy
          </p>
          <div className="flex space-x-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-gray-600 hover:text-white text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
