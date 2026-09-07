const STORAGE_KEY = 'nclex-council:progress:v1'

export type ModuleProgress = {
  attempts: number
  bestScore: number
  bestTotal: number
  lastScore: number
  lastTotal: number
  lastAttemptAt: string
  studied: boolean
}

type ProgressMap = Record<string, ModuleProgress>

function readAll(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ProgressMap) : {}
  } catch {
    return {}
  }
}

function writeAll(data: ProgressMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage unavailable (private mode, quota) — progress just won't persist
  }
}

export function getAllProgress(): ProgressMap {
  return readAll()
}

export function getModuleProgress(moduleId: string): ModuleProgress | undefined {
  return readAll()[moduleId]
}

export function markStudied(moduleId: string) {
  const all = readAll()
  const existing = all[moduleId]
  all[moduleId] = {
    attempts: existing?.attempts ?? 0,
    bestScore: existing?.bestScore ?? 0,
    bestTotal: existing?.bestTotal ?? 0,
    lastScore: existing?.lastScore ?? 0,
    lastTotal: existing?.lastTotal ?? 0,
    lastAttemptAt: existing?.lastAttemptAt ?? '',
    studied: true,
  }
  writeAll(all)
}

export function recordAttempt(moduleId: string, score: number, total: number) {
  const all = readAll()
  const existing = all[moduleId]
  const prevBestPct = existing && existing.bestTotal > 0 ? existing.bestScore / existing.bestTotal : -1
  const newPct = total > 0 ? score / total : 0
  const isNewBest = newPct >= prevBestPct

  all[moduleId] = {
    attempts: (existing?.attempts ?? 0) + 1,
    bestScore: isNewBest ? score : (existing?.bestScore ?? score),
    bestTotal: isNewBest ? total : (existing?.bestTotal ?? total),
    lastScore: score,
    lastTotal: total,
    lastAttemptAt: new Date().toISOString(),
    studied: true,
  }
  writeAll(all)
}
