'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Stethoscope, BookOpen, Wallet, Info, User } from 'lucide-react';
import { calculatePregnancyProgress } from '@/lib/pregnancy';
import { useUserStore } from '@/lib/store/useUserStore';

const feelingOptions = [
  { id: 'fine', label: "😊 I'm fine" },
  { id: 'off', label: '😕 Something feels off' },
  { id: 'decide', label: '? I need help deciding' },
];

const quickActions = [
  { name: 'Symptom checker', href: '/symptom-checker/chat', Icon: Stethoscope },
  { name: 'Journal', href: '/journal', Icon: BookOpen },
  { name: 'Appointments & costs', href: '/appointments', Icon: Wallet },
  { name: 'Learn', href: '/learn', Icon: Info },
];

export default function DashboardPage() {
  const router = useRouter();
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);

  // Read state and hydration status directly from Zustand
  const { answers, isHydrated } = useUserStore();

  // Prevent SSR/hydration mismatch while state loads from storage
  if (!isHydrated) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm font-medium text-brand-ink/60">Loading your profile...</p>
      </div>
    );
  }

  const userName = answers.name || 'Friend';

  // Compute progress dynamically from user profile data
  const progress = answers.dueDate
    ? calculatePregnancyProgress(answers.dueDate, 'dueDate')
    : answers.lastMenstrualPeriod
    ? calculatePregnancyProgress(answers.lastMenstrualPeriod, 'lmp')
    : null;

  function handleFeelingSelect(id: string) {
    setSelectedFeeling(id);
    if (id !== 'fine') {
      router.push(`/symptom-checker?intent=${id}`);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-brand-ink tracking-tight">
            Good morning, {userName}
          </h1>
          <p className="text-base text-brand-ink/60 font-medium mt-1">We're here for you.</p>
        </div>

        <button type="button" className="p-2 text-brand-ink/60 hover:text-brand-ink transition-colors" aria-label="Profile">
          <User className="h-6 w-6" />
        </button>
      </div>

      {progress ? (
        <div className="relative overflow-hidden rounded-3xl bg-brand-sage p-6 sm:p-8 text-white shadow-sm flex flex-col justify-between min-h-[160px]">
          <div className="space-y-1">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
              Week {progress.currentWeek}
            </h2>
            <p className="text-sm font-medium opacity-90">{progress.trimester}</p>
          </div>

          <div className="space-y-2 mt-6 max-w-xs">
            <div className="h-2 w-full rounded-full bg-white/30 overflow-hidden">
              <div
                className="h-full rounded-full bg-white transition-all duration-500"
                style={{ width: `${progress.progressPercent}%` }}
              />
            </div>
            <p className="text-xs font-semibold opacity-90">
              {progress.weeksRemaining} {progress.weeksRemaining === 1 ? 'week' : 'weeks'} to go
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-brand-line bg-brand-paper p-6 text-center">
          <p className="text-sm text-brand-ink/70">
            Pregnancy date information not found.{' '}
            <Link href="/onboarding" className="font-bold underline text-brand-clay">
              Set your date
            </Link>
          </p>
        </div>
      )}

      <div className="space-y-3">
        <h3 className="font-display text-lg font-bold text-brand-ink">This week</h3>

        <div className="rounded-3xl border border-brand-line bg-white p-6 shadow-sm space-y-4">
          <div>
            <h4 className="font-display text-base font-bold text-brand-ink">How are you feeling?</h4>
            <p className="text-xs text-brand-ink/60">This helps us guide you better.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {feelingOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleFeelingSelect(option.id)}
                className={`rounded-2xl border px-4 py-4 text-xs font-bold transition-all text-center ${
                  selectedFeeling === option.id
                    ? 'border-brand-clay bg-brand-paper ring-2 ring-brand-clay/20'
                    : 'border-brand-line bg-white hover:bg-brand-paper/50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {selectedFeeling === 'fine' && (
            <p className="text-sm text-brand-sage font-medium">
              Good to know — glad you're feeling okay today.
            </p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-display text-lg font-bold text-brand-ink">What do you want to do?</h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="flex flex-col items-center justify-center rounded-3xl border border-brand-line bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-brand-clay/40 text-center space-y-3"
            >
              <action.Icon className="h-6 w-6 text-brand-ink/70" />
              <span className="text-xs font-bold text-brand-ink leading-tight">{action.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}