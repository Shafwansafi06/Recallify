import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { weeklyRetentionData, subjectMasteryData, mockDecks, aiInsights } from '@/data/mockData';
import { 
  TrendingUp, 
  Brain, 
  Flame, 
  ArrowRight,
  MoreHorizontal
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from 'recharts';

const Analytics = () => {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Overall Retention */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 rounded-xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">
                  Overall Retention
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-display font-bold text-foreground">94.8</span>
                  <span className="text-2xl text-primary font-semibold">%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Global average: 72%</p>
              </div>
              <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-success/20 text-success rounded-full">
                +2.4%
              </span>
            </div>
          </motion.div>

          {/* Active Streak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-6 rounded-xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">
                  Active Study Streak
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-display font-bold text-foreground">24</span>
                  <span className="text-xl text-streak font-semibold">Days</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Personal record: 31 days</p>
              </div>
              <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary rounded-full">
                Peak
              </span>
            </div>
          </motion.div>

          {/* Cognitive Load */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
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
                <p className="text-xs text-muted-foreground mt-2">Ready for advanced review</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Retention Velocity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 glass-panel p-6 rounded-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">Retention Velocity</h3>
                <p className="text-sm text-muted-foreground">Long-term memory stability tracking</p>
              </div>
              <div className="flex gap-2">
                {['DAY', 'WEEK', 'MONTH'].map((period, i) => (
                  <button
                    key={period}
                    className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      i === 1 
                        ? 'bg-foreground text-background' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyRetentionData}>
                  <XAxis 
                    dataKey="day" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis 
                    hide 
                    domain={[60, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="retention"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Subject Mastery Radar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 glass-panel p-6 rounded-xl"
          >
            <div className="mb-4">
              <h3 className="font-display text-xl font-bold text-foreground">Subject Mastery</h3>
              <p className="text-sm text-muted-foreground">Cross-disciplinary proficiency</p>
            </div>

            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={subjectMasteryData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                  />
                  <Radar
                    name="Target"
                    dataKey="target"
                    stroke="hsl(var(--muted-foreground))"
                    fill="hsl(var(--muted))"
                    fillOpacity={0.3}
                    strokeDasharray="4 4"
                  />
                  <Radar
                    name="Actual"
                    dataKey="actual"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-xs text-muted-foreground">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border-2 border-dashed border-muted-foreground" />
                <span className="text-xs text-muted-foreground">Target</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* AI Memory Copilot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">✨</span>
            <h3 className="font-display text-xl font-bold text-foreground">AI Memory Copilot</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiInsights.map((insight) => (
              <div
                key={insight.id}
                className={`glass-panel p-6 rounded-xl border-l-2 ${
                  insight.type === 'critical' ? 'border-l-error' :
                  insight.type === 'success' ? 'border-l-success' :
                  'border-l-primary'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    insight.type === 'critical' ? 'bg-error/20' :
                    insight.type === 'success' ? 'bg-success/20' :
                    'bg-primary/20'
                  }`}>
                    <span className="text-lg">{insight.icon}</span>
                  </div>
                  <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-full ${
                    insight.type === 'critical' ? 'bg-error/20 text-error' :
                    insight.type === 'success' ? 'bg-success/20 text-success' :
                    'bg-primary/20 text-primary'
                  }`}>
                    {insight.badge}
                  </span>
                </div>
                <h4 className="font-semibold text-foreground mb-2">{insight.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">{insight.description}</p>
                <button className={`text-sm font-semibold uppercase tracking-wider flex items-center gap-1 ${
                  insight.type === 'critical' ? 'text-error' :
                  insight.type === 'success' ? 'text-success' :
                  'text-primary'
                }`}>
                  {insight.action}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Detailed Subject Proficiency Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-panel rounded-xl overflow-hidden"
        >
          <div className="p-6 flex items-center justify-between border-b border-border">
            <h3 className="font-display text-xl font-bold text-foreground">
              Detailed Subject Proficiency
            </h3>
            <button className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
              Filter by Tags
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-4 text-left text-xs font-mono text-muted-foreground uppercase tracking-widest">
                    Subject Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-mono text-muted-foreground uppercase tracking-widest">
                    Cards Mastery
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-mono text-muted-foreground uppercase tracking-widest">
                    Recall Stability
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-mono text-muted-foreground uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-mono text-muted-foreground uppercase tracking-widest">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockDecks.slice(0, 3).map((deck) => (
                  <tr key={deck.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: deck.color }}
                        />
                        <span className="font-medium text-foreground">{deck.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ 
                              width: `${deck.masteryPercentage}%`,
                              backgroundColor: deck.color
                            }}
                          />
                        </div>
                        <span className="text-sm font-mono text-muted-foreground">
                          {deck.masteryPercentage}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-foreground capitalize">
                        {deck.recallStability}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                        deck.status === 'danger' ? 'bg-error/20 text-error' :
                        deck.status === 'mastered' ? 'bg-success/20 text-success' :
                        'bg-primary/20 text-primary'
                      }`}>
                        {deck.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © 2024 Recallify Intelligence. All memory data encrypted with AES-256.
          </p>
          <div className="flex justify-center gap-6 mt-4">
            {['Privacy', 'Neural Ethics', 'Support', 'API Docs'].map((link) => (
              <a key={link} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {link}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </AppLayout>
  );
};

export default Analytics;
