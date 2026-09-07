# ICU Council — NCLEX-NGN Prep

A study app for ICU-focused NCLEX-NGN prep. Each topic walks through a patho
chain, ICU-level depth and complications, a callout for the assumption
students usually miss, an NGN-style quiz with trap distractors, and a closing
"cannot miss" takeaway. Progress (attempts, best score) is tracked per topic
in the browser via `localStorage`.

Seed topics: DKA, Septic Shock, ARDS, Increased ICP, Cardiogenic Shock.

## Stack

React + TypeScript + Vite, Tailwind CSS v4. No backend — all content lives in
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
`src/data/types.ts`, then register it in `src/data/modules/index.ts`.

## Content notice

Content reflects standard, named clinical guidelines and trials (Surviving
Sepsis Campaign, ARDSnet/PROSEVA/FACTT, ADA hyperglycemic crises consensus,
Monro-Kellie doctrine, SCAI shock staging) — always cross-check against your
program's current course material before relying on it for an exam.
