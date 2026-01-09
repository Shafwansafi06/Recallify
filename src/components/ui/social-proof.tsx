import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SocialProofProps {
  variant?: 'global' | 'friends';
  className?: string;
}

// Generate random-ish but consistent numbers for the demo
const getRandomStudents = () => Math.floor(10000 + Math.random() * 5000);
const getFriendRecalls = () => Math.floor(2 + Math.random() * 5);

export function SocialProof({ variant = 'global', className }: SocialProofProps) {
  const studentsToday = getRandomStudents();
  const friendRecalls = getFriendRecalls();

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className={cn(
        'text-xs text-muted-foreground/60 font-medium',
        className
      )}
    >
      {variant === 'global' ? (
        <>{studentsToday.toLocaleString()} students recalled today</>
      ) : (
        <>Your friends recalled {friendRecalls} times today</>
      )}
    </motion.p>
  );
}
