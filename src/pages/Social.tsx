import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Trophy, 
  UserPlus, 
  Search, 
  MessageCircle,
  Flame,
  TrendingUp,
  Crown,
  Medal,
  Star,
  ChevronRight,
  MoreHorizontal,
  Heart,
  Share2,
  Zap
} from 'lucide-react';

// Mock data for social features
const mockLeaderboard = [
  { id: '1', name: 'Alex Chen', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', xp: 12450, streak: 45, level: 15, isCurrentUser: true },
  { id: '2', name: 'Sarah Kim', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', xp: 11200, streak: 38, level: 14, isCurrentUser: false },
  { id: '3', name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', xp: 10850, streak: 52, level: 13, isCurrentUser: false },
  { id: '4', name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', xp: 9700, streak: 29, level: 12, isCurrentUser: false },
  { id: '5', name: 'James Lee', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', xp: 8900, streak: 21, level: 11, isCurrentUser: false },
  { id: '6', name: 'Lisa Park', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face', xp: 8400, streak: 33, level: 10, isCurrentUser: false },
  { id: '7', name: 'David Chen', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face', xp: 7800, streak: 18, level: 9, isCurrentUser: false },
];

const mockFriends = [
  { id: '2', name: 'Sarah Kim', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', status: 'online', lastActive: 'Now', streak: 38 },
  { id: '3', name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', status: 'online', lastActive: '5m ago', streak: 52 },
  { id: '4', name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', status: 'offline', lastActive: '2h ago', streak: 29 },
  { id: '5', name: 'James Lee', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', status: 'studying', lastActive: 'Studying now', streak: 21 },
];

const mockStudyGroups = [
  { id: '1', name: 'Medical Students', members: 234, icon: '🏥', category: 'Medicine', isJoined: true },
  { id: '2', name: 'Language Learners', members: 892, icon: '🌍', category: 'Languages', isJoined: true },
  { id: '3', name: 'CS Fundamentals', members: 567, icon: '💻', category: 'Technology', isJoined: false },
  { id: '4', name: 'History Buffs', members: 345, icon: '📜', category: 'History', isJoined: false },
];

const mockActivityFeed = [
  { id: '1', user: 'Sarah Kim', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', action: 'reached Level 14', time: '2h ago', type: 'levelup' },
  { id: '2', user: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', action: 'completed a 50-day streak 🔥', time: '5h ago', type: 'streak' },
  { id: '3', user: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', action: 'mastered "Organic Chemistry"', time: '1d ago', type: 'mastery' },
  { id: '4', user: 'James Lee', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', action: 'shared a new deck "React Hooks"', time: '1d ago', type: 'share' },
];

const Social = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'friends' | 'groups'>('leaderboard');
  const [searchQuery, setSearchQuery] = useState('');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2: return <Medal className="w-5 h-5 text-gray-300" />;
      case 3: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return <span className="w-5 text-center font-mono text-muted-foreground">{rank}</span>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'studying': return 'bg-primary animate-pulse';
      default: return 'bg-muted-foreground';
    }
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Social</h1>
            <p className="text-muted-foreground">Compete, collaborate, and learn together</p>
          </div>
          <Button className="bg-gradient-xp hover:opacity-90 text-primary-foreground gap-2">
            <UserPlus className="w-5 h-5" />
            Invite Friends
          </Button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-4 rounded-xl"
          >
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Trophy className="w-4 h-4" />
              <span className="text-xs">Global Rank</span>
            </div>
            <p className="text-2xl font-display font-bold text-foreground">#1,247</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-4 rounded-xl"
          >
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Users className="w-4 h-4" />
              <span className="text-xs">Friends</span>
            </div>
            <p className="text-2xl font-display font-bold text-foreground">{mockFriends.length}</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-4 rounded-xl"
          >
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs">Weekly Climb</span>
            </div>
            <p className="text-2xl font-display font-bold text-success">+142</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-4 rounded-xl"
          >
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">Study Groups</span>
            </div>
            <p className="text-2xl font-display font-bold text-foreground">
              {mockStudyGroups.filter(g => g.isJoined).length}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <div className="glass-panel p-1 rounded-xl flex gap-1">
              {[
                { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
                { id: 'friends', label: 'Friends', icon: Users },
                { id: 'groups', label: 'Study Groups', icon: MessageCircle },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'leaderboard' && (
                <motion.div
                  key="leaderboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="glass-panel rounded-xl overflow-hidden"
                >
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      Weekly Leaderboard
                    </h3>
                    <select className="bg-muted text-foreground text-sm rounded-lg px-3 py-1 border border-border">
                      <option>This Week</option>
                      <option>This Month</option>
                      <option>All Time</option>
                    </select>
                  </div>

                  <div className="divide-y divide-border/50">
                    {mockLeaderboard.map((player, index) => (
                      <motion.div
                        key={player.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 flex items-center gap-4 hover:bg-muted/20 transition-colors ${
                          player.isCurrentUser ? 'bg-primary/5' : ''
                        }`}
                      >
                        <div className="w-8 flex justify-center">
                          {getRankIcon(index + 1)}
                        </div>
                        <img
                          src={player.avatar}
                          alt={player.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-border"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-foreground truncate">{player.name}</p>
                            {player.isCurrentUser && (
                              <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-primary/20 text-primary rounded-full">
                                You
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span>Lvl {player.level}</span>
                            <span className="flex items-center gap-1">
                              <Flame className="w-3 h-3 text-streak" />
                              {player.streak}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-mono font-bold text-primary">{player.xp.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">XP</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'friends' && (
                <motion.div
                  key="friends"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Search friends..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-12 bg-card border-border"
                    />
                  </div>

                  {/* Friends List */}
                  <div className="glass-panel rounded-xl divide-y divide-border/50">
                    {mockFriends.map((friend, index) => (
                      <motion.div
                        key={friend.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 flex items-center gap-4 hover:bg-muted/20 transition-colors"
                      >
                        <div className="relative">
                          <img
                            src={friend.avatar}
                            alt={friend.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${getStatusColor(friend.status)}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground truncate">{friend.name}</p>
                          <p className="text-sm text-muted-foreground">{friend.lastActive}</p>
                        </div>
                        <div className="flex items-center gap-2 text-streak">
                          <Flame className="w-4 h-4" />
                          <span className="font-mono font-semibold">{friend.streak}</span>
                        </div>
                        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Find Friends */}
                  <Button variant="outline" className="w-full gap-2">
                    <UserPlus className="w-4 h-4" />
                    Find More Friends
                  </Button>
                </motion.div>
              )}

              {activeTab === 'groups' && (
                <motion.div
                  key="groups"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {mockStudyGroups.map((group, index) => (
                    <motion.div
                      key={group.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="glass-panel p-5 rounded-xl cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-3xl">{group.icon}</span>
                        {group.isJoined ? (
                          <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-success/20 text-success rounded-full">
                            Joined
                          </span>
                        ) : (
                          <Button size="sm" variant="outline" className="h-7 text-xs">
                            Join
                          </Button>
                        )}
                      </div>
                      <h4 className="font-semibold text-foreground mb-1">{group.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{group.category}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{group.members.toLocaleString()} members</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar - Activity Feed */}
          <div className="space-y-6">
            {/* Activity Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-panel rounded-xl"
            >
              <div className="p-4 border-b border-border">
                <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
                  <Star className="w-5 h-5 text-streak" />
                  Activity Feed
                </h3>
              </div>
              <div className="divide-y divide-border/50">
                {mockActivityFeed.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="p-4"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={activity.avatar}
                        alt={activity.user}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">
                          <span className="font-semibold">{activity.user}</span>
                          {' '}{activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 ml-11">
                      <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                        <Heart className="w-4 h-4" />
                        Like
                      </button>
                      <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        Comment
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="p-4 border-t border-border">
                <button className="w-full text-sm text-primary hover:underline flex items-center justify-center gap-1">
                  View All Activity
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Challenge a Friend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-panel p-6 rounded-xl border border-primary/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-xp flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Challenge a Friend</h4>
                  <p className="text-sm text-muted-foreground">Compete in real-time</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Challenge your friends to a recall battle and see who can score higher!
              </p>
              <Button className="w-full bg-gradient-xp hover:opacity-90 text-primary-foreground gap-2">
                <Share2 className="w-4 h-4" />
                Start Challenge
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Social;
