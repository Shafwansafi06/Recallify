import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { RecallifyLogo } from '@/components/brand/RecallifyLogo';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Sparkles, Zap, Trophy, Users } from 'lucide-react';

const LiquidBackground = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  };

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
            gl_FragColor = vec4(mix(vec3(0.005), vec3(0.05), color), 1.0);
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
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[13, 1]} />
        <MeshDistortMaterial color="#8B5CF6" speed={4} distort={0.4} roughness={0.1} metalness={0.9} />
      </mesh>
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
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 60], fov: 35 }}>
          <ambientLight intensity={0.4} />
          <spotLight position={[50, 50, 50]} intensity={3} />
          <LiquidBackground />
          <BrainMonolith />
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
                <Sparkles className="w-4 h-4" />
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
