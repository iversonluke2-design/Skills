import { useMemo, useState } from 'react'
import { AnkiPage } from './components/AnkiPage'
import { AppSidebar } from './components/AppSidebar'
import { CaseStudyView } from './components/CaseStudyView'
import { ChairmanClose } from './components/ChairmanClose'
import type { ExamAnswer } from './components/ExamQuiz'
import { ExamQuiz } from './components/ExamQuiz'
import { FlashcardsPage } from './components/FlashcardsPage'
import { ModuleStudy } from './components/ModuleStudy'
import { ProgressDashboard } from './components/ProgressDashboard'
import { ProjectDetail } from './components/ProjectDetail'
import { ProjectsGallery } from './components/ProjectsGallery'
import { Quiz } from './components/Quiz'
import { QuizResults } from './components/QuizResults'
import type { QuizStartConfig } from './components/QuizSetup'
import { QuizSetup } from './components/QuizSetup'
import { StudyGuidePage } from './components/StudyGuide'
import { Separator } from './components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from './components/ui/sidebar'
import type { Module, StudyMode } from './data/types'
import {
  addModule,
  createProject,
  deleteModule,
  deleteProject,
  getAllProjects,
  renameModule,
  renameProject,
} from './lib/projects'
import type { AnswerDetail } from './lib/quizPool'
import { getAllProgress, markStudied, recordAttempt } from './lib/progress'

type View =
  | { name: 'projects' }
  | { name: 'list' }
  | { name: 'study'; moduleId: string }
  | { name: 'study-guide'; moduleId: string }
  | { name: 'flashcards-page'; moduleId: string }
  | { name: 'anki-page'; moduleId: string }
  | { name: 'quiz'; moduleId: string }
  | { name: 'results'; moduleId: string; score: number; total: number }
  | { name: 'case-study'; moduleId: string }
  | { name: 'progress' }
  | { name: 'quiz-setup' }
  | { name: 'custom-quiz'; config: QuizStartConfig }
  | { name: 'custom-results'; title: string; items: AnswerDetail[] }

const VIEW_TITLES: Record<View['name'], string> = {
  projects: 'Projects',
  list: 'Project',
  study: 'The Council',
  'study-guide': 'Study Guide',
  'flashcards-page': 'Flashcards',
  'anki-page': 'Anki',
  quiz: 'Quiz',
  results: 'Results',
  'case-study': 'Exam',
  progress: 'Progress',
  'quiz-setup': 'New quiz',
  'custom-quiz': 'Quiz',
  'custom-results': 'Results',
}

const VIEW_TO_MODE: Partial<Record<View['name'], StudyMode>> = {
  study: 'council',
  'study-guide': 'study-guide',
  quiz: 'quiz',
  'case-study': 'exam',
  'flashcards-page': 'flashcards',
  'anki-page': 'anki',
}

const EMPTY_MODULES: never[] = []

function App() {
  const [view, setView] = useState<View>({ name: 'projects' })
  const [progress, setProgress] = useState(() => getAllProgress())
  const [projects, setProjects] = useState(() => getAllProjects())
  const [activeProjectId, setActiveProjectId] = useState(() => projects[0]?.id ?? '')

  const activeProject = useMemo(
    () => projects.find((p) => p.id === activeProjectId) ?? projects[0],
    [projects, activeProjectId],
  )
  const modules = activeProject?.modules ?? EMPTY_MODULES

  const activeModule = useMemo(() => {
    if (
      view.name === 'study' ||
      view.name === 'study-guide' ||
      view.name === 'flashcards-page' ||
      view.name === 'anki-page' ||
      view.name === 'quiz' ||
      view.name === 'results' ||
      view.name === 'case-study'
    ) {
      return modules.find((m) => m.id === view.moduleId)
    }
    return undefined
  }, [view, modules])

  function refreshProgress() {
    setProgress(getAllProgress())
  }

  function handleExamComplete(config: QuizStartConfig, answers: ExamAnswer[]) {
    setView({
      name: 'custom-results',
      title: config.title,
      items: answers.map((a) => ({ question: a.question, selected: a.selected, correct: a.correct })),
    })
  }

  function handleSelectMode(moduleId: string, mode: StudyMode) {
    markStudied(moduleId)
    refreshProgress()
    if (mode === 'council') setView({ name: 'study', moduleId })
    else if (mode === 'study-guide') setView({ name: 'study-guide', moduleId })
    else if (mode === 'quiz') setView({ name: 'quiz', moduleId })
    else if (mode === 'exam') setView({ name: 'case-study', moduleId })
    else if (mode === 'flashcards') setView({ name: 'flashcards-page', moduleId })
    else if (mode === 'anki') setView({ name: 'anki-page', moduleId })
  }

  function handleCreateProject(name: string, description: string) {
    const project = createProject(name, description)
    setProjects(getAllProjects())
    setActiveProjectId(project.id)
    setView({ name: 'list' })
  }

  function handleRenameProject(projectId: string, name: string, description: string) {
    renameProject(projectId, name, description)
    setProjects(getAllProjects())
  }

  function handleDeleteProject(projectId: string) {
    deleteProject(projectId)
    const remaining = getAllProjects()
    setProjects(remaining)
    if (projectId === activeProjectId) {
      setActiveProjectId(remaining[0]?.id ?? '')
      if (remaining.length > 0) setView({ name: 'list' })
      else setView({ name: 'projects' })
    }
  }

  function handleModuleCreated(module: Module) {
    if (!activeProject) return
    addModule(activeProject.id, module)
    setProjects(getAllProjects())
  }

  function handleRenameModule(moduleId: string, title: string) {
    renameModule(moduleId, title)
    setProjects(getAllProjects())
  }

  function handleDeleteModule(moduleId: string) {
    deleteModule(moduleId)
    setProjects(getAllProjects())
    if (activeModule?.id === moduleId) {
      setView({ name: 'list' })
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar
        activeProjectName={activeProject?.name}
        onOpenActiveProject={() => setView({ name: 'list' })}
        onOpenAllProjects={() => setView({ name: 'projects' })}
        modules={modules}
        progress={progress}
        activeView={view.name}
        activeModuleId={activeModule?.id}
        activeMode={VIEW_TO_MODE[view.name]}
        onSelectMode={handleSelectMode}
        onRenameModule={handleRenameModule}
        onDeleteModule={handleDeleteModule}
        onSelectProgress={() => setView({ name: 'progress' })}
        onSelectHome={() => setView({ name: 'projects' })}
        onSelectNewQuiz={() => setView({ name: 'quiz-setup' })}
      />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <span className="text-sm font-medium text-foreground">
            {activeModule
              ? `${activeModule.title} · ${VIEW_TITLES[view.name]}`
              : view.name === 'list' && activeProject
                ? activeProject.name
                : VIEW_TITLES[view.name]}
          </span>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-8">
          {view.name === 'projects' && (
            <ProjectsGallery
              projects={projects}
              onOpenProject={(id) => {
                setActiveProjectId(id)
                setView({ name: 'list' })
              }}
              onCreateProject={handleCreateProject}
              onRenameProject={handleRenameProject}
              onDeleteProject={handleDeleteProject}
            />
          )}

          {view.name === 'list' && activeProject && (
            <ProjectDetail
              project={activeProject}
              onBackToProjects={() => setView({ name: 'projects' })}
              onOpenTopic={(moduleId) => handleSelectMode(moduleId, 'council')}
              onOpenStudyGuide={(moduleId) => handleSelectMode(moduleId, 'study-guide')}
              onModuleCreated={handleModuleCreated}
              onRenameProject={handleRenameProject}
              onDeleteProject={handleDeleteProject}
            />
          )}

          {view.name === 'study' && activeModule && (
            <ModuleStudy
              key={activeModule.id}
              module={activeModule}
              onBack={() => setView({ name: 'list' })}
              onStartQuiz={() => handleSelectMode(activeModule.id, 'quiz')}
              onStartCase={() => handleSelectMode(activeModule.id, 'exam')}
            />
          )}

          {view.name === 'study-guide' && activeModule && (
            <StudyGuidePage module={activeModule} onBack={() => setView({ name: 'list' })} />
          )}

          {view.name === 'flashcards-page' && activeModule && (
            <FlashcardsPage module={activeModule} onBack={() => setView({ name: 'list' })} />
          )}

          {view.name === 'anki-page' && activeModule && (
            <AnkiPage module={activeModule} onBack={() => setView({ name: 'list' })} />
          )}

          {view.name === 'case-study' && activeModule && (
            <CaseStudyView
              module={activeModule}
              caseStudy={activeModule.caseStudy}
              onExit={() => setView({ name: 'list' })}
            />
          )}

          {view.name === 'quiz' && activeModule && (
            <Quiz
              title={activeModule.title}
              questions={activeModule.quiz}
              onExit={() => setView({ name: 'list' })}
              onComplete={(score, total) => {
                recordAttempt(activeModule.id, score, total)
                refreshProgress()
                setView({ name: 'results', moduleId: activeModule.id, score, total })
              }}
            />
          )}

          {view.name === 'results' && activeModule && (
            <ChairmanClose
              module={activeModule}
              score={view.score}
              total={view.total}
              onRetake={() => setView({ name: 'quiz', moduleId: activeModule.id })}
              onBackToTopics={() => setView({ name: 'list' })}
            />
          )}

          {view.name === 'progress' && <ProgressDashboard modules={modules} progress={progress} />}

          {view.name === 'quiz-setup' && (
            <QuizSetup
              modules={modules}
              onStart={(config) => setView({ name: 'custom-quiz', config })}
            />
          )}

          {view.name === 'custom-quiz' && view.config.mode === 'practice' && (
            <Quiz
              title={view.config.title}
              questions={view.config.questions}
              onExit={() => setView({ name: 'quiz-setup' })}
              onComplete={(_score, _total, details) =>
                setView({ name: 'custom-results', title: view.config.title, items: details })
              }
            />
          )}

          {view.name === 'custom-quiz' && view.config.mode === 'exam' && (
            <ExamQuiz
              title={view.config.title}
              questions={view.config.questions}
              secondsPerQuestion={view.config.secondsPerQuestion}
              onExit={() => setView({ name: 'quiz-setup' })}
              onComplete={(answers) => handleExamComplete(view.config, answers)}
            />
          )}

          {view.name === 'custom-results' && (
            <QuizResults
              title={view.title}
              items={view.items}
              onRetake={() => setView({ name: 'quiz-setup' })}
              onDone={() => setView({ name: 'list' })}
            />
          )}
        </main>

        <footer className="border-t border-border py-3">
          <p className="text-center text-xs text-muted-foreground">
            Content follows standard clinical guidelines (Surviving Sepsis Campaign, ARDSnet, ADA, Monro-Kellie, SCAI) —
            always cross-check against your course's current material before your exam.
          </p>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
