import { useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles, PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { RecallifyLogo } from '@/components/brand/RecallifyLogo';
import { ProductFeatures } from '@/components/features/ProductFeatures';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Sparkles as SparklesIcon, Zap, Trophy, Users } from 'lucide-react';

// Glowing particle field
const GlowingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 500;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;
    }
  });

  return (
    <Points ref={particlesRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8B5CF6"
        size={0.5}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

// Ethereal glow rings
const GlowRings = () => {
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const ringRef3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef1.current) {
      ringRef1.current.rotation.x = t * 0.2;
      ringRef1.current.rotation.y = t * 0.1;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.x = -t * 0.15;
      ringRef2.current.rotation.z = t * 0.1;
    }
    if (ringRef3.current) {
      ringRef3.current.rotation.y = t * 0.25;
      ringRef3.current.rotation.z = -t * 0.05;
    }
  });

  return (
    <group>
      <mesh ref={ringRef1}>
        <torusGeometry args={[18, 0.15, 16, 100]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ringRef2}>
        <torusGeometry args={[22, 0.1, 16, 100]} />
        <meshBasicMaterial color="#22C55E" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ringRef3}>
        <torusGeometry args={[26, 0.08, 16, 100]} />
        <meshBasicMaterial color="#F59E0B" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

const GlowingBackground = () => {
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
          uniform float uTime; 
          uniform vec2 uMouse; 
          varying vec2 vUv;
          
          vec3 neonPurple = vec3(0.545, 0.361, 0.965);
          vec3 neonGreen = vec3(0.133, 0.773, 0.369);
          vec3 deepNavy = vec3(0.043, 0.059, 0.102);
          
          float noise(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
          }
          
          void main() {
            vec2 uv = vUv; 
            float t = uTime * 0.1;
            vec2 m = uMouse * 0.15;
            
            // Flowing glow effect
            float glow1 = sin(uv.x * 3.0 + t + m.x * 5.0) * sin(uv.y * 2.5 - t * 0.8 + m.y * 5.0);
            float glow2 = sin(uv.x * 5.0 - t * 1.2) * sin(uv.y * 4.0 + t * 0.6);
            float glow3 = sin(length(uv - 0.5 + m * 0.2) * 8.0 - t * 2.0);
            
            // Combine glows
            float combinedGlow = (glow1 * 0.4 + glow2 * 0.3 + glow3 * 0.3) * 0.5 + 0.5;
            combinedGlow = smoothstep(0.3, 0.7, combinedGlow);
            
            // Radial glow from center
            float radialGlow = 1.0 - length(uv - 0.5 + m * 0.1) * 1.2;
            radialGlow = max(0.0, radialGlow);
            radialGlow = pow(radialGlow, 2.0);
            
            // Color mixing
            vec3 glowColor = mix(neonPurple, neonGreen, glow2 * 0.5 + 0.5);
            vec3 finalColor = deepNavy + glowColor * combinedGlow * 0.15 + glowColor * radialGlow * 0.2;
            
            // Add subtle noise for texture
            finalColor += vec3(noise(uv * 500.0 + t)) * 0.02;
            
            gl_FragColor = vec4(finalColor, 1.0);
          }
        `}
      />
    </mesh>
  );
};

const GlowingBrainMonolith = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.2;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y = -t * 0.15;
      const scale = 1.1 + Math.sin(t * 2) * 0.05;
      glowRef.current.scale.setScalar(scale);
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
      <group>
        {/* Outer glow sphere */}
        <mesh ref={glowRef}>
          <icosahedronGeometry args={[15, 1]} />
          <meshBasicMaterial 
            color="#8B5CF6" 
            transparent 
            opacity={0.08}
            side={THREE.BackSide}
          />
        </mesh>
        
        {/* Main brain */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[12, 2]} />
          <MeshDistortMaterial 
            color="#1a1a2e" 
            speed={3} 
            distort={0.3} 
            roughness={0.1} 
            metalness={0.95}
            emissive="#8B5CF6"
            emissiveIntensity={0.4}
          />
        </mesh>
        
        {/* Inner core glow */}
        <mesh>
          <icosahedronGeometry args={[8, 1]} />
          <meshBasicMaterial 
            color="#8B5CF6" 
            transparent 
            opacity={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
};

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, 
        { filter: "blur(30px)", opacity: 0, scale: 1.02 },
        { filter: "blur(0px)", opacity: 1, scale: 1, duration: 2.2, ease: "expo.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const features = [
    { icon: Brain, title: 'AI-Powered Learning', desc: 'Smart spaced repetition algorithm' },
    { icon: Zap, title: 'Gamified Progress', desc: 'XP, levels, and achievements' },
    { icon: Trophy, title: 'Challenges', desc: 'Daily & weekly goals' },
    { icon: Users, title: 'Social Learning', desc: 'Compete with friends' },
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-background flex flex-col overflow-hidden">
      {/* 3D Glow-in-the-Dark Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 60], fov: 35 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 0, 30]} intensity={2} color="#8B5CF6" />
          <pointLight position={[30, 20, 20]} intensity={1.5} color="#22C55E" />
          <pointLight position={[-30, -20, 20]} intensity={1} color="#F59E0B" />
          <GlowingBackground />
          <GlowingBrainMonolith />
          <GlowRings />
          <GlowingParticles />
          <Sparkles count={200} scale={80} size={2} speed={0.3} color="#8B5CF6" />
        </Canvas>
      </div>

      {/* Content */}
      <div ref={heroRef} className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <header className="p-6 md:p-8 flex items-center justify-between">
          <RecallifyLogo size="md" animated={true} />
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/login')}
              className="text-muted-foreground hover:text-foreground"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => navigate('/login')}
              className="bg-gradient-xp hover:opacity-90 text-primary-foreground gap-2"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </header>

        {/* Hero Content */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm font-medium text-primary mb-8">
                <SparklesIcon className="w-4 h-4" />
                AI-Powered Memory Training
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[0.95] tracking-tight mb-6"
            >
              Remember
              <br />
              <span className="text-outline">Everything.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              Recallify uses AI-powered spaced repetition to help you learn faster and remember longer. 
              Transform how you study with gamified flashcards.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button 
                size="lg"
                onClick={() => navigate('/login')}
                className="bg-gradient-xp hover:opacity-90 text-primary-foreground h-14 px-8 text-lg gap-2 shadow-lg shadow-primary/25"
              >
                Start Learning Free
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg glass-panel border-border hover:bg-muted/50"
              >
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-8 mt-16"
            >
              {[
                { value: '50K+', label: 'Active Learners' },
                { value: '2M+', label: 'Cards Reviewed' },
                { value: '94%', label: 'Retention Rate' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-display font-bold gradient-text-xp">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="p-6 md:p-12"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="glass-panel p-6 rounded-xl text-center cursor-default"
              >
                <feature.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Product Features Bento Grid */}
        <ProductFeatures />

        {/* Footer */}
        <footer className="p-6 text-center border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            © 2024 Recallify. Supercharge your memory.
          </p>
        </footer>
      </div>

      {/* Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none bento-mask opacity-5 z-[100]" />
    </section>
  );
};

export default Index;
