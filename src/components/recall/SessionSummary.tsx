import { motion } from 'framer-motion';
import { Trophy, Flame, TrendingUp, Brain, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface MemoryImprovement {
  subject: string;
  improvement: number;
}

interface SessionSummaryProps {
  xpEarned: number;
  streak: number;
  accuracy: number;
  correct: number;
  incorrect: number;
  memoryImprovements?: MemoryImprovement[];
  onStudyAgain: () => void;
}

export function SessionSummary({
  xpEarned,
  streak,
  accuracy,
  correct,
  incorrect,
  memoryImprovements = [
    { subject: 'Physics', improvement: 8 },
    { subject: 'Biology', improvement: 5 },
    { subject: 'Chemistry', improvement: 3 },
  ],
  onStudyAgain,
}: SessionSummaryProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-recallify flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="glass-panel p-8 rounded-2xl text-center max-w-md w-full relative overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-success/20 rounded-full blur-3xl" />

        {/* Header Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="relative w-20 h-20 mx-auto rounded-full bg-gradient-success flex items-center justify-center glow-success mb-6"
        >
          <Brain className="w-10 h-10 text-primary-foreground" />
        </motion.div>

        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          🧠 Session Complete
        </h2>

        {/* XP Counter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <span className="text-4xl font-display font-bold gradient-text-xp">
            +{xpEarned}
          </span>
          <span className="text-lg text-muted-foreground">XP</span>
        </motion.div>

        {/* Streak Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-streak/20 text-streak mb-6"
        >
          <Flame className="w-5 h-5" />
          <span className="font-semibold">Streak: {streak} days</span>
        </motion.div>

        {/* Memory Improvements */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-panel p-4 rounded-xl mb-6 text-left"
        >
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Memory improved in:
          </p>
          <div className="space-y-3">
            {memoryImprovements.map((item, index) => (
              <motion.div
                key={item.subject}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center justify-between"
              >
                <span className="text-sm text-foreground">{item.subject}</span>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 'auto' }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-2"
                >
                  <div
                    className="h-2 rounded-full bg-gradient-success"
                    style={{ width: `${item.improvement * 5}px` }}
                  />
                  <span className="text-sm font-mono text-success">
                    +{item.improvement}%
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Reminder Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-xs text-muted-foreground flex items-center justify-center gap-2 mb-6"
        >
          <Bell className="w-4 h-4" />
          We'll remind you before you forget again.
        </motion.p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-panel p-3 rounded-xl"
          >
            <p className="text-2xl font-display font-bold text-success">
              {correct}
            </p>
            <p className="text-[10px] text-muted-foreground">Correct</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-panel p-3 rounded-xl"
          >
            <p className="text-2xl font-display font-bold text-error">
              {incorrect}
            </p>
            <p className="text-[10px] text-muted-foreground">Incorrect</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-panel p-3 rounded-xl"
          >
            <p className="text-2xl font-display font-bold text-foreground">
              {accuracy}%
            </p>
            <p className="text-[10px] text-muted-foreground">Accuracy</p>
          </motion.div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </Button>
          <Button
            className="flex-1 bg-gradient-xp hover:opacity-90 text-primary-foreground gap-2"
            onClick={onStudyAgain}
          >
            <Trophy className="w-4 h-4" />
            Study Again
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
