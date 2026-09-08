import { ArrowUpDown, Check, FolderKanban, Pencil, Pin, Plus, Search, Trash2, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Project } from '../data/types'
import { getProjectActivity, isProjectPinned, togglePinProject } from '../lib/projects'
import { formatRelativeTime } from '../lib/time'
import { Button } from './ui/button'
import { Input } from './ui/input'

type Props = {
  projects: Project[]
  onOpenProject: (projectId: string) => void
  onCreateProject: (name: string, description: string) => void
  onRenameProject: (projectId: string, name: string, description: string) => void
  onDeleteProject: (projectId: string) => void
}

type Sort = 'recent' | 'name'

export function ProjectsGallery({ projects, onOpenProject, onCreateProject, onRenameProject, onDeleteProject }: Props) {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<Sort>('recent')
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [, forceRerender] = useState(0)

  const rows = useMemo(() => {
    const filtered = projects.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()))
    const withMeta = filtered.map((p) => ({
      project: p,
      activityAt: getProjectActivity(p.id),
      pinned: isProjectPinned(p.id),
    }))
    return withMeta.sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
      if (sort === 'name') return a.project.name.localeCompare(b.project.name)
      const aTime = a.activityAt ? new Date(a.activityAt).getTime() : 0
      const bTime = b.activityAt ? new Date(b.activityAt).getTime() : 0
      return bTime - aTime
    })
  }, [projects, query, sort])

  function submitNew() {
    if (!newName.trim()) return
    onCreateProject(newName.trim(), newDesc.trim())
    setNewName('')
    setNewDesc('')
    setCreating(false)
  }

  function startEdit(p: Project) {
    setEditingId(p.id)
    setEditName(p.name)
  }

  function submitEdit(p: Project) {
    if (!editName.trim()) return
    onRenameProject(p.id, editName.trim(), p.description)
    setEditingId(null)
  }

  function handleDelete(p: Project) {
    if (window.confirm(`Delete project "${p.name}" and everything under it? This can't be undone.`)) {
      onDeleteProject(p.id)
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="font-serif text-3xl text-foreground">Projects</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects"
              className="h-8 w-40 pl-8 text-xs"
            />
          </div>
          <button
            onClick={() => setSort((s) => (s === 'recent' ? 'name' : 'recent'))}
            title={sort === 'recent' ? 'Sorted by recent activity' : 'Sorted by name'}
            className="flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground"
          >
            <ArrowUpDown className="size-3.5" />
          </button>
          <Button size="sm" onClick={() => setCreating((c) => !c)}>
            <Plus className="size-3.5" /> New project
          </Button>
        </div>
      </div>

      {creating && (
        <div className="mb-4 space-y-2 rounded-xl border border-border bg-card p-4">
          <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Project name (e.g. Patho)" autoFocus />
          <Input value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Description (optional)" />
          <div className="flex gap-2">
            <Button size="sm" onClick={submitNew} disabled={!newName.trim()}>
              Create
            </Button>
            <Button size="sm" variant="outline" onClick={() => setCreating(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {rows.length === 0 && (
        <p className="py-12 text-center text-sm text-muted-foreground">No projects match "{query}".</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {rows.map(({ project: p, activityAt, pinned }) =>
          editingId === p.id ? (
            <div key={p.id} className="flex items-center gap-2 rounded-xl border border-border bg-card p-4">
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submitEdit(p)}
                autoFocus
                className="h-8 flex-1"
              />
              <button onClick={() => submitEdit(p)} className="rounded p-1.5 text-accent-2 hover:bg-secondary">
                <Check className="size-4" />
              </button>
              <button onClick={() => setEditingId(null)} className="rounded p-1.5 text-muted-foreground hover:bg-secondary">
                <X className="size-4" />
              </button>
            </div>
          ) : (
            <div
              key={p.id}
              onClick={() => onOpenProject(p.id)}
              className="group relative cursor-pointer rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/60"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <FolderKanban className="size-4 text-muted-foreground" />
                  <h3 className="font-medium text-foreground">{p.name}</h3>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    togglePinProject(p.id)
                    forceRerender((n) => n + 1)
                  }}
                  title={pinned ? 'Unpin project' : 'Pin project'}
                  className={`shrink-0 rounded p-1 hover:text-primary ${
                    pinned ? 'text-primary opacity-100' : 'text-muted-foreground opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <Pin className={`size-3.5 ${pinned ? 'fill-current' : ''}`} />
                </button>
              </div>
              {p.description && <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>}
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {activityAt ? formatRelativeTime(activityAt) : `${p.modules.length} topic${p.modules.length === 1 ? '' : 's'}`}
                </span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      startEdit(p)
                    }}
                    className="rounded p-1 text-muted-foreground hover:text-foreground"
                  >
                    <Pencil className="size-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(p)
                    }}
                    className="rounded p-1 text-muted-foreground hover:text-danger"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  )
}
