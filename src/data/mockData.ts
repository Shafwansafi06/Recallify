export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  deckId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  lastReviewed: Date | null;
  nextReview: Date;
  recallStrength: number; // 0-100
  timesReviewed: number;
  correctCount: number;
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  category: string;
  cardCount: number;
  masteryPercentage: number;
  recallStability: 'low' | 'medium' | 'high';
  status: 'danger' | 'active' | 'mastered';
  color: string;
  icon: string;
  lastStudied: Date;
  createdAt: Date;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'special';
  xpReward: number;
  progress: number;
  target: number;
  completed: boolean;
  expiresAt: Date;
  icon: string;
}

export interface StudySession {
  id: string;
  date: Date;
  cardsReviewed: number;
  correctAnswers: number;
  xpEarned: number;
  duration: number; // in minutes
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date | null;
  progress: number;
  target: number;
  xpReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// Mock Decks
export const mockDecks: Deck[] = [
  {
    id: '1',
    name: 'Quantum Physics',
    description: 'Core concepts of quantum mechanics',
    category: 'Physics',
    cardCount: 156,
    masteryPercentage: 42,
    recallStability: 'medium',
    status: 'danger',
    color: 'hsl(0, 84%, 60%)',
    icon: '⚛️',
    lastStudied: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2024-06-01'),
  },
  {
    id: '2',
    name: 'Design Systems',
    description: 'UI/UX principles and patterns',
    category: 'Design',
    cardCount: 89,
    masteryPercentage: 88,
    recallStability: 'high',
    status: 'mastered',
    color: 'hsl(142, 71%, 45%)',
    icon: '🎨',
    lastStudied: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2024-05-15'),
  },
  {
    id: '3',
    name: 'Microeconomics',
    description: 'Economic theory and applications',
    category: 'Economics',
    cardCount: 124,
    masteryPercentage: 65,
    recallStability: 'medium',
    status: 'active',
    color: 'hsl(38, 92%, 50%)',
    icon: '📊',
    lastStudied: new Date(),
    createdAt: new Date('2024-04-20'),
  },
  {
    id: '4',
    name: 'Spanish Vocabulary',
    description: 'Essential Spanish words and phrases',
    category: 'Languages',
    cardCount: 342,
    masteryPercentage: 71,
    recallStability: 'high',
    status: 'active',
    color: 'hsl(258, 90%, 66%)',
    icon: '🇪🇸',
    lastStudied: new Date(Date.now() - 4 * 60 * 60 * 1000),
    createdAt: new Date('2024-03-10'),
  },
  {
    id: '5',
    name: 'Music Theory',
    description: 'Fundamentals of music composition',
    category: 'Music',
    cardCount: 78,
    masteryPercentage: 54,
    recallStability: 'medium',
    status: 'active',
    color: 'hsl(280, 80%, 55%)',
    icon: '🎵',
    lastStudied: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2024-07-01'),
  },
  {
    id: '6',
    name: 'World History',
    description: 'Key historical events and figures',
    category: 'History',
    cardCount: 203,
    masteryPercentage: 38,
    recallStability: 'low',
    status: 'danger',
    color: 'hsl(200, 80%, 50%)',
    icon: '📜',
    lastStudied: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date('2024-02-20'),
  },
];

// Mock Flashcards
export const mockFlashcards: Flashcard[] = [
  {
    id: '1',
    question: "What is Heisenberg's Uncertainty Principle?",
    answer: "It is impossible to simultaneously know both the exact position and exact momentum of a particle. The more precisely one property is measured, the less precisely the other can be known.",
    deckId: '1',
    difficulty: 'hard',
    lastReviewed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    nextReview: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    recallStrength: 45,
    timesReviewed: 8,
    correctCount: 4,
  },
  {
    id: '2',
    question: "What is wave-particle duality?",
    answer: "The concept that all particles exhibit both wave and particle properties. Light, for example, can behave as both a wave and a particle (photon).",
    deckId: '1',
    difficulty: 'medium',
    lastReviewed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    nextReview: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    recallStrength: 72,
    timesReviewed: 12,
    correctCount: 9,
  },
  {
    id: '3',
    question: "What are the key principles of a Design System?",
    answer: "Consistency, Reusability, Scalability, and Documentation. A design system includes components, patterns, guidelines, and tools that ensure cohesive design across products.",
    deckId: '2',
    difficulty: 'medium',
    lastReviewed: new Date(),
    nextReview: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    recallStrength: 91,
    timesReviewed: 15,
    correctCount: 14,
  },
  {
    id: '4',
    question: "What is the law of supply and demand?",
    answer: "When supply exceeds demand, prices tend to fall. When demand exceeds supply, prices tend to rise. The equilibrium price is where supply equals demand.",
    deckId: '3',
    difficulty: 'easy',
    lastReviewed: new Date(Date.now() - 12 * 60 * 60 * 1000),
    nextReview: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    recallStrength: 85,
    timesReviewed: 10,
    correctCount: 9,
  },
  {
    id: '5',
    question: "What is opportunity cost?",
    answer: "The value of the next best alternative that must be given up when making a choice. It represents the benefits you could have received by taking an alternative action.",
    deckId: '3',
    difficulty: 'medium',
    lastReviewed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    nextReview: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    recallStrength: 68,
    timesReviewed: 7,
    correctCount: 5,
  },
];

// Mock Challenges
export const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Daily Recall Champion',
    description: 'Complete 50 card reviews today',
    type: 'daily',
    xpReward: 150,
    progress: 32,
    target: 50,
    completed: false,
    expiresAt: new Date(new Date().setHours(23, 59, 59, 999)),
    icon: '🎯',
  },
  {
    id: '2',
    title: 'Perfect Streak',
    description: 'Get 10 correct answers in a row',
    type: 'daily',
    xpReward: 100,
    progress: 7,
    target: 10,
    completed: false,
    expiresAt: new Date(new Date().setHours(23, 59, 59, 999)),
    icon: '🔥',
  },
  {
    id: '3',
    title: 'Weekly Warrior',
    description: 'Study for 7 days consecutively',
    type: 'weekly',
    xpReward: 500,
    progress: 5,
    target: 7,
    completed: false,
    expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    icon: '⚔️',
  },
  {
    id: '4',
    title: 'Master a Deck',
    description: 'Reach 90% mastery in any deck',
    type: 'weekly',
    xpReward: 300,
    progress: 88,
    target: 90,
    completed: false,
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    icon: '👑',
  },
  {
    id: '5',
    title: 'Speed Demon',
    description: 'Answer 20 cards in under 5 minutes',
    type: 'special',
    xpReward: 250,
    progress: 0,
    target: 20,
    completed: false,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    icon: '⚡',
  },
];

// Mock Achievements
export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first study session',
    icon: '👣',
    unlockedAt: new Date('2024-01-15'),
    progress: 1,
    target: 1,
    xpReward: 50,
    rarity: 'common',
  },
  {
    id: '2',
    title: 'Streak Starter',
    description: 'Maintain a 7-day study streak',
    icon: '🔥',
    unlockedAt: new Date('2024-02-01'),
    progress: 7,
    target: 7,
    xpReward: 200,
    rarity: 'rare',
  },
  {
    id: '3',
    title: 'Knowledge Architect',
    description: 'Create 10 custom decks',
    icon: '🏗️',
    unlockedAt: null,
    progress: 6,
    target: 10,
    xpReward: 300,
    rarity: 'rare',
  },
  {
    id: '4',
    title: 'Perfect Week',
    description: 'Complete all daily challenges for a week',
    icon: '⭐',
    unlockedAt: null,
    progress: 4,
    target: 7,
    xpReward: 500,
    rarity: 'epic',
  },
  {
    id: '5',
    title: 'Memory Master',
    description: 'Achieve 95% recall rate on 500 cards',
    icon: '🧠',
    unlockedAt: null,
    progress: 312,
    target: 500,
    xpReward: 1000,
    rarity: 'legendary',
  },
];

// Mock Study Sessions (for analytics)
export const mockStudySessions: StudySession[] = Array.from({ length: 30 }, (_, i) => ({
  id: `session-${i}`,
  date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
  cardsReviewed: Math.floor(Math.random() * 50) + 20,
  correctAnswers: Math.floor(Math.random() * 40) + 15,
  xpEarned: Math.floor(Math.random() * 200) + 50,
  duration: Math.floor(Math.random() * 30) + 10,
}));

// Weekly retention data for chart
export const weeklyRetentionData = [
  { day: 'MON', retention: 78, cards: 45 },
  { day: 'TUE', retention: 82, cards: 52 },
  { day: 'WED', retention: 85, cards: 38 },
  { day: 'THU', retention: 79, cards: 61 },
  { day: 'FRI', retention: 91, cards: 48 },
  { day: 'SAT', retention: 88, cards: 35 },
  { day: 'SUN', retention: 94, cards: 42 },
];

// Subject mastery for radar chart
export const subjectMasteryData = [
  { subject: 'PHYSICS', actual: 45, target: 80 },
  { subject: 'DESIGN', actual: 88, target: 85 },
  { subject: 'HISTORY', actual: 38, target: 70 },
  { subject: 'MUSIC', actual: 54, target: 65 },
  { subject: 'LANGUAGES', actual: 71, target: 80 },
];

// AI Insights
export const aiInsights = [
  {
    id: '1',
    type: 'critical' as const,
    badge: 'CRITICAL INTERVENTION',
    title: 'Focus is slipping in Physics',
    description: "Memory decay has accelerated by 14% in 'Quantum Mechanics'. Schedule a review within 4 hours to prevent total loss.",
    action: 'BOOST PHYSICS RECALL',
    icon: '⚠️',
  },
  {
    id: '2',
    type: 'success' as const,
    badge: 'PEAK PERFORMANCE',
    title: '98% recall for Design Principles',
    description: "Excellent consolidation! You've mastered 'Layout Hierarchies'. Ready to challenge the advanced certification module.",
    action: 'BEGIN CHALLENGE',
    icon: '✓',
  },
  {
    id: '3',
    type: 'info' as const,
    badge: 'LEARNING HABITS',
    title: 'Evening review window is best',
    description: 'Your data shows 22% higher retention when you study between 8:00 PM and 10:00 PM. Optimize your schedule.',
    action: 'SYNC TO CALENDAR',
    icon: '🕐',
  },
];

// Level titles
export const levelTitles: Record<number, string> = {
  1: 'Novice',
  2: 'Apprentice',
  3: 'Student',
  4: 'Scholar',
  5: 'Adept',
  6: 'Expert',
  7: 'Master',
  8: 'Grandmaster',
  9: 'Sage',
  10: 'Oracle',
  11: 'Luminary',
  12: 'Virtuoso',
  13: 'Prodigy',
  14: 'Legend',
  15: 'Immortal',
};
