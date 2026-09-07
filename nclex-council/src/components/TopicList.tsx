import type { Module } from '../data/types'
import type { ModuleProgress } from '../lib/progress'
import { Badge } from './ui/badge'
import { Card, CardContent, CardHeader } from './ui/card'

type Props = {
  modules: Module[]
  progress: Record<string, ModuleProgress>
  onSelect: (moduleId: string) => void
}

export function TopicList({ modules, progress, onSelect }: Props) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Welcome back.</h1>
        <p className="mt-1 text-muted-foreground">Pick a topic to study, or jump into a quiz.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {modules.map((m) => {
          const p = progress[m.id]
          const pct = p && p.bestTotal > 0 ? Math.round((p.bestScore / p.bestTotal) * 100) : null
          return (
            <Card
              key={m.id}
              onClick={() => onSelect(m.id)}
              className="cursor-pointer border-border bg-card transition-colors hover:border-primary/60 hover:bg-secondary/60"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">{m.system}</p>
                  {pct !== null && (
                    <Badge
                      variant="outline"
                      className={
                        pct >= 80
                          ? 'border-accent-2/40 text-accent-2'
                          : pct >= 50
                            ? 'border-warn/40 text-warn'
                            : 'border-danger/40 text-danger'
                      }
                    >
                      {pct}%
                    </Badge>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{m.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{m.hook}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {p ? `${p.attempts} quiz attempt${p.attempts === 1 ? '' : 's'} · last ${p.lastScore}/${p.lastTotal}` : 'Not studied yet'}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
