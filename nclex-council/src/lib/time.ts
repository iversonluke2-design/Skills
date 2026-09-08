const MINUTE = 60_000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

export function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return ''
  const diff = Date.now() - then

  if (diff < MINUTE) return 'just now'
  if (diff < HOUR) {
    const m = Math.round(diff / MINUTE)
    return `${m} minute${m === 1 ? '' : 's'} ago`
  }
  if (diff < DAY) {
    const h = Math.round(diff / HOUR)
    return `${h} hour${h === 1 ? '' : 's'} ago`
  }
  if (diff < 2 * DAY) return 'yesterday'
  if (diff < 7 * DAY) {
    const d = Math.round(diff / DAY)
    return `${d} days ago`
  }
  return new Date(then).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}
