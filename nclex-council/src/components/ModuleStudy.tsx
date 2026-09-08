import { useState } from 'react'
import type { Module } from '../data/types'
import { FlashcardsMode } from './FlashcardsMode'
import { ModeHeader } from './ModeHeader'
import { RandomRecallMode } from './RandomRecallMode'
import { RecallCheck } from './RecallCheck'
import { StudyGuideContent } from './StudyGuide'
import { Button } from './ui/button'
import { WriteAlongMode } from './WriteAlongMode'

type Mode = 'read' | 'flashcards' | 'recall' | 'random' | 'write-along'

const MODES: Array<{ value: Mode; label: string }> = [
  { value: 'read', label: 'Read' },
  { value: 'flashcards', label: 'Flashcards' },
  { value: 'recall', label: 'Recall check' },
  { value: 'random', label: 'Random recall' },
  { value: 'write-along', label: 'Write-along' },
]

type Props = {
  module: Module
  onStartQuiz: () => void
  onStartCase: () => void
  onBack: () => void
}

export function ModuleStudy({ module: m, onStartQuiz, onStartCase, onBack }: Props) {
  const [mode, setMode] = useState<Mode>('read')

  return (
    <div className="max-w-2xl mx-auto">
      <ModeHeader module={m} onBack={onBack} />

      <div className="mt-6 flex flex-wrap gap-2 border-b border-border pb-4">
        {MODES.map((mo) => (
          <button
            key={mo.value}
            onClick={() => setMode(mo.value)}
            className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
              mode === mo.value
                ? 'border-primary bg-primary/10 text-foreground'
                : 'border-border bg-secondary text-muted-foreground hover:border-primary/40'
            }`}
          >
            {mo.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {mode === 'read' && <StudyGuideContent module={m} />}
        {mode === 'flashcards' && <FlashcardsMode module={m} />}
        {mode === 'recall' && <RecallCheck items={m.recallChecks} />}
        {mode === 'random' && <RandomRecallMode module={m} />}
        {mode === 'write-along' && <WriteAlongMode items={m.writeAlong} />}
      </div>

      <div className="mt-8 space-y-3">
        <Button onClick={onStartCase} variant="outline" size="lg" className="w-full border-outsider/40 text-outsider hover:bg-outsider/10">
          NGN case study (split-panel chart + exam questions)
        </Button>
        <Button onClick={onStartQuiz} size="lg" className="w-full">
          Start quiz ({m.quiz.length} questions)
        </Button>
      </div>
    </div>
  )
}
