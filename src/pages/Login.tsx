import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { RecallifyLogo } from '@/components/brand/RecallifyLogo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, User, ArrowRight, Sparkles, Eye, EyeOff, Github, Chrome } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const floatingParticles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="min-h-screen bg-gradient-recallify flex overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bento-mask opacity-5" />
        
        {/* Floating Particles */}
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary/30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-success/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Left Side - Branding */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex flex-1 flex-col justify-between p-12 relative z-10"
      >
        <RecallifyLogo size="lg" animated={true} />

        <div className="max-w-lg">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-6"
          >
            Your memory,
            <br />
            <span className="gradient-text-xp">supercharged.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-muted-foreground mb-8"
          >
            Join thousands of learners using AI-powered spaced repetition to remember everything, forever.
          </motion.p>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex gap-8"
          >
            {[
              { value: '50K+', label: 'Active Learners' },
              { value: '2M+', label: 'Cards Reviewed' },
              { value: '94%', label: 'Avg. Retention' },
            ].map((stat, i) => (
              <div key={stat.label}>
                <p className="text-3xl font-display font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Testimonial */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="glass-panel p-6 rounded-2xl max-w-md"
        >
          <p className="text-foreground italic mb-4">
            "Recallify helped me pass my medical boards. The spaced repetition algorithm is genius!"
          </p>
          <div className="flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" 
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold text-foreground">Dr. Sarah Kim</p>
              <p className="text-xs text-muted-foreground">Medical Resident</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Side - Form */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex items-center justify-center p-8 relative z-10"
      >
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 flex justify-center">
            <RecallifyLogo size="lg" animated={true} />
          </div>

          {/* Form Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-8 rounded-3xl border border-border/50 shadow-2xl"
          >
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground">
                {isLogin ? 'Welcome back!' : 'Create your account'}
              </h2>
              <p className="text-muted-foreground mt-2">
                {isLogin ? 'Ready to boost your memory?' : 'Start your learning journey today'}
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="relative flex gap-1 p-1 rounded-xl bg-muted/50 mb-6">
              <motion.div
                className="absolute top-1 bottom-1 rounded-lg bg-primary"
                initial={false}
                animate={{ 
                  left: isLogin ? '4px' : '50%',
                  right: isLogin ? '50%' : '4px',
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
              <button
                onClick={() => setIsLogin(true)}
                className={`relative z-10 flex-1 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                  isLogin ? 'text-primary-foreground' : 'text-muted-foreground'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`relative z-10 flex-1 py-2.5 text-sm font-semibold rounded-lg transition-colors ${
                  !isLogin ? 'text-primary-foreground' : 'text-muted-foreground'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Social Login */}
            <div className="flex gap-3 mb-6">
              <Button variant="outline" className="flex-1 h-12 gap-2 bg-muted/30 border-border hover:bg-muted/50">
                <Chrome className="w-5 h-5" />
                Google
              </Button>
              <Button variant="outline" className="flex-1 h-12 gap-2 bg-muted/30 border-border hover:bg-muted/50">
                <Github className="w-5 h-5" />
                GitHub
              </Button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or continue with email</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    key="name"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-12 h-14 bg-muted/30 border-border focus:border-primary focus:ring-primary/20 text-base rounded-xl"
                        required={!isLogin}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-14 bg-muted/30 border-border focus:border-primary focus:ring-primary/20 text-base rounded-xl"
                  required
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-14 bg-muted/30 border-border focus:border-primary focus:ring-primary/20 text-base rounded-xl"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button type="button" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-gradient-xp hover:opacity-90 text-primary-foreground font-semibold text-base rounded-xl gap-2 shadow-lg shadow-primary/25"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <>
                    {isLogin ? 'Start Learning' : 'Create Account'}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>

            {isLogin && (
              <p className="text-center text-sm text-muted-foreground mt-6">
                Demo mode: Enter any email/password to explore
              </p>
            )}
          </motion.div>

          {/* Features Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 grid grid-cols-3 gap-4"
          >
            {[
              { icon: '🧠', label: 'AI-Powered', desc: 'Smart scheduling' },
              { icon: '🎮', label: 'Gamified', desc: 'XP & Rewards' },
              { icon: '📊', label: 'Analytics', desc: 'Track progress' },
            ].map((feature, i) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="glass-panel p-4 rounded-xl text-center cursor-default"
              >
                <span className="text-2xl">{feature.icon}</span>
                <p className="text-sm font-semibold text-foreground mt-2">{feature.label}</p>
                <p className="text-[10px] text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
