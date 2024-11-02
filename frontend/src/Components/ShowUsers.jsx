import React from "react";
import { dummyUser } from "../data/dummyUser";
import "../styles/style.css";

import { IoPersonAddSharp } from "react-icons/io5";
import { useFetchAllUsers } from "../hooks/useFetchAllUsers";
import { useFollowUser } from "../hooks/useFollowUser";
import { useAuthStore } from "../store/authStore";

const ShowUsers = () => {
  const { users, loading } = useFetchAllUsers(); //custom hooks to get all users
  // console.log("Users", users);
  const { user: loggedInUser } = useAuthStore();

  const { followUser } = useFollowUser();

  const followUserHandler = (userId) => {
    followUser(userId);
  };

  // console.log("users", users);

  return (
    <div
      id="show-users"
      className="lg:my-2 lg:p-4  lg:bg-purple-500 bg-[#f7f7f7] rounded-xl lg:shadow-[1px_4px_10px_rgba(1,1,1,0.36)] overflow-y-scroll no-scrollbar flex flex-col items-center gap-2"
    >
      <h1 className="md:text-xl sm:text-lg text-lg lg:text-white font-bold mb-2">
        Follow your known
      </h1>
      {loading ? (
        <div>Loading</div>
      ) : (
        users.map((user) => (
          <div
            key={user._id}
            className="w-full flex justify-center items-center gap-4 mx-2 lg:p-2 p-2  rounded-2xl cursor-pointer group lg:hover:bg-white lg:border-none border"
          >
            <img
              src={user.profile_picture}
              alt="profile"
              className="lg:w-[40px] w-[50px] lg:h-[40px] h-[50px] object-cover rounded-2xl"
            />
            <div className="flex flex-col flex-grow ">
              <h4 className="lg:text-white md:font-bold md:text-sm font-light text-[10px] lg:group-hover:text-purple-700 transi text-black">
                {user.full_name}
              </h4>
              <h6 className="lg:text-purple-200 text-black text-[14px] font-semibold lg:group-hover:text-purple-400 transi group-hover:text-purple-700">
                {user.username}
              </h6>
            </div>
            <div
              className="lg:text-white text-purple-500 font-semibold text-[14px] group-hover:text-purple-700 transi border px-3 py-1 rounded-md"
              onClick={() => followUserHandler(user._id)}
            >
              {user?.followers?.includes(loggedInUser?._id) ? (
                <div>Unfollow</div>
              ) : (
                <div>Follow</div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ShowUsers;
