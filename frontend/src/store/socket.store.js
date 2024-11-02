// store/socketStore.js
import { create } from "zustand";
import { io } from "socket.io-client";

const useSocketStore = create((set) => ({
  socket: null,
  connectSocket: (userId) => {
    // if (state.socket) return;
    const socket = io("http://localhost:5000", { query: { userId } });
    socket.on("connect", () => {
      console.log("connected");
    });
    set({ socket });
  },
  disconnectSocket: () => {
    set((state) => {
      if (state.socket) {
        state.socket.disconnect();
      }
      return { socket: null };
    });
  },
}));

export default useSocketStore;
