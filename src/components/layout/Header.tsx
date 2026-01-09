import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, Zap, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const routeTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/analytics': 'Analytics & Insights',
  '/library': 'Card Library',
  '/challenges': 'Challenges',
  '/settings': 'Settings',
  '/recall': 'Recall Mode',
};

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentTitle = routeTitles[location.pathname] || 'Recallify';

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="h-full px-8 flex items-center justify-between">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Recallify</span>
          <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
          <span className="text-foreground font-medium">{currentTitle}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
          </button>

          {/* Generate Report Button */}
          <Button 
            onClick={() => navigate('/analytics')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          >
            <Zap className="w-4 h-4" />
            Generate Report
          </Button>
        </div>
      </div>
    </header>
  );
};
