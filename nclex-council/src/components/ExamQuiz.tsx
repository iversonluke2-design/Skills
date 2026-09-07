import { useEffect, useState } from 'react'
import type { QuizQuestion } from '../data/types'
import { isCorrect } from '../lib/quizPool'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Progress } from './ui/progress'

export type ExamAnswer = {
  question: QuizQuestion
  selected: string[]
  correct: boolean
  timedOut: boolean
}

type Props = {
  title: string
  questions: QuizQuestion[]
  secondsPerQuestion: number
  onComplete: (answers: ExamAnswer[]) => void
  onExit: () => void
}

export function ExamQuiz({ title, questions, secondsPerQuestion, onComplete, onExit }: Props) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [timeLeft, setTimeLeft] = useState(secondsPerQuestion)
  const [answers, setAnswers] = useState<ExamAnswer[]>([])

  const q = questions[index]
  const total = questions.length

  useEffect(() => {
    setSelected(new Set())
    setTimeLeft(secondsPerQuestion)
  }, [index, secondsPerQuestion])

  useEffect(() => {
    if (timeLeft <= 0) {
      advance(true)
      return
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft])

  function toggleChoice(choiceId: string) {
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

  function advance(timedOut: boolean) {
    const answer: ExamAnswer = {
      question: q,
      selected: Array.from(selected),
      correct: isCorrect(q, selected),
      timedOut,
    }
    const nextAnswers = [...answers, answer]
    if (index + 1 >= total) {
      onComplete(nextAnswers)
    } else {
      setAnswers(nextAnswers)
      setIndex((i) => i + 1)
    }
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const isLow = timeLeft <= 10

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Button variant="link" onClick={onExit} className="h-auto p-0 text-muted-foreground hover:text-primary">
          ← Exit exam
        </Button>
        <span className="text-sm text-muted-foreground">
          {title} · Question {index + 1} of {total}
        </span>
      </div>

      <Progress value={((index + 1) / total) * 100} className="mb-3 h-1.5" />

      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">Timed exam · no feedback until the end</span>
        <span className={`font-mono text-sm font-semibold tabular-nums ${isLow ? 'text-danger' : 'text-foreground'}`}>
          {minutes}:{seconds.toString().padStart(2, '0')}
        </span>
      </div>

      <Card className="border-border bg-card p-5">
        <p className="text-foreground font-medium leading-relaxed">{q.stem}</p>
        {q.type === 'sata' && <p className="text-xs text-muted-foreground mt-2">Select all that apply.</p>}

        <div className="mt-4 space-y-2">
          {q.choices.map((c) => {
            const isSelected = selected.has(c.id)
            return (
              <button
                key={c.id}
                onClick={() => toggleChoice(c.id)}
                className={`w-full text-left rounded-lg border p-3 text-sm text-foreground transition-colors ${
                  isSelected ? 'border-primary bg-primary/10' : 'border-border bg-secondary hover:border-primary/50'
                }`}
              >
                {c.text}
              </button>
            )
          })}
        </div>

        <Button onClick={() => advance(false)} disabled={selected.size === 0} size="lg" className="mt-4 w-full">
          {index + 1 >= total ? 'Submit exam' : 'Next question'}
        </Button>
      </Card>
    </div>
  )
}
