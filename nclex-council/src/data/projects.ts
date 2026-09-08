import { modules } from './modules'
import type { Project } from './types'

export const builtInProjects: Project[] = [
  {
    id: 'icu-critical-care',
    name: 'ICU Critical Care',
    description: 'NCLEX-NGN prep for ICU/critical-care topics',
    modules,
  },
]
