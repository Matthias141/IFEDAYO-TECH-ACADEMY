"use client";

import { motion, useInView, useAnimation, Variants } from "framer-motion";
import { useRef, useEffect, ReactNode } from "react";

// Fade up animation for sections
export function FadeUp({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Fade in animation
export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Scale up animation
export function ScaleUp({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
      }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Slide in from left
export function SlideInLeft({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
      }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Slide in from right
export function SlideInRight({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
      }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered children animation
export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className = "",
}: {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered child item
export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

// Hover scale effect for cards
export function HoverScale({
  children,
  scale = 1.02,
  className = "",
}: {
  children: ReactNode;
  scale?: number;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animated counter for stats
export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      className={className}
    >
      {prefix}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isInView && (
          <Counter from={0} to={value} duration={duration} />
        )}
      </motion.span>
      {suffix}
    </motion.span>
  );
}

// Counter component for animated numbers
function Counter({
  from,
  to,
  duration,
}: {
  from: number;
  to: number;
  duration: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      if (!ref.current) return;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Easing function (ease out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(from + (to - from) * easeOut);

      ref.current.textContent = currentValue.toString();

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        ref.current.textContent = to.toString();
      }
    };

    requestAnimationFrame(updateCounter);
  }, [from, to, duration]);

  return <span ref={ref}>{from}</span>;
}

// Page transition wrapper
export function PageTransition({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Glow on hover effect
export function GlowCard({
  children,
  className = "",
  glowColor = "rgba(255, 255, 255, 0.1)",
}: {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover="hover"
      initial="initial"
    >
      <motion.div
        className="absolute inset-0 opacity-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 40%)`,
        }}
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.3 }}
      />
      {children}
    </motion.div>
  );
}

// Floating animation
export function Float({
  children,
  duration = 3,
  distance = 10,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  distance?: number;
  className?: string;
}) {
  return (
    <motion.div
      animate={{
        y: [-distance / 2, distance / 2, -distance / 2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Pulse animation
export function Pulse({
  children,
  duration = 2,
  scale = 1.05,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  scale?: number;
  className?: string;
}) {
  return (
    <motion.div
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
