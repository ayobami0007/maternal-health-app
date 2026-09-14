
// import type { DangerSign, Symptom } from "@/lib/types";

// /**
//  * Starter symptom list — pulled from recurring Reddit threads + UNICEF guidance.
//  * Expand this once the interviews surface which symptoms come up most for
//  * your two interviewees specifically.
//  */
// export const symptoms: Symptom[] = [
//   {
//     id: "spotting",
//     name: "Spotting or light bleeding",
//     description: "Light pink or brown spotting, not a heavy flow.",
//     category: "physical",
//     commonInTrimester: [1],
//     reassuranceNote:
//       "Common in early pregnancy and often harmless, but always worth mentioning at your next contact.",
//   },
//   {
//     id: "no-symptoms",
//     name: "No symptoms at all",
//     description: "Feeling completely normal with no nausea, fatigue, or other signs.",
//     category: "physical",
//     commonInTrimester: [1, 2],
//     reassuranceNote:
//       "Having no symptoms is just as normal as having many — it isn't a sign that something is wrong.",
//   },
//   {
//     id: "nausea-fatigue",
//     name: "Nausea and fatigue",
//     description: "Persistent tiredness and queasiness, sometimes described as an all-day hangover feeling.",
//     category: "digestive",
//     commonInTrimester: [1],
//   },
//   {
//     id: "anxiety-spike",
//     name: "Sudden anxiety or racing thoughts",
//     description: "A spike in worry, especially after a symptom changes or disappears.",
//     category: "emotional",
//     commonInTrimester: [1, 2, 3],
//   },
// ];

// /**
//  * Danger signs from UNICEF clinical guidance — these should always route to
//  * "urgent, contact your provider now" regardless of what else the checker logic does.
//  */
// export const dangerSigns: DangerSign[] = [
//   {
//     id: "heavy-bleeding",
//     name: "Heavy vaginal bleeding",
//     guidance: "Contact your provider or go to a facility immediately.",
//   },
//   {
//     id: "severe-headache",
//     name: "Severe headache that won't go away",
//     guidance: "Contact your provider or go to a facility immediately.",
//   },
//   {
//     id: "decreased-movement",
//     name: "Noticeably decreased fetal movement",
//     guidance: "Contact your provider or go to a facility immediately.",
//   },
// ];

import type { DangerSign, Symptom } from "@/lib/types";

export const symptoms: Symptom[] = [
  {
    id: "headache",
    name: "Headache or vision changes",
    description: "Persistent head discomfort or unexpected changes in vision.",
    category: "physical",
    commonInTrimester: [2, 3],
    reassuranceNote:
      "Mild headaches can happen due to hormones or dehydration, but persistent or severe headaches need careful evaluation.",
  },
  {
    id: "spotting",
    name: "Spotting or light bleeding",
    description: "Light pink or brown spotting, not a heavy flow.",
    category: "physical",
    commonInTrimester: [1],
    reassuranceNote:
      "Common in early pregnancy and often harmless, but always worth mentioning at your next contact.",
  },
  {
    id: "no-symptoms",
    name: "No symptoms at all",
    description: "Feeling completely normal with no nausea, fatigue, or other signs.",
    category: "physical",
    commonInTrimester: [1, 2],
    reassuranceNote:
      "Having no symptoms is just as normal as having many — it isn't a sign that something is wrong.",
  },
  {
    id: "nausea-fatigue",
    name: "Nausea and fatigue",
    description: "Persistent tiredness and queasiness, sometimes described as an all-day hangover feeling.",
    category: "digestive",
    commonInTrimester: [1],
  },
  {
    id: "anxiety-spike",
    name: "Sudden anxiety or racing thoughts",
    description: "A spike in worry, especially after a symptom changes or disappears.",
    category: "emotional",
    commonInTrimester: [1, 2, 3],
  },
];

export const dangerSigns: DangerSign[] = [
  {
    id: "heavy-bleeding",
    name: "Heavy vaginal bleeding",
    guidance: "Contact your provider or go to a facility immediately.",
  },
  {
    id: "severe-headache",
    name: "Severe headache that won't go away",
    guidance: "Contact your provider or go to a facility immediately.",
  },
  {
    id: "decreased-movement",
    name: "Noticeably decreased fetal movement",
    guidance: "Contact your provider or go to a facility immediately.",
  },
];