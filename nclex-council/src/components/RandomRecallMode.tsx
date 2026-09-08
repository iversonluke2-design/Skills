import { useState } from 'react'
import type { Module } from '../data/types'
import { buildDeck } from '../lib/flashcards'
import { Button } from './ui/button'

function pickRandomIndex(length: number, exclude: number): number {
  if (length <= 1) return 0
  let next = Math.floor(Math.random() * length)
  while (next === exclude) {
    next = Math.floor(Math.random() * length)
  }
  return next
}

export function RandomRecallMode({ module }: { module: Module }) {
  const [deck] = useState(() => buildDeck(module))
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)

  if (deck.length === 0) {
    return <p className="text-sm text-muted-foreground">No recall items available for this topic yet.</p>
  }

  const card = deck[index]

  function nextRandom() {
    setIndex((i) => pickRandomIndex(deck.length, i))
    setRevealed(false)
  }

  return (
    <div>
      <p className="mb-3 text-xs uppercase tracking-wide text-muted-foreground">Random pull from this topic's terms &amp; recall checks</p>

      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-lg leading-relaxed text-foreground font-medium">{card.front}</p>

        {!revealed ? (
          <Button variant="outline" onClick={() => setRevealed(true)} className="mt-4">
            Reveal answer
          </Button>
        ) : (
          <p className="mt-4 border-l-2 border-accent-2 pl-3 text-sm leading-relaxed text-accent-2">{card.back}</p>
        )}
      </div>

      <Button onClick={nextRandom} size="lg" className="mt-4 w-full">
        Next random card
      </Button>
    </div>
  )
}
