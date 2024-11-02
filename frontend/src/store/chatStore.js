import { create } from "zustand";

export const useChatStore = create((set) => ({
  messagesArray: [],
  lastMessageSent: null,
  setMessageArray: (newMessages) => {
    set((state) => {
      // Combine the new messages with the existing ones
      if (newMessages.length === 0) return { messagesArray: [] };

      const combinedMessages = [...newMessages, ...state.messagesArray];

      // Sort messages by timestamp
      const sortedMessages = combinedMessages.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );

      return { messagesArray: sortedMessages };
    });
  },
  setNewMessageToState: (newMessage) => {
    console.log("setNewMessageToState", newMessage);
    set((state) => {
      return { messagesArray: [...state.messagesArray, newMessage] };
    });
  },

  setLastMessageSent: (message) => set({ lastMessageSent: message }),
  setNewMessageRecivedToState: (message) => {
    set((state) => {
      return { messagesArray: [...state.messagesArray, message] };
    });
  },
}));
