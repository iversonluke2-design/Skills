import type { Module } from '../types'

export const septicShock: Module = {
  id: 'septic-shock',
  title: 'Septic Shock',
  system: 'Multisystem / Distributive Shock',
  hook: "The reflex is 'shock means fluids.' In septic shock that's true — until it isn't, and the same reflex is what puts your patient into flash pulmonary edema.",
  pathoChain: [
    {
      heading: 'Infection triggers an inflammatory wildfire',
      body: [
        "It starts with an infection (usually gram-negative bacteria, but any source) triggering a massive systemic inflammatory response — cytokines like TNF-alpha and IL-1/IL-6 flood the bloodstream. This isn't localized anymore; the whole vascular system is reacting.",
        "Those inflammatory mediators cause widespread vasodilation (nitric oxide-driven) and increased capillary permeability. Picture every blood vessel in the body relaxing and getting leaky at the same time.",
      ],
    },
    {
      heading: 'Distributive shock: the tank is fine, the plumbing failed',
      body: [
        "This is what makes septic shock a distributive shock, fundamentally different from hypovolemic shock. The blood volume hasn't necessarily dropped — it's been redistributed into a vascular space that's now way too big (vasodilation) and leaking fluid into the tissues (capillary leak → third-spacing → edema).",
        "Effective circulating volume crashes even though total body fluid might be normal or even high. Blood pressure drops because the container (vasculature) is now way bigger than the volume inside it.",
      ],
    },
    {
      heading: 'Hypoperfusion → anaerobic metabolism → lactate',
      body: [
        "With vessels dilated and leaky, tissues stop getting adequately perfused. Cells shift to anaerobic metabolism, producing lactate. Lactate isn't just a lab value to chart — it's a direct marker of how badly tissue is being starved of oxygen, and trending it tells you if your interventions are working.",
        "Left uncorrected: multi-organ dysfunction — acute kidney injury, ARDS, DIC, hepatic dysfunction, altered mentation — because every organ is running on an oxygen deficit.",
      ],
    },
  ],
  icuPearls: [
    "Surviving Sepsis Campaign Hour-1 bundle: measure lactate (remeasure if initial >2 mmol/L), obtain blood cultures BEFORE antibiotics, give broad-spectrum antibiotics within 1 hour of recognition, begin rapid 30 mL/kg crystalloid for hypotension or lactate ≥4 mmol/L, and apply vasopressors if hypotensive during or after fluid resuscitation to keep MAP ≥ 65 mmHg.",
    'Norepinephrine is the first-line vasopressor for septic shock. Vasopressin is typically added as a second agent to reduce norepinephrine dose. Epinephrine is a third-line addition. Dopamine has fallen out of favor due to arrhythmia risk.',
    "The 30 mL/kg bolus is a starting point, not a blank check. Reassess with dynamic measures — passive leg raise response, pulse pressure variation, bedside ultrasound (IVC collapsibility) — rather than just running more fluid because the pressure is still low.",
    'Consider IV hydrocortisone in septic shock that remains hemodynamically unstable despite adequate fluids and vasopressors (refractory shock) — addresses relative adrenal insufficiency seen in critical illness.',
    'Source control matters as much as antibiotics — drain the abscess, pull the infected line, remove the necrotic tissue. Antibiotics alone can\'t win against an undrained source.',
    'A central line and arterial line are typically needed for vasopressor administration and continuous blood pressure monitoring — peripheral norepinephrine for a short bridge is increasingly accepted in many units, but extravasation risk (tissue necrosis) is why central access remains standard for anything beyond brief peripheral use.',
  ],
  outsiderFlag:
    "Every nursing student is trained hard on 'shock = fluids' from the hypovolemic-shock lecture, and that reflex carries over uncritically. The hidden assumption: that fluid resuscitation is unlimited and always beneficial. It isn't. Because septic shock causes capillary leak, aggressive or unmonitored fluid boluses push fluid straight into the interstitium and lungs — over-resuscitation is a well-documented driver of ARDS and worse outcomes in sepsis. The instinct to 'just give more fluid' when the pressure doesn't respond is exactly the moment you should be reassessing volume status and reaching for a vasopressor instead.",
  quiz: [
    {
      id: 'sepsis-1',
      type: 'single',
      stem: 'A patient in septic shock has received 30 mL/kg of crystalloid over the past hour. MAP remains 58 mmHg. Lung sounds are clear, IVC is collapsible on bedside ultrasound. What is the priority next action?',
      choices: [
        { id: 'a', text: 'Administer an additional 30 mL/kg fluid bolus', correct: false, rationale: 'Tempting because "still hypotensive" reads as "needs more volume" — but that\'s only correct if the patient shows signs of being fluid-responsive, which the clear lungs/collapsible IVC do suggest here. Still, guidelines move to vasopressors once the initial resuscitation bolus fails to restore MAP, run concurrently with ongoing reassessment rather than open-ended re-bolusing.' },
        { id: 'b', text: 'Start norepinephrine to target a MAP of at least 65 mmHg', correct: true, rationale: 'Correct per Surviving Sepsis Campaign: after initial fluid resuscitation, if MAP remains below 65 mmHg, vasopressors (norepinephrine first-line) are indicated rather than escalating fluids indefinitely.' },
        { id: 'c', text: 'Hold all further intervention and reassess in one hour', correct: false, rationale: 'A MAP of 58 mmHg means inadequate organ perfusion right now — waiting an hour risks worsening organ injury.' },
        { id: 'd', text: 'Administer furosemide to reduce preload', correct: false, rationale: 'This patient has clear lungs and a collapsible IVC — signs of relative hypovolemia, not fluid overload. Diuresing now would worsen shock.' },
      ],
      ngnNote: 'Notice the clear lungs and collapsible IVC — that data is what tells you this patient is still plausibly fluid-responsive, but the bundle escalation timeline still points to vasopressor support once the initial bolus target has been met without a MAP response.',
    },
    {
      id: 'sepsis-2',
      type: 'single',
      outsider: true,
      stem: 'A nursing student reasons: "This patient is in shock, so I should push fluids until the blood pressure normalizes." What is the flaw in applying this reasoning universally to septic shock?',
      choices: [
        { id: 'a', text: 'Septic shock involves capillary leak, so unlimited fluid resuscitation can cause pulmonary edema and worsen outcomes rather than fix perfusion', correct: true, rationale: "This is the core outsider trap: 'shock' is not one physiologic problem. Distributive shock behaves differently from hypovolemic shock, and treating them identically causes harm." },
        { id: 'b', text: 'There is no flaw — fluids should always be maximized in any type of shock until pressure normalizes', correct: false, rationale: 'This is the exact over-generalization the question is testing for.' },
        { id: 'c', text: 'Fluids are contraindicated in septic shock entirely', correct: false, rationale: 'Fluids are a first-line intervention in septic shock — the issue is applying them without limit or reassessment, not avoiding them altogether.' },
        { id: 'd', text: 'Blood pressure is not a reliable indicator of perfusion in shock', correct: false, rationale: "MAP is in fact a key perfusion target in septic shock management (goal ≥65 mmHg) — it's not unreliable, it's just not the only variable, and fluids aren't the only tool to fix it." },
      ],
    },
    {
      id: 'sepsis-3',
      type: 'sata',
      stem: 'Which actions fall within the Surviving Sepsis Campaign Hour-1 bundle? Select all that apply.',
      choices: [
        { id: 'a', text: 'Obtain blood cultures before starting antibiotics', correct: true, rationale: 'Correct — cultures should be drawn prior to (or without significantly delaying) antibiotic administration.' },
        { id: 'b', text: 'Measure serum lactate level', correct: true, rationale: 'Correct — and remeasure if the initial lactate is elevated (>2 mmol/L).' },
        { id: 'c', text: 'Administer broad-spectrum antibiotics within 1 hour', correct: true, rationale: 'Correct — timely empiric antibiotics are strongly tied to survival.' },
        { id: 'd', text: 'Begin 30 mL/kg crystalloid for hypotension or lactate ≥ 4 mmol/L', correct: true, rationale: 'Correct — rapid crystalloid administration is part of the bundle.' },
        { id: 'e', text: 'Start dopamine as the first-line vasopressor', correct: false, rationale: 'Norepinephrine is first-line, not dopamine, which carries higher arrhythmia risk and is no longer preferred.' },
      ],
    },
  ],
  chairman: {
    cannotMiss: "Fluids are step one, not the whole plan. If MAP is still under 65 after the initial resuscitation bolus, the answer is a vasopressor (norepinephrine), not another unmonitored bolus.",
    ngnTakeaway: "NGN scenarios on shock states are designed to test whether you can tell shock types apart by their hemodynamic fingerprint, not just pattern-match the word 'shock' to 'give fluids.' Expect trend data (vitals, lactate, lung sounds, IVC/ultrasound findings) across a case study — the clinical judgment model wants you to synthesize that trend, not react to a single vital sign.",
  },
  sources: [
    'Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock (most recent update)',
    'Society of Critical Care Medicine (SCCM) sepsis bundle resources',
  ],
}
