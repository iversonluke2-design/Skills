import type { Module } from '../data/types'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

type Props = {
  module: Module
  score: number
  total: number
  onRetake: () => void
  onBackToTopics: () => void
}

export function ChairmanClose({ module: m, score, total, onRetake, onBackToTopics }: Props) {
  const pct = Math.round((score / total) * 100)

  return (
    <div className="max-w-2xl mx-auto text-center">
      <p className="text-xs uppercase tracking-wide text-primary font-semibold">{m.title}</p>
      <h1 className="text-3xl font-bold text-foreground mt-2">
        {score}/{total} <span className="text-muted-foreground text-xl font-normal">({pct}%)</span>
      </h1>

      <Card className="mt-8 border-primary/40 bg-primary/5 text-left">
        <CardHeader>
          <CardTitle className="text-primary">The chairman's close</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground leading-relaxed">
            <span className="font-semibold">Cannot miss: </span>
            {m.chairman.cannotMiss}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mt-3">
            <span className="font-semibold text-foreground">NGN takeaway: </span>
            {m.chairman.ngnTakeaway}
          </p>
        </CardContent>
      </Card>

      <div className="mt-6 flex gap-3">
        <Button onClick={onRetake} size="lg" className="flex-1">
          Retake quiz
        </Button>
        <Button onClick={onBackToTopics} variant="outline" size="lg" className="flex-1">
          Back to topics
        </Button>
      </div>
    </div>
  )
}
