import type { Module } from '../data/types'
import { Button } from './ui/button'

type Props = {
  module: Module
  onStartQuiz: () => void
  onBack: () => void
}

export function ModuleStudy({ module: m, onStartQuiz, onBack }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <Button variant="link" onClick={onBack} className="mb-4 h-auto p-0 text-muted-foreground hover:text-primary">
        ← All topics
      </Button>

      <p className="text-xs uppercase tracking-wide text-primary font-semibold">{m.system}</p>
      <h1 className="text-2xl font-bold text-foreground mt-1">{m.title}</h1>
      <p className="text-muted-foreground mt-3 leading-relaxed italic">{m.hook}</p>

      <div className="mt-8 space-y-6">
        {m.pathoChain.map((section, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-semibold text-foreground mb-2">{section.heading}</h2>
            <div className="space-y-3">
              {section.body.map((p, j) => (
                <p key={j} className="text-sm text-muted-foreground leading-relaxed">
                  {p}
                </p>
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
              {pearl}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-xl border border-outsider/40 bg-outsider/10 p-5">
        <h2 className="font-semibold text-outsider mb-2">Don't miss this</h2>
        <p className="text-sm text-foreground leading-relaxed">{m.outsiderFlag}</p>
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

      <Button onClick={onStartQuiz} size="lg" className="mt-8 w-full">
        Start quiz ({m.quiz.length} questions)
      </Button>
    </div>
  )
}
