import {
  Activity,
  BarChart3,
  BookOpen,
  Brain,
  Check,
  ChevronRight,
  ClipboardList,
  Crown,
  Droplet,
  FolderKanban,
  HeartPulse,
  LayoutGrid,
  ListPlus,
  Pencil,
  Repeat,
  Trash2,
  Wind,
  X,
} from 'lucide-react'
import { useState, type ComponentType, type MouseEvent } from 'react'
import type { Module, StudyMode } from '../data/types'
import type { ModuleProgress } from '../lib/progress'
import { Input } from './ui/input'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from './ui/sidebar'

const MODULE_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  dka: Droplet,
  'septic-shock': Activity,
  ards: Wind,
  'increased-icp': Brain,
  'cardiogenic-shock': HeartPulse,
}

const MODE_ITEMS: Array<{ mode: StudyMode; label: string; icon: ComponentType<{ className?: string }> }> = [
  { mode: 'council', label: 'The Council', icon: Crown },
  { mode: 'study-guide', label: 'Study Guide', icon: BookOpen },
  { mode: 'quiz', label: 'Quiz', icon: ListPlus },
  { mode: 'exam', label: 'Exam', icon: ClipboardList },
  { mode: 'flashcards', label: 'Flashcards', icon: LayoutGrid },
  { mode: 'anki', label: 'Anki', icon: Repeat },
]

type Props = {
  activeProjectName?: string
  onOpenActiveProject: () => void
  onOpenAllProjects: () => void
  modules: Module[]
  progress: Record<string, ModuleProgress>
  activeView: string
  activeModuleId?: string
  activeMode?: StudyMode
  onSelectMode: (moduleId: string, mode: StudyMode) => void
  onRenameModule: (moduleId: string, title: string) => void
  onDeleteModule: (moduleId: string) => void
  onSelectProgress: () => void
  onSelectHome: () => void
  onSelectNewQuiz: () => void
}

export function AppSidebar({
  activeProjectName,
  onOpenActiveProject,
  onOpenAllProjects,
  modules,
  progress,
  activeView,
  activeModuleId,
  activeMode,
  onSelectMode,
  onRenameModule,
  onDeleteModule,
  onSelectProgress,
  onSelectHome,
  onSelectNewQuiz,
}: Props) {
  const [expandedTopicId, setExpandedTopicId] = useState<string | undefined>(activeModuleId)
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null)
  const [editModuleTitle, setEditModuleTitle] = useState('')

  function startEditModule(m: Module, e: MouseEvent) {
    e.stopPropagation()
    setEditingModuleId(m.id)
    setEditModuleTitle(m.title)
  }

  function submitEditModule(m: Module) {
    if (editModuleTitle.trim().length === 0) return
    onRenameModule(m.id, editModuleTitle.trim())
    setEditingModuleId(null)
  }

  function handleDeleteModule(m: Module, e: MouseEvent) {
    e.stopPropagation()
    if (window.confirm(`Delete topic "${m.title}"? This can't be undone.`)) {
      onDeleteModule(m.id)
    }
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" onClick={onSelectHome} className="cursor-pointer">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                IC
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">ICU Council</span>
                <span className="text-xs text-muted-foreground">NCLEX-NGN prep</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {activeProjectName && (
            <SidebarMenuItem>
              <SidebarMenuButton onClick={onOpenActiveProject} className="cursor-pointer" tooltip={activeProjectName}>
                <FolderKanban />
                <span className="truncate">{activeProjectName}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}

          <SidebarMenuItem>
            <button
              onClick={onOpenAllProjects}
              className="w-full px-2 py-1 text-left text-xs text-muted-foreground hover:text-foreground group-data-[collapsible=icon]:hidden"
            >
              All projects
            </button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Topics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.length === 0 && (
                <p className="px-2 py-2 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
                  No topics yet in this project.
                </p>
              )}
              {modules.map((m) => {
                const Icon = MODULE_ICONS[m.id] ?? Activity
                const p = progress[m.id]
                const pct = p && p.bestTotal > 0 ? Math.round((p.bestScore / p.bestTotal) * 100) : null
                const isExpanded = expandedTopicId === m.id
                const isTopicActive = activeModuleId === m.id && activeView !== 'list'
                const isEditing = editingModuleId === m.id
                return (
                  <SidebarMenuItem key={m.id}>
                    {isEditing ? (
                      <div className="flex items-center gap-1 px-2 py-1">
                        <Input
                          value={editModuleTitle}
                          onChange={(e) => setEditModuleTitle(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && submitEditModule(m)}
                          autoFocus
                          className="h-7 flex-1 text-xs"
                        />
                        <button onClick={() => submitEditModule(m)} className="rounded p-1 text-accent-2 hover:bg-sidebar-accent">
                          <Check className="size-3.5" />
                        </button>
                        <button onClick={() => setEditingModuleId(null)} className="rounded p-1 text-muted-foreground hover:bg-sidebar-accent">
                          <X className="size-3.5" />
                        </button>
                      </div>
                    ) : (
                      <SidebarMenuButton
                        isActive={isTopicActive && !isExpanded}
                        onClick={() => setExpandedTopicId(isExpanded ? undefined : m.id)}
                        tooltip={m.title}
                        className="group/topic"
                      >
                        <Icon />
                        <span className="truncate">{m.title}</span>
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(e) => startEditModule(m, e)}
                          className="ml-auto shrink-0 rounded p-0.5 opacity-0 hover:text-foreground group-hover/topic:opacity-100"
                        >
                          <Pencil className="size-3" />
                        </span>
                        <span
                          role="button"
                          tabIndex={0}
                          onClick={(e) => handleDeleteModule(m, e)}
                          className="shrink-0 rounded p-0.5 opacity-0 hover:text-danger group-hover/topic:opacity-100"
                        >
                          <Trash2 className="size-3" />
                        </span>
                        <ChevronRight className={`shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </SidebarMenuButton>
                    )}
                    {pct !== null && !isEditing && <SidebarMenuBadge>{pct}%</SidebarMenuBadge>}

                    {isExpanded && (
                      <SidebarMenuSub>
                        {MODE_ITEMS.map((item) => {
                          const ItemIcon = item.icon
                          return (
                            <SidebarMenuSubItem key={item.mode}>
                              <SidebarMenuSubButton
                                isActive={activeModuleId === m.id && activeMode === item.mode}
                                onClick={() => onSelectMode(m.id, item.mode)}
                                className="cursor-pointer"
                              >
                                <ItemIcon />
                                <span>{item.label}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )
                        })}
                      </SidebarMenuSub>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Study</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeView === 'quiz-setup' || activeView === 'custom-quiz' || activeView === 'custom-results'}
                  onClick={onSelectNewQuiz}
                  tooltip="New quiz"
                >
                  <ListPlus />
                  <span>New quiz</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={activeView === 'progress'} onClick={onSelectProgress} tooltip="Progress">
                  <BarChart3 />
                  <span>Progress</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <p className="px-2 py-1 text-[11px] leading-snug text-muted-foreground group-data-[collapsible=icon]:hidden">
          Cross-check against your course material before your exam.
        </p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
