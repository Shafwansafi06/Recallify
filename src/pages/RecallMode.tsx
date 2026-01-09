import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useGame } from '@/contexts/GameContext';
import { mockFlashcards, mockDecks, type Flashcard } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  X, 
  RotateCcw, 
  Check, 
  AlertCircle, 
  Flame, 
  Brain,
  ArrowRight,
  Zap,
  Trophy
} from 'lucide-react';

const RecallMode = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, addXP } = useAuth();
  const { addXPEvent, triggerLevelUp } = useGame();

  const deckId = searchParams.get('deck');
  const deck = mockDecks.find(d => d.id === deckId);

  // Get cards for this deck or all cards
  const cards = deckId 
    ? mockFlashcards.filter(c => c.deckId === deckId)
    : mockFlashcards;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    xpEarned: 0,
  });
  const [isComplete, setIsComplete] = useState(false);

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex) / cards.length) * 100;

  const handleFlip = () => {
    setIsFlipped(true);
  };

  const handleAnswer = (correct: boolean) => {
    const xpGain = correct ? 15 : 5;
    
    setSessionStats(prev => ({
      ...prev,
      correct: correct ? prev.correct + 1 : prev.correct,
      incorrect: correct ? prev.incorrect : prev.incorrect + 1,
      xpEarned: prev.xpEarned + xpGain,
    }));

    // Add XP animation
    addXPEvent(xpGain);
    addXP(xpGain);

    // Check for level up (mock)
    if (user && user.xp + xpGain >= user.xpToNextLevel) {
      setTimeout(() => triggerLevelUp(user.level + 1), 500);
    }

    // Next card
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev + 1), 300);
    } else {
      setIsComplete(true);
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  const accuracy = sessionStats.correct + sessionStats.incorrect > 0
    ? Math.round((sessionStats.correct / (sessionStats.correct + sessionStats.incorrect)) * 100)
    : 0;

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-recallify flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 rounded-2xl text-center max-w-md w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 mx-auto rounded-full bg-gradient-success flex items-center justify-center glow-success mb-6"
          >
            <Trophy className="w-10 h-10 text-primary-foreground" />
          </motion.div>

          <h2 className="font-display text-3xl font-bold text-foreground mb-2">
            Session Complete! 🎉
          </h2>
          <p className="text-muted-foreground mb-8">
            Great work! Here's how you did.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="glass-panel p-4 rounded-xl">
              <p className="text-3xl font-display font-bold text-success">{sessionStats.correct}</p>
              <p className="text-xs text-muted-foreground">Correct</p>
            </div>
            <div className="glass-panel p-4 rounded-xl">
              <p className="text-3xl font-display font-bold text-error">{sessionStats.incorrect}</p>
              <p className="text-xs text-muted-foreground">Incorrect</p>
            </div>
            <div className="glass-panel p-4 rounded-xl">
              <p className="text-3xl font-display font-bold text-foreground">{accuracy}%</p>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
          </div>

          {/* XP Earned */}
          <div className="glass-panel p-4 rounded-xl mb-8 flex items-center justify-center gap-3">
            <Zap className="w-6 h-6 text-primary" />
            <span className="text-2xl font-display font-bold gradient-text-xp">
              +{sessionStats.xpEarned} XP
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate('/dashboard')}
            >
              Back to Dashboard
            </Button>
            <Button 
              className="flex-1 bg-gradient-xp hover:opacity-90 text-primary-foreground gap-2"
              onClick={() => {
                setCurrentIndex(0);
                setIsFlipped(false);
                setSessionStats({ correct: 0, incorrect: 0, xpEarned: 0 });
                setIsComplete(false);
              }}
            >
              <RotateCcw className="w-4 h-4" />
              Study Again
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-recallify flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <button 
          onClick={handleClose}
          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-4">
          {deck && (
            <div className="flex items-center gap-2">
              <span className="text-xl">{deck.icon}</span>
              <span className="text-sm font-medium text-foreground">{deck.name}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-streak">
            <Flame className="w-5 h-5" />
            <span className="font-mono font-semibold">{user?.streak || 0}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-primary">
          <Zap className="w-5 h-5" />
          <span className="font-mono font-semibold">+{sessionStats.xpEarned}</span>
        </div>
      </header>

      {/* Progress */}
      <div className="px-8">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-mono text-foreground">{currentIndex + 1} / {cards.length}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Card Area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-2xl"
          >
            {/* Flashcard */}
            <motion.div
              className="relative aspect-[4/3] cursor-pointer perspective-1000"
              onClick={() => !isFlipped && handleFlip()}
            >
              <motion.div
                className="absolute inset-0 glass-panel rounded-2xl p-8 flex flex-col items-center justify-center text-center backface-hidden"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring' }}
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Question Side */}
                <div className="absolute top-4 left-4">
                  <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                    currentCard.difficulty === 'easy' ? 'bg-success/20 text-success' :
                    currentCard.difficulty === 'medium' ? 'bg-streak/20 text-streak' :
                    'bg-error/20 text-error'
                  }`}>
                    {currentCard.difficulty}
                  </span>
                </div>

                <Brain className="w-12 h-12 text-primary mb-6" />
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-relaxed">
                  {currentCard.question}
                </h2>

                {!isFlipped && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-8 text-sm text-muted-foreground flex items-center gap-2"
                  >
                    Tap to reveal answer
                    <ArrowRight className="w-4 h-4" />
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                className="absolute inset-0 glass-panel rounded-2xl p-8 flex flex-col items-center justify-center text-center backface-hidden"
                initial={{ rotateY: -180 }}
                animate={{ rotateY: isFlipped ? 0 : -180 }}
                transition={{ duration: 0.6, type: 'spring' }}
                style={{ backfaceVisibility: 'hidden' }}
              >
                {/* Answer Side */}
                <Check className="w-12 h-12 text-success mb-6" />
                <p className="text-lg md:text-xl text-foreground leading-relaxed">
                  {currentCard.answer}
                </p>
              </motion.div>
            </motion.div>

            {/* Answer Buttons */}
            <AnimatePresence>
              {isFlipped && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="flex justify-center gap-4 mt-8"
                >
                  <Button
                    onClick={() => handleAnswer(false)}
                    variant="outline"
                    className="flex-1 max-w-[200px] h-14 border-error text-error hover:bg-error/10 gap-2"
                  >
                    <AlertCircle className="w-5 h-5" />
                    Forgot
                  </Button>
                  <Button
                    onClick={() => handleAnswer(true)}
                    className="flex-1 max-w-[200px] h-14 bg-gradient-success hover:opacity-90 text-primary-foreground gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Got It!
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Stats Bar */}
      <div className="p-4 border-t border-border flex justify-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-sm text-muted-foreground">
            Correct: <span className="font-mono text-foreground">{sessionStats.correct}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-error" />
          <span className="text-sm text-muted-foreground">
            Incorrect: <span className="font-mono text-foreground">{sessionStats.incorrect}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecallMode;
