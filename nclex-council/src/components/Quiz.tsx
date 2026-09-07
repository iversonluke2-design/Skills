import { useState } from 'react'
import type { Module, QuizQuestion } from '../data/types'

type Props = {
  module: Module
  onComplete: (score: number, total: number) => void
  onExit: () => void
}

function isCorrect(q: QuizQuestion, selected: Set<string>): boolean {
  const correctIds = new Set(q.choices.filter((c) => c.correct).map((c) => c.id))
  if (correctIds.size !== selected.size) return false
  for (const id of correctIds) {
    if (!selected.has(id)) return false
  }
  return true
}

export function Quiz({ module: m, onComplete, onExit }: Props) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [submitted, setSubmitted] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  const q = m.quiz[index]
  const total = m.quiz.length

  function toggleChoice(choiceId: string) {
    if (submitted) return
    setSelected((prev) => {
      const next = new Set(prev)
      if (q.type === 'single') {
        next.clear()
        next.add(choiceId)
      } else {
        if (next.has(choiceId)) next.delete(choiceId)
        else next.add(choiceId)
      }
      return next
    })
  }

  function submit() {
    if (selected.size === 0) return
    setSubmitted(true)
    if (isCorrect(q, selected)) setCorrectCount((c) => c + 1)
  }

  function next() {
    if (index + 1 >= total) {
      onComplete(correctCount, total)
    } else {
      setIndex((i) => i + 1)
      setSelected(new Set())
      setSubmitted(false)
    }
  }

  const wasCorrect = submitted && isCorrect(q, selected)

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onExit} className="text-sm text-text-dim hover:text-accent">
          ← Exit quiz
        </button>
        <span className="text-sm text-text-dim">
          Question {index + 1} of {total}
        </span>
      </div>

      {q.outsider && (
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-outsider/15 text-outsider text-xs font-semibold px-3 py-1">
          Catch the hidden assumption
        </div>
      )}

      <div className="rounded-xl border border-border bg-panel p-5">
        <p className="text-text font-medium leading-relaxed">{q.stem}</p>
        {q.type === 'sata' && (
          <p className="text-xs text-text-dim mt-2">Select all that apply.</p>
        )}

        <div className="mt-4 space-y-2">
          {q.choices.map((c) => {
            const isSelected = selected.has(c.id)
            let stateClasses = 'border-border bg-panel-2 hover:border-accent/50'
            if (submitted) {
              if (c.correct) stateClasses = 'border-accent-2/60 bg-accent-2/10'
              else if (isSelected && !c.correct) stateClasses = 'border-danger/60 bg-danger/10'
              else stateClasses = 'border-border bg-panel-2 opacity-60'
            } else if (isSelected) {
              stateClasses = 'border-accent bg-accent/10'
            }

            return (
              <div key={c.id}>
                <button
                  onClick={() => toggleChoice(c.id)}
                  disabled={submitted}
                  className={`w-full text-left rounded-lg border p-3 text-sm text-text transition-colors ${stateClasses}`}
                >
                  {c.text}
                </button>
                {submitted && (isSelected || c.correct) && (
                  <p
                    className={`text-xs mt-1 mb-2 px-3 leading-relaxed ${
                      c.correct ? 'text-accent-2' : 'text-danger'
                    }`}
                  >
                    {c.rationale}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {!submitted ? (
          <button
            onClick={submit}
            disabled={selected.size === 0}
            className="mt-4 w-full rounded-lg bg-accent text-[#04121a] font-semibold py-2.5 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            Submit answer
          </button>
        ) : (
          <div className="mt-4">
            <p className={`text-sm font-semibold ${wasCorrect ? 'text-accent-2' : 'text-danger'}`}>
              {wasCorrect ? 'Correct.' : 'Not quite.'}
            </p>
            {q.ngnNote && (
              <p className="text-xs text-text-dim mt-2 leading-relaxed border-l-2 border-accent/40 pl-3">
                {q.ngnNote}
              </p>
            )}
            <button
              onClick={next}
              className="mt-4 w-full rounded-lg bg-panel-2 border border-border text-text font-semibold py-2.5 hover:border-accent/60 transition-colors"
            >
              {index + 1 >= total ? 'See results' : 'Next question'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
