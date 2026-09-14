import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface OnboardingAnswers {
  name: string;
  isFirstPregnancy: boolean | null;
  dueDate?: string;
  lastMenstrualPeriod?: string;
}

interface UserStoreState {
  // Data
  answers: OnboardingAnswers;
  isHydrated: boolean;

  // Actions
  setAnswers: (updates: Partial<OnboardingAnswers>) => void;
  setHydrated: (state: boolean) => void;
  resetOnboarding: () => void;
}

const initialAnswers: OnboardingAnswers = {
  name: '',
  isFirstPregnancy: null,
  dueDate: undefined,
  lastMenstrualPeriod: undefined,
};

export const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      answers: initialAnswers,
      isHydrated: false,

      setAnswers: (updates) =>
        set((state) => ({
          answers: { ...state.answers, ...updates },
        })),

      setHydrated: (state) => set({ isHydrated: state }),

      resetOnboarding: () => set({ answers: initialAnswers }),
    }),
    {
      name: 'maternal_user_onboarding', // Key in LocalStorage
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);