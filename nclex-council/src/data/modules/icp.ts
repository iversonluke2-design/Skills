import type { Module } from '../types'

export const icp: Module = {
  id: 'increased-icp',
  title: 'Increased Intracranial Pressure (ICP)',
  system: 'Neuro / Critical Care',
  hook: "Everyone's taught to watch for Cushing's triad like it's an early warning light. It's not a warning light — it's the smoke alarm going off after the fire's already spread. By the time you see it, you're already late.",
  pathoChain: [
    {
      heading: 'The skull is a locked box: Monro-Kellie doctrine',
      blocks: [
        {
          type: 'p',
          text: 'Start with the container. The skull is a rigid, fixed-volume box holding three things: brain tissue (~80%), blood (~10%), and CSF (~10%). Total volume is fixed — it cannot expand.',
        },
        {
          type: 'p',
          text: 'The Monro-Kellie doctrine says if one component increases (a tumor, a bleed, cerebral edema), the others must compensate by decreasing — CSF gets displaced into the spinal canal, venous blood gets pushed out — or ICP starts to rise. This compensation has a limit.',
        },
        {
          type: 'bedside',
          text: "At the bedside, the earliest tell is subtle: a patient who's suddenly a little more restless, a little slower to answer, or 'just not acting like themselves.' That's worth a call before it becomes anything more dramatic.",
        },
      ],
    },
    {
      heading: 'Compensation fails, ICP climbs, perfusion drops',
      blocks: [
        {
          type: 'p',
          text: 'Once compensatory mechanisms are exhausted, even small volume increases cause dramatic ICP spikes — the pressure-volume curve goes from flat to a cliff. This is why a patient can look stable and then decompensate rapidly.',
        },
        {
          type: 'p',
          text: "Cerebral Perfusion Pressure (CPP) = MAP − ICP. As ICP rises, CPP falls even if blood pressure stays normal, meaning the brain is being perfused less and less even though the rest of the body's hemodynamics look fine on paper.",
        },
        {
          type: 'howtested',
          text: 'NCLEX math questions love handing you an ICP and a MAP and asking you to calculate CPP — remember it\'s subtraction (MAP − ICP), not addition, and that the normal target range is roughly 60–70 mmHg.',
        },
      ],
    },
    {
      heading: 'Herniation: the point of no return',
      blocks: [
        {
          type: 'p',
          text: 'If ICP keeps rising, brain tissue gets forced from a higher-pressure compartment into a lower-pressure one — herniation, physically displacing brain structures, including the brainstem, which controls breathing and cardiovascular regulation.',
        },
        {
          type: 'p',
          text: "Cushing's triad — widening pulse pressure with hypertension, bradycardia, and irregular respirations — reflects the brainstem being compressed and the body's last-ditch reflex (Cushing's reflex) trying to push arterial pressure above the rising ICP to preserve some cerebral perfusion. This is a pre-terminal sign of impending herniation, not an early one.",
        },
        {
          type: 'trap',
          text: "Waiting for a 'fixed and dilated' pupil as your confirmation is the same trap one step later — pupil changes from oculomotor nerve compression show up after LOC changes too, not before them.",
        },
        {
          type: 'anchor',
          text: "Anchor Cushing's triad as H-B-I: Hypertension (widened pulse pressure), Bradycardia, Irregular respirations — and remember it's the LAST thing to show up, not the first.",
        },
      ],
    },
  ],
  icuPearls: [
    'Head of bed 30 degrees, head midline — improves venous outflow from the brain. Neck flexion or rotation compresses the jugular veins and directly raises ICP; this is a nursing-controlled intervention that matters as much as any drug.',
    'Hyperosmolar therapy: mannitol (osmotic diuretic, pulls fluid out of brain tissue — but watch for rebound hypovolemia/hypotension and requires intact osmotic gradient/renal function) versus hypertonic saline (3% or higher — expands intravascular volume while pulling fluid out of the brain, often preferred in hypotensive or hypovolemic patients since it doesn\'t cause diuresis).',
    'Avoid hypercapnia — CO2 is a potent cerebral vasodilator, and vasodilation increases cerebral blood volume, which directly raises ICP per Monro-Kellie. Keep PaCO2 normal (~35–45 mmHg) rather than intentionally hyperventilating.',
    'Aggressive prophylactic hyperventilation is no longer routine — it was once standard to intentionally drop PaCO2 to vasoconstrict and lower ICP, but sustained hypocapnia causes cerebral vasoconstriction severe enough to cause ischemia. It\'s now reserved as a brief, temporizing bridge for acute herniation, not ongoing management.',
    'Maintain CPP typically in the 60–70 mmHg range — too low starves the brain, but aggressively pushing MAP up to force CPP higher has its own risks (worsening edema, hemorrhage) and current guidelines favor avoiding both extremes over chasing an aggressive target.',
    'Sedation and analgesia reduce cerebral metabolic demand (and therefore cerebral blood flow needs) — agitation, pain, and coughing/suctioning without adequate sedation all spike ICP acutely.',
    'Fever and seizures both dramatically increase cerebral metabolic demand — aggressive normothermia and seizure prophylaxis/rapid treatment are standard supportive measures.',
    'Avoid hypotonic IV fluids entirely (e.g., D5W, 0.45% NaCl) — they shift free water into brain tissue and worsen cerebral edema. Isotonic or hypertonic fluids only.',
  ],
  outsiderFlag:
    "The near-universal student assumption is that Cushing's triad is what you watch for to 'catch' rising ICP early. That assumption is backwards, and it's exactly the kind of thing that gets missed because it sounds like textbook knowledge. Cushing's triad is a LATE, ominous finding reflecting brainstem compression — by the time it appears, herniation may already be underway. The actual earliest indicator of increased ICP is a change in level of consciousness (subtle confusion, restlessness, lethargy) — before vital sign changes, before pupil changes. Waiting for the triad to 'confirm' increased ICP means you've already missed the window where intervention could have prevented herniation.",
  glossary: [
    { term: 'Monro-Kellie doctrine', definition: 'The principle that the skull is a fixed-volume container of brain, blood, and CSF — an increase in any one component must be offset by a decrease in another, or ICP rises.' },
    { term: 'cerebral edema', definition: 'Swelling of brain tissue that increases intracranial volume — one of the three things (with blood and CSF) whose growth can overwhelm the skull\'s fixed-volume compensation.' },
    { term: 'Cerebral Perfusion Pressure', definition: 'CPP = MAP − ICP. The pressure actually driving blood into the brain; it falls as ICP rises even if blood pressure looks normal.' },
    { term: 'herniation', definition: 'Physical displacement of brain tissue from a higher-pressure compartment into a lower-pressure one under severe, uncompensated ICP — including displacement of the brainstem, which is life-threatening.' },
    { term: "Cushing's triad", definition: 'Widened pulse pressure with hypertension, bradycardia, and irregular respirations — a late, ominous sign of brainstem compression from impending herniation, not an early warning sign.' },
  ],
  recallChecks: [
    {
      question: 'What three components fill the skull per the Monro-Kellie doctrine?',
      answer: 'Brain tissue (~80%), blood (~10%), and CSF (~10%) — all inside a fixed-volume box.',
    },
    {
      question: "What's the earliest indicator of rising ICP, before any vital sign changes?",
      answer: 'A subtle change in level of consciousness — restlessness, confusion, or lethargy.',
    },
    {
      question: 'What is the formula for cerebral perfusion pressure?',
      answer: 'CPP = MAP − ICP.',
    },
    {
      question: 'Why is aggressive prophylactic hyperventilation no longer routine for lowering ICP?',
      answer: 'Sustained hypocapnia causes cerebral vasoconstriction severe enough to cause ischemia — it is now reserved only as a brief, temporizing bridge for acute herniation.',
    },
  ],
  teachBack: {
    prompt: "Explain to a classmate why waiting for Cushing's triad to 'confirm' rising ICP is dangerous.",
    points: [
      "Cushing's triad reflects brainstem compression from impending herniation — it's a pre-terminal sign, not an early warning.",
      'The earliest sign is a change in level of consciousness, which can appear well before any vital sign changes.',
      'Waiting for objective vital-sign confirmation means missing the window where intervention could have prevented herniation.',
      "A strong explanation names the actual timeline: LOC change first, pupil changes later, Cushing's triad last.",
    ],
  },
  quiz: [
    {
      id: 'icp-1',
      type: 'single',
      difficulty: 'hard',
      outsider: true,
      stem: "A nursing student states: 'I'll know a patient has rising ICP because they'll develop the classic Cushing's triad — I'll watch vitals closely for that.' What is the problem with this plan as an early-detection strategy?",
      choices: [
        { id: 'a', text: 'Cushing\'s triad is a late sign of impending herniation, not an early indicator — the earliest sign is a change in level of consciousness', correct: true, rationale: "This is the exact assumption most students carry unchallenged. Waiting for the triad means waiting for a pre-terminal sign." },
        { id: 'b', text: 'Cushing\'s triad only occurs in pediatric patients', correct: false, rationale: 'Cushing\'s triad can occur in any patient with sufficiently elevated ICP compressing the brainstem, not just pediatric patients.' },
        { id: 'c', text: 'Cushing\'s triad is not a reliable finding and should not be assessed at all', correct: false, rationale: "It's a real and clinically important finding — the issue is treating it as an early warning sign rather than a late, dangerous one." },
        { id: 'd', text: 'There is no problem — vital sign monitoring is always the most sensitive method for detecting neuro changes', correct: false, rationale: 'This is the misconception itself — LOC change precedes vital sign changes in increased ICP.' },
      ],
      ngnNote: 'Classic NGN "recognize cues" trap: it rewards knowing the earliest cue in a deteriorating trend, not just recognizing a textbook triad after the fact.',
    },
    {
      id: 'icp-2',
      type: 'single',
      difficulty: 'medium',
      stem: 'A patient with a traumatic brain injury has an ICP of 22 mmHg and MAP of 75 mmHg. What is this patient\'s cerebral perfusion pressure (CPP), and is it adequate?',
      choices: [
        { id: 'a', text: 'CPP = 53 mmHg; this is below the typical target range and represents inadequate cerebral perfusion', correct: true, rationale: 'CPP = MAP − ICP = 75 − 22 = 53 mmHg, below the general 60–70 mmHg target — this patient needs intervention to either lower ICP or support MAP.' },
        { id: 'b', text: 'CPP = 97 mmHg; this is within normal limits', correct: false, rationale: 'This adds MAP and ICP instead of subtracting — a common calculation error. CPP = MAP − ICP.' },
        { id: 'c', text: 'CPP cannot be calculated from this data', correct: false, rationale: 'CPP is directly calculable from MAP and ICP: CPP = MAP − ICP.' },
        { id: 'd', text: 'CPP = 22 mmHg; ICP itself is the CPP value', correct: false, rationale: 'This confuses ICP with CPP — they are related but distinct values.' },
      ],
    },
    {
      id: 'icp-3',
      type: 'sata',
      difficulty: 'easy',
      stem: 'Which nursing interventions are appropriate for a patient with increased ICP? Select all that apply.',
      choices: [
        { id: 'a', text: 'Maintain head of bed at 30 degrees with head in neutral, midline position', correct: true, rationale: 'Correct — promotes venous drainage from the brain.' },
        { id: 'b', text: 'Cluster care activities to minimize stimulation and ICP spikes', correct: true, rationale: 'Correct — repeated stimulation (suctioning, turning, painful procedures back-to-back) causes cumulative ICP spikes; clustering with adequate sedation coverage reduces this.' },
        { id: 'c', text: 'Administer 0.45% sodium chloride (half-normal saline) as the maintenance IV fluid', correct: false, rationale: 'Hypotonic fluids worsen cerebral edema and are avoided in increased ICP — isotonic or hypertonic fluids are used instead.' },
        { id: 'd', text: 'Treat fever aggressively to maintain normothermia', correct: true, rationale: 'Correct — fever increases cerebral metabolic demand and can worsen ICP.' },
        { id: 'e', text: 'Encourage vigorous coughing and deep breathing every hour', correct: false, rationale: 'Valsalva-type maneuvers (coughing, straining) transiently spike intrathoracic and intracranial pressure — avoided in increased ICP management.' },
      ],
    },
  ],
  chairman: {
    cannotMiss: "Don't wait for Cushing's triad. A subtle change in level of consciousness is the earliest sign of rising ICP, full stop — that's the one finding you report immediately, before vitals ever change.",
    ngnTakeaway: "NGN neuro case studies are built specifically to test whether you know the TIMELINE of deterioration, not just the list of findings. Expect a case where LOC changes appear before vital sign changes, and the trap answer waits for 'more objective' data like the triad before acting.",
  },
  sources: [
    'Monro-Kellie doctrine — foundational neuro-critical-care physiology',
    'Brain Trauma Foundation Guidelines for the Management of Severe Traumatic Brain Injury (current edition)',
    'Standard critical-care nursing texts on ICP/CPP management',
  ],
}
