import { KeyRound, Loader2, Paperclip, SendHorizontal, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { AnthropicError, generateModuleFromText } from '../lib/anthropic'
import type { Module } from '../data/types'
import { extractFileText } from '../lib/extractText'
import { getApiKey, setApiKey } from '../lib/settings'
import { Button } from './ui/button'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  text: string
  isError?: boolean
}

type Props = {
  projectName: string
  onModuleCreated: (module: Module) => void
}

export function HomeChat({ projectName, onModuleCreated }: Props) {
  const [apiKey, setApiKeyState] = useState(() => getApiKey())
  const [keyDraft, setKeyDraft] = useState('')
  const [editingKey, setEditingKey] = useState(false)
  const [draft, setDraft] = useState('')
  const [attachedFile, setAttachedFile] = useState<{ name: string; text: string } | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [busy, setBusy] = useState(false)
  const [extracting, setExtracting] = useState(false)
  const [fileError, setFileError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function saveKey() {
    if (!keyDraft.trim()) return
    setApiKey(keyDraft.trim())
    setApiKeyState(keyDraft.trim())
    setKeyDraft('')
    setEditingKey(false)
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setFileError(null)
    setExtracting(true)
    try {
      const text = await extractFileText(file)
      setAttachedFile({ name: file.name, text })
    } catch (err) {
      setFileError(err instanceof Error ? err.message : `Couldn't read "${file.name}".`)
    } finally {
      setExtracting(false)
    }
  }

  async function send() {
    const combinedText = [draft.trim(), attachedFile ? `\n\n[Attached file: ${attachedFile.name}]\n${attachedFile.text}` : '']
      .join('')
      .trim()
    if (!combinedText || busy) return

    const preview = draft.trim() || `Uploaded ${attachedFile?.name}`
    setMessages((m) => [...m, { id: `u-${Date.now()}`, role: 'user', text: preview }])
    setDraft('')
    setAttachedFile(null)
    setBusy(true)

    try {
      const module = await generateModuleFromText(apiKey, projectName, combinedText)
      onModuleCreated(module)
      setMessages((m) => [
        ...m,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: `Added "${module.title}" to ${projectName}. Open it from the sidebar under Topics — it has The Council, Study Guide, Quiz, Exam, Flashcards, and Anki, all built from what you just gave me.`,
        },
      ])
    } catch (err) {
      const msg = err instanceof AnthropicError ? err.message : 'Something went wrong generating that topic — try again.'
      setMessages((m) => [...m, { id: `a-${Date.now()}`, role: 'assistant', text: msg, isError: true }])
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto mb-10 max-w-3xl rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 py-3">
        <p className="text-sm font-medium text-foreground">Upload a lecture, reading, or notes</p>
        <p className="text-xs text-muted-foreground">
          I'll turn only what you paste or attach into a new topic under <span className="font-medium">{projectName}</span> — nothing invented, nothing you didn't give me.
        </p>
      </div>

      {!apiKey || editingKey ? (
        <div className="space-y-2 p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <KeyRound className="size-3.5" />
            <span>
              {apiKey ? 'Replace your saved Anthropic API key.' : 'Paste your Anthropic API key to turn this on.'}
            </span>
          </div>
          <div className="flex gap-2">
            <input
              type="password"
              value={keyDraft}
              onChange={(e) => setKeyDraft(e.target.value)}
              placeholder="sk-ant-..."
              className="h-9 flex-1 rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            />
            <Button size="sm" onClick={saveKey} disabled={!keyDraft.trim()}>
              Save
            </Button>
            {apiKey && (
              <Button size="sm" variant="outline" onClick={() => setEditingKey(false)}>
                Cancel
              </Button>
            )}
          </div>
          <p className="text-[11px] leading-snug text-muted-foreground">
            Stored only in this browser (localStorage) and sent straight to Anthropic's API — never through any other
            server. Usage is billed on your own Anthropic account, separately from any Claude subscription. Get a key
            at console.anthropic.com.
          </p>
        </div>
      ) : (
        <>
          {messages.length > 0 && (
            <div className="max-h-80 space-y-3 overflow-y-auto p-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : m.isError
                          ? 'bg-danger/10 text-danger'
                          : 'bg-secondary text-foreground'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {busy && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm text-muted-foreground">
                    <Loader2 className="size-3.5 animate-spin" /> Reading your material and building the topic…
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="p-3">
            {attachedFile && (
              <div className="mb-2 flex w-fit items-center gap-2 rounded-md bg-secondary px-2 py-1 text-xs text-foreground">
                <Paperclip className="size-3" />
                {attachedFile.name}
                <button
                  onClick={() => {
                    setAttachedFile(null)
                    setFileError(null)
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3" />
                </button>
              </div>
            )}
            {extracting && (
              <div className="mb-2 flex w-fit items-center gap-2 rounded-md bg-secondary px-2 py-1 text-xs text-muted-foreground">
                <Loader2 className="size-3 animate-spin" /> Reading file…
              </div>
            )}
            {fileError && (
              <div className="mb-2 flex items-start gap-2 rounded-md bg-danger/10 px-2 py-1.5 text-xs text-danger">
                <span className="flex-1">{fileError}</span>
                <button onClick={() => setFileError(null)} className="shrink-0 hover:opacity-70">
                  <X className="size-3" />
                </button>
              </div>
            )}
            <div className="flex items-end gap-2 rounded-lg border border-input bg-transparent p-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={extracting}
                className="rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground disabled:opacity-40"
                title="Attach a file (PDF, .txt, .md)"
              >
                <Paperclip className="size-4" />
              </button>
              <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    void send()
                  }
                }}
                placeholder="Paste your lecture, reading, or notes here…"
                rows={2}
                className="max-h-40 flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                onClick={() => void send()}
                disabled={busy || extracting || (!draft.trim() && !attachedFile)}
                className="rounded-md bg-primary p-2 text-primary-foreground disabled:opacity-40"
              >
                <SendHorizontal className="size-4" />
              </button>
            </div>
            <button onClick={() => setEditingKey(true)} className="mt-2 text-[11px] text-muted-foreground hover:text-foreground">
              Using your saved API key · change
            </button>
            <p className="mt-1 text-[11px] text-muted-foreground">
              PDF, .txt, and .md files can be attached directly. For Word docs or slide decks, copy the text and
              paste it into the box instead.
            </p>
          </div>
        </>
      )}
    </div>
  )
}
