import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { mockChallenges, mockAchievements } from '@/data/mockData';
import { 
  Trophy, 
  Clock, 
  Zap, 
  Target,
  Star,
  Lock
} from 'lucide-react';

const Challenges = () => {
  const dailyChallenges = mockChallenges.filter(c => c.type === 'daily');
  const weeklyChallenges = mockChallenges.filter(c => c.type === 'weekly');
  const specialChallenges = mockChallenges.filter(c => c.type === 'special');

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-muted-foreground/50';
      case 'rare': return 'border-primary';
      case 'epic': return 'border-streak';
      case 'legendary': return 'border-error';
      default: return 'border-muted';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-muted/20';
      case 'rare': return 'bg-primary/10';
      case 'epic': return 'bg-streak/10';
      case 'legendary': return 'bg-error/10';
      default: return 'bg-muted/20';
    }
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Challenges</h1>
            <p className="text-muted-foreground">Complete challenges to earn XP and rewards</p>
          </div>
          <div className="glass-panel px-4 py-2 rounded-xl flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <span className="font-mono font-semibold text-foreground">2,450 XP</span>
          </div>
        </div>

        {/* Daily Challenges */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-streak/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-streak" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">Daily Challenges</h2>
              <p className="text-sm text-muted-foreground">Resets in 8 hours</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dailyChallenges.map((challenge, i) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`glass-panel p-6 rounded-xl ${challenge.completed ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{challenge.icon}</span>
                    <div>
                      <h3 className="font-semibold text-foreground">{challenge.title}</h3>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    <Zap className="w-4 h-4" />
                    <span className="font-mono font-semibold">+{challenge.xpReward}</span>
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-mono text-foreground">
                      {challenge.progress} / {challenge.target}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                      transition={{ duration: 1 }}
                      className={`h-full rounded-full ${
                        challenge.completed ? 'bg-success' : 'bg-gradient-xp'
                      }`}
                    />
                  </div>
                </div>

                {challenge.completed && (
                  <div className="mt-4 flex items-center gap-2 text-success">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm font-medium">Completed!</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Weekly Challenges */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">Weekly Challenges</h2>
              <p className="text-sm text-muted-foreground">Resets on Sunday</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {weeklyChallenges.map((challenge, i) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="glass-panel p-6 rounded-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{challenge.icon}</span>
                    <div>
                      <h3 className="font-semibold text-foreground">{challenge.title}</h3>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    <Zap className="w-4 h-4" />
                    <span className="font-mono font-semibold">+{challenge.xpReward}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-mono text-foreground">
                      {challenge.progress} / {challenge.target}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-gradient-xp rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Special Challenges */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-success" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">Special Challenges</h2>
              <p className="text-sm text-muted-foreground">Limited time events</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specialChallenges.map((challenge, i) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="glass-panel p-6 rounded-xl border border-primary/30"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{challenge.icon}</span>
                    <div>
                      <h3 className="font-semibold text-foreground">{challenge.title}</h3>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-streak">
                    <Zap className="w-4 h-4" />
                    <span className="font-mono font-semibold">+{challenge.xpReward}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-mono text-foreground">
                      {challenge.progress} / {challenge.target}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-streak rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-streak/20 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-streak" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">Achievements</h2>
              <p className="text-sm text-muted-foreground">
                {mockAchievements.filter(a => a.unlockedAt).length} / {mockAchievements.length} unlocked
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {mockAchievements.map((achievement, i) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`glass-panel p-4 rounded-xl text-center border-2 ${getRarityColor(achievement.rarity)} ${
                  !achievement.unlockedAt ? 'opacity-50' : ''
                }`}
              >
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${getRarityBg(achievement.rarity)}`}>
                  {achievement.unlockedAt ? (
                    <span className="text-3xl">{achievement.icon}</span>
                  ) : (
                    <Lock className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <h4 className="font-semibold text-sm text-foreground mb-1">{achievement.title}</h4>
                <p className="text-[10px] text-muted-foreground mb-2">{achievement.description}</p>
                
                {!achievement.unlockedAt && (
                  <div className="text-xs text-muted-foreground">
                    {achievement.progress} / {achievement.target}
                  </div>
                )}
                
                <div className="mt-2 flex items-center justify-center gap-1 text-primary text-xs">
                  <Zap className="w-3 h-3" />
                  <span>+{achievement.xpReward} XP</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Challenges;
