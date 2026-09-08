import { useState } from 'react'
import type { CaseStudy, Module } from '../data/types'
import { CaseChartPanel } from './CaseChartPanel'
import { CaseQuestionCard } from './CaseQuestionCard'
import { Button } from './ui/button'

type Props = {
  module: Module
  caseStudy: CaseStudy
  onExit: () => void
}

export function CaseStudyView({ module: m, caseStudy, onExit }: Props) {
  const [index, setIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [done, setDone] = useState(false)

  const total = caseStudy.questions.length
  const question = caseStudy.questions[index]

  function handleNext(correct: boolean) {
    const nextCorrect = correctCount + (correct ? 1 : 0)
    if (index + 1 >= total) {
      setCorrectCount(nextCorrect)
      setDone(true)
    } else {
      setCorrectCount(nextCorrect)
      setIndex((i) => i + 1)
    }
  }

  if (done) {
    const pct = Math.round((correctCount / total) * 100)
    return (
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-outsider">{m.title} · NGN case study</p>
        <h1 className="mt-2 text-3xl font-bold text-foreground">
          {correctCount}/{total} <span className="text-xl font-normal text-muted-foreground">({pct}%)</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Case complete.</p>
        <Button onClick={onExit} size="lg" className="mt-6 w-full">
          Back to topic
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-4 flex items-center justify-between">
        <Button variant="link" onClick={onExit} className="h-auto p-0 text-muted-foreground hover:text-primary">
          ← Exit case
        </Button>
        <span className="text-sm text-muted-foreground">
          {m.title} · Question {index + 1} of {total}
        </span>
      </div>

      <div className="mb-4 rounded-xl border border-outsider/30 bg-outsider/5 p-4">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-outsider">Scenario</p>
        <p className="text-sm leading-relaxed text-foreground">{caseStudy.scenario}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <CaseChartPanel tabs={caseStudy.chart} />
        <CaseQuestionCard key={question.id} question={question} isLast={index + 1 >= total} onNext={handleNext} />
      </div>
    </div>
  )
}
