import type { Module } from '../data/types'
import { FlashcardsMode } from './FlashcardsMode'
import { ModeHeader } from './ModeHeader'

export function FlashcardsPage({ module, onBack }: { module: Module; onBack: () => void }) {
  return (
    <div className="max-w-2xl mx-auto">
      <ModeHeader module={module} onBack={onBack} />
      <div className="mt-8">
        <FlashcardsMode module={module} />
      </div>
    </div>
  )
}
