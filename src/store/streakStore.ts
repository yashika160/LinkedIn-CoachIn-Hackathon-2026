import { create } from "zustand";

type StreakState = {
  open: boolean;
  openCalendar: () => void;
  closeCalendar: () => void;
};

export const useStreakStore = create<StreakState>((set) => ({
  open: false,
  openCalendar: () => set({ open: true }),
  closeCalendar: () => set({ open: false }),
}));