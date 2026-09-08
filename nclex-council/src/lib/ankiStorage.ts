import { newCardState, type CardState } from './spacedRepetition'

type DeckState = Record<string, CardState>

function storageKey(moduleId: string) {
  return `nclex-council:anki:${moduleId}`
}

export function loadDeckState(moduleId: string, cardIds: string[]): DeckState {
  let stored: DeckState = {}
  try {
    const raw = localStorage.getItem(storageKey(moduleId))
    stored = raw ? (JSON.parse(raw) as DeckState) : {}
  } catch {
    stored = {}
  }
  const state: DeckState = {}
  for (const id of cardIds) {
    state[id] = stored[id] ?? newCardState()
  }
  return state
}

export function saveCardState(moduleId: string, cardId: string, state: CardState) {
  try {
    const raw = localStorage.getItem(storageKey(moduleId))
    const stored: DeckState = raw ? (JSON.parse(raw) as DeckState) : {}
    stored[cardId] = state
    localStorage.setItem(storageKey(moduleId), JSON.stringify(stored))
  } catch {
    // localStorage unavailable — scheduling just won't persist across reloads
  }
}
