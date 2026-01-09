import { motion } from "framer-motion";
import { BentoGridShowcase } from "@/components/ui/bento-product-features";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Brain, 
  Zap, 
  Trophy, 
  Target, 
  Sparkles, 
  Command, 
  TrendingUp,
  Users,
  Flame
} from "lucide-react";

const SpacedRepetitionCard = () => (
  <Card className="h-full glass-panel border-border/50 overflow-hidden group hover:border-primary/50 transition-all duration-300">
    <CardHeader className="pb-4">
      <div className="w-14 h-14 rounded-2xl bg-gradient-xp flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Brain className="w-7 h-7 text-primary-foreground" />
      </div>
      <CardTitle className="font-display text-xl text-foreground">
        AI-Powered Spaced Repetition
      </CardTitle>
      <CardDescription className="text-muted-foreground">
        Our algorithm learns when you're about to forget and schedules reviews at the perfect moment. 
        Retain 95% of what you learn, forever.
      </CardDescription>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="flex items-center gap-3 mb-4">
        <Switch defaultChecked />
        <span className="text-sm text-muted-foreground">Smart Scheduling</span>
      </div>
      <Button variant="outline" className="w-full gap-2 glass-panel hover:bg-primary/10 border-border/50">
        <Sparkles className="w-4 h-4" />
        Learn More
      </Button>
    </CardContent>
  </Card>
);

const StreakTrackerCard = () => (
  <Card className="h-full glass-panel border-border/50 overflow-hidden hover:border-streak/50 transition-all duration-300">
    <CardContent className="p-6 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="outline" className="bg-streak/10 text-streak border-streak/30 mb-2">
            Active
          </Badge>
          <p className="text-sm text-muted-foreground">Current Streak</p>
        </div>
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-4xl"
        >
          🔥
        </motion.div>
      </div>
      <div className="flex items-end gap-2 mt-4">
        <span className="text-5xl font-display font-bold text-streak">42</span>
        <span className="text-muted-foreground mb-2">days</span>
      </div>
    </CardContent>
  </Card>
);

const RetentionStatCard = () => (
  <Card className="h-full glass-panel border-border/50 overflow-hidden relative hover:border-success/50 transition-all duration-300">
    {/* Dotted pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="w-full h-full" style={{
        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
        backgroundSize: '12px 12px'
      }} />
    </div>
    <CardContent className="p-6 h-full flex items-center justify-center relative">
      <div className="text-center">
        <motion.span 
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="text-6xl font-display font-black gradient-text-success"
        >
          94%
        </motion.span>
        <p className="text-sm text-muted-foreground mt-2">Avg. Retention Rate</p>
      </div>
    </CardContent>
  </Card>
);

const FocusModeCard = () => (
  <Card className="h-full glass-panel border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-300">
    <CardContent className="p-6 h-full flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-success font-medium uppercase tracking-wider">Focus Active</span>
          </div>
          <p className="text-sm text-muted-foreground">Deep Learning Mode</p>
        </div>
        <Target className="w-5 h-5 text-primary" />
      </div>
      <div>
        <span className="text-4xl font-display font-bold text-foreground">2.5h</span>
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
          <span>Today's Focus</span>
          <span className="text-success">+45min ↑</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const GamificationCard = () => (
  <Card className="h-full glass-panel border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-300">
    <CardHeader className="pb-2">
      <CardTitle className="font-display text-lg text-foreground flex items-center gap-2">
        <Trophy className="w-5 h-5 text-streak" />
        Gamified Learning
      </CardTitle>
      <CardDescription className="text-muted-foreground text-sm">
        Earn XP, level up, unlock achievements and compete with friends.
      </CardDescription>
    </CardHeader>
    <CardContent className="pt-2">
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {['🧠', '⚡', '🎯'].map((emoji, i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border-2 border-background">
              <span className="text-sm">{emoji}</span>
            </div>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">+12 badges unlocked</span>
      </div>
    </CardContent>
  </Card>
);

const ShortcutsCard = () => (
  <Card className="h-full glass-panel border-border/50 overflow-hidden hover:border-primary/50 transition-all duration-300">
    <CardContent className="p-6 h-full flex flex-col justify-between">
      <div>
        <CardTitle className="font-display text-lg text-foreground mb-1">
          Lightning Fast Shortcuts
        </CardTitle>
        <CardDescription className="text-muted-foreground text-sm">
          Master keyboard shortcuts for rapid-fire reviewing.
        </CardDescription>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 border border-border/50">
          <Command className="w-4 h-4 text-muted-foreground" />
        </div>
        <span className="text-muted-foreground">+</span>
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-secondary/50 border border-border/50 font-mono text-sm text-foreground">
          R
        </div>
        <span className="text-sm text-muted-foreground ml-2">Quick Recall</span>
      </div>
    </CardContent>
  </Card>
);

export const ProductFeatures = () => {
  return (
    <section className="py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/30">
            Features
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need to
            <br />
            <span className="gradient-text-xp">Master Anything</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Powerful tools designed to optimize your learning, track your progress, 
            and keep you motivated every step of the way.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <BentoGridShowcase
          integration={<SpacedRepetitionCard />}
          trackers={<StreakTrackerCard />}
          statistic={<RetentionStatCard />}
          focus={<FocusModeCard />}
          productivity={<GamificationCard />}
          shortcuts={<ShortcutsCard />}
        />
      </div>
    </section>
  );
};
