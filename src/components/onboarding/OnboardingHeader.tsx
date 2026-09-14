import OnboardingProgress from "./OnboardingProgress";

interface OnboardingHeaderProps {
  currentStep: number;
  onBack: () => void;
}

export default function OnboardingHeader({
  currentStep,
  onBack,
}: OnboardingHeaderProps) {
  return (
    <div className="mb-7 flex items-center">
      <button
        type="button"
        onClick={onBack}
        aria-label="Go back"
        className="flex h-10 w-10 items-center justify-center text-2xl text-brand-ink"
      >
        ←
      </button>

      <OnboardingProgress currentStep={currentStep} />

      <span className="w-10" aria-hidden="true" />
    </div>
  );
}