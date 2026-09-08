import { builtInProjects } from '../data/projects'
import type { Module, Project } from '../data/types'

const USER_PROJECTS_KEY = 'nclex-council:user-projects:v1'
const PROJECT_OVERRIDES_KEY = 'nclex-council:project-overrides:v1'
const USER_MODULES_KEY = 'nclex-council:user-modules:v1'
const MODULE_OVERRIDES_KEY = 'nclex-council:module-overrides:v1'

type StoredProject = {
  id: string
  name: string
  description: string
}

type ProjectOverride = {
  name?: string
  description?: string
  deleted?: boolean
}

type ModuleOverride = {
  title?: string
  deleted?: boolean
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage unavailable — change just won't persist across reloads
  }
}

const readUserProjects = () => readJson<StoredProject[]>(USER_PROJECTS_KEY, [])
const writeUserProjects = (v: StoredProject[]) => writeJson(USER_PROJECTS_KEY, v)

const readProjectOverrides = () => readJson<Record<string, ProjectOverride>>(PROJECT_OVERRIDES_KEY, {})
const writeProjectOverrides = (v: Record<string, ProjectOverride>) => writeJson(PROJECT_OVERRIDES_KEY, v)

const readUserModules = () => readJson<Record<string, Module[]>>(USER_MODULES_KEY, {})
const writeUserModules = (v: Record<string, Module[]>) => writeJson(USER_MODULES_KEY, v)

const readModuleOverrides = () => readJson<Record<string, ModuleOverride>>(MODULE_OVERRIDES_KEY, {})
const writeModuleOverrides = (v: Record<string, ModuleOverride>) => writeJson(MODULE_OVERRIDES_KEY, v)

function mergeModules(projectId: string, seedModules: Module[]): Module[] {
  const overrides = readModuleOverrides()
  const userModules = readUserModules()[projectId] ?? []
  return [...seedModules, ...userModules]
    .filter((m) => !overrides[m.id]?.deleted)
    .map((m) => (overrides[m.id]?.title ? { ...m, title: overrides[m.id].title as string } : m))
}

export function getAllProjects(): Project[] {
  const overrides = readProjectOverrides()
  const userProjects: Project[] = readUserProjects().map((p) => ({ ...p, modules: [] }))
  return [...builtInProjects, ...userProjects]
    .filter((p) => !overrides[p.id]?.deleted)
    .map((p) => ({
      ...p,
      name: overrides[p.id]?.name ?? p.name,
      description: overrides[p.id]?.description ?? p.description,
      modules: mergeModules(p.id, p.modules),
    }))
}

export function createProject(name: string, description: string): Project {
  const id = `project-${Date.now()}-${Math.floor(Math.random() * 1000)}`
  const stored: StoredProject = { id, name, description }
  writeUserProjects([...readUserProjects(), stored])
  return { ...stored, modules: [] }
}

export function renameProject(id: string, name: string, description: string) {
  const overrides = readProjectOverrides()
  overrides[id] = { ...overrides[id], name, description }
  writeProjectOverrides(overrides)
}

export function deleteProject(id: string) {
  const overrides = readProjectOverrides()
  overrides[id] = { ...overrides[id], deleted: true }
  writeProjectOverrides(overrides)
}

export function addModule(projectId: string, module: Module) {
  const all = readUserModules()
  all[projectId] = [...(all[projectId] ?? []), module]
  writeUserModules(all)
}

export function renameModule(moduleId: string, title: string) {
  const overrides = readModuleOverrides()
  overrides[moduleId] = { ...overrides[moduleId], title }
  writeModuleOverrides(overrides)
}

export function deleteModule(moduleId: string) {
  const overrides = readModuleOverrides()
  overrides[moduleId] = { ...overrides[moduleId], deleted: true }
  writeModuleOverrides(overrides)
}
