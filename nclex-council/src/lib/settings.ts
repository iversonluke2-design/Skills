const KEY = 'nclex-council:anthropic-api-key'

export function getApiKey(): string {
  try {
    return localStorage.getItem(KEY) ?? ''
  } catch {
    return ''
  }
}

export function setApiKey(key: string) {
  try {
    if (key) localStorage.setItem(KEY, key)
    else localStorage.removeItem(KEY)
  } catch {
    // localStorage unavailable — key just won't persist across reloads
  }
}
