import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export type AuraState = 'strong' | 'decaying' | 'at-risk' | 'focus';

interface MemoryAuraProps {
  children: React.ReactNode;
  state: AuraState;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  className?: string;
}

const auraConfig = {
  strong: {
    color: 'hsl(142, 71%, 45%)',
    glow: '0 0 12px rgba(34,197,94,0.45), 0 0 24px rgba(34,197,94,0.25)',
    pulse: 3.5,
    tooltip: 'Memory strong this week',
  },
  decaying: {
    color: 'hsl(38, 92%, 50%)',
    glow: '0 0 12px rgba(245,158,11,0.45), 0 0 22px rgba(245,158,11,0.25)',
    pulse: 4.5,
    tooltip: 'Recall recommended soon',
  },
  'at-risk': {
    color: 'hsl(0, 84%, 60%)',
    glow: '0 0 14px rgba(239,68,68,0.5), 0 0 26px rgba(239,68,68,0.3)',
    pulse: 5.5,
    tooltip: 'High chance of forgetting',
  },
  focus: {
    color: 'hsl(258, 90%, 66%)',
    glow: '0 0 16px rgba(139,92,246,0.6), 0 0 30px rgba(139,92,246,0.4)',
    pulse: 0, // No pulse - steady glow
    tooltip: 'Currently recalling',
  },
};

const sizeConfig = {
  sm: { size: 'w-8 h-8', ring: 2 },
  md: { size: 'w-10 h-10', ring: 2.5 },
  lg: { size: 'w-12 h-12', ring: 3 },
};

export function MemoryAura({
  children,
  state,
  size = 'md',
  showTooltip = true,
  className,
}: MemoryAuraProps) {
  const config = auraConfig[state];
  const sizeStyles = sizeConfig[size];

  const AuraWrapper = (
    <motion.div
      className={cn('relative rounded-full', sizeStyles.size, className)}
      animate={
        config.pulse > 0
          ? {
              boxShadow: [
                config.glow,
                config.glow.replace(/0\.\d+/g, (m) => String(parseFloat(m) * 0.6)),
                config.glow,
              ],
            }
          : { boxShadow: config.glow }
      }
      transition={
        config.pulse > 0
          ? {
              duration: config.pulse,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          : undefined
      }
    >
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-full opacity-30 blur-[0.5px]"
        style={{
          background: `radial-gradient(circle, ${config.color} 0%, transparent 70%)`,
        }}
      />
      
      {/* Avatar container */}
      <div className="relative z-10 w-full h-full rounded-full overflow-hidden">
        {children}
      </div>
    </motion.div>
  );

  if (!showTooltip) {
    return AuraWrapper;
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{AuraWrapper}</TooltipTrigger>
        <TooltipContent
          side="top"
          className="bg-transparent border-none shadow-none px-2 py-1"
        >
          <span className="text-xs text-muted-foreground/80 font-medium">
            {config.tooltip}
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Helper to determine aura state from user data
export function getAuraState(userData: {
  recallScore?: number;
  streak?: number;
  daysSinceLastRecall?: number;
  isRecalling?: boolean;
}): AuraState {
  const { recallScore = 75, streak = 0, daysSinceLastRecall = 0, isRecalling = false } = userData;

  if (isRecalling) return 'focus';
  if (recallScore >= 75 || streak >= 5) return 'strong';
  if (recallScore >= 40 || daysSinceLastRecall <= 3) return 'decaying';
  return 'at-risk';
}
