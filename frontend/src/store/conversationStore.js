import { create } from "zustand";
import { useContentStore } from "./contentStore";

export const useConversationStore = create((set) => ({
  selectedConversation: null,
  conversations: [],
  availableUsersForChat: [],
  ChatWhichIsSelected: null,
  setChat: (chat) => set({ ChatWhichIsSelected: chat }),
  setAvailableUsersForChat: (conversations, users) => {
    const results = users.filter(
      (user) =>
        !conversations?.some((conv) =>
          conv.participants.some((participant) => participant._id === user._id)
        )
    );
    // console.warn("results", results);

    set({ availableUsersForChat: results });
  },
  setConversations: (conversations) => set({ conversations: conversations }),

  setSelectedConversation: (conversation, user, setMessageNotification) => {
    if (conversation === null) {
      set({ selectedConversation: null });
      return;
    }

    const notifications =
      JSON.parse(localStorage.getItem("notifications")) || [];

    // Get the participant who isn't the logged-in user
    const otherParticipant = conversation.participants.find(
      (p) => p._id !== user._id
    );

    // Filter out notifications that match the sender in the selected conversation
    const updatedNotifications = notifications.filter(
      (notification) => notification.sender !== otherParticipant._id
    );

    // Set the updated notifications in the store
    setMessageNotification(updatedNotifications);

    // Save the filtered notifications back to localStorage
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));

    console.log("updatedNotifications", updatedNotifications);

    // Update the selected conversation in the store

    set({ selectedConversation: conversation });
    // console.log("state of conv :", conversation);
  },
}));
