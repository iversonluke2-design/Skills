import type { Module } from '../data/types'
import { AnkiMode } from './AnkiMode'
import { ModeHeader } from './ModeHeader'

export function AnkiPage({ module, onBack }: { module: Module; onBack: () => void }) {
  return (
    <div className="max-w-2xl mx-auto">
      <ModeHeader module={module} onBack={onBack} />
      <div className="mt-8">
        <AnkiMode module={module} />
      </div>
    </div>
  )
}
