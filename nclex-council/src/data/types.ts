export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'trap'; text: string }
  | { type: 'bedside'; text: string }
  | { type: 'howtested'; text: string }
  | { type: 'anchor'; text: string }

export type PathoSection = {
  heading: string
  blocks: ContentBlock[]
}

export type GlossaryTerm = {
  term: string
  definition: string
}

export type RecallCheckItem = {
  question: string
  answer: string
}

export type TeachBack = {
  prompt: string
  points: string[]
}

export type QuizChoice = {
  id: string
  text: string
  correct: boolean
  rationale: string
}

export type Difficulty = 'easy' | 'medium' | 'hard'

export type QuizQuestion = {
  id: string
  stem: string
  type: 'single' | 'sata'
  difficulty: Difficulty
  choices: QuizChoice[]
  outsider?: boolean
  ngnNote?: string
}

export type Module = {
  id: string
  title: string
  system: string
  hook: string
  pathoChain: PathoSection[]
  icuPearls: string[]
  outsiderFlag: string
  glossary: GlossaryTerm[]
  recallChecks: RecallCheckItem[]
  teachBack: TeachBack
  quiz: QuizQuestion[]
  chairman: {
    cannotMiss: string
    ngnTakeaway: string
  }
  sources: string[]
}
