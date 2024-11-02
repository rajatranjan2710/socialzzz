import React, { useEffect, useState } from "react";
import Post from "./Post";
import Vlogs from "./Vlogs";
import { useProfileContentStore } from "../store/profileContentStore";
import { useParams } from "react-router-dom";
import { useFetchSingleUser } from "../hooks/useFetchSingleUser";

const ProfileComponent = () => {
  const { id } = useParams();
  const [content, setContent] = useState("posts");

  const { isLoading, getSingleUser } = useFetchSingleUser();

  useEffect(() => {
    getSingleUser(id);
  }, [id]);

  const { singleUser: user } = useProfileContentStore();

  // console.log("user", user);
  return (
    <div
      id="middle-content"
      className=" lg:col-span-8 md:col-span-9 col-span-12 bg-[#f7f7f7] w-full h-full sm:p-4 overflow-y-scroll no-scrollbar"
    >
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="bg-white w-full h-full md:rounded-xl shadow-[1px_1px_10px_rgba(1,1,0,0.12)] sm:p-4  overflow-y-scroll no-scrollbar ">
          <div className="flex items-center gap-4 sm:mx-6 sm:mt-6 sm:mb-2 m-2 my-1">
            {/* image  */}
            <img
              src={user?.profile_picture}
              alt="profile"
              className="sm:w-[80px] sm:h-[80px] w-[70px] h-[70px] object-cover rounded-full my-4"
            />

            {/* posts  */}
            <div className="flex items-center gap-5 mx-4 flex-grow">
              <div id="followers" className="flex flex-col items-center">
                <div className="text-purple-600 font-bold text-lg">
                  {user?.posts.length}
                </div>
                <div className="text-purple-400 font-normal text-sm">Posts</div>
              </div>
              {/* followers  */}
              <div id="followers" className="flex flex-col items-center ">
                <div className="text-purple-600 font-bold text-lg">
                  {user?.followers.length}
                </div>
                <div className="text-purple-400 font-normal text-sm">
                  Followers
                </div>
              </div>
              {/* following */}
              <div id="followers" className="flex flex-col items-center">
                <div className="text-purple-600 font-bold text-lg">
                  {user?.following.length}
                </div>
                <div className="text-purple-400 font-normal text-sm">
                  Following
                </div>
              </div>
            </div>
          </div>

          {/* bio section  */}
          <div className="sm:mx-6 mx-4 sm:my-4 my-2 flex flex-col gap-1">
            <div className="flex gap-4  items-center">
              <div className="text-purple-600 sm:font-bold font-semibold sm:text-lg">
                {user?.fullname}
              </div>
              <div className="text-gray-500 font-normal text-sm">
                @{user?.username}
              </div>
            </div>
            <div className="sm:font-semibold font-medium sm:text-lg text-sm">
              {user?.bio}
            </div>
            <div className="font-normal text-sm">{user?.location}</div>
            <div className="font-normal text-sm underline text-blue-700">
              {user?.website}
            </div>
          </div>
          {/* bio section ends  */}
          {/* post + vlog section  */}
          <div className="flex gap-4 sm:mx-6 sm:my-6 m-2 my-4">
            <div
              className={`font-semibold text-lg px-3  border-b-[2px] cursor-pointer ${
                content === "posts" && "border-purple-500"
              } `}
              onClick={() => setContent("posts")}
            >
              POSTS
            </div>
            <div
              className={`font-semibold text-lg px-3  border-b-[2px] cursor-pointer ${
                content === "vlogs" && "border-purple-500"
              }`}
              onClick={() => setContent("vlogs")}
            >
              VLOGS
            </div>
          </div>

          {/* post + vlog section ends  */}
          <div className="min-h-[500px]">
            {content === "posts" && (
              <div className="w-full sm:grid sm:grid-cols-12 flex flex-col items-center  sm:mt-4 overflow-y-scroll no-scrollbar gap-4 sm:p-4 p-2 ">
                {user?.posts.map((post) => (
                  <Post key={post._id} post={post} user={user} />
                ))}
              </div>
            )}
            {content === "vlogs" && <Vlogs user={user} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
