"use client";

import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

const LiquidBackground = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  useFrame((state) => {
    const { clock, mouse } = state;
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime();
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uMouse.value.lerp(mouse, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        transparent
        uniforms={uniforms}
        vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
        fragmentShader={`
          uniform float uTime; uniform vec2 uMouse; varying vec2 vUv;
          void main() {
            vec2 uv = vUv; float t = uTime * 0.15;
            vec2 m = uMouse * 0.1;
            float color = smoothstep(0.0, 1.0, (sin(uv.x * 8.0 + t + m.x * 12.0) + sin(uv.y * 6.0 - t + m.y * 12.0)) * 0.5 + 0.5);
            vec3 deepNavy = vec3(0.043, 0.059, 0.102);
            vec3 lightNavy = vec3(0.078, 0.106, 0.176);
            gl_FragColor = vec4(mix(deepNavy, lightNavy, color), 1.0);
          }
        `}
      />
    </mesh>
  );
};

const BrainMonolith = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[13, 2]} />
        <MeshDistortMaterial 
          color="#8B5CF6" 
          speed={3} 
          distort={0.35} 
          roughness={0.15} 
          metalness={0.9}
          emissive="#8B5CF6"
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
};

export const ExperienceHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(revealRef.current, 
        { filter: "blur(30px)", opacity: 0, scale: 1.02 },
        { filter: "blur(0px)", opacity: 1, scale: 1, duration: 2.2, ease: "expo.out" }
      );
      
      gsap.from(".command-cell", {
        x: 60, opacity: 0, stagger: 0.15, duration: 1.5, ease: "power4.out", delay: 1, clearProps: "all"
      });

      const handleMouseMove = (e: MouseEvent) => {
        if (!ctaRef.current) return;
        const rect = ctaRef.current.getBoundingClientRect();
        const dist = Math.hypot(e.clientX - (rect.left + rect.width / 2), e.clientY - (rect.top + rect.height / 2));
        if (dist < 150) {
          gsap.to(ctaRef.current, { x: (e.clientX - (rect.left + rect.width/2)) * 0.4, y: (e.clientY - (rect.top + rect.height/2)) * 0.4, duration: 0.6 });
        } else {
          gsap.to(ctaRef.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
        }
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-background flex flex-col selection:bg-primary selection:text-primary-foreground overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 60], fov: 35 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[50, 50, 50]} intensity={2} color="#8B5CF6" />
          <spotLight position={[-50, -50, 50]} intensity={1} color="#22C55E" />
          <LiquidBackground />
          <BrainMonolith />
        </Canvas>
      </div>

      <div ref={revealRef} className="relative z-10 w-full flex flex-col md:flex-row p-8 md:p-14 lg:p-20 min-h-screen items-center md:items-stretch gap-10">
        <div className="flex-1 min-w-0 flex flex-col justify-between pb-12 md:pb-8 w-full">
          <div className="flex items-center gap-3">
             <div className="relative w-2.5 h-2.5 bg-primary rounded-full">
                <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30" />
             </div>
             <span className="font-mono text-[11px] font-bold text-foreground tracking-[0.2em] uppercase">RECALLIFY</span>
          </div>

          <div className="max-w-4xl lg:-translate-y-8 pr-12">
            <h1 className="text-[clamp(3rem,8vw,9rem)] font-black leading-[0.9] tracking-tighter text-foreground uppercase font-display">
              TRAIN YOUR <br /> <span className="text-outline">MEMORY</span>
            </h1>
            <p className="mt-8 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.35em] max-w-sm leading-relaxed">
              Scientifically proven spaced repetition. Gamified learning. Watch your recall skyrocket.
            </p>
          </div>
          
          <button ref={ctaRef} className="w-fit flex items-center gap-6 group lg:-translate-y-20">
             <div className="w-14 h-14 rounded-full border border-foreground/15 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500 overflow-hidden animate-glow-pulse">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:stroke-primary-foreground stroke-foreground transition-colors duration-500">
                  <path d="M7 17L17 7M17 7H8M17 7V16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
             </div>
             <span className="font-mono text-[11px] font-bold text-foreground uppercase tracking-[0.2em]">Start Recall</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="w-full md:w-80 lg:w-96 flex-shrink-0 flex flex-col gap-4 justify-center z-20">
          {/* Streak Card */}
          <div className="command-cell glass-panel p-6 sm:p-7 block">
            <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest block mb-3">001 // DAILY STREAK</span>
            <div className="flex justify-between items-end mt-2">
              <div className="flex items-center gap-3">
                <span className="text-4xl animate-streak-pulse">🔥</span>
                <h4 className="text-3xl sm:text-4xl font-bold gradient-text-streak tracking-tighter font-display">6 Days</h4>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-3 font-mono">Don't break it today.</p>
          </div>

          {/* Level Card */}
          <div className="command-cell glass-panel p-6 sm:p-7 block">
            <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest block mb-3">002 // CURRENT LEVEL</span>
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-foreground font-display">Scholar 🧠</span>
                <span className="text-xs font-mono text-primary">Lvl 12</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-gradient-xp w-[68%] rounded-full relative">
                  <div className="absolute inset-0 bg-gradient-xp animate-loading opacity-30" />
                </div>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                <span>2,450 XP</span>
                <span>3,600 XP</span>
              </div>
            </div>
          </div>

          {/* Recall Score Card */}
          <div className="command-cell glass-panel p-6 sm:p-7 block">
            <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest block mb-3">003 // RECALL SCORE</span>
            <div className="flex items-center justify-between mt-2">
              <h3 className="text-3xl font-bold text-success font-display">94.2%</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-success font-mono">↑ 3.4%</span>
                <span className="text-[10px] text-muted-foreground">this week</span>
              </div>
            </div>
            <p className="text-sm text-foreground/70 mt-3 leading-snug">
              Your strongest topic: <span className="italic text-primary">Organic Chemistry</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
