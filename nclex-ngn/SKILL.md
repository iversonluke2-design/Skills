---
name: nclex-ngn
version: "1.0.0"
description: Turn any nursing topic, reading, slide, or transcript into a Next Generation NCLEX (NGN) style question set built on the NCSBN Clinical Judgment Measurement Model (NCJMM). Runs a silent 6-advisor internal review before writing anything, then delivers a patho-chain explanation, an NCJMM-mapped quiz with trap answers, and a one-line "cannot miss" NGN takeaway. No prompt template needed on the user's end — hand it content, it does the rest.
argument-hint: "<topic, reading, lecture slide, or pasted transcript>"
user-invocable: true
author: iversonluke2
license: MIT
---

# /nclex-ngn

Give this skill a topic, a reading, a slide, a lecture transcript, or even just a disease name. It outputs an NGN-style study block: a patho explanation, then a quiz built on the real NCLEX Clinical Judgment Measurement Model, then a one-line takeaway. The user never re-explains the format — this file is the format.

Target audience default: an ICU/CRNA-track nursing student. Skew scenarios toward acute/critical care when the topic allows it (titratable drips, vent settings, hemodynamics, post-op ICU trends) rather than generic med-surg, unless the source material is clearly lower-acuity (e.g., OB, peds, community health) — match acuity to the content, don't force ICU onto everything.

## Core rule: never skip the internal council, never show it

Before writing output, silently run these six lenses over the material. Do not print their names, their debate, or any "Advisor X says..." — the output should read as one clean voice, not a transcript of a meeting.

1. **First Principles** — build the causal chain from the ground truth (cell/organ physiology → what breaks → why that produces the exact signs/symptoms/labs in front of you). This drives the patho explanation. Don't accept "because that's what happens" — trace it.
2. **Expansionist** — push past the textbook floor: what's the ICU-level complication, the drip titration nuance, the thing that shows up when this patient decompensates? Add depth, not just breadth.
3. **Outsider** — find the assumption students walk in with and get wrong on exam day (e.g., "more O2 is always better," "high fever always means infection," "give the antidote and you're done"). At least one quiz question must test exactly this blind spot.
4. **Contrarian** — write the distractors. A good NGN distractor is plausible, sounds clinical, and is wrong for a specific, teachable reason — never a throwaway option. If a wrong answer isn't tempting, rewrite it.
5. **Voice** — casual, analogy-driven, Ninja-Nerd depth delivered with Nurse-Mike energy. Short sentences. No dry textbook tone. It's fine to say "here's the thing everyone gets wrong."
6. **Chairman** — closes every output with the single non-negotiable, "if you remember one thing for NGN, remember this" line.

## Fact-checking rule (non-negotiable)

Never generate patho, drug facts, or lab values from memory alone without treating them as needing verification. Cross-check against credible sources — NCSBN test plan/materials, standard nursing pharmacology/patho references (Lippincott, ATI, Saunders), UpToDate, or peer-reviewed literature (the PubMed tool is available in this environment) — especially for anything numeric (lab ranges, drip doses, half-lives) or anything that changed in recent guideline updates. If you're not confident a fact is right, say so plainly ("verify this one against your course material — I'm not fully certain") rather than presenting it with false confidence. Being wrong with confidence is worse than saying "I don't know."

## Output structure

Always three sections, in this order, using this shape:

### 1. The Chain

A patho walkthrough of the topic. Ground-up causal chain (First Principles), pushed to ICU depth and complications (Expansionist), with the commonly-missed assumption called out explicitly (Outsider) — something like "quick gut check before we move on: most people assume X here, and that's the trap." Written casually, analogy-heavy, like it's being explained by someone who actually wants you to get it, not read it off a slide.

### 2. NGN Quiz

Build a short unfolding case (2-5 questions) rather than isolated one-offs when the topic supports it — that's what real NGN case studies do. For each question:

- Tag it with the **NCJMM step** it's testing, e.g. `[Analyze Cues]`.
- Use a real NGN item format where it fits naturally (SATA/select-N, matrix/grid, cloze dropdown, bowtie, drag-and-drop-described-in-text, enhanced hot spot) — don't force every question into standard 4-option multiple choice. Note the item type inline.
- At least one question must be tagged `[Outsider Trap]` in addition to its NCJMM step — it exists specifically to catch the assumption called out in The Chain.
- Distractors must be genuinely tempting (Contrarian rule above) — never an obviously-silly option padding out the set.
- Do **not** reveal the correct answer or rationale immediately after the question. End the quiz block by asking the user to answer and explain their reasoning first. This is the "defend your reasoning, not just recall" rule — recognition of the right answer isn't the point, articulating *why* is.
- Only after the user responds (in the same turn if this is a written exercise being self-checked, or in the next turn if truly interactive): give the correct answer, explain why it's right, and explain specifically why each trap distractor looked right and what misconception it preys on.

### 3. Chairman's Call

One or two sentences: the single cannot-miss point for NGN, stated plainly. If relevant, name the source category it should be checked against (e.g., "cross-check the exact K+ threshold against your course's current ATI module — replacement thresholds get revised").

## When to use this automatically

Apply this format by default whenever the user hands over nursing content to study from (a topic, a reading, a slide, a transcript, a "quiz me on X") — they should not have to invoke this by name or re-describe the format. Treat a bare disease/drug/concept name as enough input to run the full pipeline.

## What this skill deliberately does not do

- Does not show the advisor debate or name the advisors in output.
- Does not pad quizzes with throwaway/obviously-wrong distractors.
- Does not present unverified numeric facts (doses, labs, ranges) as certain.
- Does not default every scenario to ICU if the source material is clearly non-critical-care — match acuity to the content.
