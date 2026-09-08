export type Grade = 'again' | 'hard' | 'good' | 'easy'

export type CardState = {
  interval: number // days until next due
  repetition: number // consecutive successful reviews
  easeFactor: number
  dueAt: number // epoch ms
}

const GRADE_QUALITY: Record<Grade, number> = {
  again: 1,
  hard: 3,
  good: 4,
  easy: 5,
}

export function newCardState(): CardState {
  return { interval: 0, repetition: 0, easeFactor: 2.5, dueAt: Date.now() }
}

// Classic SM-2. quality < 3 resets the learning progress; quality >= 3 grows the interval.
export function schedule(state: CardState, grade: Grade): CardState {
  const quality = GRADE_QUALITY[grade]
  let { repetition, easeFactor } = state
  let interval: number

  if (quality < 3) {
    repetition = 0
    interval = grade === 'again' ? 0 : 1
  } else {
    if (repetition === 0) interval = 1
    else if (repetition === 1) interval = 6
    else interval = Math.round(state.interval * easeFactor)
    repetition += 1
  }

  easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))

  const dueAt = grade === 'again' ? Date.now() : Date.now() + interval * 24 * 60 * 60 * 1000

  return { interval, repetition, easeFactor, dueAt }
}

export function previewInterval(state: CardState, grade: Grade): string {
  const next = schedule(state, grade)
  if (grade === 'again') return '<1m'
  if (next.interval < 1) return '<1d'
  if (next.interval === 1) return '1d'
  if (next.interval < 30) return `${next.interval}d`
  if (next.interval < 365) return `${Math.round(next.interval / 30)}mo`
  return `${(next.interval / 365).toFixed(1)}y`
}

export function bucket(state: CardState): 'new' | 'learn' | 'due' {
  if (state.repetition === 0 && state.interval === 0) return 'new'
  if (state.repetition < 2) return 'learn'
  return 'due'
}

export function isDue(state: CardState): boolean {
  return state.dueAt <= Date.now()
}
