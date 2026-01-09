import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { mockDecks, type Deck } from '@/data/mockData';
import { MorphingCardStack, type CardData } from '@/components/ui/morphing-card-stack';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Play, 
  MoreHorizontal,
  BookOpen,
  Clock,
  TrendingUp,
  Grid3X3,
  List,
  Layers
} from 'lucide-react';

const Library = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'stack' | 'grid' | 'list'>('stack');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ['All', ...new Set(mockDecks.map(d => d.category))];

  const filteredDecks = mockDecks.filter(deck => {
    const matchesSearch = deck.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         deck.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || deck.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: Deck['status']) => {
    switch (status) {
      case 'danger': return 'bg-error/20 text-error';
      case 'mastered': return 'bg-success/20 text-success';
      case 'active': return 'bg-primary/20 text-primary';
    }
  };

  const getStabilityColor = (stability: Deck['recallStability']) => {
    switch (stability) {
      case 'low': return 'text-error';
      case 'medium': return 'text-streak';
      case 'high': return 'text-success';
    }
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">Card Library</h1>
            <p className="text-muted-foreground">Manage your flashcard decks</p>
          </div>
          <Button className="bg-gradient-xp hover:opacity-90 text-primary-foreground gap-2">
            <Plus className="w-5 h-5" />
            Create Deck
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search decks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 bg-card border-border"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === 'All' ? null : category)}
                className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                  (category === 'All' && !selectedCategory) || category === selectedCategory
                    ? 'bg-primary text-primary-foreground'
                    : 'glass-panel text-muted-foreground hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex gap-1 glass-panel p-1 rounded-lg">
            <button
              onClick={() => setViewMode('stack')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'stack' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              }`}
              title="Stack View"
            >
              <Layers className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              }`}
              title="Grid View"
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              }`}
              title="List View"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel p-4 rounded-xl">
            <p className="text-xs text-muted-foreground mb-1">Total Decks</p>
            <p className="text-2xl font-display font-bold text-foreground">{mockDecks.length}</p>
          </div>
          <div className="glass-panel p-4 rounded-xl">
            <p className="text-xs text-muted-foreground mb-1">Total Cards</p>
            <p className="text-2xl font-display font-bold text-foreground">
              {mockDecks.reduce((acc, d) => acc + d.cardCount, 0)}
            </p>
          </div>
          <div className="glass-panel p-4 rounded-xl">
            <p className="text-xs text-muted-foreground mb-1">Mastered</p>
            <p className="text-2xl font-display font-bold text-success">
              {mockDecks.filter(d => d.status === 'mastered').length}
            </p>
          </div>
          <div className="glass-panel p-4 rounded-xl">
            <p className="text-xs text-muted-foreground mb-1">Need Review</p>
            <p className="text-2xl font-display font-bold text-error">
              {mockDecks.filter(d => d.status === 'danger').length}
            </p>
          </div>
        </div>

        {/* Decks Stack/Grid/List */}
        <AnimatePresence mode="wait">
          {viewMode === 'stack' ? (
            <motion.div
              key="stack"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-8"
            >
              <MorphingCardStack
                cards={filteredDecks.map((deck): CardData => ({
                  id: deck.id,
                  title: deck.name,
                  description: deck.description,
                  icon: <span className="text-3xl">{deck.icon}</span>,
                  color: deck.color,
                  metadata: {
                    count: deck.cardCount,
                    progress: deck.masteryPercentage,
                    streak: deck.status === 'active' ? 3 : 0,
                  },
                }))}
                defaultLayout="stack"
                showLayoutToggle={false}
                onCardClick={(card) => navigate(`/recall?deck=${card.id}`)}
              />
            </motion.div>
          ) : viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredDecks.map((deck, i) => (
                <motion.div
                  key={deck.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="glass-panel rounded-xl overflow-hidden group cursor-pointer"
                  onClick={() => navigate(`/recall?deck=${deck.id}`)}
                >
                  {/* Header with color */}
                  <div 
                    className="h-2"
                    style={{ backgroundColor: deck.color }}
                  />
                  
                  <div className="p-6">
                    {/* Title Row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{deck.icon}</span>
                        <div>
                          <h3 className="font-display font-bold text-foreground">{deck.name}</h3>
                          <p className="text-xs text-muted-foreground">{deck.category}</p>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); }}
                        className="p-1 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {deck.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <BookOpen className="w-4 h-4" />
                        <span>{deck.cardCount} cards</span>
                      </div>
                      <div className={`flex items-center gap-1 ${getStabilityColor(deck.recallStability)}`}>
                        <TrendingUp className="w-4 h-4" />
                        <span className="capitalize">{deck.recallStability}</span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Mastery</span>
                        <span className="font-mono text-foreground">{deck.masteryPercentage}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${deck.masteryPercentage}%` }}
                          transition={{ duration: 0.8, delay: i * 0.05 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: deck.color }}
                        />
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${getStatusColor(deck.status)}`}>
                        {deck.status}
                      </span>
                      <Button 
                        size="sm" 
                        className="bg-primary/20 hover:bg-primary/30 text-primary gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/recall?deck=${deck.id}`);
                        }}
                      >
                        <Play className="w-4 h-4" />
                        Study
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-panel rounded-xl overflow-hidden"
            >
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-4 text-left text-xs font-mono text-muted-foreground uppercase tracking-widest">
                      Deck
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-mono text-muted-foreground uppercase tracking-widest">
                      Cards
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-mono text-muted-foreground uppercase tracking-widest">
                      Mastery
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-mono text-muted-foreground uppercase tracking-widest">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-mono text-muted-foreground uppercase tracking-widest">
                      Last Studied
                    </th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDecks.map((deck) => (
                    <tr 
                      key={deck.id} 
                      className="border-b border-border/50 hover:bg-muted/20 transition-colors cursor-pointer"
                      onClick={() => navigate(`/recall?deck=${deck.id}`)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{deck.icon}</span>
                          <div>
                            <p className="font-medium text-foreground">{deck.name}</p>
                            <p className="text-xs text-muted-foreground">{deck.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-foreground">{deck.cardCount}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${deck.masteryPercentage}%`, backgroundColor: deck.color }}
                            />
                          </div>
                          <span className="font-mono text-sm text-muted-foreground">
                            {deck.masteryPercentage}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${getStatusColor(deck.status)}`}>
                          {deck.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {deck.lastStudied.toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Button 
                          size="sm" 
                          className="bg-primary/20 hover:bg-primary/30 text-primary gap-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/recall?deck=${deck.id}`);
                          }}
                        >
                          <Play className="w-4 h-4" />
                          Study
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {filteredDecks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No decks found matching your search.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Library;
