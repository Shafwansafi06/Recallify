import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';

export const XPFloater = () => {
  const { xpEvents } = useGame();

  return (
    <div className="fixed bottom-8 right-8 z-50 pointer-events-none">
      <AnimatePresence>
        {xpEvents.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -50, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-2xl font-display font-bold gradient-text-xp"
          >
            +{event.amount} XP
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
