import type { Module } from '../data/types'
import { ContentBlockView } from './ContentBlockView'
import { ModeHeader } from './ModeHeader'
import { RichText } from './RichText'
import { TeachBack } from './TeachBack'

export function StudyGuideContent({ module: m }: { module: Module }) {
  return (
    <>
      <div className="space-y-6">
        {m.pathoChain.map((section, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-semibold text-foreground mb-3">{section.heading}</h2>
            <div className="space-y-3">
              {section.blocks.map((block, j) => (
                <ContentBlockView key={j} block={block} glossary={m.glossary} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-accent-2/30 bg-accent-2/5 p-5">
        <h2 className="font-semibold text-accent-2 mb-3">ICU depth &amp; complications</h2>
        <ul className="space-y-2 list-disc list-inside">
          {m.icuPearls.map((pearl, i) => (
            <li key={i} className="text-sm text-muted-foreground leading-relaxed">
              <RichText text={pearl} glossary={m.glossary} />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-xl border border-outsider/40 bg-outsider/10 p-5">
        <h2 className="font-semibold text-outsider mb-2">Don't miss this</h2>
        <p className="text-sm text-foreground leading-relaxed">
          <RichText text={m.outsiderFlag} glossary={m.glossary} />
        </p>
      </div>

      <div className="mt-6">
        <TeachBack teachBack={m.teachBack} />
      </div>

      <div className="mt-6 rounded-lg border border-border bg-card/50 p-4">
        <h3 className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-2">Sources</h3>
        <ul className="space-y-1">
          {m.sources.map((s, i) => (
            <li key={i} className="text-xs text-muted-foreground">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

type PageProps = {
  module: Module
  onBack: () => void
}

export function StudyGuidePage({ module: m, onBack }: PageProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <ModeHeader module={m} onBack={onBack} />
      <div className="mt-8">
        <StudyGuideContent module={m} />
      </div>
    </div>
  )
}
