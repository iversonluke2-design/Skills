import type { Module } from '../types'

export const dka: Module = {
  id: 'dka',
  title: 'Diabetic Ketoacidosis (DKA)',
  system: 'Endocrine / Metabolic',
  hook: "The classic trap: sky-high glucose, and every instinct screams 'give insulin.' The patient who actually crashes is the one whose potassium you didn't check first.",
  pathoChain: [
    {
      heading: 'The starting problem: no insulin, hormones going rogue',
      body: [
        "Start at the cell. No insulin (or way too little, like a sick Type 1 who skipped doses, or huge stress hormone surge in Type 1/2 during illness) means glucose can't get into cells. The cell thinks it's starving, even though the blood is drowning in sugar.",
        "The body panics and dumps counter-regulatory hormones — glucagon, cortisol, catecholamines, growth hormone. Those hormones tell the liver to make even more glucose (gluconeogenesis, glycogenolysis) and tell fat cells to start breaking down fat for fuel (lipolysis). That's the whole disaster in one sentence: cells starving in a sea of sugar, so the body makes it worse trying to feed them.",
      ],
    },
    {
      heading: 'Fat breakdown → ketones → acid',
      body: [
        "Free fatty acids flood the liver. The liver converts them to ketone bodies (acetoacetate, beta-hydroxybutyrate, acetone) as an emergency fuel source. Ketones are acids. Pour enough acid into the blood and you get a wide anion-gap metabolic acidosis — that's the 'A' in DKA.",
        "The body tries to buffer: respiratory compensation shows up as Kussmaul breathing (deep, rapid, blowing off CO2 to fight the acidosis) and that fruity/acetone breath smell is the ketones being exhaled.",
      ],
    },
    {
      heading: 'Osmotic diuresis wrecks fluid and electrolytes',
      body: [
        "Meanwhile the glucose itself is a problem. Once blood glucose blows past the renal threshold (~180 mg/dL), the kidneys can't reabsorb it all, so glucose spills into urine and drags water with it — osmotic diuresis. That's massive fluid loss: patients can lose 6–10 liters.",
        "Potassium gets dragged out in that diuresis too, plus the acidosis is shoving K+ out of cells into the blood in exchange for H+ (cells buffering the acid by trading potassium for hydrogen). So the serum potassium on the lab slip can look normal or even high, while the patient's total-body potassium is actually depleted. That mismatch is the single most dangerous thing in this whole chain — because the number lies.",
      ],
    },
  ],
  icuPearls: [
    "Check potassium before you hang insulin — always. Insulin drives K+ back into cells fast. If serum K+ is under 3.3 mEq/L and you start insulin anyway, you can drop that patient into a lethal arrhythmia. Standard order of operations: K+ < 3.3 → hold insulin, replace potassium first. K+ 3.3–5.3 → run insulin and replace K+ concurrently. K+ > 5.3 → insulin, recheck K+ before adding replacement.",
    'Fluids come first in the sequence, before insulin: isotonic crystalloid (typically 0.9% NaCl) to restore perfusion, THEN correct potassium status, THEN start the regular insulin infusion (usually ~0.1 units/kg/hr, no bolus in most current protocols).',
    "Don't crash the glucose too fast. Once glucose hits ~200–250 mg/dL, add dextrose to the IV fluids and keep the insulin drip running (don't just stop it) — you need continued insulin to shut off ketogenesis and close the anion gap, not just to lower glucose. Stopping insulin too early is a classic way to relapse right back into ketosis.",
    'Track the anion gap, not just the glucose. Glucose normalizes long before the acidosis resolves. The gap closing is what tells you the ketogenesis has actually stopped — that determines when you can transition to subQ insulin.',
    "Overlap when transitioning off the drip: give the first subQ dose of long-acting/basal insulin 1–2 hours before stopping the IV insulin infusion. Insulin's IV half-life is minutes — stop the drip cold with no subQ coverage on board and the patient rebounds into DKA within hours.",
    'Watch phosphate and magnesium too — both get dumped in the same osmotic-diuresis/acidosis process as potassium, and both need to be trended even though theyrarely drive the initial resuscitation orders.',
    'Cerebral edema is the feared complication, overwhelmingly in pediatric/young Type 1 patients — usually shows up 4–12 hours into treatment as a sudden headache, altered LOC, or new neuro deficit. Thought to be worsened by over-aggressive fluid resuscitation and rapid osmotic shifts, which is why pediatric DKA protocols are more conservative on fluid rate than adult protocols.',
  ],
  outsiderFlag:
    "Students are trained to see 'DKA = give insulin' as a reflex. The hidden assumption is that the glucose number is the emergency. It isn't — the acid-base and electrolyte picture is the emergency, and the glucose is just the flashy number sitting on top of it. Miss the potassium check because you're fixated on the sugar, and insulin becomes the thing that kills the patient, not the thing that saves them.",
  quiz: [
    {
      id: 'dka-1',
      type: 'single',
      stem: 'A patient arrives in DKA: glucose 620 mg/dL, pH 7.18, potassium 3.0 mEq/L. The provider\'s order set includes an insulin infusion. What is the priority action?',
      choices: [
        {
          id: 'a',
          text: 'Start the insulin infusion immediately to correct the acidosis',
          correct: false,
          rationale: "This is the trap answer — it looks urgent and correct because the acidosis IS the real threat. But insulin will pull potassium into cells and drop an already-low K+ of 3.0 into cardiac-arrhythmia territory before the acidosis improves.",
        },
        {
          id: 'b',
          text: 'Begin potassium replacement and hold insulin until K+ is above 3.3 mEq/L',
          correct: true,
          rationale: 'Correct. K+ 3.0 is below the 3.3 threshold — replace potassium first. Starting insulin now risks a life-threatening arrhythmia from a further potassium drop.',
        },
        {
          id: 'c',
          text: 'Administer sodium bicarbonate to correct the pH directly',
          correct: false,
          rationale: 'Routine bicarb is not standard for DKA except in extreme, life-threatening acidosis (roughly pH < 6.9) — it can worsen hypokalemia and cause paradoxical CNS acidosis. Not the priority here.',
        },
        {
          id: 'd',
          text: 'Recheck the glucose in one hour before doing anything else',
          correct: false,
          rationale: 'Passive monitoring while the patient sits in a wide anion-gap acidosis with borderline-low potassium is unsafe — this delays necessary intervention.',
        },
      ],
    },
    {
      id: 'dka-2',
      type: 'single',
      outsider: true,
      stem: "You're taught that DKA resolution means 'the glucose came down.' A patient's glucose has normalized to 180 mg/dL, so the resident wants to stop the insulin infusion. What's the flaw in that plan?",
      choices: [
        {
          id: 'a',
          text: 'Glucose normalizing does not mean the anion gap has closed, and insulin is needed to shut off ketogenesis, not just to lower glucose',
          correct: true,
          rationale: "This is the hidden assumption most students never get quizzed on: glucose and acidosis correct on different timelines. Stopping insulin when glucose looks fine but the gap is still open lets ketogenesis restart.",
        },
        {
          id: 'b',
          text: 'There is no flaw — once glucose is under 200 mg/dL the DKA episode is resolved',
          correct: false,
          rationale: 'This is exactly the trap. Glucose is the fastest-correcting number and the least reliable marker of resolution.',
        },
        {
          id: 'c',
          text: 'The insulin infusion should be increased, not stopped, because glucose dropped too far',
          correct: false,
          rationale: '180 mg/dL is an appropriate target range once dextrose is added to fluids — this isn\'t an overcorrection scenario.',
        },
        {
          id: 'd',
          text: 'The flaw is that glucose should never be allowed to drop below 250 mg/dL during DKA treatment',
          correct: false,
          rationale: 'Dextrose is added at ~200–250 mg/dL specifically so the drip CAN keep running safely below that number — this isn\'t the issue.',
        },
      ],
      ngnNote: 'This is the exact clinical-judgment gap NGN loves to test: recognizing that two lab values on the same patient resolve on different physiologic timelines, and that treatment has to track the slower one.',
    },
    {
      id: 'dka-3',
      type: 'sata',
      stem: 'Which findings would the nurse expect to assess in a patient presenting with DKA? Select all that apply.',
      choices: [
        { id: 'a', text: 'Kussmaul respirations', correct: true, rationale: 'Correct — deep, rapid respirations compensating for metabolic acidosis by blowing off CO2.' },
        { id: 'b', text: 'Fruity/acetone odor to the breath', correct: true, rationale: 'Correct — from exhaled ketones (acetone).' },
        { id: 'c', text: 'Bradycardia and hypertension with widened pulse pressure', correct: false, rationale: "That's Cushing's triad from increased ICP, not DKA. DKA presents with dehydration findings — tachycardia and hypotension, not bradycardia." },
        { id: 'd', text: 'Polyuria and polydipsia preceding the acute presentation', correct: true, rationale: 'Correct — osmotic diuresis from glucosuria drives both.' },
        { id: 'e', text: 'Abdominal pain and nausea/vomiting', correct: true, rationale: 'Correct and commonly under-recognized — can mimic an acute abdomen and delay diagnosis, especially in new-onset Type 1 diabetes.' },
      ],
    },
  ],
  chairman: {
    cannotMiss: 'Check the potassium before the insulin goes anywhere near that IV line. A normal or high serum K+ on the panel does not mean total-body potassium is fine — the acidosis is hiding the real number.',
    ngnTakeaway: "NGN case studies on DKA are built to bait you into the single-lab-value trap. Expect a scenario with an alarming glucose and a distractor answer that treats the sugar. The clinical-judgment model (recognize cues → analyze cues → prioritize) rewards you for weighing the potassium and pH together, not reacting to the biggest number on the screen.",
  },
  sources: [
    'American Diabetes Association / Hyperglycemic Crises Consensus Report (Diabetes Care, most recent update)',
    'Joint British Diabetes Societies (JBDS) DKA management guideline',
    'Standard ICU/critical-care nursing texts on fluid-insulin-electrolyte sequencing in DKA',
  ],
}
