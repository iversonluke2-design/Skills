export type PathoSection = {
  heading: string
  body: string[]
}

export type QuizChoice = {
  id: string
  text: string
  correct: boolean
  rationale: string
}

export type QuizQuestion = {
  id: string
  stem: string
  type: 'single' | 'sata'
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
  quiz: QuizQuestion[]
  chairman: {
    cannotMiss: string
    ngnTakeaway: string
  }
  sources: string[]
}
