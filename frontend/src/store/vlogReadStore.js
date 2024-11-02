import { create } from "zustand";

export const useVlogReadStore = create((set) => ({
  readVlog: null,
  vlogID: null,

  setVlogID: (id) => {
    set({ vlogID: id });
  },
  setVlogRead: (vlogRead) => {
    console.log("setVlogRead", vlogRead);
    set({ readVlog: vlogRead });
  },
}));
