import React from "react";
import { useFetchNotifications } from "../hooks/useFetchNotifications";
import { useNotificationStore } from "../store/notification.store";
import { getTimestamp } from "../utils/timestamp";

const ShowNotification = () => {
  const { readNotifications } = useFetchNotifications();

  React.useEffect(() => {
    readNotifications();
  }, []);

  const { appNotifications } = useNotificationStore();

  return (
    <div className="w-full lg:h-[60vh] h-[90vh]  shadow-[0px_4px_10px_rgba(1,1,1,0.07)] lg:rounded-lg rounded-none pb-4 pt-1 px-2 lg:px-4 bg-white">
      <div className="w-full h-full flex items-center  bg-white flex-col overflow-y-scroll no-scrollbar gap-1">
        <h1 className="text-xl font-semibold m-3">Notifications</h1>
        {appNotifications.map((notification) => (
          <div
            key={notification._id}
            className="w-full flex  px-4 py-2 items-center border rounded-md"
          >
            <div className="w-[50px] h-[50px] rounded-full">
              <img
                src={notification.notificationFromUser.profile_picture}
                alt="profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="font-semibold text-[15px] ml-4 flex-grow">
              {notification.message}
            </div>

            <div className="text-[12px] text-gray-500">
              {getTimestamp(notification.createdAt)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowNotification;
