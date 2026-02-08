"use client";

import { useEffect, useRef } from "react";

// Simple network particle background
interface ParticleBackgroundProps {
  particleCount?: number;
  connectionDistance?: number;
  className?: string;
}

export function ParticleBackground({
  particleCount = 40,
  connectionDistance = 120,
  className = "",
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      radius: Math.random() * 1.5 + 0.5,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dist = Math.hypot(p.x - other.x, p.y - other.y);
          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - dist / connectionDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", resizeCanvas);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [particleCount, connectionDistance]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}

// 3D Particle Sphere - like in the reference image
export function ParticleSphere({
  size = 200,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = size * 2;
    canvas.height = size * 2;

    const centerX = size;
    const centerY = size;
    const radius = size * 0.7;
    const particleCount = 800;
    let rotation = 0;

    // Generate points on a sphere using fibonacci sphere algorithm
    const points: { theta: number; phi: number; size: number }[] = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < particleCount; i++) {
      const y = 1 - (i / (particleCount - 1)) * 2;
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(y);
      points.push({
        theta,
        phi,
        size: Math.random() * 1.5 + 0.5
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rotation += 0.003;

      // Sort points by z-depth for proper rendering
      const sortedPoints = points
        .map((p) => {
          const x = Math.sin(p.phi) * Math.cos(p.theta + rotation);
          const y = Math.cos(p.phi);
          const z = Math.sin(p.phi) * Math.sin(p.theta + rotation);
          return { ...p, x, y, z };
        })
        .sort((a, b) => a.z - b.z);

      sortedPoints.forEach((p) => {
        const screenX = centerX + p.x * radius;
        const screenY = centerY + p.y * radius;
        const depth = (p.z + 1) / 2; // 0 to 1
        const opacity = 0.1 + depth * 0.6;
        const dotSize = p.size * (0.5 + depth * 0.5);

        ctx.beginPath();
        ctx.arc(screenX, screenY, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();

        // Add glow to front-facing particles
        if (depth > 0.7) {
          ctx.beginPath();
          ctx.arc(screenX, screenY, dotSize * 2, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            screenX, screenY, 0,
            screenX, screenY, dotSize * 3
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.3})`);
          gradient.addColorStop(1, "transparent");
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

// Wave/Flow Particle Visualization
export function ParticleWave({
  width = 400,
  height = 200,
  className = "",
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let time = 0;
    const cols = 60;
    const rows = 20;
    const spacing = width / cols;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing + spacing / 2;
          const baseY = height / 2;

          // Create wave effect
          const wave1 = Math.sin(i * 0.15 + time) * 30;
          const wave2 = Math.sin(i * 0.1 - time * 0.8) * 20;

          const y = baseY + wave1 + wave2 + (j - rows / 2) * 4;

          // Distance from center affects opacity
          const distFromCenter = Math.abs(j - rows / 2) / (rows / 2);
          const opacity = 0.1 + (1 - distFromCenter) * 0.4;

          const dotSize = 1 + (1 - distFromCenter) * 1;

          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ width, height }}
    />
  );
}

// Flowing organic blob shape made of particles
export function ParticleBlob({
  size = 300,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size / 2;
    const baseRadius = size * 0.3;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, size, size);
      time += 0.008;

      // Draw flowing blob shape with particles
      const particleCount = 400;

      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2;
        const layer = Math.floor(i / 100);
        const layerOffset = layer * 0.3;

        // Organic deformation
        const deform1 = Math.sin(angle * 3 + time) * 20;
        const deform2 = Math.cos(angle * 2 - time * 0.7) * 15;
        const deform3 = Math.sin(angle * 5 + time * 1.3) * 10;

        const r = baseRadius + deform1 + deform2 + deform3 + layer * 15;

        const x = centerX + Math.cos(angle + layerOffset + time * 0.1) * r;
        const y = centerY + Math.sin(angle + layerOffset + time * 0.1) * r;

        const opacity = 0.15 + (1 - layer / 4) * 0.35;
        const dotSize = 1 + Math.random() * 1;

        ctx.beginPath();
        ctx.arc(x, y, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

// Circular ring decoration with dots
export function CircleRing({
  size = 200,
  className = "",
  dotted = true,
}: {
  size?: number;
  className?: string;
  dotted?: boolean;
}) {
  const dots = dotted ? 48 : 0;
  const radius = size / 2 - 10;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`pointer-events-none ${className}`}
    >
      {/* Main circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255, 255, 255, 0.08)"
        strokeWidth="1"
      />
      {/* Dots around the circle */}
      {Array.from({ length: dots }).map((_, i) => {
        const angle = (i / dots) * Math.PI * 2 - Math.PI / 2;
        const x = size / 2 + Math.cos(angle) * radius;
        const y = size / 2 + Math.sin(angle) * radius;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i % 6 === 0 ? 2 : 1}
            fill={`rgba(255, 255, 255, ${i % 6 === 0 ? 0.4 : 0.2})`}
          />
        );
      })}
    </svg>
  );
}

// Icon circle with thin border (like in reference)
export function IconCircle({
  children,
  size = 64,
  className = "",
}: {
  children: React.ReactNode;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`rounded-full border border-white/[0.15] flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {children}
    </div>
  );
}

// Network decoration with connected nodes
export function NetworkDecoration({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 400;
    canvas.width = size;
    canvas.height = size;

    // Define nodes
    const nodes = [
      { x: 80, y: 80 }, { x: 200, y: 60 }, { x: 320, y: 100 },
      { x: 60, y: 200 }, { x: 180, y: 180 }, { x: 280, y: 200 },
      { x: 100, y: 300 }, { x: 220, y: 280 }, { x: 340, y: 320 },
      { x: 160, y: 360 }, { x: 300, y: 380 },
    ];

    // Define connections
    const connections = [
      [0, 1], [1, 2], [0, 3], [0, 4], [1, 4], [2, 5],
      [3, 4], [4, 5], [3, 6], [4, 7], [5, 8],
      [6, 7], [7, 8], [6, 9], [7, 9], [8, 10], [9, 10],
    ];

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, size, size);
      time += 0.01;

      // Draw connections
      connections.forEach(([i, j]) => {
        const a = nodes[i];
        const b = nodes[j];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((node, i) => {
        const pulse = Math.sin(time + i * 0.5) * 0.3 + 1;
        const nodeSize = (2 + (i % 3)) * pulse;

        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + (i % 3) * 0.1})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      className={`pointer-events-none ${className}`}
      style={{ width: 400, height: 400 }}
    />
  );
}

// Simple glow orb (no blur, just gradient)
export function GlowingOrb({
  size = 300,
  color = "white",
  className = "",
}: {
  size?: number;
  color?: "white" | "blue";
  className?: string;
}) {
  const colorMap = {
    white: "rgba(255, 255, 255, 0.02)",
    blue: "rgba(100, 150, 255, 0.03)",
  };

  return (
    <div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${colorMap[color]} 0%, transparent 70%)`,
      }}
    />
  );
}
