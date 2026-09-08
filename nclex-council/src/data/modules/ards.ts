import type { Module } from '../types'

export const ards: Module = {
  id: 'ards',
  title: 'Acute Respiratory Distress Syndrome (ARDS)',
  system: 'Pulmonary / Critical Care',
  hook: "The oxygen sat won't come up no matter how high you crank the FiO2. That refusal to respond to oxygen is the entire diagnosis — and it's the thing the 'just give more O2' reflex completely misses.",
  pathoChain: [
    {
      heading: 'Diffuse alveolar damage from a systemic insult',
      blocks: [
        {
          type: 'p',
          text: 'ARDS is a syndrome, not a disease — a final common pathway from things like sepsis, pneumonia, aspiration, trauma, pancreatitis, or massive transfusion. Whatever the trigger, it causes diffuse damage to the alveolar-capillary membrane throughout both lungs.',
        },
        {
          type: 'p',
          text: 'That damaged membrane becomes leaky. Protein-rich fluid floods into the alveoli — this is pulmonary edema, but non-cardiogenic: the heart and its pumping pressure are not the problem here, the membrane itself failed.',
        },
        {
          type: 'bedside',
          text: "New bilateral crackles and climbing oxygen requirements within a week of a big hit — sepsis, aspiration, massive transfusion, trauma — is your bedside trigger to think ARDS, especially when the chest X-ray shows fresh bilateral infiltrates that don't fit a simple pneumonia picture.",
        },
      ],
    },
    {
      heading: 'Flooded alveoli → shunt physiology → refractory hypoxemia',
      blocks: [
        {
          type: 'p',
          text: "Fluid-filled and collapsed alveoli can't participate in gas exchange, but blood keeps flowing past them anyway. That's intrapulmonary shunt: blood passing through the lung without ever picking up oxygen, then mixing back into arterial circulation.",
        },
        {
          type: 'p',
          text: "This is the key mechanical fact that drives everything downstream: shunted blood does not respond to supplemental oxygen. Cranking FiO2 to 100% barely moves the needle, because the problem isn't a lack of oxygen in the alveoli that ARE working — it's that a huge fraction of blood is bypassing functional alveoli entirely. Refractory hypoxemia despite high FiO2 is the hallmark.",
        },
        {
          type: 'trap',
          text: "Watching a nurse chase a falling sat by dialing FiO2 up to 100% and stopping there, without touching PEEP, is the trap in real time. Once you're maxed on FiO2 and still hypoxic, the next move is PEEP and recruitment, not accepting the low sat or waiting.",
        },
      ],
    },
    {
      heading: 'Stiff, non-compliant lungs and the ventilator dilemma',
      blocks: [
        {
          type: 'p',
          text: 'Damaged alveoli plus loss of surfactant means the lungs become stiff and non-compliant. Normal tidal volumes now generate dangerously high pressures in the alveoli that ARE still open, over-distending them (volutrauma) and worsening the injury — this is called ventilator-induced lung injury.',
        },
        {
          type: 'p',
          text: "So mechanical ventilation, the thing meant to save the patient, is also capable of making the underlying injury worse if it's not managed with lung-protective strategy.",
        },
        {
          type: 'howtested',
          text: 'NCLEX will hand you a plateau pressure reading and expect you to flag anything ≥30 cmH2O as a volutrauma risk requiring a tidal volume adjustment — not just a number to record on the flowsheet.',
        },
        {
          type: 'anchor',
          text: 'Anchor the numbers: 6-30-permissive. Tidal volume ~6 mL/kg predicted body weight, plateau pressure under 30, and permissive hypercapnia is an accepted tradeoff.',
        },
      ],
    },
  ],
  icuPearls: [
    'Berlin Definition classifies ARDS by P/F ratio (PaO2/FiO2) with PEEP ≥5: mild 200–300, moderate 100–200, severe <100. Onset within 1 week of a known insult, bilateral infiltrates on imaging, and respiratory failure not fully explained by cardiac failure/fluid overload.',
    "ARDSnet lung-protective ventilation is the evidence-based standard: low tidal volume, 4–6 mL/kg of PREDICTED body weight (not actual weight), plateau pressure kept under 30 cmH2O, permissive hypercapnia accepted (letting CO2 run a bit high is safer than the alternative of high-volume ventilation).",
    'PEEP/FiO2 tables guide oxygenation — PEEP recruits collapsed alveoli and reduces the shunt fraction directly, which is why titrating PEEP (not just FiO2) is the actual fix for refractory hypoxemia.',
    'Prone positioning improves mortality in moderate-to-severe ARDS (P/F <150) — the PROSEVA trial. Proning improves V/Q matching and recruits dorsal lung regions that collapse under gravity in the supine position. Sessions typically run 12–16+ hours.',
    'Early neuromuscular blockade (e.g., cisatracurium) may be used in severe ARDS to reduce patient-ventilator dyssynchrony and improve oxygenation, though its routine use is more selective now than in earlier trials.',
    'Conservative fluid management once the patient is hemodynamically stable (FACTT trial) improves lung function and shortens ventilator days — this is the opposite instinct from early resuscitation and is easy to get backwards.',
    'ECMO (extracorporeal membrane oxygenation) is reserved for refractory hypoxemia despite optimized lung-protective ventilation, proning, and other measures — a rescue therapy, not a first-line move.',
  ],
  outsiderFlag:
    "Students default to 'hypoxemia = more oxygen' because that pattern works for most respiratory problems they've studied. The hidden assumption is that all hypoxemia responds to supplemental oxygen. Shunt physiology breaks that assumption completely — refractory hypoxemia despite high FiO2 is the defining feature of ARDS precisely because the fix isn't more oxygen, it's recruiting collapsed alveoli (PEEP, proning) so blood actually passes functional lung tissue. Reaching for FiO2 first, instead of asking about PEEP and positioning, is the tell that someone doesn't understand what's mechanically broken.",
  glossary: [
    { term: 'intrapulmonary shunt', definition: "Blood passing through the lungs without ever contacting a functional, ventilated alveolus, so it never picks up oxygen — the core mechanism behind ARDS's refractory hypoxemia." },
    { term: 'refractory hypoxemia', definition: "Low oxygen saturation that doesn't meaningfully improve even at high FiO2 — the hallmark of shunt physiology rather than simple V/Q mismatch." },
    { term: 'volutrauma', definition: 'Lung injury from alveolar over-distension caused by tidal volumes that are too large for stiff, non-compliant ARDS lungs.' },
    { term: 'ventilator-induced lung injury', definition: 'Additional lung damage caused by the mechanical ventilator itself — from excessive volume (volutrauma), pressure (barotrauma), or repeated opening/closing of alveoli (atelectrauma).' },
  ],
  recallChecks: [
    {
      question: "Why doesn't increasing FiO2 fix hypoxemia in ARDS?",
      answer: "Because the hypoxemia comes from intrapulmonary shunt — blood bypassing collapsed, fluid-filled alveoli entirely — so raising the oxygen concentration in alveoli that are already working doesn't reach the blood that never passes through functional lung tissue.",
    },
    {
      question: 'What two numbers anchor the ARDSnet lung-protective ventilation strategy?',
      answer: 'Tidal volume of 4–6 mL/kg predicted body weight, and plateau pressure kept under 30 cmH2O.',
    },
    {
      question: 'At what P/F ratio does prone positioning show a mortality benefit?',
      answer: 'A P/F ratio under 150 — moderate-to-severe ARDS, per the PROSEVA trial.',
    },
    {
      question: 'Why is conservative fluid management preferred once an ARDS patient is hemodynamically stable?',
      answer: 'Per the FACTT trial, conservative fluids improve lung function and shorten ventilator days — the opposite instinct from early aggressive resuscitation.',
    },
  ],
  teachBack: {
    prompt: "Explain to a classmate why cranking FiO2 to 100% doesn't fix an ARDS patient's hypoxemia, and what actually does.",
    points: [
      "Shunt physiology means blood is bypassing collapsed, fluid-filled alveoli entirely — raising the oxygen concentration in alveoli that ARE working doesn't touch blood that never passes through them.",
      'PEEP recruits collapsed alveoli, directly reducing the shunt fraction — that is the mechanistic fix, not more oxygen.',
      'Prone positioning helps for the same reason: it recruits dorsal lung regions that collapse under gravity when supine.',
      "A strong explanation names 'shunt' specifically, not just 'the lungs are bad,' and can say why oxygen concentration is the wrong lever for that mechanism.",
    ],
  },
  writeAlong: [
    {
      prompt: 'A commonly used ARDSnet starting tidal volume target is _____ mL/kg predicted body weight.',
      answer: '6',
      hint: "It's the upper end of the 4–6 mL/kg range, often used as the initial setting.",
    },
    {
      prompt: 'Plateau pressure should be kept below _____ cmH2O to avoid volutrauma.',
      answer: '30',
      hint: 'This is the ceiling ARDSnet lung-protective strategy targets.',
    },
    {
      prompt: 'The trial that demonstrated a mortality benefit for prone positioning in severe ARDS is the _____ trial.',
      answer: 'PROSEVA',
      hint: 'Published in NEJM, 2013.',
    },
  ],
  caseStudy: {
    scenario:
      "A 45-year-old is on hospital day 4 for severe pancreatitis. Nursing notices increasing work of breathing and climbing oxygen requirements overnight.",
    chart: [
      {
        id: 'vitals',
        label: 'Vitals',
        kind: 'vitals',
        items: [
          { label: 'HR', value: '112 bpm', flagged: true },
          { label: 'BP', value: '118/76 mmHg' },
          { label: 'RR', value: '30/min', flagged: true },
          { label: 'SpO2', value: '88% on 6L nasal cannula', flagged: true },
          { label: 'Temp', value: '38.2°C', flagged: true },
        ],
      },
      {
        id: 'labs',
        label: 'Labs / ABG',
        kind: 'labs',
        items: [
          { label: 'PaO2', value: '58 mmHg', flagged: true },
          { label: 'PaCO2', value: '48 mmHg', flagged: true },
          { label: 'pH', value: '7.31', flagged: true },
          { label: 'P/F ratio', value: '~97', flagged: true },
        ],
      },
      {
        id: 'notes',
        label: 'Notes',
        kind: 'notes',
        text: 'Bilateral infiltrates on chest X-ray. No evidence of volume overload or cardiac dysfunction on echo. Onset within the past week, tied clearly to the pancreatitis admission.',
      },
    ],
    questions: [
      {
        id: 'ards-case-1',
        type: 'single',
        difficulty: 'medium',
        stem: 'Given this chart, what is the priority action?',
        choices: [
          { id: 'a', text: 'Prepare for intubation and initiation of lung-protective mechanical ventilation', correct: true, rationale: 'Correct — a P/F ratio of ~97 is severe ARDS, refractory to supplemental oxygen at this level, and needs escalation to protective mechanical ventilation.' },
          { id: 'b', text: 'Increase nasal cannula flow to 8L and reassess in an hour', correct: false, rationale: 'Refractory hypoxemia from shunt at this severity will not adequately respond to more nasal cannula flow — this delays necessary escalation.' },
          { id: 'c', text: 'Administer furosemide for suspected volume overload', correct: false, rationale: 'The echo shows no volume overload or cardiac dysfunction — this is non-cardiogenic edema (ARDS), not a fluid overload picture.' },
          { id: 'd', text: 'Reposition to left lateral only; no further action needed', correct: false, rationale: 'Positioning alone is insufficient for a P/F ratio this low — proning may eventually help, but escalation of respiratory support is the priority now.' },
        ],
      },
      {
        id: 'ards-case-2',
        type: 'matrix',
        stem: 'For each finding on this chart, indicate whether it is expected in ARDS, unexpected, or requires immediate follow-up.',
        options: [
          { id: 'expected', label: 'Expected' },
          { id: 'unexpected', label: 'Unexpected' },
          { id: 'followup', label: 'Immediate follow-up' },
        ],
        rows: [
          { id: 'row-cxr', label: 'Bilateral infiltrates on chest X-ray', correctOptionId: 'expected', rationale: 'Bilateral infiltrates are part of the Berlin Definition criteria for ARDS.' },
          { id: 'row-echo', label: 'Normal echo, no volume overload', correctOptionId: 'expected', rationale: 'This supports a non-cardiogenic cause, consistent with ARDS rather than cardiogenic pulmonary edema.' },
          { id: 'row-pf', label: 'P/F ratio of ~97', correctOptionId: 'followup', rationale: 'This defines severe ARDS and needs immediate escalation of respiratory support, not just documentation.' },
          { id: 'row-onset', label: 'Symptom onset within a week of the pancreatitis admission', correctOptionId: 'expected', rationale: 'Onset within one week of a known insult is part of the Berlin Definition timing criteria.' },
        ],
      },
      {
        id: 'ards-case-3',
        type: 'cloze',
        template:
          "This patient's P/F ratio of {{first}} meets Berlin Definition criteria for {{second}} ARDS, and the priority intervention is {{third}} rather than simply raising FiO2 further.",
        blanks: [
          { id: 'first', choices: ['97', '250', '310'], correct: '97' },
          { id: 'second', choices: ['mild', 'moderate', 'severe'], correct: 'severe' },
          { id: 'third', choices: ['PEEP titration and lung-protective ventilation', 'higher-flow nasal cannula', 'diuresis'], correct: 'PEEP titration and lung-protective ventilation' },
        ],
        rationale: 'A P/F ratio under 100 defines severe ARDS. Refractory hypoxemia from shunt needs PEEP/recruitment (and likely mechanical ventilation), not simply more supplemental oxygen.',
      },
    ],
  },
  quiz: [
    {
      id: 'ards-1',
      type: 'single',
      difficulty: 'medium',
      stem: 'A patient with ARDS on mechanical ventilation has an SpO2 of 84% on FiO2 100%. What action is most appropriate?',
      choices: [
        { id: 'a', text: 'There is nothing more to titrate — FiO2 is already maximized', correct: false, rationale: 'This treats FiO2 as the only lever, which is exactly the trap. It isn\'t.' },
        { id: 'b', text: 'Increase PEEP to recruit collapsed alveoli and reduce intrapulmonary shunt', correct: true, rationale: 'Correct. Refractory hypoxemia at max FiO2 signals shunt physiology — increasing PEEP recruits alveoli so more blood passes ventilated lung tissue, which is the actual fix.' },
        { id: 'c', text: 'Sedate the patient more heavily and reassess in 4 hours', correct: false, rationale: 'This delays a necessary intervention and does not address the shunt mechanism.' },
        { id: 'd', text: 'Switch to a higher tidal volume to increase minute ventilation', correct: false, rationale: 'Higher tidal volumes in ARDS increase the risk of volutrauma and worsen lung injury — the opposite of the lung-protective strategy indicated here.' },
      ],
    },
    {
      id: 'ards-2',
      type: 'single',
      difficulty: 'hard',
      outsider: true,
      stem: "A student says: 'If the patient is hypoxic, just turn the oxygen up until the sat improves — that always works.' What assumption does this statement get wrong specifically in ARDS?",
      choices: [
        { id: 'a', text: 'It assumes all hypoxemia is due to a lack of available oxygen in the alveoli, when ARDS hypoxemia is driven by shunt — blood bypassing collapsed alveoli entirely, which oxygen concentration cannot fix', correct: true, rationale: 'Exactly the outsider trap — the statement generalizes a rule that only holds for V/Q mismatch or hypoventilation-type hypoxemia, not shunt physiology.' },
        { id: 'b', text: 'It assumes the patient is not already on 100% oxygen', correct: false, rationale: "This isn't the conceptual flaw being tested — the flaw is mechanistic, not about current FiO2 setting." },
        { id: 'c', text: 'Nothing is wrong with the statement — increasing FiO2 is always the correct first response to hypoxemia', correct: false, rationale: 'This is the misconception itself, not a correct answer.' },
        { id: 'd', text: 'It assumes the ventilator is functioning properly', correct: false, rationale: 'Equipment malfunction isn\'t the concept being tested here — the physiology of shunt is.' },
      ],
      ngnNote: 'This is a classic "recognize cues vs. take action" NGN gap: the cue (hypoxemia unresponsive to FiO2) should trigger a specific mechanistic hypothesis (shunt), which then dictates a specific intervention (PEEP/recruitment), not a generic one.',
    },
    {
      id: 'ards-3',
      type: 'sata',
      difficulty: 'easy',
      stem: 'Which interventions are consistent with lung-protective ventilation strategy in ARDS? Select all that apply.',
      choices: [
        { id: 'a', text: 'Setting tidal volume at 4–6 mL/kg predicted body weight', correct: true, rationale: 'Correct — the core ARDSnet strategy.' },
        { id: 'b', text: 'Keeping plateau pressure below 30 cmH2O', correct: true, rationale: 'Correct — limits alveolar overdistension.' },
        { id: 'c', text: 'Accepting a higher PaCO2 than normal (permissive hypercapnia)', correct: true, rationale: 'Correct — a deliberate tradeoff to avoid high-volume ventilation.' },
        { id: 'd', text: 'Prone positioning for a patient with P/F ratio under 150', correct: true, rationale: 'Correct — proning improves outcomes specifically in moderate-to-severe ARDS.' },
        { id: 'e', text: 'Maximizing tidal volume to normalize PaCO2 as quickly as possible', correct: false, rationale: 'This is the opposite of lung-protective strategy and increases volutrauma risk.' },
      ],
    },
  ],
  chairman: {
    cannotMiss: 'Hypoxemia that won\'t budge on high FiO2 in an ARDS patient is a shunt problem, not an oxygen-delivery problem. PEEP and positioning (proning) are the levers that actually work.',
    ngnTakeaway: "NGN respiratory case studies will hand you a ventilator settings panel and ABGs and expect you to reason through the mechanism, not just recognize 'low O2 = bad.' Practice explaining WHY an intervention works physiologically — that's the layer the exam is now testing beyond simple recall.",
  },
  sources: [
    'ARDS Definition Task Force, "Berlin Definition of ARDS" (JAMA, 2012)',
    'ARDSnet / ARMA trial — low tidal volume ventilation (NEJM, 2000)',
    'PROSEVA trial — prone positioning in severe ARDS (NEJM, 2013)',
    'FACTT trial — conservative vs. liberal fluid management in ALI (NEJM, 2006)',
  ],
}
