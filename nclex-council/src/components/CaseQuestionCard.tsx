import { useState } from 'react'
import type { CaseQuestion } from '../data/types'
import { isCorrect } from '../lib/quizPool'
import { Button } from './ui/button'

type Props = {
  question: CaseQuestion
  isLast: boolean
  onNext: (correct: boolean) => void
}

function StandardQuestion({ q, submitted, onSubmit }: { q: Extract<CaseQuestion, { type: 'single' | 'sata' }>; submitted: boolean; onSubmit: (correct: boolean) => void }) {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  function toggle(choiceId: string) {
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

  return (
    <div>
      <p className="text-foreground font-medium leading-relaxed">{q.stem}</p>
      {q.type === 'sata' && <p className="mt-2 text-xs text-muted-foreground">Select all that apply.</p>}
      <div className="mt-4 space-y-2">
        {q.choices.map((c) => {
          const isSelected = selected.has(c.id)
          let stateClasses = 'border-border bg-secondary hover:border-primary/50'
          if (submitted) {
            if (c.correct) stateClasses = 'border-accent-2/60 bg-accent-2/10'
            else if (isSelected) stateClasses = 'border-danger/60 bg-danger/10'
            else stateClasses = 'border-border bg-secondary opacity-60'
          } else if (isSelected) {
            stateClasses = 'border-primary bg-primary/10'
          }
          return (
            <div key={c.id}>
              <button
                onClick={() => toggle(c.id)}
                disabled={submitted}
                className={`w-full rounded-lg border p-3 text-left text-sm text-foreground transition-colors ${stateClasses}`}
              >
                {c.text}
              </button>
              {submitted && (isSelected || c.correct) && (
                <p className={`mb-2 mt-1 px-3 text-xs leading-relaxed ${c.correct ? 'text-accent-2' : 'text-danger'}`}>
                  {c.rationale}
                </p>
              )}
            </div>
          )
        })}
      </div>
      {!submitted && (
        <Button
          onClick={() => onSubmit(isCorrect(q, selected))}
          disabled={selected.size === 0}
          size="lg"
          className="mt-4 w-full"
        >
          Submit answer
        </Button>
      )}
    </div>
  )
}

function MatrixQuestionView({
  q,
  submitted,
  onSubmit,
}: {
  q: Extract<CaseQuestion, { type: 'matrix' }>
  submitted: boolean
  onSubmit: (correct: boolean) => void
}) {
  const [picks, setPicks] = useState<Record<string, string>>({})

  function pick(rowId: string, optionId: string) {
    if (submitted) return
    setPicks((prev) => ({ ...prev, [rowId]: optionId }))
  }

  const allPicked = q.rows.every((r) => picks[r.id])

  function submit() {
    const correct = q.rows.every((r) => picks[r.id] === r.correctOptionId)
    onSubmit(correct)
  }

  return (
    <div>
      <p className="text-foreground font-medium leading-relaxed">{q.stem}</p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="p-2 text-left text-[10px] font-bold uppercase tracking-wide text-muted-foreground"></th>
              {q.options.map((o) => (
                <th key={o.id} className="p-2 text-center text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                  {o.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {q.rows.map((row) => {
              const rowCorrect = submitted && picks[row.id] === row.correctOptionId
              const rowWrong = submitted && picks[row.id] !== row.correctOptionId
              return (
                <tr key={row.id} className={rowCorrect ? 'bg-accent-2/10' : rowWrong ? 'bg-danger/10' : ''}>
                  <td className="border-t border-border p-2 text-foreground">{row.label}</td>
                  {q.options.map((o) => (
                    <td key={o.id} className="border-t border-border p-2 text-center">
                      <input
                        type="radio"
                        name={row.id}
                        checked={picks[row.id] === o.id}
                        disabled={submitted}
                        onChange={() => pick(row.id, o.id)}
                        className="h-4 w-4 accent-primary"
                      />
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {submitted && (
        <div className="mt-4 space-y-2">
          {q.rows.map((row) => (
            <p key={row.id} className="text-xs leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">{row.label}: </span>
              {row.rationale}
            </p>
          ))}
        </div>
      )}

      {!submitted && (
        <Button onClick={submit} disabled={!allPicked} size="lg" className="mt-4 w-full">
          Submit answer
        </Button>
      )}
    </div>
  )
}

function ClozeQuestionView({
  q,
  submitted,
  onSubmit,
}: {
  q: Extract<CaseQuestion, { type: 'cloze' }>
  submitted: boolean
  onSubmit: (correct: boolean) => void
}) {
  const [picks, setPicks] = useState<Record<string, string>>({})
  const parts = q.template.split(/(\{\{\w+\}\})/g)
  const allPicked = q.blanks.every((b) => picks[b.id])

  function submit() {
    const correct = q.blanks.every((b) => picks[b.id] === b.correct)
    onSubmit(correct)
  }

  return (
    <div>
      <p className="leading-relaxed text-foreground">
        {parts.map((part, i) => {
          const match = part.match(/^\{\{(\w+)\}\}$/)
          if (!match) return <span key={i}>{part}</span>
          const blank = q.blanks.find((b) => b.id === match[1])
          if (!blank) return null
          const isRight = submitted && picks[blank.id] === blank.correct
          const isWrong = submitted && picks[blank.id] && picks[blank.id] !== blank.correct
          return (
            <select
              key={i}
              value={picks[blank.id] ?? ''}
              disabled={submitted}
              onChange={(e) => setPicks((prev) => ({ ...prev, [blank.id]: e.target.value }))}
              className={`mx-1 rounded-md border px-2 py-1 text-sm ${
                isRight
                  ? 'border-accent-2 bg-accent-2/10 text-accent-2'
                  : isWrong
                    ? 'border-danger bg-danger/10 text-danger'
                    : 'border-input bg-secondary text-foreground'
              }`}
            >
              <option value="" disabled>
                select…
              </option>
              {blank.choices.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )
        })}
      </p>

      {submitted && <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{q.rationale}</p>}

      {!submitted && (
        <Button onClick={submit} disabled={!allPicked} size="lg" className="mt-4 w-full">
          Submit answer
        </Button>
      )}
    </div>
  )
}

export function CaseQuestionCard({ question, isLast, onNext }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [wasCorrect, setWasCorrect] = useState(false)

  function handleSubmit(correct: boolean) {
    setWasCorrect(correct)
    setSubmitted(true)
  }

  function renderQuestion() {
    switch (question.type) {
      case 'single':
      case 'sata':
        return <StandardQuestion q={question} submitted={submitted} onSubmit={handleSubmit} />
      case 'matrix':
        return <MatrixQuestionView q={question} submitted={submitted} onSubmit={handleSubmit} />
      case 'cloze':
        return <ClozeQuestionView q={question} submitted={submitted} onSubmit={handleSubmit} />
    }
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      {renderQuestion()}

      {submitted && (
        <div className="mt-4 border-t border-border pt-4">
          <p className={`text-sm font-semibold ${wasCorrect ? 'text-accent-2' : 'text-danger'}`}>
            {wasCorrect ? 'Correct.' : 'Not quite.'}
          </p>
          <Button onClick={() => onNext(wasCorrect)} variant="outline" size="lg" className="mt-3 w-full">
            {isLast ? 'Finish case' : 'Next question'}
          </Button>
        </div>
      )}
    </div>
  )
}
