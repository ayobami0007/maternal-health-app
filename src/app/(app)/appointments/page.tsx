'use client';

import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Plus,
  DollarSign,
  Clock,
  MapPin,
  CheckCircle2,
  Trash2,
  Calculator,
  UserCheck,
} from 'lucide-react';

interface Appointment {
  id: string;
  title: string;
  doctor: string;
  date: string;
  time: string;
  location: string;
  type: 'ultrasound' | 'checkup' | 'lab' | 'consultation';
  status: 'upcoming' | 'completed';
}

interface CostItem {
  id: string;
  description: string;
  estimatedCost: number;
  coveredByInsurance: boolean;
  category: 'prenatal' | 'delivery' | 'postnatal' | 'supplements';
}

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState<'appointments' | 'costs'>('appointments');

  // Appointments State
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Anatomy Ultrasound (20 Weeks)',
      doctor: 'Dr. Sarah Jenkins',
      date: '2026-09-28',
      time: '10:00 AM',
      location: 'St. Mary Maternity Center, Suite 302',
      type: 'ultrasound',
      status: 'upcoming',
    },
    {
      id: '2',
      title: 'Routine Prenatal Checkup',
      doctor: 'Nurse Midwife Grace',
      date: '2026-09-10',
      time: '02:30 PM',
      location: 'Community Health Clinic',
      type: 'checkup',
      status: 'completed',
    },
  ]);

  const [isApptFormOpen, setIsApptFormOpen] = useState(false);
  const [newAppt, setNewAppt] = useState({
    title: '',
    doctor: '',
    date: '',
    time: '',
    location: '',
    type: 'checkup' as Appointment['type'],
  });

  // Cost Estimator State
  const [costs, setCosts] = useState<CostItem[]>([
    { id: '1', description: 'Routine Ultrasound & Scans', estimatedCost: 250, coveredByInsurance: true, category: 'prenatal' },
    { id: '2', description: 'Prenatal Vitamins & Iron Supplements', estimatedCost: 45, coveredByInsurance: false, category: 'supplements' },
    { id: '3', description: 'Hospital Delivery & Stay Deposit', estimatedCost: 1200, coveredByInsurance: true, category: 'delivery' },
  ]);

  const [isCostFormOpen, setIsCostFormOpen] = useState(false);
  const [newCost, setNewCost] = useState({
    description: '',
    estimatedCost: '',
    coveredByInsurance: false,
    category: 'prenatal' as CostItem['category'],
  });

  // Handlers for Appointments
  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppt.title || !newAppt.date) return;

    const item: Appointment = {
      id: Date.now().toString(),
      ...newAppt,
      status: 'upcoming',
    };

    setAppointments([item, ...appointments]);
    setNewAppt({ title: '', doctor: '', date: '', time: '', location: '', type: 'checkup' });
    setIsApptFormOpen(false);
  };

  const toggleApptStatus = (id: string) => {
    setAppointments(
      appointments.map((a) =>
        a.id === id ? { ...a, status: a.status === 'upcoming' ? 'completed' : 'upcoming' } : a
      )
    );
  };

  const deleteAppt = (id: string) => {
    setAppointments(appointments.filter((a) => a.id !== id));
  };

  // Handlers for Costs
  const handleAddCost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCost.description || !newCost.estimatedCost) return;

    const item: CostItem = {
      id: Date.now().toString(),
      description: newCost.description,
      estimatedCost: parseFloat(newCost.estimatedCost) || 0,
      coveredByInsurance: newCost.coveredByInsurance,
      category: newCost.category,
    };

    setCosts([...costs, item]);
    setNewCost({ description: '', estimatedCost: '', coveredByInsurance: false, category: 'prenatal' });
    setIsCostFormOpen(false);
  };

  const deleteCost = (id: string) => {
    setCosts(costs.filter((c) => c.id !== id));
  };

  // Cost Summaries
  const totalEstimatedCost = costs.reduce((sum, item) => sum + item.estimatedCost, 0);
  const outOfPocketEstimate = costs
    .filter((item) => !item.coveredByInsurance)
    .reduce((sum, item) => sum + item.estimatedCost, 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-brand-line/60 pb-4 gap-3">
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-brand-ink">
            Care & Finances
          </h1>
          <p className="text-xs sm:text-sm text-brand-ink/60">
            Manage your clinical visits and estimate your maternity budget
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex rounded-xl bg-gray-100 p-1 border border-gray-200">
          <button
            type="button"
            onClick={() => setActiveTab('appointments')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'appointments'
                ? 'bg-white text-emerald-800 shadow-sm'
                : 'text-gray-600 hover:text-brand-ink'
            }`}
          >
            <CalendarIcon className="h-3.5 w-3.5" />
            <span>Visits</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('costs')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'costs'
                ? 'bg-white text-emerald-800 shadow-sm'
                : 'text-gray-600 hover:text-brand-ink'
            }`}
          >
            <Calculator className="h-3.5 w-3.5" />
            <span>Care Budget</span>
          </button>
        </div>
      </div>

      {/* TAB 1: APPOINTMENTS */}
      {activeTab === 'appointments' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-brand-ink flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-emerald-700" /> Scheduled Appointments
            </h2>

            <button
              type="button"
              onClick={() => setIsApptFormOpen(!isApptFormOpen)}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-700 px-3.5 py-2 text-xs font-semibold text-white hover:bg-emerald-800 transition-all shadow-sm"
            >
              <Plus className="h-4 w-4" />
              <span>{isApptFormOpen ? 'Cancel' : 'Add Visit'}</span>
            </button>
          </div>

          {/* New Appointment Form */}
          {isApptFormOpen && (
            <form
              onSubmit={handleAddAppointment}
              className="rounded-2xl border border-brand-line/60 bg-white p-4 sm:p-5 shadow-sm space-y-4 animate-in fade-in duration-200"
            >
              <h3 className="text-xs font-bold text-brand-ink uppercase tracking-wider">
                Schedule New Visit
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-brand-ink/70">Visit Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Routine Prenatal Checkup"
                    value={newAppt.title}
                    onChange={(e) => setNewAppt({ ...newAppt, title: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-brand-line/80 px-3 py-2 text-xs text-brand-ink focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-brand-ink/70">Doctor / Provider</label>
                  <input
                    type="text"
                    placeholder="e.g., Dr. Smith"
                    value={newAppt.doctor}
                    onChange={(e) => setNewAppt({ ...newAppt, doctor: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-brand-line/80 px-3 py-2 text-xs text-brand-ink focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-brand-ink/70">Date</label>
                  <input
                    type="date"
                    required
                    value={newAppt.date}
                    onChange={(e) => setNewAppt({ ...newAppt, date: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-brand-line/80 px-3 py-2 text-xs text-brand-ink focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-brand-ink/70">Time</label>
                  <input
                    type="text"
                    placeholder="e.g., 10:30 AM"
                    value={newAppt.time}
                    onChange={(e) => setNewAppt({ ...newAppt, time: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-brand-line/80 px-3 py-2 text-xs text-brand-ink focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-brand-ink/70">Clinic Location</label>
                <input
                  type="text"
                  placeholder="e.g., City Hospital Suite 200"
                  value={newAppt.location}
                  onChange={(e) => setNewAppt({ ...newAppt, location: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-brand-line/80 px-3 py-2 text-xs text-brand-ink focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-700 py-2.5 text-xs font-semibold text-white hover:bg-emerald-800 transition-all"
              >
                Save Appointment
              </button>
            </form>
          )}

          {/* Appointment List */}
          <div className="space-y-3">
            {appointments.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500 text-xs sm:text-sm">
                No upcoming visits logged. Click "Add Visit" to keep track of your schedule.
              </div>
            ) : (
              appointments.map((appt) => (
                <div
                  key={appt.id}
                  className={`rounded-2xl border p-4 sm:p-5 shadow-sm space-y-3 transition-all ${
                    appt.status === 'completed'
                      ? 'border-gray-200 bg-gray-50 opacity-75'
                      : 'border-brand-line/60 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="inline-block rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-600/20 capitalize">
                        {appt.type}
                      </span>
                      <h3
                        className={`text-sm font-bold ${
                          appt.status === 'completed'
                            ? 'line-through text-gray-500'
                            : 'text-brand-ink'
                        }`}
                      >
                        {appt.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => toggleApptStatus(appt.id)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          appt.status === 'completed'
                            ? 'border-emerald-600 bg-emerald-100 text-emerald-800'
                            : 'border-gray-200 text-gray-400 hover:text-emerald-700'
                        }`}
                        title={appt.status === 'completed' ? 'Mark as upcoming' : 'Mark as completed'}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteAppt(appt.id)}
                        className="p-1.5 text-gray-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-gray-100 text-xs text-brand-ink/70">
                    <div className="flex items-center gap-1.5">
                      <CalendarIcon className="h-3.5 w-3.5 text-emerald-700" />
                      <span>{appt.date} {appt.time && `at ${appt.time}`}</span>
                    </div>

                    {appt.doctor && (
                      <div className="flex items-center gap-1.5">
                        <UserCheck className="h-3.5 w-3.5 text-emerald-700" />
                        <span>{appt.doctor}</span>
                      </div>
                    )}

                    {appt.location && (
                      <div className="flex items-center gap-1.5 sm:col-span-1">
                        <MapPin className="h-3.5 w-3.5 text-emerald-700" />
                        <span className="truncate">{appt.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: COST ESTIMATOR */}
      {activeTab === 'costs' && (
        <div className="space-y-5">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-1">
              <span className="text-[11px] font-semibold text-emerald-900/70">Total Estimated Expenses</span>
              <p className="font-display text-lg sm:text-2xl font-bold text-emerald-950">
                ${totalEstimatedCost.toLocaleString()}
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 space-y-1">
              <span className="text-[11px] font-semibold text-amber-900/70">Estimated Out-of-Pocket</span>
              <p className="font-display text-lg sm:text-2xl font-bold text-amber-950">
                ${outOfPocketEstimate.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <h2 className="text-sm font-bold text-brand-ink flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-emerald-700" /> Expense Items
            </h2>

            <button
              type="button"
              onClick={() => setIsCostFormOpen(!isCostFormOpen)}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-700 px-3.5 py-2 text-xs font-semibold text-white hover:bg-emerald-800 transition-all shadow-sm"
            >
              <Plus className="h-4 w-4" />
              <span>{isCostFormOpen ? 'Cancel' : 'Add Cost'}</span>
            </button>
          </div>

          {/* New Cost Form */}
          {isCostFormOpen && (
            <form
              onSubmit={handleAddCost}
              className="rounded-2xl border border-brand-line/60 bg-white p-4 sm:p-5 shadow-sm space-y-4 animate-in fade-in duration-200"
            >
              <h3 className="text-xs font-bold text-brand-ink uppercase tracking-wider">
                Add Expected Expense
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-brand-ink/70">Description</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Blood Tests / Lab Work"
                    value={newCost.description}
                    onChange={(e) => setNewCost({ ...newCost, description: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-brand-line/80 px-3 py-2 text-xs text-brand-ink focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-brand-ink/70">Estimated Cost ($)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g., 150"
                    value={newCost.estimatedCost}
                    onChange={(e) => setNewCost({ ...newCost, estimatedCost: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-brand-line/80 px-3 py-2 text-xs text-brand-ink focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="insurance"
                  checked={newCost.coveredByInsurance}
                  onChange={(e) => setNewCost({ ...newCost, coveredByInsurance: e.target.checked })}
                  className="rounded text-emerald-700 focus:ring-emerald-600"
                />
                <label htmlFor="insurance" className="text-xs font-medium text-brand-ink/80">
                  Covered by Health Insurance / Benefits
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-700 py-2.5 text-xs font-semibold text-white hover:bg-emerald-800 transition-all"
              >
                Save Expense Item
              </button>
            </form>
          )}

          {/* Cost Items Table / List */}
          <div className="rounded-2xl border border-brand-line/60 bg-white overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-100 bg-gray-50 text-xs font-bold text-gray-500 grid grid-cols-12">
              <span className="col-span-6">Description</span>
              <span className="col-span-3 text-center">Insurance</span>
              <span className="col-span-3 text-right">Cost</span>
            </div>

            <div className="divide-y divide-gray-100 text-xs">
              {costs.length === 0 ? (
                <div className="p-6 text-center text-gray-400">
                  No care expenses added yet.
                </div>
              ) : (
                costs.map((c) => (
                  <div key={c.id} className="p-4 grid grid-cols-12 items-center hover:bg-gray-50/50">
                    <div className="col-span-6 pr-2">
                      <p className="font-semibold text-brand-ink">{c.description}</p>
                      <span className="text-[10px] text-gray-400 capitalize">{c.category}</span>
                    </div>

                    <div className="col-span-3 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          c.coveredByInsurance
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {c.coveredByInsurance ? 'Covered' : 'Self-Pay'}
                      </span>
                    </div>

                    <div className="col-span-3 flex items-center justify-end gap-2 text-right">
                      <span className="font-bold text-brand-ink">${c.estimatedCost}</span>
                      <button
                        type="button"
                        onClick={() => deleteCost(c.id)}
                        className="text-gray-300 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}