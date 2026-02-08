"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points, Line } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// Hook for detecting mobile/low-performance devices
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

// Hook for mouse position tracking
function useMousePosition() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mouse;
}

// Post-processing effects wrapper
function Effects({ enableBloom = true }: { enableBloom?: boolean }) {
  if (!enableBloom) return null;

  return (
    <EffectComposer>
      <Bloom
        intensity={0.5}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
    </EffectComposer>
  );
}

// Glowing Particle Blob - Organic flowing shape with glowing spheres
function ParticleBlobMesh({ count = 2000, color = "#ffffff", mouseRef }: { count?: number; color?: string; mouseRef?: React.RefObject<{ x: number; y: number }> }) {
  const points = useRef<THREE.Points>(null);
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.5 + Math.random() * 0.8;

      const noiseX = (Math.random() - 0.5) * 0.3;
      const noiseY = (Math.random() - 0.5) * 0.3;
      const noiseZ = (Math.random() - 0.5) * 0.3;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta) + noiseX;
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) + noiseY;
      positions[i * 3 + 2] = radius * Math.cos(phi) + noiseZ;
    }

    return positions;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    const time = state.clock.elapsedTime * 0.3;
    points.current.rotation.x = Math.sin(time * 0.5) * 0.2;
    points.current.rotation.y = time * 0.2;
    points.current.rotation.z = Math.cos(time * 0.3) * 0.1;

    // Mouse interaction
    if (mouseRef?.current) {
      points.current.rotation.x += mouseRef.current.y * 0.05;
      points.current.rotation.y += mouseRef.current.x * 0.05;
    }
  });

  return (
    <Points
      ref={points}
      positions={particlesPosition}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color={color}
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.9}
      />
    </Points>
  );
}

// Glowing core for the blob
function GlowingCore({ color = "#ffffff" }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;
    mesh.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1);
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.15} />
    </mesh>
  );
}

export function GlowingParticleBlob({
  className = "",
  size = 300,
  enableBloom = true,
  interactive = true,
}: {
  className?: string;
  size?: number;
  enableBloom?: boolean;
  interactive?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  const mouse = useMousePosition();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`${className}`}
        style={{ width: size, height: size, background: "transparent" }}
      />
    );
  }

  const particleCount = isMobile ? 1000 : 3000;
  const shouldBloom = enableBloom && !isMobile;

  return (
    <div className={`${className}`} style={{ width: size, height: size }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: !isMobile }}
        dpr={isMobile ? 1 : [1, 2]}
      >
        <ambientLight intensity={0.5} />
        <ParticleBlobMesh
          count={particleCount}
          color="#ffffff"
          mouseRef={interactive ? mouse : undefined}
        />
        <GlowingCore color="#888888" />
        <Effects enableBloom={shouldBloom} />
      </Canvas>
    </div>
  );
}

// Glowing Torus with particles
function TorusParticles({ count = 1500, mouseRef }: { count?: number; mouseRef?: React.RefObject<{ x: number; y: number }> }) {
  const points = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const torusRadius = 1.5;
    const tubeRadius = 0.5;

    for (let i = 0; i < count; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;

      const x = (torusRadius + tubeRadius * Math.cos(v)) * Math.cos(u);
      const y = (torusRadius + tubeRadius * Math.cos(v)) * Math.sin(u);
      const z = tubeRadius * Math.sin(v);

      const noise = 0.05;
      positions[i * 3] = x + (Math.random() - 0.5) * noise;
      positions[i * 3 + 1] = y + (Math.random() - 0.5) * noise;
      positions[i * 3 + 2] = z + (Math.random() - 0.5) * noise;
    }

    return positions;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    const time = state.clock.elapsedTime;
    points.current.rotation.x = Math.PI * 0.2;
    points.current.rotation.y = time * 0.15;

    if (mouseRef?.current) {
      points.current.rotation.x += mouseRef.current.y * 0.1;
      points.current.rotation.z = mouseRef.current.x * 0.1;
    }
  });

  return (
    <Points
      ref={points}
      positions={particlesPosition}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.95}
      />
    </Points>
  );
}

// Bright spots on torus
function TorusGlowSpots({ count = 15 }) {
  const spotsRef = useRef<THREE.Group>(null);

  const spots = useMemo(() => {
    const result = [];
    const torusRadius = 1.5;
    const tubeRadius = 0.5;

    for (let i = 0; i < count; i++) {
      const u = (i / count) * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;

      const x = (torusRadius + tubeRadius * Math.cos(v)) * Math.cos(u);
      const y = (torusRadius + tubeRadius * Math.cos(v)) * Math.sin(u);
      const z = tubeRadius * Math.sin(v);

      result.push({
        position: [x, y, z] as [number, number, number],
        scale: 0.08 + Math.random() * 0.08,
        speed: 0.5 + Math.random() * 0.5,
      });
    }
    return result;
  }, [count]);

  useFrame((state) => {
    if (!spotsRef.current) return;
    const time = state.clock.elapsedTime;
    spotsRef.current.rotation.x = Math.PI * 0.2;
    spotsRef.current.rotation.y = time * 0.15;
  });

  return (
    <group ref={spotsRef}>
      {spots.map((spot, i) => (
        <mesh key={i} position={spot.position}>
          <sphereGeometry args={[spot.scale, 16, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.95} />
        </mesh>
      ))}
    </group>
  );
}

export function GlowingTorus({
  className = "",
  size = 300,
  enableBloom = true,
  interactive = true,
}: {
  className?: string;
  size?: number;
  enableBloom?: boolean;
  interactive?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  const mouse = useMousePosition();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`${className}`}
        style={{ width: size, height: size, background: "transparent" }}
      />
    );
  }

  const particleCount = isMobile ? 800 : 2000;
  const spotCount = isMobile ? 10 : 20;
  const shouldBloom = enableBloom && !isMobile;

  return (
    <div className={`${className}`} style={{ width: size, height: size }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: !isMobile }}
        dpr={isMobile ? 1 : [1, 2]}
      >
        <ambientLight intensity={0.3} />
        <TorusParticles count={particleCount} mouseRef={interactive ? mouse : undefined} />
        <TorusGlowSpots count={spotCount} />
        <Effects enableBloom={shouldBloom} />
      </Canvas>
    </div>
  );
}

// Flowing Particle Wave
function WaveParticles({ count = 3000, mouseRef }: { count?: number; mouseRef?: React.RefObject<{ x: number; y: number }> }) {
  const points = useRef<THREE.Points>(null);
  const initialPositions = useRef<Float32Array | null>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const cols = Math.floor(Math.sqrt(count));
    const rows = Math.ceil(count / cols);

    for (let i = 0; i < count; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      positions[i * 3] = (col / cols - 0.5) * 6;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = (row / rows - 0.5) * 4;
    }

    initialPositions.current = positions.slice();
    return positions;
  }, [count]);

  useFrame((state) => {
    if (!points.current || !initialPositions.current) return;
    const time = state.clock.elapsedTime;
    const positions = points.current.geometry.attributes.position.array as Float32Array;
    const initial = initialPositions.current;

    // Mouse influence
    const mouseInfluence = mouseRef?.current ? mouseRef.current.x * 0.5 : 0;

    for (let i = 0; i < count; i++) {
      const x = initial[i * 3];
      const z = initial[i * 3 + 2];

      const wave1 = Math.sin(x * 2 + time * 1.5 + mouseInfluence) * 0.3;
      const wave2 = Math.sin(z * 3 + time * 1.2) * 0.2;
      const wave3 = Math.sin((x + z) * 1.5 + time) * 0.15;

      positions[i * 3 + 1] = wave1 + wave2 + wave3;
    }

    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points
      ref={points}
      positions={particlesPosition}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
}

export function ParticleWave3D({
  className = "",
  size = 400,
  height = 200,
  enableBloom = true,
  interactive = true,
}: {
  className?: string;
  size?: number;
  height?: number;
  enableBloom?: boolean;
  interactive?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  const mouse = useMousePosition();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`${className}`}
        style={{ width: size, height: height, background: "transparent" }}
      />
    );
  }

  const particleCount = isMobile ? 1000 : 2500;
  const shouldBloom = enableBloom && !isMobile;

  return (
    <div className={`${className}`} style={{ width: size, height: height }}>
      <Canvas
        camera={{ position: [0, 3, 4], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: !isMobile }}
        dpr={isMobile ? 1 : [1, 2]}
      >
        <ambientLight intensity={0.3} />
        <WaveParticles count={particleCount} mouseRef={interactive ? mouse : undefined} />
        <Effects enableBloom={shouldBloom} />
      </Canvas>
    </div>
  );
}

// Rotating Particle Sphere with glow
function SphereMesh({ count = 2000, mouseRef }: { count?: number; mouseRef?: React.RefObject<{ x: number; y: number }> }) {
  const points = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const offset = 2 / count;
      const increment = Math.PI * (3 - Math.sqrt(5));
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;

      const scale = 1.5;
      positions[i * 3] = Math.cos(phi) * r * scale;
      positions[i * 3 + 1] = y * scale;
      positions[i * 3 + 2] = Math.sin(phi) * r * scale;
    }

    return positions;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    const time = state.clock.elapsedTime;
    points.current.rotation.y = time * 0.2;
    points.current.rotation.x = Math.sin(time * 0.3) * 0.1;

    if (mouseRef?.current) {
      points.current.rotation.x += mouseRef.current.y * 0.1;
      points.current.rotation.z = mouseRef.current.x * 0.1;
    }
  });

  return (
    <Points
      ref={points}
      positions={particlesPosition}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.9}
      />
    </Points>
  );
}

// Inner glow sphere
function InnerGlowSphere() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;
    mesh.current.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshBasicMaterial color="#333333" transparent opacity={0.2} />
    </mesh>
  );
}

export function ParticleSphere3D({
  className = "",
  size = 250,
  enableBloom = true,
  interactive = true,
}: {
  className?: string;
  size?: number;
  enableBloom?: boolean;
  interactive?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  const mouse = useMousePosition();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`${className}`}
        style={{ width: size, height: size, background: "transparent" }}
      />
    );
  }

  const particleCount = isMobile ? 1000 : 2500;
  const shouldBloom = enableBloom && !isMobile;

  return (
    <div className={`${className}`} style={{ width: size, height: size }}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: !isMobile }}
        dpr={isMobile ? 1 : [1, 2]}
      >
        <ambientLight intensity={0.4} />
        <SphereMesh count={particleCount} mouseRef={interactive ? mouse : undefined} />
        <InnerGlowSphere />
        <Effects enableBloom={shouldBloom} />
      </Canvas>
    </div>
  );
}

// Network Nodes Visualization
function NetworkNodesMesh({ nodeCount = 8, mouseRef }: { nodeCount?: number; mouseRef?: React.RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => {
    const result = [];
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 1.8 + Math.random() * 0.5;
      const y = (Math.random() - 0.5) * 1.5;

      result.push({
        position: [
          Math.cos(angle) * radius,
          y,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        scale: 0.15 + Math.random() * 0.1,
      });
    }
    return result;
  }, [nodeCount]);

  const connections = useMemo(() => {
    const lines: { start: [number, number, number]; end: [number, number, number] }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.5) {
          lines.push({
            start: nodes[i].position,
            end: nodes[j].position,
          });
        }
      }
    }
    return lines;
  }, [nodes]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    groupRef.current.rotation.y = time * 0.1;

    if (mouseRef?.current) {
      groupRef.current.rotation.x = mouseRef.current.y * 0.2;
      groupRef.current.rotation.z = mouseRef.current.x * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshBasicMaterial color="#888888" transparent opacity={0.95} />
      </mesh>

      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[node.scale, 16, 16]} />
          <meshBasicMaterial color="#666666" transparent opacity={0.9} />
        </mesh>
      ))}

      {connections.map((conn, i) => (
        <Line
          key={i}
          points={[conn.start, conn.end]}
          color="#444444"
          lineWidth={1}
          transparent
          opacity={0.4}
        />
      ))}

      {nodes.map((node, i) => (
        <Line
          key={`center-${i}`}
          points={[[0, 0, 0], node.position]}
          color="#333333"
          lineWidth={1}
          transparent
          opacity={0.3}
        />
      ))}
    </group>
  );
}

export function NetworkVisualization3D({
  className = "",
  size = 300,
  enableBloom = true,
  interactive = true,
}: {
  className?: string;
  size?: number;
  enableBloom?: boolean;
  interactive?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  const mouse = useMousePosition();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`${className}`}
        style={{ width: size, height: size, background: "transparent" }}
      />
    );
  }

  const nodeCount = isMobile ? 6 : 10;
  const shouldBloom = enableBloom && !isMobile;

  return (
    <div className={`${className}`} style={{ width: size, height: size }}>
      <Canvas
        camera={{ position: [0, 2, 5], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: !isMobile }}
        dpr={isMobile ? 1 : [1, 2]}
      >
        <ambientLight intensity={0.4} />
        <NetworkNodesMesh nodeCount={nodeCount} mouseRef={interactive ? mouse : undefined} />
        <Effects enableBloom={shouldBloom} />
      </Canvas>
    </div>
  );
}

// Floating particles around content
function FloatingParticlesMesh({ count = 100, radius = 3 }) {
  const points = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius + Math.random() * 1;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }

    return positions;
  }, [count, radius]);

  useFrame((state) => {
    if (!points.current) return;
    const time = state.clock.elapsedTime;
    points.current.rotation.y = time * 0.05;
    points.current.rotation.x = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <Points
      ref={points}
      positions={particlesPosition}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.5}
      />
    </Points>
  );
}

export function FloatingParticles({
  className = "",
  width = 400,
  height = 300,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`${className}`}
        style={{ width, height, background: "transparent" }}
      />
    );
  }

  const particleCount = isMobile ? 75 : 150;

  return (
    <div className={`${className} pointer-events-none`} style={{ width, height }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: false }}
        dpr={1}
      >
        <FloatingParticlesMesh count={particleCount} radius={3} />
      </Canvas>
    </div>
  );
}

// Ambient background particles for entire page
function AmbientParticlesMesh({ count = 200 }) {
  const points = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    return positions;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    const time = state.clock.elapsedTime;
    points.current.rotation.y = time * 0.02;
  });

  return (
    <Points
      ref={points}
      positions={particlesPosition}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.3}
      />
    </Points>
  );
}

export function AmbientParticles({
  className = "",
}: {
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isMobile) {
    return null;
  }

  return (
    <div className={`${className} fixed inset-0 pointer-events-none z-0`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: false }}
        dpr={1}
      >
        <AmbientParticlesMesh count={150} />
      </Canvas>
    </div>
  );
}
