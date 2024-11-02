import { useNotificationStore } from "../store/notification.store";
// hooks/useSetNotification.js
import { useEffect } from "react";

export const useSetNotification = () => {
  const { initializeNotifications } = useNotificationStore();

  useEffect(() => {
    // alert("Notification initialized");
    initializeNotifications();
  }, []);
};
