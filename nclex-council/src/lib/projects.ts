import { builtInProjects } from '../data/projects'
import type { Project } from '../data/types'

const STORAGE_KEY = 'nclex-council:user-projects:v1'

type StoredProject = {
  id: string
  name: string
  description: string
}

function readUserProjects(): StoredProject[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as StoredProject[]) : []
  } catch {
    return []
  }
}

function writeUserProjects(projects: StoredProject[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  } catch {
    // localStorage unavailable — new project just won't persist across reloads
  }
}

export function getAllProjects(): Project[] {
  const userProjects: Project[] = readUserProjects().map((p) => ({ ...p, modules: [] }))
  return [...builtInProjects, ...userProjects]
}

export function createProject(name: string, description: string): Project {
  const id = `project-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  const stored: StoredProject = { id, name, description }
  const existing = readUserProjects()
  writeUserProjects([...existing, stored])
  return { ...stored, modules: [] }
}
