import OnboardingHeader from "./OnboardingHeader";

interface PregnancyDateStepProps {
  dateType: "dueDate" | "lmp";
  date: string;
  onDateTypeChange: (type: "dueDate" | "lmp") => void;
  onDateChange: (date: string) => void;
  onFinish: () => void;
  onBack: () => void;
}

export default function PregnancyDateStep({
  dateType,
  date,
  onDateTypeChange,
  onDateChange,
  onFinish,
  onBack,
}: PregnancyDateStepProps) {
  const isDueDate = dateType === "dueDate";
  const today = new Date().toISOString().split("T")[0];

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
          <span className="h-2 w-2 rounded-full bg-[#ded9ce]" />
          <span className="h-2 w-2 rounded-full bg-brand-sage" />
        </div>

        <span className="w-10" />
      </div> */}

<OnboardingHeader
  currentStep={3}
  onBack={onBack}
/>

      <h1 className="font-display text-3xl font-semibold leading-tight text-brand-indigo">
        {isDueDate ? (
          <>
            When is your
            <br />
            due date?
          </>
        ) : (
          <>
            When did your
            <br />
            last period start?
          </>
        )}
      </h1>

      <p className="mb-6 mt-2 max-w-md text-base leading-relaxed text-brand-ink/60">
        We'll use this to show where you are in your pregnancy.
      </p>

      <div className="mb-4 grid grid-cols-2 gap-2 rounded-[15px] bg-brand-line/40 p-1">
        <button
          type="button"
          onClick={() => onDateTypeChange("dueDate")}
          className={`rounded-[12px] py-2.5 text-sm font-semibold transition ${
            isDueDate ? "bg-white text-brand-ink shadow-sm" : "text-brand-ink/60"
          }`}
        >
          Due date
        </button>

        <button
          type="button"
          onClick={() => onDateTypeChange("lmp")}
          className={`rounded-[12px] py-2.5 text-sm font-semibold transition ${
            !isDueDate ? "bg-white text-brand-ink shadow-sm" : "text-brand-ink/60"
          }`}
        >
          Last period
        </button>
      </div>

      <div className="rounded-[18px] border border-brand-line bg-white p-4">
        <label
          htmlFor="pregnancy-date"
          className="mb-2 block text-sm font-semibold text-brand-ink"
        >
          {isDueDate ? "Due date" : "First day of last menstrual period"}
        </label>

        <input
          id="pregnancy-date"
          type="date"
          value={date}
          onChange={(event) => onDateChange(event.target.value)}
           min={isDueDate ? today : undefined}
  max={!isDueDate ? today : undefined}
          className="h-[52px] w-full rounded-[15px] border border-brand-line bg-white px-4 outline-none focus:border-brand-sage focus:ring-2 focus:ring-brand-sage/20"
        />
      </div>

      <div className="h-11" />

      <button
        type="button"
        onClick={onFinish}
        disabled={!date}
        className="h-[52px] w-full rounded-[17px] bg-brand-clay font-semibold text-white transition hover:bg-brand-clay/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Finish
      </button>
    </div>
  );
}