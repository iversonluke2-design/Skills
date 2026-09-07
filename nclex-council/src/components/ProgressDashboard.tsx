import type { Module } from '../data/types'
import type { ModuleProgress } from '../lib/progress'

type Props = {
  modules: Module[]
  progress: Record<string, ModuleProgress>
}

export function ProgressDashboard({ modules, progress }: Props) {
  const attempted = modules.filter((m) => progress[m.id]?.attempts)
  const totalAttempts = attempted.reduce((sum, m) => sum + (progress[m.id]?.attempts ?? 0), 0)
  const avgBestPct =
    attempted.length > 0
      ? Math.round(
          attempted.reduce((sum, m) => {
            const p = progress[m.id]
            return sum + (p && p.bestTotal > 0 ? (p.bestScore / p.bestTotal) * 100 : 0)
          }, 0) / attempted.length,
        )
      : null

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-text mb-6">Your progress</h1>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="rounded-xl border border-border bg-panel p-4 text-center">
          <p className="text-2xl font-bold text-accent">{attempted.length}</p>
          <p className="text-xs text-text-dim mt-1">
            of {modules.length} topics quizzed
          </p>
        </div>
        <div className="rounded-xl border border-border bg-panel p-4 text-center">
          <p className="text-2xl font-bold text-accent">{totalAttempts}</p>
          <p className="text-xs text-text-dim mt-1">total quiz attempts</p>
        </div>
        <div className="rounded-xl border border-border bg-panel p-4 text-center">
          <p className="text-2xl font-bold text-accent">{avgBestPct !== null ? `${avgBestPct}%` : '—'}</p>
          <p className="text-xs text-text-dim mt-1">avg best score</p>
        </div>
      </div>

      <div className="space-y-2">
        {modules.map((m) => {
          const p = progress[m.id]
          const bestPct = p && p.bestTotal > 0 ? Math.round((p.bestScore / p.bestTotal) * 100) : null
          return (
            <div
              key={m.id}
              className="flex items-center justify-between rounded-lg border border-border bg-panel px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-text">{m.title}</p>
                <p className="text-xs text-text-dim">
                  {p ? `${p.attempts} attempt${p.attempts === 1 ? '' : 's'}` : 'Not studied yet'}
                </p>
              </div>
              {bestPct !== null && (
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    bestPct >= 80
                      ? 'bg-accent-2/15 text-accent-2'
                      : bestPct >= 50
                        ? 'bg-warn/15 text-warn'
                        : 'bg-danger/15 text-danger'
                  }`}
                >
                  best {bestPct}%
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
