/**
 * Core data models for the maternal health app.
 * These are shaped directly by the research log (pregnancy_app_research_pain_points).
 * No backend — these types describe the mock/static data that lives in src/data/.
 *
 * NOTE: These will likely gain a field or two after the two user interviews,
 * but the core shapes are backed by 6+ independent sources, so they're a safe
 * starting point.
 */

export type Trimester = 1 | 2 | 3;

// ---------- Onboarding ----------

export interface OnboardingAnswers {
  isFirstPregnancy: boolean | null;
  dueDate?: string; // ISO date, either given directly or calculated from LMP
  lastMenstrualPeriod?: string; // ISO date
    name: string;
  // primaryConcerns: PrimaryConcern[];
  // preferredCheckInFrequency: "daily" | "weekly"; // pain point: daily notifications feel excessive
  // state?: NigerianState; // for future localization of cost/facility guidance
}

export type PrimaryConcern =
  | "anxiety"
  | "cost-of-care"
  | "nutrition"
  | "symptoms-normal-or-not"
  | "finding-good-care"
  | "birth-preparation";

// ---------- Pregnancy Profile (drives the home dashboard) ----------

export interface PregnancyProfile {
  id: string;
  dueDate: string;
  currentWeek: number;
  trimester: Trimester;
  isFirstPregnancy: boolean;
  state?: NigerianState;
}




// ---------- "Is this normal?" Symptom Checker ----------

export type SymptomSeverity = "mild" | "moderate" | "severe" ;

export type SymptomOutcome =
  | "normal"
  | "monitor"
  | "seek-care-soon"
  | "urgent";

export type SymptomCategory = "physical" | "emotional" | "digestive" | "other";

export interface Symptom {
  id: string;
  name: string;
  description: string;
  category: SymptomCategory;
  commonInTrimester: Trimester[];
  reassuranceNote?: string; // plain-language "here's why this is often normal"
}

export interface SymptomLog {
  id: string;
  symptomId: string;
  loggedAt: string; // ISO datetime
  severity: SymptomSeverity;
  weekAtLogging: number;
  notes?: string;
}


export interface SymptomQuestion {
  id: string;
  question: string;
  options: string[];
}

// UNICEF-flagged danger signs that should always escalate to urgent
export interface DangerSign {
  id: string;
  name: string;
  guidance: string;
}

// ---------- Prompted Journal ----------

export type JournalMood = "great" | "okay" | "anxious" | "overwhelmed" | "low";

export interface JournalPrompt {
  id: string;
  text: string;
  trimester?: Trimester; // undefined = applies anytime
}

export interface JournalEntry {
  id: string;
  promptId?: string;
  date: string; // ISO date
  weekAtEntry: number;
  mood?: JournalMood;
  content: string;
}

// ---------- Appointment & Cost Tracker ----------

export type AppointmentStatus = "upcoming" | "completed" | "missed";

export interface Appointment {
  id: string;
  date: string; // ISO date
  facility: string;
  type: string; // e.g. "Antenatal contact 1", "Ultrasound scan"
  status: AppointmentStatus;
  contactNumber?: number; // WHO's 8-contact model: 1–8
  notes?: string;
}

export interface CostEntry {
  id: string;
  appointmentId?: string;
  label: string; // e.g. "Registration fee", "Lab tests", "Malaria drugs"
  amountNaira: number;
  date: string; // ISO date
  wasExpected: boolean; // ties to the "unexpected charges" pain point
}

// ---------- Shared reference data ----------
