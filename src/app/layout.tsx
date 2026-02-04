import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ifedayo Tech Academy | DevOps Training & Career Coaching",
  description:
    "Break into DevOps with expert guidance. Get personalized mentoring, CV optimization, and career coaching from an experienced DevOps engineer in Nigeria.",
  keywords: [
    "DevOps",
    "DevOps Training Nigeria",
    "DevOps Mentoring",
    "Cloud Engineering",
    "Career Coaching",
    "Tech Training",
    "AWS",
    "Docker",
    "Kubernetes",
    "CI/CD",
  ],
  authors: [{ name: "Ifedayo Tech Academy" }],
  creator: "Ifedayo Tech Academy",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://ifedayotech.com",
    title: "Ifedayo Tech Academy | DevOps Training & Career Coaching",
    description:
      "Break into DevOps with expert guidance. Get personalized mentoring, CV optimization, and career coaching.",
    siteName: "Ifedayo Tech Academy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ifedayo Tech Academy | DevOps Training",
    description:
      "Break into DevOps with expert guidance. Personalized mentoring for Nigerian tech talents.",
    creator: "@ifedayotech",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased bg-zinc-950 text-white">
        {children}
      </body>
    </html>
  );
}
