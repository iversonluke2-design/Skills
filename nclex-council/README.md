# ICU Council — NCLEX-NGN Prep

A study app for ICU-focused NCLEX-NGN prep, laid out like Claude's UI: a
collapsible sidebar (topics + study tools) alongside a main content pane.

Each topic has five study modes (tabs) plus a full NGN case study:

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
- **NGN case study** — a split-panel view (EHR chart tabs — vitals/labs/notes
  — beside the question) walking through 3 mixed-format NGN items per topic:
  standard single/SATA, a matrix/grid question, and a cloze (dropdown-in-text)
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
`src/data/modules/`.

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
