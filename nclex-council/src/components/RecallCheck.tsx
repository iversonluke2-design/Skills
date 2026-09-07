import { useState } from 'react'
import type { RecallCheckItem } from '../data/types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

function RecallItem({ item }: { item: RecallCheckItem }) {
  const [revealed, setRevealed] = useState(false)
  return (
    <div className="border-b border-border py-3 last:border-b-0">
      <p className="text-sm text-foreground">{item.question}</p>
      <button
        onClick={() => setRevealed((r) => !r)}
        className="mt-1 text-xs font-semibold text-primary hover:underline"
      >
        {revealed ? 'Hide answer' : 'Reveal answer'}
      </button>
      {revealed && (
        <p className="mt-2 border-l-2 border-accent-2 pl-3 text-sm leading-relaxed text-accent-2">{item.answer}</p>
      )}
    </div>
  )
}

export function RecallCheck({ items }: { items: RecallCheckItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">Recall check</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {items.map((item, i) => (
          <RecallItem key={i} item={item} />
        ))}
      </CardContent>
    </Card>
  )
}
