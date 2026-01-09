import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DemoModeToggleProps {
  className?: string;
}

export function DemoModeToggle({ className }: DemoModeToggleProps) {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [showToggle, setShowToggle] = useState(false);

  // Secret key combo: Press 'D' three times quickly to show toggle
  useEffect(() => {
    let keyPresses: number[] = [];
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'd') {
        const now = Date.now();
        keyPresses.push(now);
        keyPresses = keyPresses.filter((t) => now - t < 1000);
        
        if (keyPresses.length >= 3) {
          setShowToggle((prev) => !prev);
          keyPresses = [];
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggle = () => {
    setIsDemoMode((prev) => !prev);
    // You can dispatch events or update context here
    window.dispatchEvent(
      new CustomEvent('demo-mode-change', { detail: { enabled: !isDemoMode } })
    );
  };

  return (
    <AnimatePresence>
      {showToggle && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className={cn(
            'fixed bottom-6 right-6 z-[200]',
            className
          )}
        >
          <motion.button
            onClick={handleToggle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'flex items-center gap-3 px-5 py-3 rounded-xl',
              'backdrop-blur-xl border shadow-lg transition-all',
              isDemoMode
                ? 'bg-primary/20 border-primary/50 text-primary'
                : 'bg-card/80 border-border text-muted-foreground hover:text-foreground'
            )}
          >
            <motion.div
              animate={{ rotate: isDemoMode ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {isDemoMode ? (
                <Sparkles className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </motion.div>
            <span className="font-semibold text-sm">
              {isDemoMode ? 'Demo Mode' : 'Enable Demo'}
            </span>
            
            {/* Status indicator */}
            <div
              className={cn(
                'w-2 h-2 rounded-full transition-colors',
                isDemoMode ? 'bg-success animate-pulse' : 'bg-muted-foreground/40'
              )}
            />
          </motion.button>
          
          {/* Hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="text-[10px] text-muted-foreground text-center mt-2"
          >
            Press 'D' 3x to hide
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
