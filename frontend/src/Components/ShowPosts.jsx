import React from "react";
import { postArray } from "../data/dummyPost";
import { getTimestamp } from "../utils/timestamp";

// Icons
import { BsSend } from "react-icons/bs";
import { GoHeartFill } from "react-icons/go";
import { FaEllipsisV } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { useFetchPosts } from "../hooks/useFetchPosts";
import { useContentStore } from "../store/contentStore";
import { useLikeAndDislikePost } from "../hooks/useLikeAndDislikePost";
import { useAuthStore } from "../store/authStore";
import { useCommentOnPosts } from "../hooks/useCommentOnPosts";

const ShowPosts = () => {
  // State and hooks
  const { posts, comments, setCommentsToNull } = useContentStore();
  const { isPostLoading } = useFetchPosts();
  const { user } = useAuthStore();
  const [showComments, setShowComments] = React.useState(false);
  const [openedComments, setOpenedComments] = React.useState(null);
  const [comment, setComment] = React.useState("");

  const { likePost } = useLikeAndDislikePost();
  const { commentOnPost, getCommentOnPost } = useCommentOnPosts();

  // Like post handler
  const likePostHandler = (id) => {
    likePost(id, user);
  };

  // Comment post handler
  const commentPostHandler = (id) => {
    commentOnPost(id, comment);
    setComment("");
  };

  // Toggle comments
  const toggleComments = (id) => {
    if (openedComments === id) {
      setOpenedComments(null);
      setCommentsToNull("posts");
      setShowComments(false);
    } else {
      getCommentOnPost(id);
      setShowComments(true);
      setOpenedComments(id);
    }
  };

  return (
    <div id="id-post" className="w-full">
      {isPostLoading ? (
        <div>Loading...</div>
      ) : (
        posts?.map((post) => (
          <div
            key={post._id}
            className="w-full flex flex-col my-2 sm:p-4 sm:px-8 p-2 px-4 bg-white sm:shadow-[0px_4px_10px_rgba(1,1,1,0.07)] rounded-xl sm:border-none border"
          >
            {/* User info and options */}
            <div className="flex gap-4 items-center my-2">
              <img
                src={post.user.profile_picture}
                alt="profile"
                className="w-[50px] h-[50px] object-cover rounded-2xl"
              />
              <div className="flex-1 flex flex-col">
                <div className="text-sm font-bold text-black-500">
                  {post.user.username}
                </div>
                <div className="font-semibold text-gray-500 text-xs">
                  {getTimestamp(post.createdAt)}
                </div>
              </div>
              <FaEllipsisV size={17} color="gray" />
            </div>

            {/* Post caption and media */}
            <div className="text-sm text-gray-600 my-2">{post.caption}</div>
            {post.media && (
              <img
                src={post.media}
                alt="post_image"
                className="w-full object-contain my-2 rounded-md"
                onDoubleClick={() => likePostHandler(post._id)}
              />
            )}

            {/* Reactions and comments */}
            <div className="flex justify-between items-center my-2">
              <div className="flex gap-4">
                <div className="flex gap-1 items-center">
                  {post?.likes.includes(user?._id) ? (
                    <GoHeartFill
                      size={20}
                      color="red"
                      onClick={() => likePostHandler(post._id)}
                    />
                  ) : (
                    <FaRegHeart
                      size={20}
                      color="gray"
                      onClick={() => likePostHandler(post._id)}
                    />
                  )}
                  <p>{post.likes.length > 0 && post.likes.length}</p>
                </div>

                <div className="flex gap-1 items-center">
                  <FaRegComment
                    size={20}
                    color="gray"
                    onClick={() => toggleComments(post._id)}
                  />
                  <p>{post.comments.length > 0 && post.comments.length}</p>
                </div>
              </div>
              <FaRegBookmark size={20} color="gray" />
            </div>

            {/* Comment input */}
            {openedComments === post._id && (
              <div className="flex gap-1 my-4 mx-2 bg-gray-100 items-center rounded-lg px-4">
                <input
                  type="text"
                  className="w-full bg-gray-100 rounded-lg p-2 text-gray-400 outline-none"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <BsSend
                  size={20}
                  color="gray"
                  onClick={() => commentPostHandler(post._id)}
                />
              </div>
            )}

            {/* Comments section */}
            {showComments &&
              openedComments === post._id &&
              comments?.map((comment) => (
                <div
                  key={comment.timestamp}
                  className="flex flex-col gap-1 my-6 mx-2 bg-gray-100 p-4 rounded-lg"
                >
                  <div className="flex gap-2 items-center">
                    <img
                      src={comment.user.profile_picture}
                      alt="profile"
                      className="w-[30px] h-[30px] object-cover rounded-xl"
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

export default ShowPosts;
