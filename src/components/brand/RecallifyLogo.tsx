import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface RecallifyLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  animated?: boolean;
  className?: string;
}

export const RecallifyLogo = ({ 
  size = 'md', 
  showText = true, 
  animated = true,
  className = ''
}: RecallifyLogoProps) => {
  const navigate = useNavigate();

  const sizes = {
    sm: { icon: 28, text: 'text-lg' },
    md: { icon: 36, text: 'text-xl' },
    lg: { icon: 48, text: 'text-2xl' },
    xl: { icon: 64, text: 'text-4xl' },
  };

  const { icon, text } = sizes[size];

  return (
    <motion.button
      onClick={() => navigate('/')}
      className={`flex items-center gap-3 group ${className}`}
      whileHover={animated ? { scale: 1.02 } : {}}
      whileTap={animated ? { scale: 0.98 } : {}}
    >
      {/* Logo Icon - Abstract Brain with Recall Loop */}
      <div className="relative">
        <svg
          width={icon}
          height={icon}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(258, 90%, 66%)" />
              <stop offset="50%" stopColor="hsl(280, 90%, 60%)" />
              <stop offset="100%" stopColor="hsl(258, 90%, 55%)" />
            </linearGradient>
            <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(142, 71%, 45%)" />
              <stop offset="100%" stopColor="hsl(258, 90%, 66%)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Outer Ring - Memory Loop */}
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            stroke="url(#logoGradient)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="8 4"
            initial={{ rotate: 0 }}
            animate={animated ? { rotate: 360 } : {}}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: 'center' }}
          />

          {/* Inner Ring */}
          <circle
            cx="32"
            cy="32"
            r="22"
            stroke="hsl(222, 47%, 20%)"
            strokeWidth="1.5"
            fill="none"
          />

          {/* Brain Nodes - Representing Neural Connections */}
          <motion.g filter="url(#glow)">
            {/* Central Node */}
            <circle cx="32" cy="32" r="6" fill="url(#logoGradient)" />
            
            {/* Top Node */}
            <motion.circle
              cx="32"
              cy="16"
              r="4"
              fill="url(#glowGradient)"
              initial={{ opacity: 0.6 }}
              animate={animated ? { opacity: [0.6, 1, 0.6] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Bottom Left Node */}
            <motion.circle
              cx="18"
              cy="44"
              r="4"
              fill="url(#glowGradient)"
              initial={{ opacity: 0.6 }}
              animate={animated ? { opacity: [0.6, 1, 0.6] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            />
            
            {/* Bottom Right Node */}
            <motion.circle
              cx="46"
              cy="44"
              r="4"
              fill="url(#glowGradient)"
              initial={{ opacity: 0.6 }}
              animate={animated ? { opacity: [0.6, 1, 0.6] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
            />
          </motion.g>

          {/* Neural Connections */}
          <motion.path
            d="M32 26 L32 16"
            stroke="url(#logoGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={animated ? { pathLength: 1 } : { pathLength: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
          <motion.path
            d="M27 36 L20 42"
            stroke="url(#logoGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={animated ? { pathLength: 1 } : { pathLength: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          />
          <motion.path
            d="M37 36 L44 42"
            stroke="url(#logoGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={animated ? { pathLength: 1 } : { pathLength: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          />

          {/* Recall Arrow - Unique Symbol */}
          <motion.path
            d="M48 20 C52 24, 52 28, 48 32 L50 30 M48 32 L46 30"
            stroke="hsl(142, 71%, 45%)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ opacity: 0 }}
            animate={animated ? { opacity: [0.5, 1, 0.5] } : { opacity: 1 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </svg>

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-display ${text} font-bold text-foreground tracking-tight`}>
            Recallify
          </span>
          <span className="text-[9px] font-mono text-primary uppercase tracking-[0.2em] -mt-1">
            Memory Engine
          </span>
        </div>
      )}
    </motion.button>
  );
};
