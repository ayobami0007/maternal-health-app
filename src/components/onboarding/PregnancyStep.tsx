import OnboardingHeader from "./OnboardingHeader";

interface PregnancyStepProps {
  value: boolean | null;
  onChange: (value: boolean) => void;
  onContinue: () => void;
  onBack: () => void;
}

export default function PregnancyStep({
  value,
  onChange,
  onContinue,
  onBack,
}: PregnancyStepProps) {
  return (
    <div>
      {/* <div className="mb-7 flex items-center">
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="flex h-10 w-10 items-center justify-center text-2xl text-brand-ink"
        >
          ←
        </button>

        <div className="flex flex-1 justify-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#ded9ce]" />
          <span className="h-2 w-2 rounded-full bg-brand-sage" />
          <span className="h-2 w-2 rounded-full bg-[#ded9ce]" />
        </div>

        <span className="w-10" />
      </div> */}

      <OnboardingHeader
  currentStep={2}
  onBack={onBack}
/>

      <h1 className="font-display text-3xl font-semibold leading-tight text-brand-indigo">
        Is this your
        <br />
        first pregnancy?
      </h1>

      <p className="mb-7 mt-2 max-w-md text-base leading-relaxed text-brand-ink/60">
        We'll use this to tailor how we explain things to you.
      </p>

      <div className="space-y-3">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`flex min-h-16 w-full items-center gap-3 rounded-[17px] border bg-white px-[18px] text-left transition ${
            value === true
              ? "border-2 border-brand-sage bg-brand-sage/10"
              : "border-brand-line"
          }`}
        >
          <span
            className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border ${
              value === true
                ? "border-2 border-brand-sage"
                : "border-[#8e918c]"
            }`}
          >
            {value === true && (
              <span className="h-3 w-3 rounded-full bg-brand-sage" />
            )}
          </span>

          <span>Yes, it's my first</span>
        </button>

        <button
          type="button"
          onClick={() => onChange(false)}
          className={`flex min-h-16 w-full items-center gap-3 rounded-[17px] border bg-white px-[18px] text-left transition ${
            value === false
              ? "border-2 border-brand-sage bg-brand-sage/10"
              : "border-brand-line"
          }`}
        >
          <span
            className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border ${
              value === false
                ? "border-2 border-brand-sage"
                : "border-[#8e918c]"
            }`}
          >
            {value === false && (
              <span className="h-3 w-3 rounded-full bg-brand-sage" />
            )}
          </span>

          <span>No, I've been pregnant before</span>
        </button>
      </div>

      <div className="h-11" />

      <button
        type="button"
        onClick={onContinue}
        disabled={value === null}
        className="h-[52px] w-full rounded-[17px] bg-brand-clay font-semibold text-white transition hover:bg-brand-clay/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Continue
      </button>

      <p className="mt-8 text-center text-xs text-brand-ink/50">
        You can change this later in settings
      </p>
    </div>
  );
}