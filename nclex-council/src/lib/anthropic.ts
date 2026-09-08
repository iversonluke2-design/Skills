import type { Module } from '../data/types'

const API_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-sonnet-5'

export class AnthropicError extends Error {}

function slugify(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return `${base || 'topic'}-${Date.now().toString(36)}`
}

const SYSTEM_PROMPT = `You turn a student's uploaded lecture, reading, or notes into ONE structured study topic as strict JSON.

Hard rule: use ONLY facts, numbers, and claims that appear in the material the student pasted. Never invent a fact, statistic, guideline, or example that isn't in the source text. If the source text is too thin for a field (e.g. not enough for 5 quiz questions), write fewer items rather than padding with invented content — it is fine for a list to be short. Never fabricate to fill a quota.

Teaching style for the "read" content (pathoChain sections and blocks): casual, analogy-driven, conversational depth — explain the WHY and the chain of cause-and-effect, not just definitions. Within each block use these types:
- "p": normal explanatory paragraph
- "trap": a mistake students commonly make or a NCLEX-style distractor trap related to this point
- "bedside": a practical bedside/real-world application pearl
- "howtested": how this exact point tends to show up in exam questions
- "anchor": a short mnemonic or memory anchor

icuPearls: an array of deeper, "one level past the textbook" pearls or complications a strong student should know (only if the source material supports them — do not invent clinical detail beyond the source).
outsiderFlag: one sentence naming an assumption students commonly gloss over or get wrong about this specific topic, grounded in the material.
glossary: key terms defined using the source material's own definitions/context.
recallChecks: short question/answer pairs testing recall of the material.
teachBack: one prompt asking the learner to explain the concept back, plus 2-4 bullet points of what a correct teach-back should include.
writeAlong: fill-in-the-blank prompts drawn from the material, each with the answer and a one-line hint.
quiz: multiple-choice or select-all-that-apply questions (type "single" or "sata"), each with 3-5 choices, exactly one/more marked correct with a rationale on every choice (why right or why wrong), a difficulty ("easy"/"medium"/"hard"), and set "outsider": true on any question that specifically targets the hidden assumption from outsiderFlag.
caseStudy: one short clinical or scenario vignette in "scenario", a "chart" array of 2-3 tabs (kind "vitals" with items {label,value,flagged?}, kind "labs" with items {label,value,flagged?}, or kind "notes" with a text blob) built from details in the source material (invent plausible-but-clearly-illustrative chart values ONLY if the source discusses the relevant vitals/labs conceptually but gives no numbers — otherwise use the source's own numbers), and a "questions" array of 2-4 items mixing type "single"/"sata", type "matrix" ({options:[{id,label}], rows:[{id,label,correctOptionId,rationale}]}), and type "cloze" ({template with {{blank_id}} placeholders, blanks:[{id,choices,correct}], rationale}).
chairman: {"cannotMiss": one sentence naming the single most exam-critical takeaway, "ngnTakeaway": one sentence on how this shows up in NGN-style NCLEX items}.
sources: array with one string naming the material the student provided (e.g. "Student-provided lecture/notes — always cross-check against your course's current material").

Respond with ONLY a single JSON object, no markdown fences, no commentary, matching this exact shape:
{
  "title": string,
  "system": string (short category label, e.g. a body system, unit, or subject area — whatever fits the material),
  "hook": string (1-2 sentence hook framing why this topic matters),
  "pathoChain": [{"heading": string, "blocks": [{"type": "p"|"trap"|"bedside"|"howtested"|"anchor", "text": string}]}],
  "icuPearls": [string],
  "outsiderFlag": string,
  "glossary": [{"term": string, "definition": string}],
  "recallChecks": [{"question": string, "answer": string}],
  "teachBack": {"prompt": string, "points": [string]},
  "writeAlong": [{"prompt": string, "answer": string, "hint": string}],
  "quiz": [{"id": string, "stem": string, "type": "single"|"sata", "difficulty": "easy"|"medium"|"hard", "choices": [{"id": string, "text": string, "correct": boolean, "rationale": string}], "outsider"?: boolean}],
  "caseStudy": {
    "scenario": string,
    "chart": [{"id": string, "label": string, "kind": "vitals"|"labs", "items": [{"label": string, "value": string, "flagged"?: boolean}]} | {"id": string, "label": string, "kind": "notes", "text": string}],
    "questions": [
      {"id": string, "stem": string, "type": "single"|"sata", "difficulty": "easy"|"medium"|"hard", "choices": [...]}
      | {"id": string, "type": "matrix", "stem": string, "options": [{"id": string, "label": string}], "rows": [{"id": string, "label": string, "correctOptionId": string, "rationale": string}]}
      | {"id": string, "type": "cloze", "template": string, "blanks": [{"id": string, "choices": [string], "correct": string}], "rationale": string}
    ]
  },
  "chairman": {"cannotMiss": string, "ngnTakeaway": string},
  "sources": [string]
}`

function extractJson(raw: string): unknown {
  const trimmed = raw.trim()
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
  const candidate = fenced ? fenced[1] : trimmed
  return JSON.parse(candidate)
}

export async function generateModuleFromText(apiKey: string, projectName: string, sourceText: string): Promise<Module> {
  if (!apiKey.trim()) {
    throw new AnthropicError('No API key saved yet — add your Anthropic API key first.')
  }
  if (sourceText.trim().length < 40) {
    throw new AnthropicError('That looks too short to be a lecture or reading — paste more of the material.')
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey.trim(),
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 8000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Project/subject: ${projectName}\n\nSource material (lecture, reading, or notes) — pasted by the student:\n\n${sourceText}`,
        },
      ],
    }),
  })

  if (!response.ok) {
    const body = await response.text().catch(() => '')
    if (response.status === 401) {
      throw new AnthropicError('That API key was rejected — double-check it in the Anthropic console and re-save it.')
    }
    if (response.status === 429) {
      throw new AnthropicError('Rate limited by the Anthropic API — wait a moment and try again.')
    }
    throw new AnthropicError(`Anthropic API error (${response.status}): ${body.slice(0, 300) || 'no details returned'}`)
  }

  const data = (await response.json()) as { content?: Array<{ type: string; text?: string }> }
  const text = data.content?.find((block) => block.type === 'text')?.text
  if (!text) {
    throw new AnthropicError('The API returned no text content — try again.')
  }

  let parsed: Omit<Module, 'id'>
  try {
    parsed = extractJson(text) as Omit<Module, 'id'>
  } catch {
    throw new AnthropicError('Could not parse the generated topic as JSON — try again, or paste a cleaner excerpt.')
  }

  if (!parsed.title || !Array.isArray(parsed.pathoChain)) {
    throw new AnthropicError('The generated topic was missing required fields — try again.')
  }

  return { ...parsed, id: slugify(parsed.title) }
}
