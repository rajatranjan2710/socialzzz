import React, { useEffect } from "react";
import { formatDate } from "../utils/date.format";
//icons
import { FaEllipsisV } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { dummyUser } from "../data/dummyUser.js";
import { useProfileContentStore } from "../store/profileContentStore.js";
import { useVlogReadStore } from "../store/vlogReadStore.js";
import { useFetchUserVlogs } from "../hooks/useFetchUserVlogs.js";

const Vlogs = ({ user }) => {
  //fetch user vlogs
  const { loading, userVlogs, fetchUserVlogs } = useFetchUserVlogs();

  //setReadVlog
  const { setVlogRead } = useVlogReadStore();

  useEffect(() => {
    fetchUserVlogs(user._id);
  }, [user._id]);

  return (
    <div className="w-full sm:grid sm:grid-cols-12 flex flex-col items-center  sm:mt-4 overflow-y-scroll no-scrollbar gap-4 sm:p-4 p-2">
      {userVlogs.map((vlog) =>
        loading ? (
          <div>Loading</div>
        ) : (
          <div
            key={vlog._id}
            className="sm:col-span-6 w-full flex flex-col my-2 sm:p-4 sm:px-8 p-2 px-4 bg-white md:shadow-[5px_10px_10px_rgba(1,1,1,0.18)] md:border-none border rounded-xl "
          >
            <div className="flex gap-4 items-center my-2">
              <img
                src={vlog.user.profile_picture}
                alt="profile"
                className="w-[50px] h-[50px] object-cover rounded-xl cursor-pointer"
              />
              <div className="flex-1 flex flex-col">
                <div className="text-sm font-bold text-black-500">
                  {vlog.user.username}
                </div>
                <div className="font-semibold text-gray-500 text-xs">
                  {formatDate(vlog.createdAt)}
                </div>
              </div>
              <div>
                <FaEllipsisV size={17} color="gray" />
              </div>
            </div>

            {/* image  */}
            <div className="w-full rounded-md my-2">
              {vlog.media && (
                <img
                  src={vlog.media}
                  alt="post_image"
                  className="w-full object-contain rounded-lg"
                />
              )}
            </div>
            {/* title and body of vlog*/}
            <div className="text-sm font-semibold text-black-500 mb-1 ">
              {vlog.title}
            </div>
            <div className="text-sm font-medium text-gray-500 mb-2">
              {`${vlog.description.slice(0, 100).concat("...")}`}
              <span className="text-purple-500 cursor-pointer">Read more</span>
            </div>

            <Link to={`/vlog`}>
              <div
                className="text-sm font-semibold text-white cursor-pointer bg-purple-500 px-4  rounded-lg mx-auto my-2 py-2"
                onClick={() => setVlogRead(vlog)}
              >
                Read
              </div>
            </Link>

            {/* reactions and comments */}
            <div className="flex justify-between items-center my-2">
              <div className="flex gap-4">
                <div className="flex gap-1 items-center">
                  <FaRegHeart size={20} color="gray" />
                  <p className="text-sm font-semibold text-gray-500">
                    {vlog.likes.length}
                  </p>
                </div>
                <div className="flex gap-1 items-center">
                  <FaRegComment
                    size={20}
                    color="gray"
                    onClick={() => toggleComments(vlog.id)}
                  />
                  <p className="text-sm font-semibold text-gray-500">
                    {vlog.comments.length}
                  </p>
                </div>
              </div>
              <div>
                <FaRegBookmark size={20} color="gray" />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Vlogs;
