import { motion } from 'framer-motion';
import { Ghost, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GhostCompetitorProps {
  name: string;
  avatar: string;
  bestScore: number;
  className?: string;
}

export function GhostCompetitor({
  name,
  avatar,
  bestScore,
  className,
}: GhostCompetitorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        'relative p-4 rounded-xl border-2 border-dashed border-muted-foreground/30',
        'bg-muted/10 backdrop-blur-sm',
        className
      )}
    >
      {/* Ghost overlay effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

      <div className="relative flex items-center gap-4">
        {/* Ghost Avatar */}
        <div className="relative">
          <img
            src={avatar}
            alt={name}
            className="w-12 h-12 rounded-full object-cover opacity-50 grayscale"
          />
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-muted-foreground/40 animate-pulse" />
          <Ghost className="absolute -bottom-1 -right-1 w-5 h-5 text-muted-foreground/60" />
        </div>

        {/* Ghost Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted-foreground/80 font-medium truncate">
            Beat {name}'s best run
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <Zap className="w-4 h-4 text-primary/60" />
            <span className="font-mono font-semibold text-foreground/70">
              {bestScore} XP
            </span>
          </div>
        </div>

        {/* Challenge Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
        >
          Challenge
        </motion.button>
      </div>

      {/* Ghostly shimmer effect */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.05) 50%, transparent 100%)',
        }}
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  );
}
