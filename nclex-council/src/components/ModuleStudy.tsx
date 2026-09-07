import type { Module } from '../data/types'

type Props = {
  module: Module
  onStartQuiz: () => void
  onBack: () => void
}

export function ModuleStudy({ module: m, onStartQuiz, onBack }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <button onClick={onBack} className="text-sm text-text-dim hover:text-accent mb-4">
        ← All topics
      </button>

      <p className="text-xs uppercase tracking-wide text-accent font-semibold">{m.system}</p>
      <h1 className="text-2xl font-bold text-text mt-1">{m.title}</h1>
      <p className="text-text-dim mt-3 leading-relaxed italic">{m.hook}</p>

      <div className="mt-8 space-y-6">
        {m.pathoChain.map((section, i) => (
          <div key={i} className="rounded-xl border border-border bg-panel p-5">
            <h2 className="font-semibold text-text mb-2">{section.heading}</h2>
            <div className="space-y-3">
              {section.body.map((p, j) => (
                <p key={j} className="text-sm text-text-dim leading-relaxed">
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
            <li key={i} className="text-sm text-text-dim leading-relaxed">
              {pearl}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-xl border border-outsider/40 bg-outsider/10 p-5">
        <h2 className="font-semibold text-outsider mb-2">Don't miss this</h2>
        <p className="text-sm text-text leading-relaxed">{m.outsiderFlag}</p>
      </div>

      <div className="mt-6 rounded-lg border border-border bg-panel/50 p-4">
        <h3 className="text-xs uppercase tracking-wide text-text-dim font-semibold mb-2">Sources</h3>
        <ul className="space-y-1">
          {m.sources.map((s, i) => (
            <li key={i} className="text-xs text-text-dim">
              {s}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onStartQuiz}
        className="mt-8 w-full rounded-xl bg-accent text-[#04121a] font-semibold py-3 hover:opacity-90 transition-opacity"
      >
        Start quiz ({m.quiz.length} questions)
      </button>
    </div>
  )
}
