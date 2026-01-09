import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { LevelUpModal } from '@/components/gamification/LevelUpModal';
import { XPFloater } from '@/components/gamification/XPFloater';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-recallify">
      <Sidebar />
      <div className="ml-64 min-h-screen">
        <Header />
        <main className="p-8">
          {children}
        </main>
      </div>
      <LevelUpModal />
      <XPFloater />
      {/* Bento Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none bento-mask opacity-5 z-[100]" />
    </div>
  );
};
