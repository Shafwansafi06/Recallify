"use client"

import { useState, type ReactNode } from "react"
import { motion, AnimatePresence, LayoutGroup, type PanInfo } from "framer-motion"
import { cn } from "@/lib/utils"
import { Grid3X3, Layers, LayoutList } from "lucide-react"

export type LayoutMode = "stack" | "grid" | "list"

export interface CardData {
  id: string
  title: string
  description: string
  icon?: ReactNode
  color?: string
  metadata?: {
    count?: number
    progress?: number
    streak?: number
  }
}

export interface MorphingCardStackProps {
  cards?: CardData[]
  className?: string
  defaultLayout?: LayoutMode
  onCardClick?: (card: CardData) => void
  showLayoutToggle?: boolean
}

const layoutIcons = {
  stack: Layers,
  grid: Grid3X3,
  list: LayoutList,
}

const SWIPE_THRESHOLD = 50

export function MorphingCardStack({
  cards = [],
  className,
  defaultLayout = "stack",
  onCardClick,
  showLayoutToggle = true,
}: MorphingCardStackProps) {
  const [layout, setLayout] = useState<LayoutMode>(defaultLayout)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  if (!cards || cards.length === 0) {
    return null
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info
    const swipe = Math.abs(offset.x) * velocity.x

    if (offset.x < -SWIPE_THRESHOLD || swipe < -1000) {
      setActiveIndex((prev) => (prev + 1) % cards.length)
    } else if (offset.x > SWIPE_THRESHOLD || swipe > 1000) {
      setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)
    }
    setIsDragging(false)
  }

  const getStackOrder = () => {
    const reordered: (CardData & { stackPosition: number })[] = []
    for (let i = 0; i < cards.length; i++) {
      const index = (activeIndex + i) % cards.length
      reordered.push({ ...cards[index], stackPosition: i })
    }
    return reordered.reverse()
  }

  const getLayoutStyles = (stackPosition: number) => {
    switch (layout) {
      case "stack":
        return {
          top: stackPosition * 8,
          left: stackPosition * 8,
          zIndex: cards.length - stackPosition,
          rotate: (stackPosition - 1) * 2,
        }
      case "grid":
        return {
          top: 0,
          left: 0,
          zIndex: 1,
          rotate: 0,
        }
      case "list":
        return {
          top: 0,
          left: 0,
          zIndex: 1,
          rotate: 0,
        }
    }
  }

  const containerStyles = {
    stack: "relative h-72 w-72",
    grid: "grid grid-cols-2 gap-4",
    list: "flex flex-col gap-4",
  }

  const displayCards = layout === "stack" ? getStackOrder() : cards.map((c, i) => ({ ...c, stackPosition: i }))

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Layout Toggle */}
      {showLayoutToggle && (
        <div className="flex items-center gap-1 p-1 glass-panel rounded-lg w-fit">
          {(Object.keys(layoutIcons) as LayoutMode[]).map((mode) => {
            const Icon = layoutIcons[mode]
            return (
              <button
                key={mode}
                onClick={() => setLayout(mode)}
                className={cn(
                  "rounded-md p-2 transition-all duration-300",
                  layout === mode
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
                aria-label={`Switch to ${mode} layout`}
              >
                <Icon className="h-4 w-4" />
              </button>
            )
          })}
        </div>
      )}

      {/* Cards Container */}
      <div className={cn(containerStyles[layout], "transition-all duration-500")}>
        <LayoutGroup>
          <AnimatePresence mode="popLayout">
            {displayCards.map((card) => {
              const styles = getLayoutStyles(card.stackPosition)
              const isExpanded = expandedCard === card.id
              const isTopCard = layout === "stack" && card.stackPosition === 0

              return (
                <motion.div
                  key={card.id}
                  layoutId={card.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    ...styles,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  drag={isTopCard ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ scale: 1.02, cursor: "grabbing" }}
                  whileHover={!isTopCard ? { scale: 1.02, y: -4 } : undefined}
                  onClick={() => {
                    if (isDragging) return
                    setExpandedCard(isExpanded ? null : card.id)
                    onCardClick?.(card)
                  }}
                  className={cn(
                    "cursor-pointer rounded-xl glass-panel p-5 border border-border/50",
                    "hover:border-primary/50 transition-colors duration-300",
                    layout === "stack" && "absolute w-64 h-56",
                    layout === "stack" && isTopCard && "cursor-grab active:cursor-grabbing",
                    layout === "grid" && "w-full aspect-square",
                    layout === "list" && "w-full",
                    isExpanded && "ring-2 ring-primary glow-primary"
                  )}
                  style={{
                    background: card.color 
                      ? `linear-gradient(135deg, ${card.color}20 0%, transparent 100%)`
                      : undefined,
                  }}
                >
                  <div className="flex flex-col h-full">
                    {card.icon && (
                      <div className="mb-4 text-primary">
                        {card.icon}
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-bold text-foreground mb-2">
                        {card.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {card.description}
                      </p>
                    </div>

                    {/* Metadata */}
                    {card.metadata && (
                      <div className="mt-4 pt-4 border-t border-border/50 flex items-center gap-4 text-xs text-muted-foreground">
                        {card.metadata.count !== undefined && (
                          <span>{card.metadata.count} cards</span>
                        )}
                        {card.metadata.progress !== undefined && (
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-xp rounded-full"
                                style={{ width: `${card.metadata.progress}%` }}
                              />
                            </div>
                            <span>{card.metadata.progress}%</span>
                          </div>
                        )}
                        {card.metadata.streak !== undefined && card.metadata.streak > 0 && (
                          <span className="text-streak">🔥 {card.metadata.streak}</span>
                        )}
                      </div>
                    )}
                  </div>

                  {isTopCard && layout === "stack" && (
                    <p className="absolute bottom-3 left-0 right-0 text-center text-[10px] text-muted-foreground/50 uppercase tracking-wider">
                      Swipe to navigate
                    </p>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </LayoutGroup>
      </div>

      {/* Pagination dots */}
      {layout === "stack" && cards.length > 1 && (
        <div className="flex items-center justify-center gap-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === activeIndex 
                  ? "w-6 bg-primary shadow-lg shadow-primary/25" 
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export { MorphingCardStack as Component }
