import type { Module } from '../data/types'

export type Card = { front: string; back: string }

export function buildDeck(module: Module): Card[] {
  const fromGlossary = module.glossary.map((g) => ({ front: g.term, back: g.definition }))
  const fromRecall = module.recallChecks.map((r) => ({ front: r.question, back: r.answer }))
  return [...fromGlossary, ...fromRecall]
}
