import type { Module } from '../data/types'
import { Button } from './ui/button'

export function ModeHeader({ module, onBack }: { module: Module; onBack: () => void }) {
  return (
    <>
      <Button variant="link" onClick={onBack} className="mb-4 h-auto p-0 text-muted-foreground hover:text-primary">
        ← All topics
      </Button>
      <p className="text-xs uppercase tracking-wide text-primary font-semibold">{module.system}</p>
      <h1 className="text-2xl font-bold text-foreground mt-1">{module.title}</h1>
      <p className="text-muted-foreground mt-3 leading-relaxed italic">{module.hook}</p>
    </>
  )
}
