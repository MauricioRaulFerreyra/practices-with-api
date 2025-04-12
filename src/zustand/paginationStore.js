import { create } from "zustand";

export const usePaginationStore = create((set) => ({
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
}));
