import type { OnboardingAnswers } from "./types";

const STORAGE_KEY = "user_onboarding";

// Called once, when onboarding finishes.
export function saveOnboardingAnswers(answers: OnboardingAnswers) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
}

// Called by /dashboard (and anywhere else that needs it) to read the
// answers back. Returns null if onboarding was never completed — worth
// handling that case on dashboard rather than assuming it's always there.
export function getOnboardingAnswers(): OnboardingAnswers | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  return JSON.parse(raw) as OnboardingAnswers;
}