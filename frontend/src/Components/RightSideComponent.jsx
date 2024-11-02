import React from "react";
import { useProfileContentStore } from "../store/profileContentStore";
import ShowUsers from "../Components/ShowUsers";
import ShowProfile from "../Components/ShowProfile";
import { useNotificationStore } from "../store/notification.store";
import ShowNotification from "./ShowNotification";

const RightSideComponent = () => {
  const { singleUser } = useProfileContentStore();
  const { isNotificationOpenOnLargeScreen } = useNotificationStore();

  return (
    <div className="col-span-3 hidden md:block bg-[#f7f7f7] pr-4 py-4 my-auto overflow-y-scroll h-[100vh] no-scrollbar">
      {/* notification section  */}
      {isNotificationOpenOnLargeScreen && <ShowNotification />}
      {/* profile section  */}
      {singleUser && <ShowProfile />}
      {/* add users section  */}
      <ShowUsers />
    </div>
  );
};

export default RightSideComponent;
