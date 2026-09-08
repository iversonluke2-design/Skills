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

export type WriteAlongItem = {
  prompt: string
  answer: string
  hint: string
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

export type VitalSign = {
  label: string
  value: string
  flagged?: boolean
}

export type LabValue = {
  label: string
  value: string
  flagged?: boolean
}

export type ChartTab =
  | { id: string; label: string; kind: 'vitals'; items: VitalSign[] }
  | { id: string; label: string; kind: 'labs'; items: LabValue[] }
  | { id: string; label: string; kind: 'notes'; text: string }

export type MatrixOption = {
  id: string
  label: string
}

export type MatrixRow = {
  id: string
  label: string
  correctOptionId: string
  rationale: string
}

export type MatrixQuestion = {
  id: string
  type: 'matrix'
  stem: string
  options: MatrixOption[]
  rows: MatrixRow[]
}

export type ClozeBlank = {
  id: string
  choices: string[]
  correct: string
}

export type ClozeQuestion = {
  id: string
  type: 'cloze'
  template: string
  blanks: ClozeBlank[]
  rationale: string
}

export type CaseQuestion = QuizQuestion | MatrixQuestion | ClozeQuestion

export type CaseStudy = {
  scenario: string
  chart: ChartTab[]
  questions: CaseQuestion[]
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
  writeAlong: WriteAlongItem[]
  caseStudy: CaseStudy
  quiz: QuizQuestion[]
  chairman: {
    cannotMiss: string
    ngnTakeaway: string
  }
  sources: string[]
}

export type Project = {
  id: string
  name: string
  description: string
  modules: Module[]
}

export type StudyMode = 'study-guide' | 'quiz' | 'exam' | 'flashcards' | 'anki' | 'council'
