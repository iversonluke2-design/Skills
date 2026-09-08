# ICU Council — NCLEX-NGN Prep

A study app for ICU-focused NCLEX-NGN prep, laid out like Claude's UI: a
collapsible sidebar alongside a main content pane.

## Projects

The sidebar's top item is a **project switcher** — each project is a subject
(e.g. "ICU Critical Care", the seeded project, or one you create — "Patho",
"NUR198", whatever your course is) holding its own set of topics. "+ New
project" creates an empty project (name + description, persisted in the
browser); it starts with no topics — the app never invents subject matter,
only what you upload becomes a topic. Hover a project or topic row for
rename (pencil) and delete (trash) — these work on both built-in and
user-created projects/topics via a `localStorage` override layer, so
nothing about the seeded content is hard-coded as untouchable.

## Uploading a lecture — the home-page chat

The home view (click the app name/logo) opens with a Claude-style chat box:
paste a lecture, reading, or notes (or attach a `.txt`/`.md` file) and it
calls the Anthropic API **directly from your browser**, using your own
Anthropic API key, to turn only what you gave it into a new topic under the
active project. Nothing is invented — the model is instructed to use only
facts present in what you pasted, and to write shorter lists rather than
padding with fabricated detail.

This requires your own Anthropic API key (get one at console.anthropic.com):
pasted once, it's stored in `localStorage` and sent straight to Anthropic's
API with the `anthropic-dangerous-direct-browser-access` header — no other
server sees it. Usage is billed to your own Anthropic account, separate from
any Claude subscription. PDFs/slides aren't parsed yet — copy the text out
and paste it in. See `src/lib/anthropic.ts` for the generation prompt and
`src/lib/settings.ts` for key storage.

## Per-topic modes

Expand a topic in the sidebar to pick one of six modes:

- **The Council** — the all-in-one experience: Read, Flashcards, Recall
  check, Random recall, and Write-along as tabs in one page, ending in
  the quiz/exam entry points.
- **Study Guide** — just the Read-mode content on its own.
- **Quiz** — the topic's own MC/SATA quiz with full rationale.
- **Exam** — the NGN-style case study (split-panel EHR chart + mixed
  question types).
- **Flashcards** — the flip-card deck on its own.
- **Anki** — real spaced repetition: New/Learn/Due queue, Again/Hard/Good/Easy
  grading (SM-2 scheduling), persisted per card in `localStorage`.

Each of these reuses the same underlying components — Study Guide, Quiz,
Exam, and Flashcards are just The Council's own pieces rendered standalone,
so there's one source of truth for each mode's content and logic.

### What "The Council" (and Study Guide) actually contain

- **Read** — a patho chain built from color-coded content blocks (paragraph,
  NCLEX trap, bedside pearl, "how it's tested", mnemonic/anchor), ICU-level
  depth and complications, a callout for the assumption students usually
  miss, click-to-reveal glossary terms (auto-linked anywhere they appear in
  the text), a teach-back prompt, and sources.
- **Flashcards** — flip through a deck built from the topic's glossary +
  recall-check items (shuffle, prev/next).
- **Recall check** — click-to-reveal quick Q&A.
- **Random recall** — pulls one random card at a time from the same pool.
- **Write-along** — typed fill-in-the-blank prompts, checked on submit with
  a hint if wrong.
- **Exam** — a split-panel view (EHR chart tabs — vitals/labs/notes — beside
  the question) walking through 3 mixed-format NGN items per topic: standard
  single/SATA, a matrix/grid question, and a cloze (dropdown-in-text)
  question, ending in a score.

Plus a standalone NGN-style quiz with trap distractors and a closing "cannot
miss" takeaway. Progress (attempts, best score) is tracked per topic in the
browser via `localStorage`.

**New quiz** (sidebar) builds a custom question set from any combination of
topics and difficulty (easy/medium/hard), in either style:
- **Practice** — answer + rationale shown after each question (same as topic quizzes).
- **Timed exam** — countdown per question, no feedback until the end, then a
  grade and full per-question review (your answer vs. correct answer + rationale).

Seed topics: DKA, Septic Shock, ARDS, Increased ICP, Cardiogenic Shock.

## Stack

React + TypeScript + Vite, Tailwind CSS v4, shadcn/ui (Sidebar, Button, Card,
Badge, Progress — vendored into `src/components/ui/`, not fetched from a
registry at build time). No backend — all content lives in
`src/data/modules/`, spaced-repetition scheduling in `src/lib/spacedRepetition.ts`
(SM-2), everything persisted via `localStorage`.

## Develop

```bash
npm install
npm run dev       # dev server
npm run build     # typecheck + production build
npm run lint      # oxlint
npm run preview   # serve the production build locally
```

## Adding a new topic

Add a file in `src/data/modules/` following the `Module` shape in
`src/data/types.ts`, then register it in `src/data/modules/index.ts`. Each
`pathoChain` section is a list of `blocks` (`p` / `trap` / `bedside` /
`howtested` / `anchor`); a module's `glossary` terms are auto-linked
anywhere they appear in block or pearl text (no manual markup needed).
`writeAlong` and `caseStudy` are required fields too — see any existing
module for the shape of a chart tab (`vitals`/`labs`/`notes`) and the three
case-question types (`single`/`sata`, `matrix`, `cloze`).

## Content notice

Content reflects standard, named clinical guidelines and trials (Surviving
Sepsis Campaign, ARDSnet/PROSEVA/FACTT, ADA hyperglycemic crises consensus,
Monro-Kellie doctrine, SCAI shock staging) — always cross-check against your
program's current course material before relying on it for an exam.
