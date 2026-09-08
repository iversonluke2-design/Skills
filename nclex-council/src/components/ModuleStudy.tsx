import { useState } from 'react'
import type { Module } from '../data/types'
import { ContentBlockView } from './ContentBlockView'
import { FlashcardsMode } from './FlashcardsMode'
import { RandomRecallMode } from './RandomRecallMode'
import { RecallCheck } from './RecallCheck'
import { RichText } from './RichText'
import { TeachBack } from './TeachBack'
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

function ReadMode({ module: m }: { module: Module }) {
  return (
    <>
      <div className="space-y-6">
        {m.pathoChain.map((section, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-semibold text-foreground mb-3">{section.heading}</h2>
            <div className="space-y-3">
              {section.blocks.map((block, j) => (
                <ContentBlockView key={j} block={block} glossary={m.glossary} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-accent-2/30 bg-accent-2/5 p-5">
        <h2 className="font-semibold text-accent-2 mb-3">ICU depth &amp; complications</h2>
        <ul className="space-y-2 list-disc list-inside">
          {m.icuPearls.map((pearl, i) => (
            <li key={i} className="text-sm text-muted-foreground leading-relaxed">
              <RichText text={pearl} glossary={m.glossary} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-xl border border-outsider/40 bg-outsider/10 p-5">
        <h2 className="font-semibold text-outsider mb-2">Don't miss this</h2>
        <p className="text-sm text-foreground leading-relaxed">
          <RichText text={m.outsiderFlag} glossary={m.glossary} />
        </p>
      </div>

      <div className="mt-6">
        <TeachBack teachBack={m.teachBack} />
      </div>

      <div className="mt-6 rounded-lg border border-border bg-card/50 p-4">
        <h3 className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-2">Sources</h3>
        <ul className="space-y-1">
          {m.sources.map((s, i) => (
            <li key={i} className="text-xs text-muted-foreground">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export function ModuleStudy({ module: m, onStartQuiz, onStartCase, onBack }: Props) {
  const [mode, setMode] = useState<Mode>('read')

  return (
    <div className="max-w-2xl mx-auto">
      <Button variant="link" onClick={onBack} className="mb-4 h-auto p-0 text-muted-foreground hover:text-primary">
        ← All topics
      </Button>

      <p className="text-xs uppercase tracking-wide text-primary font-semibold">{m.system}</p>
      <h1 className="text-2xl font-bold text-foreground mt-1">{m.title}</h1>
      <p className="text-muted-foreground mt-3 leading-relaxed italic">{m.hook}</p>

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
        {mode === 'read' && <ReadMode module={m} />}
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
