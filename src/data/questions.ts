import { SymptomQuestion } from "@/lib/types";

/**
 * Question bank for the Symptom Checker.
 * Maps a symptom `id` (e.g. "headache") to an array of follow-up questions.
 */
export const symptomQuestions: Record<string, SymptomQuestion[]> = {
  headache: [
    {
      id: "severity",
      question: "How would you describe the headache?",
      options: ["Mild", "Moderate", "Severe"],
    },
    {
      id: "duration",
      question: "How long has this headache lasted?",
      options: ["Less than 2 hours", "A few hours", "All day / won't go away"],
    },
    {
      id: "associated_symptoms",
      question: "Are you experiencing any of these other symptoms?",
      options: [
        "Blurred or spotty vision",
        "Swelling in hands or face",
        "Upper abdominal pain",
        "None of these",
      ],
    },
  ],
};