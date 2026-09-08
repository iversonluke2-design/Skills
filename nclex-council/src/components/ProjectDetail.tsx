import { Activity, BookOpen, Check, ChevronRight, FileText, Pencil, Pin, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import type { Module, Project } from '../data/types'
import { getModuleCreatedAt, getProjectActivity, isProjectPinned, togglePinProject } from '../lib/projects'
import { formatRelativeTime } from '../lib/time'
import { HomeChat } from './HomeChat'
import { Input } from './ui/input'

type Props = {
  project: Project
  onBackToProjects: () => void
  onOpenTopic: (moduleId: string) => void
  onOpenStudyGuide: (moduleId: string) => void
  onModuleCreated: (module: Module) => void
  onRenameProject: (projectId: string, name: string, description: string) => void
  onDeleteProject: (projectId: string) => void
}

export function ProjectDetail({
  project,
  onBackToProjects,
  onOpenTopic,
  onOpenStudyGuide,
  onModuleCreated,
  onRenameProject,
  onDeleteProject,
}: Props) {
  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState(project.name)
  const [, forceRerender] = useState(0)

  const recents = [...project.modules].sort((a, b) => {
    const aTime = getModuleCreatedAt(a.id)
    const bTime = getModuleCreatedAt(b.id)
    if (!aTime && !bTime) return 0
    if (!aTime) return 1
    if (!bTime) return -1
    return new Date(bTime).getTime() - new Date(aTime).getTime()
  })

  function submitEdit() {
    if (!editName.trim()) return
    onRenameProject(project.id, editName.trim(), project.description)
    setEditing(false)
  }

  function handleDelete() {
    if (window.confirm(`Delete project "${project.name}" and everything under it? This can't be undone.`)) {
      onDeleteProject(project.id)
    }
  }

  const pinned = isProjectPinned(project.id)
  const activityAt = getProjectActivity(project.id)

  return (
    <div className="mx-auto max-w-5xl">
      <button onClick={onBackToProjects} className="mb-3 text-xs text-muted-foreground hover:text-foreground">
        Projects / <span className="text-foreground">{project.name}</span>
      </button>

      <div className="mb-6 flex items-center justify-between gap-3">
        {editing ? (
          <div className="flex flex-1 items-center gap-2">
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitEdit()}
              autoFocus
              className="h-10 max-w-sm text-lg"
            />
            <button onClick={submitEdit} className="rounded p-1.5 text-accent-2 hover:bg-secondary">
              <Check className="size-4" />
            </button>
            <button onClick={() => setEditing(false)} className="rounded p-1.5 text-muted-foreground hover:bg-secondary">
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <h1 className="font-serif text-3xl text-foreground">{project.name}</h1>
        )}
        {!editing && (
          <div className="flex shrink-0 items-center gap-1">
            <button
              onClick={() => {
                togglePinProject(project.id)
                forceRerender((n) => n + 1)
              }}
              title={pinned ? 'Unpin project' : 'Pin project'}
              className={`rounded-md p-2 hover:bg-secondary ${pinned ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Pin className={`size-4 ${pinned ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => {
                setEditName(project.name)
                setEditing(true)
              }}
              className="rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <Pencil className="size-4" />
            </button>
            <button onClick={handleDelete} className="rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-danger">
              <Trash2 className="size-4" />
            </button>
          </div>
        )}
      </div>

      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <HomeChat projectName={project.name} onModuleCreated={onModuleCreated} />

          <h2 className="mb-2 text-sm font-medium text-muted-foreground">Recents</h2>
          {recents.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
              No topics yet — upload a lecture above to add one.
            </p>
          ) : (
            <div className="divide-y divide-border rounded-lg border border-border bg-card">
              {recents.map((m) => {
                const createdAt = getModuleCreatedAt(m.id)
                return (
                  <button
                    key={m.id}
                    onClick={() => onOpenTopic(m.id)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-secondary/60"
                  >
                    <Activity className="size-4 shrink-0 text-muted-foreground" />
                    <span className="flex-1 truncate text-sm text-foreground">{m.title}</span>
                    {createdAt && <span className="shrink-0 text-xs text-muted-foreground">{formatRelativeTime(createdAt)}</span>}
                    <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <div>
          <h2 className="mb-2 text-sm font-medium text-muted-foreground">Context</h2>
          {activityAt && <p className="mb-3 text-xs text-muted-foreground">Last activity {formatRelativeTime(activityAt)}</p>}
          {project.modules.length === 0 ? (
            <p className="text-xs text-muted-foreground">Uploaded material shows up here once you add a topic.</p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {project.modules.map((m) => (
                <button
                  key={m.id}
                  onClick={() => onOpenStudyGuide(m.id)}
                  className="rounded-lg border border-border bg-card p-3 text-left hover:border-primary/60"
                >
                  <FileText className="mb-2 size-4 text-muted-foreground" />
                  <p className="line-clamp-2 text-xs font-medium leading-snug text-foreground">{m.title}</p>
                  <span className="mt-2 inline-flex items-center gap-1 rounded bg-secondary px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                    <BookOpen className="size-2.5" /> Topic
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
