"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import NameStep from "./NameStep";
import PregnancyStep from "./PregnancyStep";
import PregnancyDateStep from "./PregnancyDateStep";
import { OnboardingAnswers } from "@/lib/types";
import { useUserStore } from "@/lib/store/useUserStore";

export default function Onboarding() {
  const router = useRouter();
  
  // Zustand store hook
  const setAnswersInStore = useUserStore((state) => state.setAnswers);

  const [step, setStep] = useState(1);

  // Local component form state
  const [answers, setLocalAnswers] = useState<OnboardingAnswers>({
    name: "",
    isFirstPregnancy: null,
    dueDate: undefined,
    lastMenstrualPeriod: undefined,
  });

  const [dateType, setDateType] = useState<"dueDate" | "lmp">("dueDate");

  const updateAnswers = (updates: Partial<OnboardingAnswers>) => {
    setLocalAnswers((current) => ({
      ...current,
      ...updates,
    }));
  };

  const handleFinish = () => {
    // 1. Validations
    if (!answers.name.trim()) return;
    if (answers.isFirstPregnancy === null) return;

    const selectedDate =
      dateType === "dueDate" ? answers.dueDate : answers.lastMenstrualPeriod;

    if (!selectedDate) return;

    // 2. Compute due date if the user gave LMP instead
    let calculatedDueDate = answers.dueDate;

    if (dateType === "lmp") {
      const lmpDate = new Date(`${selectedDate}T00:00:00`);
      lmpDate.setDate(lmpDate.getDate() + 280);
      calculatedDueDate = lmpDate.toISOString().split("T")[0];
    }

    // 3. Save to Zustand store (automatically persists via middleware)
    setAnswersInStore({
      name: answers.name.trim(),
      isFirstPregnancy: answers.isFirstPregnancy,
      dueDate: calculatedDueDate,
      lastMenstrualPeriod:
        dateType === "lmp" ? answers.lastMenstrualPeriod : undefined,
    });

    // 4. Navigate to dashboard
    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-brand-paper px-4 py-6 sm:px-6 md:px-12">
      <div className="w-full max-w-5xl rounded-3xl border border-brand-line bg-white px-6 py-8 sm:px-10 sm:py-10 md:px-12">
        {step === 1 && (
          <NameStep
            name={answers.name}
            onNameChange={(name) => updateAnswers({ name })}
            onContinue={() => setStep(2)}
            onBack={() => router.back()}
          />
        )}

        {step === 2 && (
          <PregnancyStep
            value={answers.isFirstPregnancy}
            onChange={(value) => updateAnswers({ isFirstPregnancy: value })}
            onContinue={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <PregnancyDateStep
            dateType={dateType}
            date={
              dateType === "dueDate"
                ? answers.dueDate ?? ""
                : answers.lastMenstrualPeriod ?? ""
            }
            onDateTypeChange={(type) => {
              setDateType(type);
              updateAnswers({
                dueDate: undefined,
                lastMenstrualPeriod: undefined,
              });
            }}
            onDateChange={(date) => {
              if (dateType === "dueDate") {
                updateAnswers({ dueDate: date, lastMenstrualPeriod: undefined });
              } else {
                updateAnswers({ lastMenstrualPeriod: date, dueDate: undefined });
              }
            }}
            onFinish={handleFinish}
            onBack={() => setStep(2)}
          />
        )}
      </div>
    </main>
  );
}