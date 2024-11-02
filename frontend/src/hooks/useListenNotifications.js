import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import useSocketStore from "../store/socket.store";
import { useEffect, useRef } from "react";
import { useNotificationStore } from "../store/notification.store";

export const useListenNotifications = () => {
  const { socket } = useSocketStore();
  const { user } = useAuthStore();

  const { appNotifications, setAppNotifications } = useNotificationStore();

  useEffect(() => {
    if (!user) return;
    if (!socket) return;

    const handleNewNotification = (data) => {
      // console.log(data);
      const newNoti = [data, ...appNotifications];
      setAppNotifications(newNoti);
      toast.success("New Notification");
    };

    socket.on("notification", handleNewNotification);
    return () => socket.off("notification", handleNewNotification);
  }, [socket, user, appNotifications, setAppNotifications]);
};
