import { useState } from 'react'
import type { TeachBack as TeachBackType } from '../data/types'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export function TeachBack({ teachBack }: { teachBack: TeachBackType }) {
  const [revealed, setRevealed] = useState(false)

  return (
    <Card className="border-outsider/30 bg-outsider/5">
      <CardHeader>
        <CardTitle className="text-sm uppercase tracking-wide text-outsider">Teach it back</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-foreground leading-relaxed">{teachBack.prompt}</p>
        {!revealed ? (
          <Button variant="outline" size="sm" onClick={() => setRevealed(true)}>
            Reveal what a strong explanation covers
          </Button>
        ) : (
          <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
            {teachBack.points.map((point, i) => (
              <li key={i} className="leading-relaxed">
                {point}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
