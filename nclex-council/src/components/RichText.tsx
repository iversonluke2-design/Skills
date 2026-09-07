import { useEffect, useRef, useState } from 'react'
import type { GlossaryTerm } from '../data/types'

type Segment = { text: string; term?: GlossaryTerm }

function splitOnGlossary(text: string, glossary: GlossaryTerm[]): Segment[] {
  if (glossary.length === 0) return [{ text }]

  const sorted = [...glossary].sort((a, b) => b.term.length - a.term.length)
  const pattern = sorted.map((g) => g.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
  const re = new RegExp(`\\b(${pattern})\\b`, 'gi')

  const segments: Segment[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) segments.push({ text: text.slice(lastIndex, match.index) })
    const found = sorted.find((g) => g.term.toLowerCase() === match![0].toLowerCase())
    segments.push({ text: match[0], term: found })
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) segments.push({ text: text.slice(lastIndex) })
  return segments
}

function GlossaryWord({ text, term }: { text: string; term: GlossaryTerm }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open])

  return (
    <span ref={ref} className="relative inline-block">
      <span
        onClick={() => setOpen((o) => !o)}
        className="cursor-pointer font-semibold text-warn underline decoration-dotted decoration-warn/70 underline-offset-2"
      >
        {text}
      </span>
      {open && (
        <span className="absolute left-0 top-full z-20 mt-1 block w-64 rounded-lg border border-warn/40 bg-popover p-3 text-xs font-normal leading-relaxed text-popover-foreground shadow-lg">
          <span className="mb-1 block font-semibold text-warn">{term.term}</span>
          {term.definition}
        </span>
      )}
    </span>
  )
}

export function RichText({ text, glossary }: { text: string; glossary: GlossaryTerm[] }) {
  const segments = splitOnGlossary(text, glossary)
  return (
    <>
      {segments.map((seg, i) =>
        seg.term ? <GlossaryWord key={i} text={seg.text} term={seg.term} /> : <span key={i}>{seg.text}</span>,
      )}
    </>
  )
}
