import { Activity, BarChart3, Brain, Droplet, HeartPulse, ListPlus, Wind } from 'lucide-react'
import type { ComponentType } from 'react'
import type { Module } from '../data/types'
import type { ModuleProgress } from '../lib/progress'
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
  SidebarRail,
} from './ui/sidebar'

const MODULE_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  dka: Droplet,
  'septic-shock': Activity,
  ards: Wind,
  'increased-icp': Brain,
  'cardiogenic-shock': HeartPulse,
}

type Props = {
  modules: Module[]
  progress: Record<string, ModuleProgress>
  activeView:
    | 'list'
    | 'study'
    | 'quiz'
    | 'results'
    | 'case-study'
    | 'progress'
    | 'quiz-setup'
    | 'custom-quiz'
    | 'custom-results'
  activeModuleId?: string
  onSelectModule: (moduleId: string) => void
  onSelectProgress: () => void
  onSelectHome: () => void
  onSelectNewQuiz: () => void
}

export function AppSidebar({
  modules,
  progress,
  activeView,
  activeModuleId,
  onSelectModule,
  onSelectProgress,
  onSelectHome,
  onSelectNewQuiz,
}: Props) {
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
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Topics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((m) => {
                const Icon = MODULE_ICONS[m.id] ?? Activity
                const p = progress[m.id]
                const pct = p && p.bestTotal > 0 ? Math.round((p.bestScore / p.bestTotal) * 100) : null
                const isActive =
                  (activeView === 'study' || activeView === 'quiz' || activeView === 'results' || activeView === 'case-study') &&
                  activeModuleId === m.id
                return (
                  <SidebarMenuItem key={m.id}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => onSelectModule(m.id)}
                      tooltip={m.title}
                    >
                      <Icon />
                      <span>{m.title}</span>
                    </SidebarMenuButton>
                    {pct !== null && <SidebarMenuBadge>{pct}%</SidebarMenuBadge>}
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
