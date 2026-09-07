import type { QuizQuestion } from '../data/types'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export type ReviewItem = {
  question: QuizQuestion
  selected: string[]
  correct: boolean
}

type Props = {
  title: string
  items: ReviewItem[]
  onRetake: () => void
  onDone: () => void
}

function grade(pct: number): { label: string; className: string } {
  if (pct >= 80) return { label: 'Strong', className: 'text-accent-2 border-accent-2/40' }
  if (pct >= 60) return { label: 'Borderline — review misses', className: 'text-warn border-warn/40' }
  return { label: 'Needs review', className: 'text-danger border-danger/40' }
}

export function QuizResults({ title, items, onRetake, onDone }: Props) {
  const total = items.length
  const score = items.filter((i) => i.correct).length
  const pct = total > 0 ? Math.round((score / total) * 100) : 0
  const g = grade(pct)

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center">
        <p className="text-xs uppercase tracking-wide text-primary font-semibold">{title}</p>
        <h1 className="text-3xl font-bold text-foreground mt-2">
          {score}/{total} <span className="text-muted-foreground text-xl font-normal">({pct}%)</span>
        </h1>
        <Badge variant="outline" className={`mt-2 ${g.className}`}>
          {g.label}
        </Badge>
      </div>

      <div className="mt-8 space-y-3">
        {items.map((item, i) => {
          return (
            <Card key={item.question.id} className={item.correct ? 'border-accent-2/30' : 'border-danger/30'}>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-foreground leading-relaxed">
                  {i + 1}. {item.question.stem}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {item.question.choices.map((c) => {
                  const wasPicked = item.selected.includes(c.id)
                  if (!wasPicked && !c.correct) return null
                  return (
                    <p
                      key={c.id}
                      className={`rounded-md border p-2 leading-relaxed ${
                        c.correct
                          ? 'border-accent-2/40 bg-accent-2/5 text-foreground'
                          : 'border-danger/40 bg-danger/5 text-foreground'
                      }`}
                    >
                      <span className="font-semibold">
                        {c.correct ? 'Correct: ' : 'Your answer: '}
                      </span>
                      {c.text}
                      <span className="block text-xs text-muted-foreground mt-1">{c.rationale}</span>
                    </p>
                  )
                })}
                {item.selected.length === 0 && (
                  <p className="text-xs text-muted-foreground italic">No answer selected in time.</p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-6 flex gap-3">
        <Button onClick={onRetake} size="lg" className="flex-1">
          Retake
        </Button>
        <Button onClick={onDone} variant="outline" size="lg" className="flex-1">
          Done
        </Button>
      </div>
    </div>
  )
}
