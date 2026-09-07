import type { Module } from '../types'

export const cardiogenicShock: Module = {
  id: 'cardiogenic-shock',
  title: 'Cardiogenic Shock',
  system: 'Cardiovascular / Critical Care',
  hook: "It's still called 'shock,' so the fluid-bolus reflex fires automatically. In this one shock state, that reflex can drown the patient in their own lungs.",
  pathoChain: [
    {
      heading: 'The pump fails, not the tank or the pipes',
      body: [
        "Contrast this with hypovolemic shock (tank is empty) and septic shock (pipes are leaky and dilated). Cardiogenic shock starts with the pump itself failing — most commonly a large MI (especially involving significant left ventricular mass), but also severe myocarditis, acute valve failure, or end-stage cardiomyopathy.",
        "The heart can no longer generate adequate cardiac output. Volume status can be completely normal — the problem is purely the pump's ability to move that volume forward.",
      ],
    },
    {
      heading: 'The body compensates by squeezing down — and it backfires',
      body: [
        "Low cardiac output triggers the sympathetic nervous system and renin-angiotensin-aldosterone system, causing widespread vasoconstriction (high systemic vascular resistance) to try to maintain blood pressure. This is the opposite hemodynamic direction from septic shock's vasodilation.",
        "But vasoconstriction increases afterload — the resistance the already-failing pump has to push against. This makes the failing heart work even harder against a tighter system, worsening the pump failure it was trying to compensate for. It's a vicious cycle.",
      ],
    },
    {
      heading: 'Backward failure floods the lungs',
      body: [
        "With the left ventricle unable to eject effectively, pressure backs up into the left atrium and then the pulmonary circulation. Pulmonary capillary pressure rises, and fluid gets pushed out of the pulmonary vasculature into the alveoli — cardiogenic pulmonary edema.",
        "This is why the classic cardiogenic shock patient presents with signs of both poor forward perfusion (hypotension, cool/clammy skin, altered mentation, decreased urine output) AND backward congestion (crackles, JVD, orthopnea, frothy sputum) simultaneously.",
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
  quiz: [
    {
      id: 'cardiogenic-1',
      type: 'single',
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
