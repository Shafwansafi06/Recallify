import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface StreakCardProps {
  streak: number;
  isActive?: boolean;
}

export const StreakCard = ({ streak, isActive = true }: StreakCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass-panel p-6 rounded-xl relative overflow-hidden"
    >
      {/* Background Glow */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-streak opacity-10" />
      )}

      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">
            Active Study Streak
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-display font-bold text-foreground">
              {streak}
            </span>
            <span className="text-lg text-streak font-semibold">Days</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Personal record: 31 days
          </p>
        </div>

        <motion.div
          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className={`p-4 rounded-full ${isActive ? 'bg-streak/20' : 'bg-muted'}`}
        >
          <Flame 
            className={`w-8 h-8 ${isActive ? 'text-streak' : 'text-muted-foreground'}`}
            fill={isActive ? 'currentColor' : 'none'}
          />
        </motion.div>
      </div>

      {/* Peak Badge */}
      <div className="absolute top-4 right-4">
        <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary rounded-full">
          Peak
        </span>
      </div>
    </motion.div>
  );
};
