import type { Module } from '../data/types'

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
      <p className="text-xs uppercase tracking-wide text-accent font-semibold">{m.title}</p>
      <h1 className="text-3xl font-bold text-text mt-2">
        {score}/{total} <span className="text-text-dim text-xl font-normal">({pct}%)</span>
      </h1>

      <div className="mt-8 text-left rounded-xl border border-accent/40 bg-accent-bg p-6">
        <h2 className="font-semibold text-accent mb-2">The chairman's close</h2>
        <p className="text-sm text-text leading-relaxed">
          <span className="font-semibold">Cannot miss: </span>
          {m.chairman.cannotMiss}
        </p>
        <p className="text-sm text-text-dim leading-relaxed mt-3">
          <span className="font-semibold text-text">NGN takeaway: </span>
          {m.chairman.ngnTakeaway}
        </p>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={onRetake}
          className="flex-1 rounded-xl bg-accent text-[#04121a] font-semibold py-3 hover:opacity-90 transition-opacity"
        >
          Retake quiz
        </button>
        <button
          onClick={onBackToTopics}
          className="flex-1 rounded-xl bg-panel-2 border border-border text-text font-semibold py-3 hover:border-accent/60 transition-colors"
        >
          Back to topics
        </button>
      </div>
    </div>
  )
}
