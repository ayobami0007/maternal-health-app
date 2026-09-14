'use client';

import React, { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { symptoms } from '@/data/symptoms';
import { searchSymptoms } from '@/lib/symptomMapper';

export default function SymptomCheckerLandingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const intent = searchParams.get('intent');
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic header copy based on intent query param
  const title =
    intent === 'decide'
      ? "Let's figure out what's going on"
      : intent === 'off'
      ? "Something feels off"
      : 'What are you feeling today?';

  const subtitle =
    intent === 'decide'
      ? 'Select what describes your situation best so we can guide you.'
      : intent === 'off'
      ? "Choose what's closest to what you're experiencing right now."
      : 'Search your symptoms or select one from the options below.';

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return symptoms.map((s) => ({ ...s, isExactMatch: false }));
    }
    return searchSymptoms(searchQuery);
  }, [searchQuery]);

  const handleSelectSymptom = (symptomId: string) => {
    router.push(`/symptom-checker/chat?symptom=${symptomId}`);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:py-10 space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full p-2 text-brand-ink/70 hover:bg-black/5 transition-colors"
          aria-label="Go back"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Verified Guidance
        </div>
      </div>

      {/* Dynamic Title & Subtitle */}
      <div className="space-y-1 text-center sm:text-left">
        <h1 className="font-display text-xl sm:text-2xl font-bold text-brand-ink">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-brand-ink/60">
          {subtitle}
        </p>
      </div>

      {/* Free-Text Search Input */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-brand-ink/40">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Type what you're feeling (e.g. throbbing head, back ache)..."
          className="w-full rounded-2xl border border-brand-line/80 bg-white py-3.5 pl-11 pr-10 text-xs sm:text-sm font-medium text-brand-ink placeholder:text-brand-ink/40 shadow-sm transition-all focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs font-bold text-brand-ink/40 hover:text-brand-ink"
          >
            Clear
          </button>
        )}
      </div>

      {/* Results Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-ink/50">
            {searchQuery ? 'Matching Symptoms' : 'Common Symptoms'}
          </h2>
          <span className="text-[11px] font-medium text-brand-ink/40">
            {searchResults.length} available
          </span>
        </div>

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {searchResults.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectSymptom(item.id)}
                className={`flex items-start justify-between rounded-2xl border p-4 text-left transition-all active:scale-[0.98] ${
                  item.isExactMatch
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                    : 'border-brand-line/80 bg-white hover:border-emerald-600/60 hover:bg-brand-paper/20'
                }`}
              >
                <div className="space-y-1">
                  <span className="font-display text-sm font-bold text-brand-ink block">
                    {item.name}
                  </span>
                  {item.description && (
                    <p className="text-xs text-brand-ink/60 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="mt-0.5 rounded-full bg-brand-paper p-1 text-brand-ink/40 shrink-0">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-brand-line/80 bg-white p-8 text-center space-y-3">
            <p className="text-xs sm:text-sm font-semibold text-brand-ink">
              No matching symptoms found for "{searchQuery}"
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="rounded-xl bg-brand-ink px-4 py-2 text-xs font-semibold text-white"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}