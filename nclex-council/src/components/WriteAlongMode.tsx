import { useState } from 'react'
import type { WriteAlongItem } from '../data/types'
import { Button } from './ui/button'
import { Input } from './ui/input'

function normalize(s: string) {
  return s.trim().toLowerCase()
}

function WriteAlongRow({ item }: { item: WriteAlongItem }) {
  const [value, setValue] = useState('')
  const [checked, setChecked] = useState(false)
  const isCorrect = normalize(value) === normalize(item.answer)

  return (
    <div className="border-b border-border py-4 last:border-b-0">
      <p className="mb-2 text-sm leading-relaxed text-foreground">{item.prompt}</p>
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setChecked(false)
          }}
          placeholder="Type your answer"
          className={
            checked
              ? isCorrect
                ? 'border-accent-2 focus-visible:ring-accent-2/40'
                : 'border-danger focus-visible:ring-danger/40'
              : ''
          }
        />
        <Button variant="outline" onClick={() => setChecked(true)} disabled={value.trim().length === 0}>
          Check
        </Button>
      </div>
      {checked && (
        <p className={`mt-2 text-xs leading-relaxed ${isCorrect ? 'text-accent-2' : 'text-danger'}`}>
          {isCorrect ? 'Correct.' : `Not quite — correct answer: ${item.answer}. Hint: ${item.hint}`}
        </p>
      )}
    </div>
  )
}

export function WriteAlongMode({ items }: { items: WriteAlongItem[] }) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">No write-along prompts available for this topic yet.</p>
  }

  return (
    <div className="rounded-xl border border-border bg-card px-5">
      {items.map((item, i) => (
        <WriteAlongRow key={i} item={item} />
      ))}
    </div>
  )
}
