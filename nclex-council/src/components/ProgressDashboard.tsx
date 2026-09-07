import type { Module } from '../data/types'
import type { ModuleProgress } from '../lib/progress'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'

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
      <h1 className="text-2xl font-bold text-foreground mb-6">Your progress</h1>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <Card className="p-4 text-center gap-1">
          <p className="text-2xl font-bold text-primary">{attempted.length}</p>
          <p className="text-xs text-muted-foreground mt-1">of {modules.length} topics quizzed</p>
        </Card>
        <Card className="p-4 text-center gap-1">
          <p className="text-2xl font-bold text-primary">{totalAttempts}</p>
          <p className="text-xs text-muted-foreground mt-1">total quiz attempts</p>
        </Card>
        <Card className="p-4 text-center gap-1">
          <p className="text-2xl font-bold text-primary">{avgBestPct !== null ? `${avgBestPct}%` : '—'}</p>
          <p className="text-xs text-muted-foreground mt-1">avg best score</p>
        </Card>
      </div>

      <div className="space-y-2">
        {modules.map((m) => {
          const p = progress[m.id]
          const bestPct = p && p.bestTotal > 0 ? Math.round((p.bestScore / p.bestTotal) * 100) : null
          return (
            <Card key={m.id} className="flex-row items-center justify-between px-4 py-3">
              <CardContent className="p-0">
                <p className="text-sm font-medium text-foreground">{m.title}</p>
                <p className="text-xs text-muted-foreground">
                  {p ? `${p.attempts} attempt${p.attempts === 1 ? '' : 's'}` : 'Not studied yet'}
                </p>
              </CardContent>
              {bestPct !== null && (
                <Badge
                  variant="outline"
                  className={
                    bestPct >= 80
                      ? 'border-accent-2/40 text-accent-2'
                      : bestPct >= 50
                        ? 'border-warn/40 text-warn'
                        : 'border-danger/40 text-danger'
                  }
                >
                  best {bestPct}%
                </Badge>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
