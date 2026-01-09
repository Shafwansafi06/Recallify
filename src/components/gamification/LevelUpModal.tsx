import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import { levelTitles } from '@/data/mockData';
import { Sparkles, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const LevelUpModal = () => {
  const { showLevelUp, newLevel, dismissLevelUp } = useGame();
  const [confetti, setConfetti] = useState<{ id: number; x: number; delay: number }[]>([]);

  useEffect(() => {
    if (showLevelUp) {
      // Generate confetti particles
      const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
      }));
      setConfetti(particles);
    }
  }, [showLevelUp]);

  const levelTitle = levelTitles[newLevel] || 'Champion';

  return (
    <AnimatePresence>
      {showLevelUp && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-md"
          onClick={dismissLevelUp}
        >
          {/* Confetti */}
          {confetti.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ y: -20, x: `${particle.x}vw`, opacity: 1 }}
              animate={{ y: '100vh', opacity: 0 }}
              transition={{ duration: 2.5, delay: particle.delay, ease: 'linear' }}
              className="absolute w-3 h-3 pointer-events-none"
              style={{
                background: `hsl(${Math.random() * 360}, 80%, 60%)`,
                borderRadius: Math.random() > 0.5 ? '50%' : '0',
              }}
            />
          ))}

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', damping: 15 }}
            className="glass-panel p-8 rounded-2xl text-center max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Badge Icon */}
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', damping: 10, delay: 0.2 }}
              className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-xp flex items-center justify-center glow-xp"
            >
              <Award className="w-12 h-12 text-primary-foreground" />
            </motion.div>

            {/* Stars */}
            <div className="flex justify-center gap-2 mb-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, type: 'spring' }}
                >
                  <Star className="w-6 h-6 text-streak fill-streak" />
                </motion.div>
              ))}
            </div>

            {/* Title */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-display text-3xl font-bold text-foreground mb-2"
            >
              Level Up!
            </motion.h2>

            {/* Level Number */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <span className="text-6xl font-display font-black gradient-text-xp">
                {newLevel}
              </span>
            </motion.div>

            {/* Level Title */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-lg text-muted-foreground mb-6"
            >
              You're now a <span className="text-primary font-semibold">{levelTitle}</span> 🧠
            </motion.p>

            {/* Dismiss Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                onClick={dismissLevelUp}
                className="bg-gradient-xp hover:opacity-90 text-primary-foreground px-8 gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Continue Learning
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
