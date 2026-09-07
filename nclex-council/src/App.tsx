import { useMemo, useState } from 'react'
import { modules, getModule } from './data/modules'
import { TopicList } from './components/TopicList'
import { ModuleStudy } from './components/ModuleStudy'
import { Quiz } from './components/Quiz'
import { ChairmanClose } from './components/ChairmanClose'
import { ProgressDashboard } from './components/ProgressDashboard'
import { getAllProgress, markStudied, recordAttempt } from './lib/progress'

type View =
  | { name: 'list' }
  | { name: 'study'; moduleId: string }
  | { name: 'quiz'; moduleId: string }
  | { name: 'results'; moduleId: string; score: number; total: number }
  | { name: 'progress' }

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

  return (
    <div className="min-h-svh flex flex-col">
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setView({ name: 'list' })}
            className="font-bold text-text hover:text-accent transition-colors"
          >
            ICU Council <span className="text-text-dim font-normal">· NCLEX-NGN prep</span>
          </button>
          <nav className="flex gap-4 text-sm">
            <button
              onClick={() => setView({ name: 'list' })}
              className={view.name === 'list' ? 'text-accent font-semibold' : 'text-text-dim hover:text-text'}
            >
              Topics
            </button>
            <button
              onClick={() => setView({ name: 'progress' })}
              className={view.name === 'progress' ? 'text-accent font-semibold' : 'text-text-dim hover:text-text'}
            >
              Progress
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 px-4 py-8">
        {view.name === 'list' && (
          <div className="max-w-4xl mx-auto">
            <TopicList
              modules={modules}
              progress={progress}
              onSelect={(moduleId) => setView({ name: 'study', moduleId })}
            />
          </div>
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
            module={activeModule}
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
      </main>

      <footer className="border-t border-border py-4">
        <p className="text-center text-xs text-text-dim">
          Content follows standard clinical guidelines (Surviving Sepsis Campaign, ARDSnet, ADA, Monro-Kellie, SCAI) —
          always cross-check against your course's current material before your exam.
        </p>
      </footer>
    </div>
  )
}

export default App
