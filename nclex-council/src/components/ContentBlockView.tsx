import type { ContentBlock, GlossaryTerm } from '../data/types'
import { RichText } from './RichText'

export function ContentBlockView({ block, glossary }: { block: ContentBlock; glossary: GlossaryTerm[] }) {
  if (block.type === 'p') {
    return (
      <p className="text-sm text-muted-foreground leading-relaxed">
        <RichText text={block.text} glossary={glossary} />
      </p>
    )
  }

  if (block.type === 'trap') {
    return (
      <div className="rounded-r-lg border-l-4 border-danger bg-danger/10 py-2 pl-3 pr-3 text-sm">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-danger">NCLEX trap</p>
        <p className="leading-relaxed text-foreground">
          <RichText text={block.text} glossary={glossary} />
        </p>
      </div>
    )
  }

  if (block.type === 'bedside') {
    return (
      <div className="rounded-r-lg border-l-4 border-accent-2 bg-accent-2/10 py-2 pl-3 pr-3 text-sm">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-accent-2">Bedside</p>
        <p className="leading-relaxed text-foreground">
          <RichText text={block.text} glossary={glossary} />
        </p>
      </div>
    )
  }

  if (block.type === 'howtested') {
    return (
      <div className="rounded-r-lg border-l-4 border-dashed border-accent-2/70 bg-accent-2/5 py-2 pl-3 pr-3 text-sm">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-accent-2">How it's tested</p>
        <p className="leading-relaxed text-foreground">
          <RichText text={block.text} glossary={glossary} />
        </p>
      </div>
    )
  }

  // anchor / mnemonic
  return (
    <div className="rounded-r-lg border-l-4 border-warn bg-warn/10 py-2 pl-3 pr-3 text-sm italic">
      <p className="mb-1 text-[10px] font-bold not-italic uppercase tracking-wide text-warn">Mnemonic</p>
      <p className="leading-relaxed text-foreground">
        <RichText text={block.text} glossary={glossary} />
      </p>
    </div>
  )
}
