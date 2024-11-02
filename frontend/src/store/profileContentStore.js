import { create } from "zustand";

export const useProfileContentStore = create((set) => ({
  singleUser: null,
  setSingleUser: (data) => set({ singleUser: data }),
}));
