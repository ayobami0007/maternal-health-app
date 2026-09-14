import OnboardingHeader from "./OnboardingHeader";
interface NameStepProps {
  name: string;
  onNameChange: (name: string) => void;
  onContinue: () => void;
  onBack: () => void;
}

export default function NameStep({
  name,
  onNameChange,
  onContinue,
  onBack,
}: NameStepProps) {
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

        <div
          className="flex flex-1 justify-center gap-2"
          aria-label="Step 1 of 3"
        >
          <span className="h-2 w-2 rounded-full bg-brand-sage" />
          <span className="h-2 w-2 rounded-full bg-[#ded9ce]" />
          <span className="h-2 w-2 rounded-full bg-[#ded9ce]" />
        </div>

        <span className="w-10" />
      </div> */}

<OnboardingHeader
  currentStep={1}
  onBack={onBack}
/>
      <h1 className="font-display text-3xl font-semibold leading-tight text-brand-indigo">
        What should
        <br />
        we call you?
      </h1>

      <p className="mb-7 mt-2 max-w-md text-base leading-relaxed text-brand-ink/60">
        This helps us personalize your experience.
      </p>

      <label
        htmlFor="name"
        className="mb-2 block text-sm font-semibold text-brand-ink"
      >
        Your name
      </label>

      <input
        id="name"
        type="text"
        value={name}
        onChange={(event) => onNameChange(event.target.value)}
        placeholder="Your name"
        autoComplete="given-name"
        className="h-[52px] w-full rounded-[15px] border border-brand-line bg-white px-4 outline-none transition focus:border-brand-sage focus:ring-2 focus:ring-brand-sage/20"
      />

      <div className="h-11" />

      <button
        type="button"
        onClick={onContinue}
        disabled={!name.trim()}
      
        className="h-[52px] w-full rounded-[17px] bg-brand-clay font-semibold text-white transition hover:bg-brand-clay/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );
}