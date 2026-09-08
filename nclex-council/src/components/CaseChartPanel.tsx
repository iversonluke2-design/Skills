import { useState } from 'react'
import type { ChartTab } from '../data/types'

export function CaseChartPanel({ tabs }: { tabs: ChartTab[] }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id)
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0]

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex flex-wrap border-b border-border bg-secondary/60">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveId(t.id)}
            className={`flex-1 min-w-[80px] border-r border-border px-2 py-2 text-center text-[11px] font-bold uppercase tracking-wide last:border-r-0 ${
              active?.id === t.id ? 'bg-card text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="max-h-96 overflow-y-auto p-4">
        {active?.kind === 'vitals' && (
          <ul className="space-y-0">
            {active.items.map((v, i) => (
              <li
                key={i}
                className="flex items-center justify-between border-b border-dashed border-border py-2 text-sm last:border-b-0"
              >
                <span className="text-muted-foreground">{v.label}</span>
                <span className={`font-semibold ${v.flagged ? 'text-danger' : 'text-foreground'}`}>{v.value}</span>
              </li>
            ))}
          </ul>
        )}

        {active?.kind === 'labs' && (
          <table className="w-full text-sm">
            <tbody>
              {active.items.map((l, i) => (
                <tr key={i} className="border-b border-dashed border-border last:border-b-0">
                  <td className="py-2 pr-2 text-muted-foreground">{l.label}</td>
                  <td className={`py-2 text-right font-semibold ${l.flagged ? 'text-danger' : 'text-foreground'}`}>
                    {l.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {active?.kind === 'notes' && <p className="text-sm leading-relaxed text-foreground">{active.text}</p>}
      </div>
    </div>
  )
}
