import axios from "axios";
import { server } from "../store/authStore";
import { useNotificationStore } from "../store/notification.store";
import { useEffect } from "react";

export const useFetchNotifications = () => {
  const { setAppNotifications } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, []);
  const fetchNotifications = async () => {
    // console.log("fetching notifications");
    try {
      const res = await axios.get(`${server}/notification`, {
        withCredentials: true,
      });

      // console.log(res.data);

      setAppNotifications(res.data.Notification);
    } catch (error) {
      console.log(error);
    }
  };

  const readNotifications = async () => {
    try {
      const res = await axios.put(
        `${server}/notification/read`,
        {},
        {
          withCredentials: true,
        }
      );

      setAppNotifications(res.data.Notification);
    } catch (error) {
      console.log(error);
    }
  };

  return { readNotifications };
};
