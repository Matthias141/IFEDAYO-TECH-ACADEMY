"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";

// ============================================
// TEXT REVEAL ANIMATION
// ============================================
export function TextReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  const words = children.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: () => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em]"
          variants={child}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Character by character reveal
export function CharacterReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  const characters = children.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.02, delayChildren: delay },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 150,
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      style={{ perspective: "1000px" }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={child}
          style={{ transformStyle: "preserve-3d" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ============================================
// CURSOR TRAIL EFFECT
// ============================================
export function CursorTrail() {
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const [isMobile, setIsMobile] = useState(true);
  const idRef = useRef(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          "ontouchstart" in window ||
          navigator.maxTouchPoints > 0
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newPoint = { x: e.clientX, y: e.clientY, id: idRef.current++ };
      setTrail((prev) => [...prev.slice(-15), newPoint]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  useEffect(() => {
    if (trail.length === 0) return;

    const timer = setTimeout(() => {
      setTrail((prev) => prev.slice(1));
    }, 50);

    return () => clearTimeout(timer);
  }, [trail]);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9997]">
      {trail.map((point) => (
        <motion.div
          key={point.id}
          className="absolute w-2 h-2 rounded-full bg-white/30"
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
          style={{
            left: point.x - 4,
            top: point.y - 4,
          }}
        />
      ))}
    </div>
  );
}

// ============================================
// NOISE/GRAIN OVERLAY
// ============================================
export function NoiseOverlay({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9990]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity,
      }}
    />
  );
}

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-white/80 origin-left z-[100]"
      style={{ scaleX }}
    />
  );
}

// ============================================
// MAGNETIC BUTTON
// ============================================
export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// SOCIAL PROOF NOTIFICATIONS
// ============================================
const socialProofData = [
  { name: "Chinedu O.", action: "just booked a mentoring session", time: "2 minutes ago" },
  { name: "Amaka E.", action: "completed CV optimization", time: "5 minutes ago" },
  { name: "Tunde A.", action: "started the DevOps course", time: "12 minutes ago" },
  { name: "Blessing N.", action: "just booked a strategy session", time: "18 minutes ago" },
  { name: "Emeka K.", action: "landed a DevOps role!", time: "1 hour ago" },
];

export function SocialProofNotifications() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Initial delay
    const initialDelay = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    // Show notifications periodically
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % socialProofData.length);
        setIsVisible(true);
      }, 500);
    }, 8000);

    // Hide after 5 seconds
    const hideTimeout = setInterval(() => {
      if (isVisible) {
        setTimeout(() => setIsVisible(false), 5000);
      }
    }, 1000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
      clearInterval(hideTimeout);
    };
  }, [isMobile, isVisible]);

  if (isMobile) return null;

  const notification = socialProofData[currentIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 left-6 z-[90] bg-[#0a0a0a] border border-white/10 rounded-xl p-4 shadow-2xl max-w-xs"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
              {notification.name.split(" ")[0][0]}
            </div>
            <div>
              <p className="text-white text-sm font-medium">{notification.name}</p>
              <p className="text-gray-400 text-xs">{notification.action}</p>
              <p className="text-gray-600 text-xs mt-1">{notification.time}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================
// PARALLAX SECTION
// ============================================
export function ParallaxSection({
  children,
  speed = 0.5,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

// ============================================
// REVEAL ON SCROLL
// ============================================
export function RevealOnScroll({
  children,
  className = "",
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}) {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// GLITCH TEXT EFFECT
// ============================================
export function GlitchText({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">{children}</span>
      {isHovered && (
        <>
          <motion.span
            className="absolute inset-0 text-red-500/50"
            animate={{
              x: [0, -2, 2, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {children}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-cyan-500/50"
            animate={{
              x: [0, 2, -2, 0],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.05,
            }}
          >
            {children}
          </motion.span>
        </>
      )}
    </span>
  );
}

// ============================================
// FLOATING ELEMENT
// ============================================
export function FloatingElement({
  children,
  className = "",
  amplitude = 10,
  duration = 3,
}: {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude, amplitude, -amplitude],
        rotate: [-1, 1, -1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
