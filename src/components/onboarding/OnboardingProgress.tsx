interface OnboardingProgressProps {
  currentStep: number;
  totalSteps?: number;
}

export default function OnboardingProgress({
  currentStep,
  totalSteps = 3,
}: OnboardingProgressProps) {
  return (
    <div
      className="flex flex-1 items-center justify-center gap-2"
      aria-label={`Step ${currentStep} of ${totalSteps}`}
    >
      {Array.from({ length: totalSteps }).map((_, index) => (
        <span
          key={index}
          className={`h-2 w-2 rounded-full ${
            index + 1 === currentStep
              ? "bg-brand-sage"
              : "bg-brand-line"
          }`}
        />
      ))}
    </div>
  );
}