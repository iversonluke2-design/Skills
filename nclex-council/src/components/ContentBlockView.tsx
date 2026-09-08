import type { ContentBlock, GlossaryTerm } from '../data/types'
import { RichText } from './RichText'

const LABELS: Record<Exclude<ContentBlock['type'], 'p'>, { text: string; color: string }> = {
  trap: { text: 'Trap', color: 'text-danger' },
  bedside: { text: 'Bedside', color: 'text-accent-2' },
  howtested: { text: "How it's tested", color: 'text-primary' },
  anchor: { text: 'Mnemonic', color: 'text-warn' },
}

export function ContentBlockView({ block, glossary }: { block: ContentBlock; glossary: GlossaryTerm[] }) {
  if (block.type === 'p') {
    return (
      <p className="text-[15px] leading-7 text-foreground">
        <RichText text={block.text} glossary={glossary} />
      </p>
    )
  }

  const { text: label, color } = LABELS[block.type]
  const italic = block.type === 'anchor'

  return (
    <p className={`text-[15px] leading-7 text-foreground ${italic ? 'italic' : ''}`}>
      <span className={`mr-2 rounded px-1.5 py-0.5 align-middle text-[10px] font-bold not-italic uppercase tracking-wide ${color} bg-current/10`}>
        {label}
      </span>
      <RichText text={block.text} glossary={glossary} />
    </p>
  )
}
