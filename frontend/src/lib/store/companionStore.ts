import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CompanionStore {
  activeCompanionId: string;
  setActiveCompanionId: (id: string) => void;
}

export const useCompanionStore = create<CompanionStore>()(
  persist(
    (set) => ({
      activeCompanionId: 'mentor',
      setActiveCompanionId: (id) => set({ activeCompanionId: id }),
    }),
    {
      name: 'sahayam-companion-storage',
    }
  )
);
