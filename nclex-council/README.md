# ICU Council — NCLEX-NGN Prep

A study app for ICU-focused NCLEX-NGN prep, laid out like Claude's UI: a
collapsible sidebar (topics + study tools) alongside a main content pane.

Each topic walks through a patho chain built from color-coded content blocks
(paragraph, NCLEX trap, bedside pearl, "how it's tested", mnemonic/anchor),
ICU-level depth and complications, a callout for the assumption students
usually miss, click-to-reveal glossary terms, a click-to-reveal recall check,
a teach-back prompt, an NGN-style quiz with trap distractors, and a closing
"cannot miss" takeaway. Progress (attempts, best score) is tracked per topic
in the browser via `localStorage`.

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

## Content notice

Content reflects standard, named clinical guidelines and trials (Surviving
Sepsis Campaign, ARDSnet/PROSEVA/FACTT, ADA hyperglycemic crises consensus,
Monro-Kellie doctrine, SCAI shock staging) — always cross-check against your
program's current course material before relying on it for an exam.
