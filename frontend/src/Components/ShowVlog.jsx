import React, { useState } from "react";
import { formatDate } from "../utils/date.format.js";
import { getTimestamp } from "../utils/timestamp.js";
import { BsSend } from "react-icons/bs";
import { GoHeartFill } from "react-icons/go";
import {
  FaEllipsisV,
  FaRegBookmark,
  FaRegHeart,
  FaRegComment,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useVlogReadStore } from "../store/vlogReadStore.js";
import { useFetchVlogs } from "../hooks/useFetchVlogs.js";
import { useLikeAndDislikePost } from "../hooks/useLikeAndDislikePost.js";
import { useCommentsOnVlogs } from "../hooks/useCommentsOnVlogs.js";
import { useContentStore } from "../store/contentStore.js";
import { useAuthStore } from "../store/authStore.js";

const ShowVlog = () => {
  // Fetching vlogs
  const { vlogs, isLoading } = useFetchVlogs();
  const { setCommentsToNull, vlogComments } = useContentStore();
  const { user } = useAuthStore();

  // Like and dislike vlogs
  const { likeVlog } = useLikeAndDislikePost();
  const likeVlogHandler = (id) => likeVlog(id, user);

  // Comment functionalities
  const { commentOnVlog, getCommentOnVlog } = useCommentsOnVlogs();
  const [showComments, setShowComments] = useState(false);
  const [openedComments, setOpenedComments] = useState(null);
  const [comment, setComment] = useState("");

  // Set the read vlog
  const { setVlogRead } = useVlogReadStore();

  // Navigate to user profile
  const navigate = useNavigate();
  const openProfile = (id) => navigate(`/profile/${id}`);
  const setVlog = (vlog) => setVlogRead(vlog);

  // Handle posting a comment
  const commentPostHandler = (id) => {
    commentOnVlog(id, comment);
    setComment("");
  };

  // Toggle comments section
  const toggleComments = (id) => {
    if (openedComments === id) {
      setOpenedComments(null);
      setCommentsToNull("vlog");
      return setShowComments(false);
    }
    getCommentOnVlog(id);
    setShowComments(true);
    setOpenedComments(id);
  };

  return (
    <div id="show-posts" className="w-full">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        vlogs.map((vlog) => (
          <div
            key={vlog._id}
            className="w-full flex flex-col my-2 sm:p-4 sm:px-8 p-2 px-4 bg-white shadow-[1px_1px_10px_rgba(1,1,1,0.07)] rounded-xl"
          >
            {/* Vlog Header */}
            <div className="flex gap-4 items-center my-2">
              <img
                src={vlog.user.profile_picture}
                alt="profile"
                className="w-[50px] h-[50px] object-cover rounded-xl cursor-pointer"
                onClick={() => openProfile(vlog.user._id)}
              />
              <div className="flex-1 flex flex-col">
                <div className="text-sm font-bold text-black-500">
                  {vlog.user.username}
                </div>
                <div className="font-semibold text-gray-500 text-xs">
                  {formatDate(vlog.createdAt)}
                </div>
              </div>
              <FaEllipsisV size={17} color="gray" />
            </div>

            {/* Vlog Media */}
            <div className="w-full rounded-md my-2">
              {vlog.media && (
                <img
                  src={vlog.media}
                  alt="vlog media"
                  className="w-full object-contain rounded-lg"
                />
              )}
            </div>

            {/* Vlog Title and Description */}
            <div className="text-sm font-semibold text-black-500 mb-1">
              {vlog.title}
            </div>
            <div className="text-sm font-medium text-gray-500 mb-2">
              {`${vlog.description.slice(0, 100)}...`}
              <span className="text-purple-500 cursor-pointer">Read more</span>
            </div>

            {/* Vlog Read Button */}
            <div
              className="text-sm font-semibold text-white cursor-pointer bg-purple-500 px-4 rounded-lg mx-auto my-2 py-2"
              onClick={() => setVlog(vlog)}
            >
              <Link to={`/vlog`}>Read</Link>
            </div>

            {/* Vlog Reactions */}
            <div className="flex justify-between items-center my-2">
              <div className="flex gap-4">
                <div className="flex gap-1 items-center">
                  {vlog?.likes?.includes(user?._id) ? (
                    <GoHeartFill
                      size={20}
                      color="red"
                      onClick={() => likeVlogHandler(vlog._id)}
                    />
                  ) : (
                    <FaRegHeart
                      size={20}
                      color="gray"
                      onClick={() => likeVlogHandler(vlog._id)}
                    />
                  )}
                  <p>{vlog.likes.length > 0 && vlog.likes.length}</p>
                </div>
                <div className="flex gap-1 items-center">
                  <FaRegComment
                    size={20}
                    color="gray"
                    onClick={() => toggleComments(vlog._id)}
                  />
                  <p className="text-sm font-semibold text-gray-500">
                    {vlog.comments?.length}
                  </p>
                </div>
              </div>
              <FaRegBookmark size={20} color="gray" />
            </div>

            {/* Comment Input */}
            {openedComments === vlog._id && (
              <div className="flex gap-1 my-4 mx-2 bg-gray-100 items-center rounded-lg px-4">
                <input
                  type="text"
                  className="w-full bg-gray-100 rounded-lg p-2 text-gray-400 outline-none"
                  placeholder="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <BsSend
                  size={20}
                  color="gray"
                  onClick={() => commentPostHandler(vlog._id)}
                />
              </div>
            )}

            {/* Display Comments */}
            {showComments &&
              openedComments === vlog._id &&
              vlogComments?.map((comment) => (
                <div
                  key={comment.timestamp}
                  className="flex flex-col gap-1 my-6 mx-2 bg-gray-100 p-4 rounded-lg"
                >
                  <div className="flex gap-2 items-center">
                    <img
                      src={comment.user.profile_picture}
                      alt="commenter profile"
                      className="w-[30px] h-[30px] object-contain rounded-xl"
                    />
                    <h3 className="text-sm font-semibold text-gray-500 flex-grow">
                      {comment.user.username}
                    </h3>
                    <p className="text-xs font-semibold text-gray-500">
                      {getTimestamp(comment.timestamp)}
                    </p>
                  </div>
                  <p className="text-sm font-lighter text-gray-500">
                    {comment.text}
                  </p>
                </div>
              ))}
          </div>
        ))
      )}
    </div>
  );
};

export default ShowVlog;
