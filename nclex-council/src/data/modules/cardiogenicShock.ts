import type { Module } from '../types'

export const cardiogenicShock: Module = {
  id: 'cardiogenic-shock',
  title: 'Cardiogenic Shock',
  system: 'Cardiovascular / Critical Care',
  hook: "It's still called 'shock,' so the fluid-bolus reflex fires automatically. In this one shock state, that reflex can drown the patient in their own lungs.",
  pathoChain: [
    {
      heading: 'The pump fails, not the tank or the pipes',
      blocks: [
        {
          type: 'p',
          text: 'Contrast this with hypovolemic shock (tank is empty) and septic shock (pipes are leaky and dilated). Cardiogenic shock starts with the pump itself failing — most commonly a large MI (especially involving significant left ventricular mass), but also severe myocarditis, acute valve failure, or end-stage cardiomyopathy.',
        },
        {
          type: 'p',
          text: "The heart can no longer generate adequate cardiac output. Volume status can be completely normal — the problem is purely the pump's ability to move that volume forward.",
        },
        {
          type: 'bedside',
          text: "Cool, clammy skin and a falling urine output in a post-MI patient — even with a blood pressure that hasn't crashed yet — is your bedside cue that forward flow is already failing. Don't wait for hypotension to call it.",
        },
      ],
    },
    {
      heading: 'The body compensates by squeezing down — and it backfires',
      blocks: [
        {
          type: 'p',
          text: "Low cardiac output triggers the sympathetic nervous system and renin-angiotensin-aldosterone system, causing widespread vasoconstriction (high systemic vascular resistance) to try to maintain blood pressure. This is the opposite hemodynamic direction from septic shock's vasodilation.",
        },
        {
          type: 'p',
          text: "But vasoconstriction increases afterload — the resistance the already-failing pump has to push against. This makes the failing heart work even harder against a tighter system, worsening the pump failure it was trying to compensate for. It's a vicious cycle.",
        },
        {
          type: 'howtested',
          text: 'NCLEX will hand you a hemodynamic panel (CO, SVR, PCWP) and expect you to match the pattern to the shock type: cardiogenic shock is low CO, high SVR, high PCWP — memorize the direction of each number, not just that they\'re "abnormal."',
        },
      ],
    },
    {
      heading: 'Backward failure floods the lungs',
      blocks: [
        {
          type: 'p',
          text: 'With the left ventricle unable to eject effectively, pressure backs up into the left atrium and then the pulmonary circulation. Pulmonary capillary wedge pressure rises, and fluid gets pushed out of the pulmonary vasculature into the alveoli — cardiogenic pulmonary edema.',
        },
        {
          type: 'p',
          text: 'This is why the classic cardiogenic shock patient presents with signs of both poor forward perfusion (hypotension, cool/clammy skin, altered mentation, decreased urine output) AND backward congestion (crackles, JVD, orthopnea, frothy sputum) simultaneously.',
        },
        {
          type: 'trap',
          text: "Crackles, JVD, and hypotension read as 'shock, so bolus fluids' to a nurse running on reflex. Here that bolus has nowhere useful to go — the pulmonary circulation is already backed up, and more volume floods it further.",
        },
        {
          type: 'anchor',
          text: 'Anchor the fingerprint: pump failed, squeezed down, backed up — low CO, high SVR, high PCWP.',
        },
      ],
    },
  ],
  icuPearls: [
    'Hemodynamic profile is the fingerprint: LOW cardiac output/index, HIGH systemic vascular resistance, HIGH pulmonary capillary wedge pressure (PCWP) — the opposite SVR direction from septic/distributive shock, which is low SVR.',
    'Inotropes (dobutamine, milrinone) increase contractility to improve forward flow without the same afterload penalty as pure vasoconstrictors — often preferred over vasopressors alone when the patient is not profoundly hypotensive. Milrinone also vasodilates (afterload reduction) but is used cautiously due to hypotension risk.',
    'If the patient IS hypotensive, norepinephrine is typically used to maintain perfusion pressure, sometimes alongside an inotrope — the two problems (poor squeeze, low pressure) are targeted with different drug classes rather than one drug fixing both.',
    'Fluid is given cautiously and only if there is clear evidence of concurrent volume depletion (right-sided MI causing preload-dependent physiology is a notable exception where fluid can actually help) — in the classic left-sided pump-failure picture with pulmonary congestion, additional fluid worsens pulmonary edema.',
    'Mechanical circulatory support — intra-aortic balloon pump (IABP), Impella, or VA-ECMO — offloads the failing ventricle and supports circulation when pharmacologic support is inadequate.',
    'If the cause is an acute MI, emergent revascularization (PCI or CABG) is the definitive treatment — no amount of pressor/inotrope support fixes an occluded coronary artery; time-to-reperfusion drives outcomes.',
    'SCAI Shock Stages (A through E) provide a standardized severity classification increasingly used to guide escalation of care and communicate severity across the care team.',
  ],
  outsiderFlag:
    "The 'shock = give fluids' reflex is taught early and reinforced constantly with hypovolemic and septic shock scenarios, so it generalizes — incorrectly — to cardiogenic shock. The hidden assumption: that all shock states are volume-responsive. Cardiogenic shock is the direct counterexample. A patient in cardiogenic shock with crackles, JVD, and hypoxia getting an NCLEX-tempting 'administer IV fluid bolus' order is a scenario built specifically to catch students running on reflex instead of reading the hemodynamic picture in front of them.",
  glossary: [
    { term: 'cardiac output', definition: 'The volume of blood the heart pumps per minute (heart rate × stroke volume) — the number that drops first and drives the entire cardiogenic shock picture.' },
    { term: 'systemic vascular resistance', definition: "The resistance the heart pumps against — HIGH in cardiogenic shock (compensatory vasoconstriction), the opposite direction from septic shock's vasodilation." },
    { term: 'afterload', definition: 'The resistance the left ventricle must overcome to eject blood — compensatory vasoconstriction raises afterload, which paradoxically makes a failing pump work even harder.' },
    { term: 'pulmonary capillary wedge pressure', definition: "An estimate of left atrial (and left ventricular filling) pressure — HIGH in cardiogenic shock, reflecting blood backing up behind a failing left ventricle." },
  ],
  recallChecks: [
    {
      question: "What's the hemodynamic fingerprint of cardiogenic shock (CO, SVR, PCWP)?",
      answer: 'Low cardiac output, high SVR, high PCWP — the opposite SVR direction from septic shock.',
    },
    {
      question: 'Why does compensatory vasoconstriction make cardiogenic shock worse?',
      answer: 'It increases afterload, forcing the already-failing pump to work even harder against a tighter system — a vicious cycle.',
    },
    {
      question: 'What is the definitive treatment for cardiogenic shock caused by an acute MI?',
      answer: 'Emergent revascularization (PCI or CABG) — no amount of pressor or inotrope support fixes an occluded coronary artery.',
    },
    {
      question: "Why are inotropes often preferred over pure vasopressors in cardiogenic shock when the patient isn't profoundly hypotensive?",
      answer: 'Inotropes (dobutamine, milrinone) improve contractility and forward flow without the same afterload penalty as pure vasoconstrictors.',
    },
  ],
  teachBack: {
    prompt: 'Explain to a classmate why a patient in cardiogenic shock with crackles and JVD should NOT automatically get an IV fluid bolus, even though they are hypotensive.',
    points: [
      'The problem is pump failure, not volume depletion — PCWP is already high, meaning the pulmonary circulation is already congested.',
      "Extra fluid volume the failing left ventricle can't move forward backs up further into the lungs, worsening pulmonary edema.",
      'The fix is inotropes (contractility), afterload reduction, or mechanical support (IABP/Impella) — not more preload.',
      'A strong explanation also names the exception: right-sided MI with preload-dependent physiology, where fluid actually can help.',
    ],
  },
  writeAlong: [
    {
      prompt: 'In cardiogenic shock, systemic vascular resistance is typically _____ (high or low).',
      answer: 'high',
      hint: 'Compensatory vasoconstriction — the opposite direction from septic shock.',
    },
    {
      prompt: 'The definitive treatment for cardiogenic shock caused by an acute MI is emergent _____.',
      answer: 'revascularization',
      hint: 'PCI or CABG — restoring blood flow to the occluded artery.',
    },
    {
      prompt: 'Inotropes like dobutamine improve _____ without the same afterload penalty as pure vasoconstrictors.',
      answer: 'contractility',
      hint: "The heart's squeeze strength.",
    },
  ],
  caseStudy: {
    scenario:
      'A 71-year-old presents 6 hours after onset of crushing chest pain, found to have a large anterior STEMI. Post-cath, admitted to the ICU.',
    chart: [
      {
        id: 'vitals',
        label: 'Vitals',
        kind: 'vitals',
        items: [
          { label: 'HR', value: '116 bpm', flagged: true },
          { label: 'BP', value: '84/58 mmHg', flagged: true },
          { label: 'RR', value: '24/min', flagged: true },
          { label: 'SpO2', value: '90% on 4L nasal cannula', flagged: true },
          { label: 'Temp', value: '36.8°C' },
        ],
      },
      {
        id: 'labs',
        label: 'Labs',
        kind: 'labs',
        items: [
          { label: 'Troponin', value: 'Markedly elevated', flagged: true },
          { label: 'Lactate', value: '3.0 mmol/L', flagged: true },
          { label: 'BNP', value: 'Elevated', flagged: true },
          { label: 'Cardiac index', value: '1.8 L/min/m²', flagged: true },
        ],
      },
      {
        id: 'notes',
        label: 'Notes',
        kind: 'notes',
        text: 'Crackles bilaterally to mid-lung fields. JVD present. Skin cool and mottled to the knees. Urine output 10 mL/hr over the last 2 hours. Capillary refill 4 seconds.',
      },
    ],
    questions: [
      {
        id: 'cardiogenic-case-1',
        type: 'single',
        difficulty: 'medium',
        stem: 'Given this chart, which pending order should the nurse question?',
        choices: [
          { id: 'a', text: 'A 500 mL normal saline bolus', correct: true, rationale: 'Correct to question — crackles and JVD indicate pulmonary congestion already present; more fluid volume would worsen pulmonary edema in this pump-failure picture.' },
          { id: 'b', text: 'Start a dobutamine infusion', correct: false, rationale: 'Appropriate — an inotrope fits this low-cardiac-index, pump-failure picture.' },
          { id: 'c', text: 'Prepare for possible IABP or Impella placement per cardiology', correct: false, rationale: 'Appropriate — mechanical circulatory support is a reasonable escalation given the severity here.' },
          { id: 'd', text: 'Obtain a stat repeat ECG', correct: false, rationale: 'Appropriate — monitoring for ongoing ischemia or new arrhythmia post-STEMI is standard.' },
        ],
      },
      {
        id: 'cardiogenic-case-2',
        type: 'matrix',
        stem: 'For each finding on this chart, indicate whether it is expected in cardiogenic shock or requires immediate follow-up.',
        options: [
          { id: 'expected', label: 'Expected' },
          { id: 'unexpected', label: 'Unexpected' },
          { id: 'followup', label: 'Immediate follow-up' },
        ],
        rows: [
          { id: 'row-crackles', label: 'Crackles and JVD', correctOptionId: 'expected', rationale: 'Classic backward-failure findings from a failing left ventricle.' },
          { id: 'row-skin', label: 'Cool, mottled skin to the knees', correctOptionId: 'expected', rationale: 'A classic forward-failure/poor-perfusion finding from low cardiac output.' },
          { id: 'row-uop', label: 'Urine output 10 mL/hr over 2 hours', correctOptionId: 'followup', rationale: 'This trend signals worsening renal perfusion and needs to factor into escalation decisions now, not just be noted.' },
          { id: 'row-ci', label: 'Cardiac index 1.8 L/min/m²', correctOptionId: 'followup', rationale: 'A cardiac index this low defines the severity of pump failure and should directly drive the choice of inotrope or mechanical support.' },
        ],
      },
      {
        id: 'cardiogenic-case-3',
        type: 'cloze',
        template:
          "This patient's low cardiac index and pulmonary congestion reflect {{first}}. The ordered fluid bolus should be {{second}}, and the team should prioritize {{third}} to improve forward flow.",
        blanks: [
          { id: 'first', choices: ['pump failure with volume already excessive centrally', 'hypovolemia', 'vasodilation'], correct: 'pump failure with volume already excessive centrally' },
          { id: 'second', choices: ['questioned or held', 'doubled', 'given as a rapid bolus'], correct: 'questioned or held' },
          { id: 'third', choices: ['inotropic support and/or mechanical circulatory support', 'additional crystalloid', 'antipyretics'], correct: 'inotropic support and/or mechanical circulatory support' },
        ],
        rationale: 'Low cardiac index with signs of pulmonary congestion (crackles, JVD) means the problem is pump failure, not volume depletion — more fluid worsens pulmonary edema, while inotropes or mechanical support address the actual forward-flow problem.',
      },
    ],
  },
  quiz: [
    {
      id: 'cardiogenic-1',
      type: 'single',
      difficulty: 'medium',
      stem: 'A patient post-MI presents with BP 82/58, HR 118, crackles bilaterally, JVD, cool clammy skin, and urine output of 15 mL/hr. Which order should the nurse question?',
      choices: [
        { id: 'a', text: 'Start dobutamine infusion', correct: false, rationale: 'Appropriate — an inotrope to improve contractility fits this pump-failure picture.' },
        { id: 'b', text: 'Administer 1 liter normal saline bolus over 30 minutes', correct: true, rationale: 'This is the order to question. Crackles and JVD indicate pulmonary/volume congestion already present — a large fluid bolus would worsen pulmonary edema in a patient whose problem is pump failure, not volume depletion.' },
        { id: 'c', text: 'Obtain a STAT 12-lead ECG and cardiology consult', correct: false, rationale: 'Appropriate — identifying/addressing the underlying cardiac cause (e.g., ongoing ischemia) is essential.' },
        { id: 'd', text: 'Prepare for possible intra-aortic balloon pump placement', correct: false, rationale: 'Appropriate — mechanical circulatory support is a reasonable escalation in refractory cardiogenic shock.' },
      ],
    },
    {
      id: 'cardiogenic-2',
      type: 'single',
      difficulty: 'hard',
      outsider: true,
      stem: "A student reasons: 'The patient's blood pressure is low and they're in shock, so more IV fluid should help, since that's what we do for shock.' Where does this reasoning break down in cardiogenic shock specifically?",
      choices: [
        { id: 'a', text: 'It assumes low blood pressure in shock always reflects inadequate volume, when in cardiogenic shock the problem is pump failure with volume often already excessive in the pulmonary circulation', correct: true, rationale: 'This is the generalization error: treating "low BP + shock" as a single pattern instead of recognizing that different shock types have opposite fluid needs.' },
        { id: 'b', text: 'IV fluids are never appropriate in any critically ill cardiac patient', correct: false, rationale: 'Overly absolute — there are cardiac scenarios (e.g., right-sided MI/preload-dependent states) where fluid does help. The issue is applying the rule universally, not fluids being always wrong.' },
        { id: 'c', text: 'Blood pressure is not actually low in cardiogenic shock', correct: false, rationale: 'Hypotension is a real and expected finding in cardiogenic shock — this isn\'t the flaw.' },
        { id: 'd', text: 'The reasoning is correct and fluids should be given', correct: false, rationale: 'This is the exact flawed generalization the question is testing for.' },
      ],
    },
    {
      id: 'cardiogenic-3',
      type: 'sata',
      difficulty: 'easy',
      stem: 'Which hemodynamic findings are expected in cardiogenic shock? Select all that apply.',
      choices: [
        { id: 'a', text: 'Decreased cardiac output/cardiac index', correct: true, rationale: 'Correct — the defining pump-failure feature.' },
        { id: 'b', text: 'Increased systemic vascular resistance (SVR)', correct: true, rationale: 'Correct — compensatory vasoconstriction, opposite direction from septic shock.' },
        { id: 'c', text: 'Decreased pulmonary capillary wedge pressure (PCWP)', correct: false, rationale: 'PCWP is INCREASED in cardiogenic shock, reflecting backward pressure into the pulmonary circulation — not decreased.' },
        { id: 'd', text: 'Cool, clammy skin from peripheral vasoconstriction', correct: true, rationale: 'Correct — a classic forward-failure/perfusion finding.' },
        { id: 'e', text: 'Decreased systemic vascular resistance (SVR)', correct: false, rationale: 'This describes distributive (e.g., septic) shock, not cardiogenic shock.' },
      ],
    },
  ],
  chairman: {
    cannotMiss: "Crackles and JVD on a hypotensive patient mean the pump failed, not the tank — question any fluid bolus order and think inotropes, afterload reduction, or mechanical support instead.",
    ngnTakeaway: "NGN loves to put a 'shock' scenario in front of you and see if you default to the same intervention every time. The clinical judgment model rewards distinguishing shock subtypes by their hemodynamic signature (SVR, PCWP, skin findings) before picking an intervention — that discrimination step is exactly what's being graded.",
  },
  sources: [
    'Society for Cardiovascular Angiography and Interventions (SCAI) Shock Classification',
    'ACC/AHA guidelines on management of acute MI and cardiogenic shock',
    'Standard critical-care/hemodynamic monitoring nursing texts',
  ],
}
