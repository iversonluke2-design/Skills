import { useState } from 'react'
import type { Module } from '../data/types'
import { buildDeck } from '../lib/flashcards'
import { shuffle } from '../lib/quizPool'
import { Button } from './ui/button'

export function FlashcardsMode({ module }: { module: Module }) {
  const [deck, setDeck] = useState(() => buildDeck(module))
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  if (deck.length === 0) {
    return <p className="text-sm text-muted-foreground">No flashcards available for this topic yet.</p>
  }

  const card = deck[index]

  function go(delta: number) {
    setFlipped(false)
    setIndex((i) => (i + delta + deck.length) % deck.length)
  }

  function shuffleDeck() {
    setDeck((d) => shuffle(d))
    setIndex(0)
    setFlipped(false)
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Card {index + 1} of {deck.length}
        </span>
        <button onClick={shuffleDeck} className="font-semibold text-primary hover:underline">
          Shuffle
        </button>
      </div>

      <button
        onClick={() => setFlipped((f) => !f)}
        className="flex min-h-[220px] w-full flex-col items-center justify-center rounded-xl border border-border bg-card p-8 text-center transition-colors hover:border-primary/50"
      >
        <span className="mb-3 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
          {flipped ? 'Answer' : 'Term / Question'}
        </span>
        <span className={`text-lg leading-relaxed ${flipped ? 'text-accent-2' : 'text-foreground font-semibold'}`}>
          {flipped ? card.back : card.front}
        </span>
        <span className="mt-4 text-xs text-muted-foreground">Click to flip</span>
      </button>

      <div className="mt-4 flex gap-3">
        <Button variant="outline" onClick={() => go(-1)} className="flex-1">
          ← Previous
        </Button>
        <Button onClick={() => go(1)} className="flex-1">
          Next →
        </Button>
      </div>
    </div>
  )
}
