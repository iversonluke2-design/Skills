import type { Module } from '../types'

export const septicShock: Module = {
  id: 'septic-shock',
  title: 'Septic Shock',
  system: 'Multisystem / Distributive Shock',
  hook: "The reflex is 'shock means fluids.' In septic shock that's true — until it isn't, and the same reflex is what puts your patient into flash pulmonary edema.",
  pathoChain: [
    {
      heading: 'Infection triggers an inflammatory wildfire',
      blocks: [
        {
          type: 'p',
          text: "It starts with an infection (usually gram-negative bacteria, but any source) triggering a massive systemic inflammatory response — cytokines like TNF-alpha and IL-1/IL-6 flood the bloodstream. This isn't localized anymore; the whole vascular system is reacting.",
        },
        {
          type: 'p',
          text: 'Those inflammatory mediators cause widespread vasodilation (nitric oxide-driven) and increased capillary permeability. Picture every blood vessel in the body relaxing and getting leaky at the same time.',
        },
        {
          type: 'bedside',
          text: "A patient who's suddenly confused, tachypneic, and warm/flushed with bounding pulses — not cold and clammy — is showing you early distributive shock. Warm skin in a hypotensive patient is not reassuring here.",
        },
      ],
    },
    {
      heading: 'Distributive shock: the tank is fine, the plumbing failed',
      blocks: [
        {
          type: 'p',
          text: 'This is what makes septic shock a distributive shock, fundamentally different from hypovolemic shock. The blood volume hasn\'t necessarily dropped — it\'s been redistributed into a vascular space that\'s now way too big (vasodilation) and leaking fluid into the tissues (capillary leak → third-spacing → edema).',
        },
        {
          type: 'p',
          text: 'Effective circulating volume crashes even though total body fluid might be normal or even high. Blood pressure drops because the container (vasculature) is now way bigger than the volume inside it.',
        },
        {
          type: 'trap',
          text: "Warm extremities and bounding pulses can read as 'not that sick' to an inexperienced eye, especially next to a textbook picture of cold, clammy hypovolemic shock. In early septic shock, warm and hypotensive is often sicker, not better.",
        },
      ],
    },
    {
      heading: 'Hypoperfusion → anaerobic metabolism → lactate',
      blocks: [
        {
          type: 'p',
          text: "With vessels dilated and leaky, tissues stop getting adequately perfused. Cells shift to anaerobic metabolism, producing lactate. Lactate isn't just a lab value to chart — it's a direct marker of how badly tissue is being starved of oxygen, and trending it tells you if your interventions are working.",
        },
        {
          type: 'p',
          text: 'Left uncorrected: multi-organ dysfunction — acute kidney injury, ARDS, DIC, hepatic dysfunction, altered mentation — because every organ is running on an oxygen deficit.',
        },
        {
          type: 'howtested',
          text: "NCLEX will show you a lactate that's falling (say, 6.0 → 3.5 → 2.0) after fluids/antibiotics/pressors and expect you to recognize that as evidence perfusion is improving — not just a number to report without interpreting the trend.",
        },
        {
          type: 'anchor',
          text: "Anchor the Hour-1 bundle: Lactate, Cultures, Antibiotics, Fluids, Pressors — L-C-A-F-P, cultures always before antibiotics.",
        },
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
  glossary: [
    { term: 'cytokines', definition: 'Signaling proteins (like TNF-alpha, IL-1, IL-6) released during the immune response to infection — the drivers of the systemic vasodilation and capillary leak seen in septic shock.' },
    { term: 'capillary leak', definition: 'Increased permeability of capillary walls that lets fluid escape the vasculature into the interstitium — the reason septic shock patients can be fluid-overloaded in the tissues while still intravascularly depleted.' },
    { term: 'distributive shock', definition: 'A shock category where blood volume is often normal but redistributed out of effective circulation by vasodilation and capillary leak — fundamentally different physiology from hypovolemic shock.' },
    { term: 'anaerobic metabolism', definition: "Energy production without adequate oxygen, producing lactate as a byproduct — what cells switch to when perfusion can't meet oxygen demand." },
  ],
  recallChecks: [
    {
      question: "Why is septic shock called 'distributive' rather than hypovolemic?",
      answer: 'Total body fluid may be normal or even high — the problem is that vasodilation and capillary leak redistribute effective circulating volume out of the vascular space, not that fluid is missing overall.',
    },
    {
      question: 'What MAP target guides vasopressor titration in septic shock?',
      answer: 'At least 65 mmHg.',
    },
    {
      question: 'Which vasopressor is first-line in septic shock, and what is typically added second?',
      answer: 'Norepinephrine is first-line; vasopressin is typically added second to help reduce the norepinephrine dose.',
    },
    {
      question: 'Why does trending lactate matter more than one isolated lactate value?',
      answer: 'A falling trend shows your interventions — fluids, source control, pressors — are actually improving tissue oxygenation, not just that one draw looked abnormal.',
    },
  ],
  teachBack: {
    prompt: "Explain to a classmate why 'give more fluid' isn't automatically the right answer once a septic shock patient has already received their initial 30 mL/kg bolus.",
    points: [
      'Septic shock causes capillary leak — fluid beyond what the leaky vasculature can hold escapes into the lungs and tissues instead of improving perfusion.',
      'Guidelines move to vasopressors (norepinephrine) once MAP stays under 65 mmHg after the initial bolus, rather than repeating boluses indefinitely.',
      'Reassess with dynamic measures (passive leg raise, IVC collapsibility) instead of assuming persistent hypotension automatically means more volume is needed.',
      "A strong explanation distinguishes distributive shock's capillary-leak physiology from hypovolemic shock's simple volume-deficit physiology.",
    ],
  },
  writeAlong: [
    {
      prompt: 'The Surviving Sepsis Campaign Hour-1 bundle targets a MAP of at least _____ mmHg after fluid resuscitation.',
      answer: '65',
      hint: "It's the vasopressor titration target once fluids alone haven't restored pressure.",
    },
    {
      prompt: 'The first-line vasopressor for septic shock is _____.',
      answer: 'norepinephrine',
      hint: 'Dopamine has fallen out of favor due to higher arrhythmia risk.',
    },
    {
      prompt: 'Blood cultures should be drawn _____ antibiotics are administered.',
      answer: 'before',
      hint: 'Antibiotics can sterilize a culture if given first, hiding the causative organism.',
    },
  ],
  caseStudy: {
    scenario:
      'A 68-year-old with a recent UTI is brought in by family for new confusion and rapid breathing. He is warm to the touch with flushed skin and bounding pulses.',
    chart: [
      {
        id: 'vitals',
        label: 'Vitals',
        kind: 'vitals',
        items: [
          { label: 'HR', value: '118 bpm', flagged: true },
          { label: 'BP', value: '84/50 mmHg', flagged: true },
          { label: 'RR', value: '26/min', flagged: true },
          { label: 'Temp', value: '38.9°C', flagged: true },
          { label: 'SpO2', value: '94% room air', flagged: true },
        ],
      },
      {
        id: 'labs',
        label: 'Labs',
        kind: 'labs',
        items: [
          { label: 'Lactate', value: '4.2 mmol/L', flagged: true },
          { label: 'WBC', value: '18.5 x10³/µL', flagged: true },
          { label: 'Creatinine', value: '1.6 mg/dL (baseline 0.9)', flagged: true },
          { label: 'Blood cultures', value: 'Pending' },
        ],
      },
      {
        id: 'notes',
        label: 'Notes',
        kind: 'notes',
        text: 'Family reports 3 days of worsening confusion and burning with urination prior to today. Skin warm, flushed, bounding pulses. No rash. No recent travel.',
      },
    ],
    questions: [
      {
        id: 'sepsis-case-1',
        type: 'single',
        difficulty: 'medium',
        stem: 'What is the priority sequence of actions within the first hour, given this chart?',
        choices: [
          { id: 'a', text: 'Draw blood cultures, then begin broad-spectrum antibiotics within the hour', correct: true, rationale: 'Correct — cultures before (or without significantly delaying) antibiotics, both within the Hour-1 bundle window.' },
          { id: 'b', text: 'Start broad-spectrum antibiotics immediately, then draw cultures whenever convenient', correct: false, rationale: 'Cultures should be drawn before antibiotics whenever possible — giving antibiotics first can sterilize the culture and hide the organism.' },
          { id: 'c', text: 'Administer acetaminophen for the fever and reassess in 2 hours', correct: false, rationale: 'This delays the Hour-1 bundle for a finding (fever) that is not the priority here.' },
          { id: 'd', text: 'Wait for blood culture results before starting antibiotics', correct: false, rationale: 'Antibiotics should not be delayed waiting on culture results — they are drawn first, then antibiotics start within the hour regardless.' },
        ],
      },
      {
        id: 'sepsis-case-2',
        type: 'matrix',
        stem: 'For each finding on this chart, indicate whether it is expected in early septic shock, unexpected, or requires immediate follow-up.',
        options: [
          { id: 'expected', label: 'Expected' },
          { id: 'unexpected', label: 'Unexpected' },
          { id: 'followup', label: 'Immediate follow-up' },
        ],
        rows: [
          { id: 'row-warm', label: 'Warm, flushed skin with bounding pulses', correctOptionId: 'expected', rationale: 'Early distributive shock often presents warm and vasodilated, not cold and clammy.' },
          { id: 'row-lactate', label: 'Lactate 4.2 mmol/L', correctOptionId: 'followup', rationale: 'A lactate ≥4 mmol/L triggers the 30 mL/kg crystalloid bolus in the Hour-1 bundle — it needs action now, not just documentation.' },
          { id: 'row-fever', label: 'Temperature 38.9°C', correctOptionId: 'expected', rationale: 'Fever is expected with an infectious source driving the systemic inflammatory response.' },
          { id: 'row-cr', label: 'Creatinine rising from baseline', correctOptionId: 'followup', rationale: 'A rising creatinine signals early hypoperfusion/AKI and needs to factor into resuscitation and monitoring right away.' },
        ],
      },
      {
        id: 'sepsis-case-3',
        type: 'cloze',
        template:
          'This patient meets Hour-1 bundle criteria: draw {{first}}, start {{second}} within one hour, and begin a {{third}} mL/kg crystalloid bolus given the elevated lactate.',
        blanks: [
          { id: 'first', choices: ['blood cultures', 'urine cultures', 'sputum cultures'], correct: 'blood cultures' },
          { id: 'second', choices: ['broad-spectrum antibiotics', 'antipyretics', 'insulin'], correct: 'broad-spectrum antibiotics' },
          { id: 'third', choices: ['30', '10', '5'], correct: '30' },
        ],
        rationale: 'The Hour-1 bundle: blood cultures before antibiotics, broad-spectrum antibiotics within 1 hour, and a 30 mL/kg crystalloid bolus for hypotension or lactate ≥4 mmol/L.',
      },
    ],
  },
  quiz: [
    {
      id: 'sepsis-1',
      type: 'single',
      difficulty: 'medium',
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
      difficulty: 'hard',
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
      difficulty: 'easy',
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
