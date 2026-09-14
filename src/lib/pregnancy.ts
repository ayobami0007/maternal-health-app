export interface PregnancyProgress {
  currentWeek: number;
  trimester: string;
  weeksRemaining: number;
  progressPercent: number;
}

const TOTAL_DAYS = 280; // 40 weeks — standard full-term estimate from LMP

// Works from either a due date or an LMP by first converting both into
// "days since LMP" — everything after that line is the same math either way.
export function calculatePregnancyProgress(
  dateString: string,
  type: "dueDate" | "lmp"
): PregnancyProgress {
  const today = new Date();
  const inputDate = new Date(`${dateString}T00:00:00`);
  const msPerDay = 1000 * 60 * 60 * 24;

  const daysSinceLMP =
    type === "lmp"
      ? Math.floor((today.getTime() - inputDate.getTime()) / msPerDay)
      : TOTAL_DAYS - Math.floor((inputDate.getTime() - today.getTime()) / msPerDay);

  const clampedDays = Math.max(0, Math.min(TOTAL_DAYS, daysSinceLMP));
  const currentWeek = Math.floor(clampedDays / 7);
  const weeksRemaining = Math.max(0, Math.ceil((TOTAL_DAYS - clampedDays) / 7));
  const progressPercent = Math.round((clampedDays / TOTAL_DAYS) * 100);

  let trimester = "First trimester";
  if (currentWeek >= 28) trimester = "Third trimester";
  else if (currentWeek >= 13) trimester = "Second trimester";

  return { currentWeek, trimester, weeksRemaining, progressPercent };
}