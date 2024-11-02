// store/notification.store.js
import { create } from "zustand";

export const useNotificationStore = create((set) => ({
  notifications: JSON.parse(localStorage.getItem("notifications")) || [],
  isNotificationOpen: false,
  isNotificationOpenOnLargeScreen: false,
  appNotifications: [],

  setAppNotifications: (appNotifications) => {
    set({ appNotifications: appNotifications });
  },

  setNotificationOpenOnLargeScreen: (isOpen) => {
    set({ isNotificationOpenOnLargeScreen: isOpen });
  },
  setIsNotificationOpen: (isOpen) => {
    set({ isNotificationOpen: isOpen });
  },

  setMessageNotification: (updatedNotifications) => {
    set({ notifications: updatedNotifications });
  },

  initializeNotifications: () => {
    const storedNotifications =
      JSON.parse(localStorage.getItem("notifications")) || [];
    set({ notifications: storedNotifications });
  },
}));
