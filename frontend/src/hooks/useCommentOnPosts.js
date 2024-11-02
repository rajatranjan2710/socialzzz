import axios from "axios";
import { server } from "../store/authStore";
import toast from "react-hot-toast";
import { useContentStore } from "../store/contentStore";

export const useCommentOnPosts = () => {
  const { setComments, setNewComments } = useContentStore();
  const commentOnPost = async (postId, comment) => {
    try {
      const response = await axios.post(
        `${server}/posts/comment/${postId}`,
        {
          comment,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Comment added successfully");
      setNewComments(response.data.comment, "post");
    } catch (error) {
      toast.error(error.response.data.error);
      console.log(error);
    }
  };

  const getCommentOnPost = async (postId) => {
    try {
      console.log("Getting comments for post:", postId);

      const response = await axios.get(`${server}/posts/comment/${postId}`, {
        withCredentials: true,
      });

      if (response.data?.comments) {
        setComments(response.data.comments, "post");
        toast.success("Comments fetched successfully");
      } else {
        toast.error("No comments found");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error(error.response?.data?.error || "Failed to fetch comments");
    }
  };

  return { commentOnPost, getCommentOnPost };
};
