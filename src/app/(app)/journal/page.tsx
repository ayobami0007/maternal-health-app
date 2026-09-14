'use client';

import React, { useState } from 'react';
import { 
  Smile, 
  Meh, 
  Frown, 
  BatteryCharging, 
  Plus, 
  Calendar as CalendarIcon, 
  BookOpen, 
  Trash2, 
  Sparkles 
} from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  mood: 'great' | 'okay' | 'struggling';
  energy: 'high' | 'medium' | 'low';
  symptoms: string[];
  notes: string;
}

const COMMON_SYMPTOMS = [
  'Nausea',
  'Headache',
  'Fatigue',
  'Cramping',
  'Swelling',
  'Heartburn',
  'Backache',
  'Mood Swings',
];

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: '2026-09-14',
      mood: 'okay',
      energy: 'medium',
      symptoms: ['Fatigue', 'Nausea'],
      notes: 'Rested in the afternoon. Drank plenty of water.',
    },
  ]);

  const [selectedMood, setSelectedMood] = useState<'great' | 'okay' | 'struggling'>('great');
  const [selectedEnergy, setSelectedEnergy] = useState<'high' | 'medium' | 'low'>('medium');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      energy: selectedEnergy,
      symptoms: selectedSymptoms,
      notes,
    };

    setEntries([newEntry, ...entries]);

    // Reset Form
    setSelectedSymptoms([]);
    setNotes('');
    setIsFormOpen(false);
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 space-y-6">
      {/* Page Title & Action */}
      <div className="flex items-center justify-between border-b border-brand-line/60 pb-4">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-brand-ink">
            Daily Journal
          </h1>
          <p className="text-xs sm:text-sm text-brand-ink/60">
            Track your daily mood, symptoms, and thoughts
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-emerald-800 transition-all"
        >
          {isFormOpen ? (
            'Close Form'
          ) : (
            <>
              <Plus className="h-4 w-4" />
              <span>New Entry</span>
            </>
          )}
        </button>
      </div>

      {/* Log Entry Form */}
      {isFormOpen && (
        <form
          onSubmit={handleSaveEntry}
          className="rounded-2xl border border-brand-line/60 bg-white p-5 shadow-sm space-y-5 animate-in fade-in duration-200"
        >
          <h2 className="text-sm sm:text-base font-bold text-brand-ink flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-600" /> Today's Check-in
          </h2>

          {/* Mood Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-brand-ink/70">How are you feeling?</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'great', label: 'Great', icon: Smile, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
                { id: 'okay', label: 'Okay', icon: Meh, color: 'text-amber-600 bg-amber-50 border-amber-200' },
                { id: 'struggling', label: 'Struggling', icon: Frown, color: 'text-rose-600 bg-rose-50 border-rose-200' },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = selectedMood === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMood(m.id as any)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                      isSelected ? `${m.color} font-bold ring-2 ring-emerald-600/20` : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <Icon className="h-6 w-6 mb-1" />
                    <span className="text-xs">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Energy Level */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-brand-ink/70">Energy Level</label>
            <div className="flex gap-2">
              {['low', 'medium', 'high'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSelectedEnergy(level as any)}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold capitalize border transition-all ${
                    selectedEnergy === level
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {level} Energy
                </button>
              ))}
            </div>
          </div>

          {/* Symptom Checklist */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-brand-ink/70">Symptoms Experienced</label>
            <div className="flex flex-wrap gap-2">
              {COMMON_SYMPTOMS.map((symptom) => {
                const isSelected = selectedSymptoms.includes(symptom);
                return (
                  <button
                    key={symptom}
                    type="button"
                    onClick={() => toggleSymptom(symptom)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-700 text-white'
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {symptom}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Freeform Notes */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-brand-ink/70">Notes & Reflections</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What's on your mind today? Write down any thoughts or questions for your doctor..."
              className="w-full rounded-xl border border-brand-line/80 p-3 text-xs sm:text-sm text-brand-ink placeholder:text-brand-ink/40 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-700 py-3 text-xs sm:text-sm font-semibold text-white hover:bg-emerald-800 transition-all"
          >
            Save Journal Entry
          </button>
        </form>
      )}

      {/* Entry History List */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-brand-ink flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-emerald-700" /> Past Logs
        </h2>

        {entries.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500 text-xs sm:text-sm">
            No journal entries yet. Tap "New Entry" above to log how you feel today.
          </div>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="rounded-2xl border border-brand-line/60 bg-white p-4 sm:p-5 shadow-sm space-y-3 relative group"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  <span>{entry.date}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize bg-gray-100 text-gray-700">
                    {entry.mood} mood
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize bg-emerald-50 text-emerald-800">
                    {entry.energy} energy
                  </span>

                  <button
                    type="button"
                    onClick={() => handleDelete(entry.id)}
                    className="p-1 text-gray-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Logged Symptoms */}
              {entry.symptoms.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {entry.symptoms.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-900 border border-emerald-600/20 text-[11px] font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {/* Notes */}
              {entry.notes && (
                <p className="text-xs sm:text-sm text-brand-ink/80 leading-relaxed">
                  {entry.notes}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}