import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { AppLayout } from '@/components/layout/AppLayout';
import { StreakCard } from '@/components/gamification/StreakCard';
import { XPProgress } from '@/components/gamification/XPProgress';
import { mockDecks, mockChallenges, aiInsights } from '@/data/mockData';
import { 
  Play, 
  TrendingUp, 
  Brain, 
  Target,
  Clock,
  ArrowRight,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Get cards due for review
  const cardsDue = mockDecks.reduce((acc, deck) => acc + Math.floor(deck.cardCount * 0.2), 0);

  // Urgent deck (lowest mastery)
  const urgentDeck = mockDecks.reduce((prev, curr) => 
    curr.masteryPercentage < prev.masteryPercentage ? curr : prev
  );

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Greeting Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="font-display text-3xl font-bold text-foreground">
            {getGreeting()}, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-muted-foreground">
            Your memory is warming up. Let's make today count.
          </p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Streak Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StreakCard streak={user?.streak || 0} isActive={true} />
          </motion.div>

          {/* Overall Retention */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-6 rounded-xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">
                  Overall Retention
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-display font-bold text-foreground">94.8</span>
                  <span className="text-lg text-success font-semibold">%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Global average: 72%</p>
              </div>
              <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-success/20 text-success rounded-full">
                +2.4%
              </span>
            </div>
          </motion.div>

          {/* Cognitive Load */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-6 rounded-xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">
                  Cognitive Load
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-display font-bold text-foreground">Optimal</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Ready for advanced review</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Daily Recall Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Recall Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.01 }}
              className="glass-panel p-8 rounded-2xl relative overflow-hidden group cursor-pointer"
              onClick={() => navigate('/recall')}
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-xp opacity-5 group-hover:opacity-10 transition-opacity" />
              
              {/* Glow Effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-primary" />
                  <span className="text-xs font-mono text-primary uppercase tracking-widest">
                    Daily Recall Session
                  </span>
                </div>

                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  {cardsDue} cards ready for review
                </h2>
                <p className="text-muted-foreground mb-6">
                  Including {urgentDeck.cardCount} urgent cards from {urgentDeck.name}
                </p>

                <div className="flex items-center gap-4">
                  <Button className="bg-gradient-xp hover:opacity-90 text-primary-foreground gap-2 px-6 h-12">
                    <Play className="w-5 h-5" />
                    Start Recall
                  </Button>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>~15 minutes</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* XP Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <XPProgress />
            </motion.div>

            {/* AI Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-primary" />
                <h3 className="font-display text-lg font-semibold text-foreground">
                  AI Memory Copilot
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aiInsights.map((insight, i) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className={`glass-panel p-5 rounded-xl border-l-2 ${
                      insight.type === 'critical' ? 'border-l-error' :
                      insight.type === 'success' ? 'border-l-success' :
                      'border-l-primary'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{insight.icon}</span>
                      <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full ${
                        insight.type === 'critical' ? 'bg-error/20 text-error' :
                        insight.type === 'success' ? 'bg-success/20 text-success' :
                        'bg-primary/20 text-primary'
                      }`}>
                        {insight.badge}
                      </span>
                    </div>
                    <h4 className="font-semibold text-foreground text-sm mb-2">
                      {insight.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-3">
                      {insight.description}
                    </p>
                    <button className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1 ${
                      insight.type === 'critical' ? 'text-error' :
                      insight.type === 'success' ? 'text-success' :
                      'text-primary'
                    }`}>
                      {insight.action}
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Challenges */}
          <div className="space-y-6">
            {/* Active Challenges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-panel p-6 rounded-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Active Challenges
                </h3>
                <button 
                  onClick={() => navigate('/challenges')}
                  className="text-xs text-primary hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {mockChallenges.slice(0, 3).map((challenge) => (
                  <div
                    key={challenge.id}
                    className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">{challenge.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {challenge.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          +{challenge.xpReward} XP
                        </p>
                      </div>
                      {challenge.completed && (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      )}
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-xp rounded-full transition-all"
                        style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {challenge.progress} / {challenge.target}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-panel p-6 rounded-xl"
            >
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Quick Stats
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Cards</span>
                  <span className="font-mono font-semibold text-foreground">
                    {user?.totalCards || 847}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Mastered</span>
                  <span className="font-mono font-semibold text-success">
                    {user?.masteredCards || 623}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Decks</span>
                  <span className="font-mono font-semibold text-foreground">
                    {mockDecks.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">This Week</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-success" />
                    <span className="font-mono font-semibold text-success">+142 XP</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
