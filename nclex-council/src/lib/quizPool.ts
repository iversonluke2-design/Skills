import type { Difficulty, Module, QuizQuestion } from '../data/types'

export type PooledQuestion = QuizQuestion & {
  moduleId: string
  moduleTitle: string
}

export type PoolFilter = {
  moduleIds: string[] // empty = all modules
  difficulty: Difficulty | 'all'
}

export function buildPool(modules: Module[], filter: PoolFilter): PooledQuestion[] {
  const modulePool = filter.moduleIds.length > 0 ? modules.filter((m) => filter.moduleIds.includes(m.id)) : modules

  const all: PooledQuestion[] = modulePool.flatMap((m) =>
    m.quiz.map((q) => ({ ...q, moduleId: m.id, moduleTitle: m.title })),
  )

  return filter.difficulty === 'all' ? all : all.filter((q) => q.difficulty === filter.difficulty)
}

export function shuffle<T>(items: T[]): T[] {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export type AnswerDetail = {
  question: QuizQuestion
  selected: string[]
  correct: boolean
}

export function isCorrect(q: QuizQuestion, selected: Set<string>): boolean {
  const correctIds = new Set(q.choices.filter((c) => c.correct).map((c) => c.id))
  if (correctIds.size !== selected.size) return false
  for (const id of correctIds) {
    if (!selected.has(id)) return false
  }
  return true
}
