import { useMemo, useState } from 'react'
import type { Module } from '../data/types'
import { loadDeckState, saveCardState } from '../lib/ankiStorage'
import { buildDeck } from '../lib/flashcards'
import { bucket, isDue, previewInterval, schedule, type CardState, type Grade } from '../lib/spacedRepetition'
import { Button } from './ui/button'
import { Card } from './ui/card'

const GRADE_BUTTONS: Array<{ grade: Grade; label: string; classes: string }> = [
  { grade: 'again', label: 'Again', classes: 'border-danger/50 bg-danger/10 text-danger hover:bg-danger/20' },
  { grade: 'hard', label: 'Hard', classes: 'border-warn/50 bg-warn/10 text-warn hover:bg-warn/20' },
  { grade: 'good', label: 'Good', classes: 'border-border bg-secondary text-foreground hover:border-primary/40' },
  { grade: 'easy', label: 'Easy', classes: 'border-accent-2/50 bg-accent-2/10 text-accent-2 hover:bg-accent-2/20' },
]

export function AnkiMode({ module }: { module: Module }) {
  const deck = useMemo(() => buildDeck(module), [module])
  const [states, setStates] = useState<Record<string, CardState>>(() =>
    loadDeckState(
      module.id,
      deck.map((c) => c.front),
    ),
  )
  const [queue, setQueue] = useState<string[]>(() => deck.map((c) => c.front).filter((id) => isDue(states[id])))
  const [revealed, setRevealed] = useState(false)

  if (deck.length === 0) {
    return <p className="text-sm text-muted-foreground">No cards available for this topic yet.</p>
  }

  const counts = { new: 0, learn: 0, due: 0 }
  for (const id of Object.keys(states)) {
    counts[bucket(states[id])]++
  }

  const currentId = queue[0]
  const currentCard = deck.find((c) => c.front === currentId)

  function grade(g: Grade) {
    if (!currentId) return
    const nextState = schedule(states[currentId], g)
    setStates((prev) => ({ ...prev, [currentId]: nextState }))
    saveCardState(module.id, currentId, nextState)

    setQueue((prev) => {
      const rest = prev.slice(1)
      if (g === 'again') {
        const reinsertAt = Math.min(3, rest.length)
        return [...rest.slice(0, reinsertAt), currentId, ...rest.slice(reinsertAt)]
      }
      return rest
    })
    setRevealed(false)
  }

  return (
    <div>
      <div className="mb-4 grid grid-cols-3 gap-2 text-center text-xs font-bold">
        <div className="rounded-lg border border-primary/30 bg-primary/10 py-2 text-primary">NEW: {counts.new}</div>
        <div className="rounded-lg border border-warn/30 bg-warn/10 py-2 text-warn">LEARN: {counts.learn}</div>
        <div className="rounded-lg border border-accent-2/30 bg-accent-2/10 py-2 text-accent-2">DUE: {counts.due}</div>
      </div>

      {!currentCard ? (
        <Card className="flex flex-col items-center justify-center gap-2 p-10 text-center">
          <p className="text-2xl">🎉</p>
          <p className="font-semibold text-foreground">Deck complete</p>
          <p className="text-sm text-muted-foreground">
            You've reviewed every card due right now. Come back later as more become due.
          </p>
        </Card>
      ) : (
        <>
          <button
            onClick={() => setRevealed((r) => !r)}
            className="flex min-h-[220px] w-full flex-col items-center justify-center rounded-xl border border-border bg-card p-8 text-center transition-colors hover:border-primary/50"
          >
            <span className="mb-3 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
              {revealed ? 'Answer' : 'Question'}
            </span>
            <span className={`text-lg leading-relaxed ${revealed ? 'text-accent-2' : 'font-semibold text-foreground'}`}>
              {revealed ? currentCard.back : currentCard.front}
            </span>
            {!revealed && <span className="mt-4 text-xs text-muted-foreground">Click to reveal</span>}
          </button>

          {!revealed ? (
            <Button onClick={() => setRevealed(true)} size="lg" className="mt-4 w-full">
              Show Answer
            </Button>
          ) : (
            <div className="mt-4 grid grid-cols-4 gap-2">
              {GRADE_BUTTONS.map((b) => (
                <button
                  key={b.grade}
                  onClick={() => grade(b.grade)}
                  className={`flex flex-col items-center rounded-lg border py-2.5 text-sm font-bold transition-colors ${b.classes}`}
                >
                  <span>{b.label}</span>
                  <span className="mt-0.5 text-[10px] font-normal opacity-70">
                    {previewInterval(states[currentId], b.grade)}
                  </span>
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
