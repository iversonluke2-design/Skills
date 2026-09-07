import { useMemo, useState } from 'react'
import type { Difficulty, Module } from '../data/types'
import { buildPool, shuffle } from '../lib/quizPool'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export type QuizStartConfig = {
  title: string
  questions: ReturnType<typeof buildPool>
  mode: 'practice' | 'exam'
  secondsPerQuestion: number
}

type Props = {
  modules: Module[]
  onStart: (config: QuizStartConfig) => void
}

const DIFFICULTIES: Array<{ value: Difficulty | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
]

const COUNT_OPTIONS = [5, 10, 15]
const SECONDS_OPTIONS = [30, 60, 90]

function toggleButtonClass(active: boolean) {
  return active
    ? 'border-primary bg-primary/10 text-foreground'
    : 'border-border bg-secondary text-muted-foreground hover:border-primary/40'
}

export function QuizSetup({ modules, onStart }: Props) {
  const [moduleIds, setModuleIds] = useState<string[]>([])
  const [difficulty, setDifficulty] = useState<Difficulty | 'all'>('all')
  const [mode, setMode] = useState<'practice' | 'exam'>('practice')
  const [count, setCount] = useState(10)
  const [secondsPerQuestion, setSecondsPerQuestion] = useState(60)

  const pool = useMemo(() => buildPool(modules, { moduleIds, difficulty }), [modules, moduleIds, difficulty])
  const effectiveCount = Math.min(count, pool.length)

  function toggleModule(id: string) {
    setModuleIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  function start() {
    if (pool.length === 0) return
    const questions = shuffle(pool).slice(0, effectiveCount)
    const title = moduleIds.length === 0 ? 'Mixed review' : moduleIds.length === 1 ? pool[0]?.moduleTitle ?? 'Quiz' : 'Mixed review'
    onStart({ title, questions, mode, secondsPerQuestion })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-foreground mb-1">New quiz</h1>
      <p className="text-muted-foreground mb-6">Build a custom question set from any combination of topics.</p>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground uppercase tracking-wide">Topics</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <button
            onClick={() => setModuleIds([])}
            className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${toggleButtonClass(moduleIds.length === 0)}`}
          >
            All topics
          </button>
          {modules.map((m) => (
            <button
              key={m.id}
              onClick={() => toggleModule(m.id)}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${toggleButtonClass(moduleIds.includes(m.id))}`}
            >
              {m.title}
            </button>
          ))}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground uppercase tracking-wide">Difficulty</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {DIFFICULTIES.map((d) => (
            <button
              key={d.value}
              onClick={() => setDifficulty(d.value)}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${toggleButtonClass(difficulty === d.value)}`}
            >
              {d.label}
            </button>
          ))}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground uppercase tracking-wide">Style</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <button
            onClick={() => setMode('practice')}
            className={`rounded-lg border px-4 py-2.5 text-left text-sm transition-colors ${toggleButtonClass(mode === 'practice')}`}
          >
            <span className="block font-medium text-foreground">Practice</span>
            <span className="block text-xs text-muted-foreground">Show answer + rationale after each question</span>
          </button>
          <button
            onClick={() => setMode('exam')}
            className={`rounded-lg border px-4 py-2.5 text-left text-sm transition-colors ${toggleButtonClass(mode === 'exam')}`}
          >
            <span className="block font-medium text-foreground">Timed exam</span>
            <span className="block text-xs text-muted-foreground">Countdown per question, grade + review at the end</span>
          </button>
        </CardContent>
      </Card>

      {mode === 'exam' && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground uppercase tracking-wide">Seconds per question</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {SECONDS_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setSecondsPerQuestion(s)}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${toggleButtonClass(secondsPerQuestion === s)}`}
              >
                {s}s
              </button>
            ))}
          </CardContent>
        </Card>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground uppercase tracking-wide">Number of questions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-2">
          {COUNT_OPTIONS.map((c) => (
            <button
              key={c}
              onClick={() => setCount(c)}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${toggleButtonClass(count === c)}`}
            >
              {c}
            </button>
          ))}
          <span className="text-xs text-muted-foreground ml-2">
            {pool.length} question{pool.length === 1 ? '' : 's'} match this filter — using {effectiveCount}
          </span>
        </CardContent>
      </Card>

      <Button onClick={start} disabled={pool.length === 0} size="lg" className="w-full">
        {pool.length === 0 ? 'No questions match these filters' : `Start ${mode === 'exam' ? 'exam' : 'practice'} (${effectiveCount} questions)`}
      </Button>
    </div>
  )
}
