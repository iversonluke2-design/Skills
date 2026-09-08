import {
  Activity,
  BarChart3,
  BookOpen,
  Brain,
  ChevronRight,
  ClipboardList,
  Crown,
  Droplet,
  FolderKanban,
  HeartPulse,
  LayoutGrid,
  ListPlus,
  Plus,
  Repeat,
  Wind,
} from 'lucide-react'
import { useState, type ComponentType } from 'react'
import type { Module, Project, StudyMode } from '../data/types'
import type { ModuleProgress } from '../lib/progress'
import { Button } from './ui/button'
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
  projects: Project[]
  activeProjectId: string
  onSelectProject: (projectId: string) => void
  onCreateProject: (name: string, description: string) => void
  modules: Module[]
  progress: Record<string, ModuleProgress>
  activeView: string
  activeModuleId?: string
  activeMode?: StudyMode
  onSelectMode: (moduleId: string, mode: StudyMode) => void
  onSelectProgress: () => void
  onSelectHome: () => void
  onSelectNewQuiz: () => void
}

export function AppSidebar({
  projects,
  activeProjectId,
  onSelectProject,
  onCreateProject,
  modules,
  progress,
  activeView,
  activeModuleId,
  activeMode,
  onSelectMode,
  onSelectProgress,
  onSelectHome,
  onSelectNewQuiz,
}: Props) {
  const [projectPickerOpen, setProjectPickerOpen] = useState(false)
  const [newProjectOpen, setNewProjectOpen] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [newProjectDesc, setNewProjectDesc] = useState('')
  const [expandedTopicId, setExpandedTopicId] = useState<string | undefined>(activeModuleId)

  const activeProject = projects.find((p) => p.id === activeProjectId)

  function submitNewProject() {
    if (newProjectName.trim().length === 0) return
    onCreateProject(newProjectName.trim(), newProjectDesc.trim())
    setNewProjectName('')
    setNewProjectDesc('')
    setNewProjectOpen(false)
    setProjectPickerOpen(false)
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

          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setProjectPickerOpen((o) => !o)} className="cursor-pointer">
              <FolderKanban />
              <span className="truncate">{activeProject?.name ?? 'Select project'}</span>
              <ChevronRight className={`ml-auto transition-transform ${projectPickerOpen ? 'rotate-90' : ''}`} />
            </SidebarMenuButton>
          </SidebarMenuItem>

          {projectPickerOpen && (
            <div className="mx-2 mb-1 rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-1.5">
              {projects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onSelectProject(p.id)
                    setProjectPickerOpen(false)
                  }}
                  className={`block w-full rounded-md px-2 py-1.5 text-left text-sm ${
                    p.id === activeProjectId
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent'
                  }`}
                >
                  {p.name}
                </button>
              ))}

              {!newProjectOpen ? (
                <button
                  onClick={() => setNewProjectOpen(true)}
                  className="mt-1 flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-sm text-muted-foreground hover:bg-sidebar-accent"
                >
                  <Plus className="size-3.5" /> New project
                </button>
              ) : (
                <div className="mt-1 space-y-1.5 p-1">
                  <Input
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="Project name"
                    className="h-7 text-xs"
                  />
                  <Input
                    value={newProjectDesc}
                    onChange={(e) => setNewProjectDesc(e.target.value)}
                    placeholder="Description (optional)"
                    className="h-7 text-xs"
                  />
                  <Button size="sm" className="h-7 w-full text-xs" onClick={submitNewProject}>
                    Create
                  </Button>
                </div>
              )}
            </div>
          )}
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
                return (
                  <SidebarMenuItem key={m.id}>
                    <SidebarMenuButton
                      isActive={isTopicActive && !isExpanded}
                      onClick={() => setExpandedTopicId(isExpanded ? undefined : m.id)}
                      tooltip={m.title}
                    >
                      <Icon />
                      <span className="truncate">{m.title}</span>
                      <ChevronRight className={`ml-auto transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </SidebarMenuButton>
                    {pct !== null && <SidebarMenuBadge>{pct}%</SidebarMenuBadge>}

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
