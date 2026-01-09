import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { levelTitles } from '@/data/mockData';
import { Sparkles } from 'lucide-react';

export const XPProgress = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  const progress = (user.xp / user.xpToNextLevel) * 100;
  const currentTitle = levelTitles[user.level] || 'Champion';
  const nextTitle = levelTitles[user.level + 1] || 'Legend';

  return (
    <div className="glass-panel p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-xp flex items-center justify-center glow-xp">
            <span className="text-xl font-display font-bold text-primary-foreground">
              {user.level}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{currentTitle}</p>
            <p className="text-xs text-muted-foreground">Level {user.level}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-mono text-primary">
            {user.xp.toLocaleString()} / {user.xpToNextLevel.toLocaleString()} XP
          </p>
          <p className="text-xs text-muted-foreground">Next: {nextTitle}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-gradient-xp rounded-full relative"
        >
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
        </motion.div>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
        <Sparkles className="w-3 h-3 text-primary" />
        <span>{user.xpToNextLevel - user.xp} XP until next level</span>
      </div>
    </div>
  );
};
