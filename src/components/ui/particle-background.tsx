"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  connectionDistance?: number;
  className?: string;
}

export function ParticleBackground({
  particleCount = 50,
  connectionDistance = 150,
  className = "",
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Keep within bounds
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, connectionDistance]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity: 0.6 }}
    />
  );
}

// Static decorative elements for areas where canvas isn't needed
export function GlowingOrb({
  size = 300,
  color = "white",
  className = "",
  blur = 100,
}: {
  size?: number;
  color?: "white" | "blue";
  className?: string;
  blur?: number;
}) {
  const colorMap = {
    white: "rgba(255, 255, 255, 0.03)",
    blue: "rgba(59, 130, 246, 0.05)",
  };

  return (
    <div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${colorMap[color]} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
      }}
    />
  );
}

// Network nodes decoration (static SVG version)
export function NetworkDecoration({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute pointer-events-none ${className}`}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Nodes */}
      <circle cx="100" cy="100" r="3" fill="rgba(255,255,255,0.3)" />
      <circle cx="200" cy="80" r="2" fill="rgba(255,255,255,0.2)" />
      <circle cx="300" cy="120" r="4" fill="rgba(255,255,255,0.25)" />
      <circle cx="150" cy="200" r="3" fill="rgba(255,255,255,0.2)" />
      <circle cx="250" cy="180" r="2" fill="rgba(255,255,255,0.3)" />
      <circle cx="350" cy="250" r="3" fill="rgba(255,255,255,0.2)" />
      <circle cx="80" cy="280" r="2" fill="rgba(255,255,255,0.25)" />
      <circle cx="180" cy="320" r="4" fill="rgba(255,255,255,0.2)" />
      <circle cx="280" cy="300" r="2" fill="rgba(255,255,255,0.3)" />
      <circle cx="320" cy="350" r="3" fill="rgba(255,255,255,0.2)" />

      {/* Connections */}
      <line x1="100" y1="100" x2="200" y2="80" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <line x1="200" y1="80" x2="300" y2="120" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <line x1="100" y1="100" x2="150" y2="200" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <line x1="150" y1="200" x2="250" y2="180" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <line x1="250" y1="180" x2="300" y2="120" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <line x1="250" y1="180" x2="350" y2="250" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <line x1="80" y1="280" x2="150" y2="200" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <line x1="80" y1="280" x2="180" y2="320" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <line x1="180" y1="320" x2="280" y2="300" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <line x1="280" y1="300" x2="350" y2="250" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <line x1="280" y1="300" x2="320" y2="350" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    </svg>
  );
}

// Flowing organic shape decoration
export function FlowingShape({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`absolute pointer-events-none ${className}`}
      viewBox="0 0 600 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.02)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
        </linearGradient>
      </defs>
      <path
        d="M0 200 Q150 100 300 200 T600 200 L600 400 L0 400 Z"
        fill="url(#flowGradient)"
      />
    </svg>
  );
}
