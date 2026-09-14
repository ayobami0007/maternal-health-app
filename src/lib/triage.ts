import { SymptomOutcome } from "@/lib/types";

interface TriageParams {
  symptomId: string;
  answers: Record<string, string>;
}

/**
 * Evaluates user answers against clinical guidance to assign an outcome severity.
 */
export function evaluateSymptomTriage({ symptomId, answers }: TriageParams): {
  outcome: SymptomOutcome;
  title: string;
  guidance: string;
} {
  // 1. Check high-risk triggers for headaches (e.g., severe or preeclampsia signs)
  if (symptomId === "headache") {
    const isSevere = answers["severity"] === "Severe";
    const hasRedFlags =
      answers["associated_symptoms"] &&
      answers["associated_symptoms"] !== "None of these";
    const wonGoAway = answers["duration"] === "All day / won't go away";

    if (isSevere || (hasRedFlags && wonGoAway)) {
      return {
        outcome: "urgent",
        title: "Seek Care Immediately",
        guidance:
          "Severe headaches or headaches combined with vision changes or swelling can be signs of elevated blood pressure (preeclampsia). Please contact your healthcare provider or visit a facility right away.",
      };
    }

    if (hasRedFlags || wonGoAway) {
      return {
        outcome: "seek-care-soon",
        title: "Schedule a Consultation Soon",
        guidance:
          "While headaches are common, persistent symptoms with associated vision or swelling changes should be checked by your midwife or doctor within 24–48 hours.",
      };
    }

    return {
      outcome: "normal",
      title: "Common Pregnancy Symptom",
      guidance:
        "Mild headaches are very common in pregnancy due to hormonal shifts and increased blood supply. Stay hydrated, rest in a dim room, and monitor for changes.",
    };
  }

  // Fallback outcome for general symptoms
  return {
    outcome: "monitor",
    title: "Monitor Your Symptoms",
    guidance:
      "Keep track of how you feel over the next 24 hours. If symptoms escalate or make you uncomfortable, reach out to your provider.",
  };
}