import type { Module } from '../types'

export const ards: Module = {
  id: 'ards',
  title: 'Acute Respiratory Distress Syndrome (ARDS)',
  system: 'Pulmonary / Critical Care',
  hook: "The oxygen sat won't come up no matter how high you crank the FiO2. That refusal to respond to oxygen is the entire diagnosis — and it's the thing the 'just give more O2' reflex completely misses.",
  pathoChain: [
    {
      heading: 'Diffuse alveolar damage from a systemic insult',
      body: [
        "ARDS is a syndrome, not a disease — a final common pathway from things like sepsis, pneumonia, aspiration, trauma, pancreatitis, or massive transfusion. Whatever the trigger, it causes diffuse damage to the alveolar-capillary membrane throughout both lungs.",
        "That damaged membrane becomes leaky. Protein-rich fluid floods into the alveoli — this is pulmonary edema, but non-cardiogenic: the heart and its pumping pressure are not the problem here, the membrane itself failed.",
      ],
    },
    {
      heading: 'Flooded alveoli → shunt physiology → refractory hypoxemia',
      body: [
        "Fluid-filled and collapsed alveoli can't participate in gas exchange, but blood keeps flowing past them anyway. That's intrapulmonary shunt: blood passing through the lung without ever picking up oxygen, then mixing back into arterial circulation.",
        "This is the key mechanical fact that drives everything downstream: shunted blood does not respond to supplemental oxygen. Cranking FiO2 to 100% barely moves the needle, because the problem isn't a lack of oxygen in the alveoli that ARE working — it's that a huge fraction of blood is bypassing functional alveoli entirely. Refractory hypoxemia despite high FiO2 is the hallmark.",
      ],
    },
    {
      heading: 'Stiff, non-compliant lungs and the ventilator dilemma',
      body: [
        "Damaged alveoli plus loss of surfactant means the lungs become stiff and non-compliant. Normal tidal volumes now generate dangerously high pressures in the alveoli that ARE still open, over-distending them (volutrauma) and worsening the injury — this is called ventilator-induced lung injury.",
        "So mechanical ventilation, the thing meant to save the patient, is also capable of making the underlying injury worse if it's not managed with lung-protective strategy.",
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
