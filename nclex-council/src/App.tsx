import { useMemo, useState } from 'react'
import { AppSidebar } from './components/AppSidebar'
import { ChairmanClose } from './components/ChairmanClose'
import type { ExamAnswer } from './components/ExamQuiz'
import { ExamQuiz } from './components/ExamQuiz'
import { ModuleStudy } from './components/ModuleStudy'
import { ProgressDashboard } from './components/ProgressDashboard'
import { Quiz } from './components/Quiz'
import { QuizResults } from './components/QuizResults'
import type { QuizStartConfig } from './components/QuizSetup'
import { QuizSetup } from './components/QuizSetup'
import { TopicList } from './components/TopicList'
import { Separator } from './components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from './components/ui/sidebar'
import { getModule, modules } from './data/modules'
import type { AnswerDetail } from './lib/quizPool'
import { getAllProgress, markStudied, recordAttempt } from './lib/progress'

type View =
  | { name: 'list' }
  | { name: 'study'; moduleId: string }
  | { name: 'quiz'; moduleId: string }
  | { name: 'results'; moduleId: string; score: number; total: number }
  | { name: 'progress' }
  | { name: 'quiz-setup' }
  | { name: 'custom-quiz'; config: QuizStartConfig }
  | { name: 'custom-results'; title: string; items: AnswerDetail[] }

const VIEW_TITLES: Record<View['name'], string> = {
  list: 'Home',
  study: 'Study',
  quiz: 'Quiz',
  results: 'Results',
  progress: 'Progress',
  'quiz-setup': 'New quiz',
  'custom-quiz': 'Quiz',
  'custom-results': 'Results',
}

function App() {
  const [view, setView] = useState<View>({ name: 'list' })
  const [progress, setProgress] = useState(() => getAllProgress())

  const activeModule = useMemo(() => {
    if (view.name === 'study' || view.name === 'quiz' || view.name === 'results') {
      return getModule(view.moduleId)
    }
    return undefined
  }, [view])

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

  return (
    <SidebarProvider>
      <AppSidebar
        modules={modules}
        progress={progress}
        activeView={view.name}
        activeModuleId={activeModule?.id}
        onSelectModule={(moduleId) => setView({ name: 'study', moduleId })}
        onSelectProgress={() => setView({ name: 'progress' })}
        onSelectHome={() => setView({ name: 'list' })}
        onSelectNewQuiz={() => setView({ name: 'quiz-setup' })}
      />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <span className="text-sm font-medium text-foreground">
            {activeModule ? activeModule.title : VIEW_TITLES[view.name]}
          </span>
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-8">
          {view.name === 'list' && (
            <TopicList
              modules={modules}
              progress={progress}
              onSelect={(moduleId) => setView({ name: 'study', moduleId })}
            />
          )}

          {view.name === 'study' && activeModule && (
            <ModuleStudy
              module={activeModule}
              onBack={() => setView({ name: 'list' })}
              onStartQuiz={() => {
                markStudied(activeModule.id)
                refreshProgress()
                setView({ name: 'quiz', moduleId: activeModule.id })
              }}
            />
          )}

          {view.name === 'quiz' && activeModule && (
            <Quiz
              title={activeModule.title}
              questions={activeModule.quiz}
              onExit={() => setView({ name: 'study', moduleId: activeModule.id })}
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
