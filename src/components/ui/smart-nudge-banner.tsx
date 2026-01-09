import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Flame, Brain, TrendingUp, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NudgeMessage {
  id: string;
  type: 'warning' | 'streak' | 'progress' | 'insight';
  message: string;
  icon: React.ReactNode;
}

const nudgeMessages: NudgeMessage[] = [
  {
    id: '1',
    type: 'warning',
    message: "You're likely to forget Organic Chemistry tonight",
    icon: <AlertTriangle className="w-4 h-4" />,
  },
  {
    id: '2',
    type: 'streak',
    message: 'One recall session keeps your streak alive',
    icon: <Flame className="w-4 h-4" />,
  },
  {
    id: '3',
    type: 'progress',
    message: 'Physics recall strength increased 12% this week',
    icon: <TrendingUp className="w-4 h-4" />,
  },
  {
    id: '4',
    type: 'insight',
    message: 'Your best recall time is 9AM — in 2 hours',
    icon: <Brain className="w-4 h-4" />,
  },
  {
    id: '5',
    type: 'insight',
    message: 'AI detected: Biology needs review before tomorrow',
    icon: <Sparkles className="w-4 h-4" />,
  },
];

const typeStyles = {
  warning: {
    gradient: 'from-streak/10 to-transparent',
    border: 'border-streak/30',
    iconColor: 'text-streak',
    underline: 'bg-gradient-streak',
  },
  streak: {
    gradient: 'from-streak/10 to-transparent',
    border: 'border-streak/30',
    iconColor: 'text-streak',
    underline: 'bg-gradient-streak',
  },
  progress: {
    gradient: 'from-success/10 to-transparent',
    border: 'border-success/30',
    iconColor: 'text-success',
    underline: 'bg-gradient-success',
  },
  insight: {
    gradient: 'from-primary/10 to-transparent',
    border: 'border-primary/30',
    iconColor: 'text-primary',
    underline: 'bg-gradient-xp',
  },
};

interface SmartNudgeBannerProps {
  className?: string;
}

export function SmartNudgeBanner({ className }: SmartNudgeBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [currentNudge, setCurrentNudge] = useState<NudgeMessage | null>(null);

  useEffect(() => {
    // Select a random nudge on mount
    const randomNudge = nudgeMessages[Math.floor(Math.random() * nudgeMessages.length)];
    setCurrentNudge(randomNudge);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!currentNudge || !isVisible) return null;

  const styles = typeStyles[currentNudge.type];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, height: 0 }}
        animate={{ opacity: 1, y: 0, height: 'auto' }}
        exit={{ opacity: 0, y: -20, height: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={cn('relative overflow-hidden', className)}
      >
        <div
          className={cn(
            'relative px-4 py-3 backdrop-blur-xl border rounded-xl',
            `bg-gradient-to-r ${styles.gradient}`,
            styles.border
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className={styles.iconColor}>{currentNudge.icon}</span>
              <p className="text-sm text-foreground/90 font-medium">
                {currentNudge.message}
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 text-muted-foreground/60 hover:text-foreground transition-colors rounded-full hover:bg-muted/30"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Soft gradient underline */}
          <div
            className={cn(
              'absolute bottom-0 left-0 right-0 h-[2px]',
              styles.underline,
              'opacity-40'
            )}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
