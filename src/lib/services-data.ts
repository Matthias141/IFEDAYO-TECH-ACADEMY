import type { ServiceType } from "@/types/database";

export interface ServiceData {
  id: string;
  name: string;
  slug: string;
  description: string;
  type: ServiceType;
  price_ngn: number; // in kobo
  duration_minutes: number | null;
  features: string[];
  icon: string;
}

export const servicesData: ServiceData[] = [
  {
    id: "1",
    name: "DevOps 1-on-1 Mentoring",
    slug: "devops-mentoring",
    description:
      "Get personalized guidance on your DevOps journey with hands-on exercises and real-world scenarios.",
    type: "video_call",
    price_ngn: 1500000, // ₦15,000
    duration_minutes: 60,
    features: [
      "Live video session",
      "Screen sharing & demos",
      "Personalized roadmap",
      "Q&A session",
      "Follow-up resources",
    ],
    icon: "video",
  },
  {
    id: "2",
    name: "Tech CV Review",
    slug: "cv-review",
    description:
      "Professional review and optimization of your tech CV to help you land your dream DevOps role.",
    type: "async",
    price_ngn: 750000, // ₦7,500
    duration_minutes: null,
    features: [
      "48-hour delivery",
      "Detailed feedback",
      "ATS optimization",
      "LinkedIn tips",
      "Before/after comparison",
    ],
    icon: "file-text",
  },
  {
    id: "3",
    name: "Career Strategy Session",
    slug: "career-strategy",
    description:
      "Strategic planning session to map out your tech career path and set achievable goals.",
    type: "video_call",
    price_ngn: 1000000, // ₦10,000
    duration_minutes: 45,
    features: [
      "Career assessment",
      "Goal setting",
      "Action plan",
      "Industry insights",
      "Networking tips",
    ],
    icon: "target",
  },
  {
    id: "4",
    name: "DevOps Fundamentals Course",
    slug: "devops-fundamentals",
    description:
      "Comprehensive self-paced course covering Docker, CI/CD, Linux, Cloud, and more.",
    type: "self_paced",
    price_ngn: 2500000, // ₦25,000
    duration_minutes: null,
    features: [
      "20+ hours of content",
      "Hands-on projects",
      "Certificate of completion",
      "Lifetime access",
      "Community support",
    ],
    icon: "graduation-cap",
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find((service) => service.slug === slug);
}

export function getServiceById(id: string): ServiceData | undefined {
  return servicesData.find((service) => service.id === id);
}
