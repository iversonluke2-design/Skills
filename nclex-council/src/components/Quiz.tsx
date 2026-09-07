import { useState } from 'react'
import type { QuizQuestion } from '../data/types'
import type { AnswerDetail } from '../lib/quizPool'
import { isCorrect } from '../lib/quizPool'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'

type Props = {
  title: string
  questions: QuizQuestion[]
  onComplete: (score: number, total: number, details: AnswerDetail[]) => void
  onExit: () => void
}

export function Quiz({ title, questions, onComplete, onExit }: Props) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [submitted, setSubmitted] = useState(false)
  const [answers, setAnswers] = useState<AnswerDetail[]>([])

  const q = questions[index]
  const total = questions.length

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
  }

  function next() {
    const detail: AnswerDetail = {
      question: q,
      selected: Array.from(selected),
      correct: isCorrect(q, selected),
    }
    const nextAnswers = [...answers, detail]
    if (index + 1 >= total) {
      const score = nextAnswers.filter((a) => a.correct).length
      onComplete(score, total, nextAnswers)
    } else {
      setAnswers(nextAnswers)
      setIndex((i) => i + 1)
      setSelected(new Set())
      setSubmitted(false)
    }
  }

  const wasCorrect = submitted && isCorrect(q, selected)

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Button variant="link" onClick={onExit} className="h-auto p-0 text-muted-foreground hover:text-primary">
          ← Exit {title}
        </Button>
        <span className="text-sm text-muted-foreground">
          Question {index + 1} of {total}
        </span>
      </div>

      {q.outsider && (
        <Badge variant="outline" className="mb-3 border-outsider/40 text-outsider">
          Catch the hidden assumption
        </Badge>
      )}

      <Card className="border-border bg-card p-5">
        <p className="text-foreground font-medium leading-relaxed">{q.stem}</p>
        {q.type === 'sata' && <p className="text-xs text-muted-foreground mt-2">Select all that apply.</p>}

        <div className="mt-4 space-y-2">
          {q.choices.map((c) => {
            const isSelected = selected.has(c.id)
            let stateClasses = 'border-border bg-secondary hover:border-primary/50'
            if (submitted) {
              if (c.correct) stateClasses = 'border-accent-2/60 bg-accent-2/10'
              else if (isSelected && !c.correct) stateClasses = 'border-danger/60 bg-danger/10'
              else stateClasses = 'border-border bg-secondary opacity-60'
            } else if (isSelected) {
              stateClasses = 'border-primary bg-primary/10'
            }

            return (
              <div key={c.id}>
                <button
                  onClick={() => toggleChoice(c.id)}
                  disabled={submitted}
                  className={`w-full text-left rounded-lg border p-3 text-sm text-foreground transition-colors ${stateClasses}`}
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
          <Button onClick={submit} disabled={selected.size === 0} size="lg" className="mt-4 w-full">
            Submit answer
          </Button>
        ) : (
          <CardContent className="mt-4 p-0">
            <p className={`text-sm font-semibold ${wasCorrect ? 'text-accent-2' : 'text-danger'}`}>
              {wasCorrect ? 'Correct.' : 'Not quite.'}
            </p>
            {q.ngnNote && (
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed border-l-2 border-primary/40 pl-3">
                {q.ngnNote}
              </p>
            )}
            <Button onClick={next} variant="outline" size="lg" className="mt-4 w-full">
              {index + 1 >= total ? 'See results' : 'Next question'}
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
