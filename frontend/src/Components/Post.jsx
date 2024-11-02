import React from "react";
import { getTimestamp } from "../utils/timestamp";

//icons
import { FaEllipsisV } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";
import { useLikeAndDislikePost } from "../hooks/useLikeAndDislikePost";

const Post = ({ post, user }) => {
  //custom hook
  const { likePost } = useLikeAndDislikePost();

  //onlick in like button
  const likePostHandler = (id) => {
    // alert("liked");
    likePost(id);
  };

  return (
    post.media && (
      <div
        key={post._id}
        className="sm:col-span-6 w-full flex flex-col my-2 sm:p-4 sm:px-8 p-2 px-4 bg-white md:shadow-[5px_10px_10px_rgba(1,1,1,0.18)]md:border-none border rounded-xl "
      >
        <div className="flex gap-4 items-center my-2">
          <img
            src={user.profile_picture}
            alt="profile"
            className="w-[50px] h-[50px] object-cover rounded-4xl"
          />
          <div className="flex-1 flex flex-col">
            <div className="text-sm font-bold text-black-500">
              {user.fullname}
            </div>
            <div className="font-semibold text-gray-500 text-xs">
              {getTimestamp(post.createdAt)}
            </div>
          </div>
          <div>
            <FaEllipsisV size={17} color="gray" />
          </div>
        </div>

        {/* caption  and image*/}
        <div className="text-sm text-gray-600 my-2">{post.caption}</div>
        {/* image  */}
        <div className="w-full rounded-md my-2">
          {post.media !== "" && (
            <img
              src={post.media}
              alt="post_image"
              className="w-full h-[200px] object-cover rounded-md"
            />
          )}
        </div>

        {/* reactions and comments */}
        <div className="flex justify-between items-center my-2">
          <div className="flex gap-4">
            <FaRegHeart
              size={20}
              color="gray"
              onClick={() => likePostHandler(post._id)}
            />
            <FaRegComment
              size={20}
              color="gray"
              onClick={() => toggleComments(post._id)}
            />
          </div>
          <div>
            <FaRegBookmark size={20} color="gray" />
          </div>
        </div>
      </div>
    )
  );
};

export default Post;
