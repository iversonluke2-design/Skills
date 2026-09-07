import type { Module } from '../data/types'
import type { ModuleProgress } from '../lib/progress'

type Props = {
  modules: Module[]
  progress: Record<string, ModuleProgress>
  onSelect: (moduleId: string) => void
}

export function TopicList({ modules, progress, onSelect }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {modules.map((m) => {
        const p = progress[m.id]
        const pct = p && p.bestTotal > 0 ? Math.round((p.bestScore / p.bestTotal) * 100) : null
        return (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            className="text-left rounded-xl border border-border bg-panel p-5 hover:border-accent/60 hover:bg-panel-2 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-accent font-semibold">{m.system}</p>
                <h3 className="text-lg font-semibold text-text mt-1">{m.title}</h3>
              </div>
              {pct !== null && (
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    pct >= 80
                      ? 'bg-accent-2/15 text-accent-2'
                      : pct >= 50
                        ? 'bg-warn/15 text-warn'
                        : 'bg-danger/15 text-danger'
                  }`}
                >
                  {pct}%
                </span>
              )}
            </div>
            <p className="text-sm text-text-dim mt-3 leading-relaxed">{m.hook}</p>
            {p ? (
              <p className="text-xs text-text-dim mt-3">
                {p.attempts} quiz attempt{p.attempts === 1 ? '' : 's'} · last {p.lastScore}/{p.lastTotal}
              </p>
            ) : (
              <p className="text-xs text-text-dim mt-3">Not studied yet</p>
            )}
          </button>
        )
      })}
    </div>
  )
}
