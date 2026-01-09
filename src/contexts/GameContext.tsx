import React, { createContext, useContext, useState, ReactNode } from 'react';

interface XPEvent {
  id: string;
  amount: number;
  timestamp: Date;
}

interface GameContextType {
  showLevelUp: boolean;
  newLevel: number;
  xpEvents: XPEvent[];
  triggerLevelUp: (level: number) => void;
  dismissLevelUp: () => void;
  addXPEvent: (amount: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(1);
  const [xpEvents, setXPEvents] = useState<XPEvent[]>([]);

  const triggerLevelUp = (level: number) => {
    setNewLevel(level);
    setShowLevelUp(true);
  };

  const dismissLevelUp = () => {
    setShowLevelUp(false);
  };

  const addXPEvent = (amount: number) => {
    const event: XPEvent = {
      id: crypto.randomUUID(),
      amount,
      timestamp: new Date(),
    };
    setXPEvents(prev => [...prev, event]);
    
    // Remove event after animation
    setTimeout(() => {
      setXPEvents(prev => prev.filter(e => e.id !== event.id));
    }, 1000);
  };

  return (
    <GameContext.Provider
      value={{
        showLevelUp,
        newLevel,
        xpEvents,
        triggerLevelUp,
        dismissLevelUp,
        addXPEvent,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
