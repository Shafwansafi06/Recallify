import { useState } from 'react';
import { motion } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  Bell, 
  Moon, 
  Shield, 
  Zap, 
  LogOut,
  Mail,
  Lock,
  Globe,
  Clock
} from 'lucide-react';

const Settings = () => {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState({
    dailyReminder: true,
    streakAlert: true,
    weeklyReport: true,
    achievements: true,
  });

  const [preferences, setPreferences] = useState({
    darkMode: true,
    soundEffects: true,
    animations: true,
    autoPlay: false,
  });

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Profile Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-xl overflow-hidden"
        >
          <div className="p-6 border-b border-border flex items-center gap-3">
            <User className="w-5 h-5 text-primary" />
            <h2 className="font-display text-lg font-semibold text-foreground">Profile</h2>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Avatar */}
            <div className="flex items-center gap-6">
              <img
                src={user?.avatar}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover ring-4 ring-primary/20"
              />
              <div>
                <Button variant="outline" size="sm">
                  Change Photo
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  JPG, PNG or GIF. Max 2MB.
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Full Name
                </label>
                <Input defaultValue={user?.name} className="bg-muted/50" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input defaultValue={user?.email} className="bg-muted/50 pl-10" disabled />
                </div>
              </div>
            </div>

            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Save Changes
            </Button>
          </div>
        </motion.section>

        {/* Notifications Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel rounded-xl overflow-hidden"
        >
          <div className="p-6 border-b border-border flex items-center gap-3">
            <Bell className="w-5 h-5 text-primary" />
            <h2 className="font-display text-lg font-semibold text-foreground">Notifications</h2>
          </div>
          
          <div className="p-6 space-y-4">
            {[
              { key: 'dailyReminder', label: 'Daily Reminder', desc: 'Get reminded to study every day' },
              { key: 'streakAlert', label: 'Streak Alert', desc: 'Warning when streak is about to break' },
              { key: 'weeklyReport', label: 'Weekly Report', desc: 'Receive weekly progress summary' },
              { key: 'achievements', label: 'Achievement Alerts', desc: 'Notify when unlocking achievements' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <Switch
                  checked={notifications[item.key as keyof typeof notifications]}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, [item.key]: checked }))
                  }
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Preferences Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel rounded-xl overflow-hidden"
        >
          <div className="p-6 border-b border-border flex items-center gap-3">
            <Moon className="w-5 h-5 text-primary" />
            <h2 className="font-display text-lg font-semibold text-foreground">Preferences</h2>
          </div>
          
          <div className="p-6 space-y-4">
            {[
              { key: 'darkMode', label: 'Dark Mode', desc: 'Always use dark theme', icon: Moon },
              { key: 'soundEffects', label: 'Sound Effects', desc: 'Play sounds for actions', icon: Bell },
              { key: 'animations', label: 'Animations', desc: 'Enable UI animations', icon: Zap },
              { key: 'autoPlay', label: 'Auto-Play', desc: 'Automatically start next card', icon: Clock },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
                <Switch
                  checked={preferences[item.key as keyof typeof preferences]}
                  onCheckedChange={(checked) => 
                    setPreferences(prev => ({ ...prev, [item.key]: checked }))
                  }
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Study Settings */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel rounded-xl overflow-hidden"
        >
          <div className="p-6 border-b border-border flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="font-display text-lg font-semibold text-foreground">Study Settings</h2>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Daily Goal (cards)
                </label>
                <Input type="number" defaultValue={50} className="bg-muted/50" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Session Length (minutes)
                </label>
                <Input type="number" defaultValue={25} className="bg-muted/50" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Preferred Study Time
                </label>
                <Input type="time" defaultValue="20:00" className="bg-muted/50" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Timezone
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input defaultValue="UTC-8 (Pacific)" className="bg-muted/50 pl-10" />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Security Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-panel rounded-xl overflow-hidden"
        >
          <div className="p-6 border-b border-border flex items-center gap-3">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="font-display text-lg font-semibold text-foreground">Security</h2>
          </div>
          
          <div className="p-6 space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Change Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="password" placeholder="New password" className="bg-muted/50 pl-10" />
              </div>
            </div>
            <Button variant="outline">Update Password</Button>
          </div>
        </motion.section>

        {/* Subscription */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-panel rounded-xl overflow-hidden"
        >
          <div className="p-6 border-b border-border flex items-center gap-3">
            <Zap className="w-5 h-5 text-primary" />
            <h2 className="font-display text-lg font-semibold text-foreground">Subscription</h2>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Current Plan</p>
                <p className="text-2xl font-display font-bold text-primary mt-1">
                  {user?.plan === 'premium' ? 'Premium' : 'Free'}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {user?.plan === 'premium' 
                    ? 'Unlimited access to all features' 
                    : 'Upgrade for unlimited features'}
                </p>
              </div>
              {user?.plan !== 'premium' && (
                <Button className="bg-gradient-xp hover:opacity-90 text-primary-foreground">
                  Upgrade to Premium
                </Button>
              )}
            </div>
          </div>
        </motion.section>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex justify-end"
        >
          <Button 
            variant="destructive" 
            onClick={logout}
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Settings;
