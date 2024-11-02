import axios from "axios";
import { server } from "../store/authStore";
import { useContentStore } from "../store/contentStore";
import toast from "react-hot-toast";

export const useCommentsOnVlogs = () => {
  const { setNewComments, setComments } = useContentStore();
  const commentOnVlog = async (vlogId, comment) => {
    try {
      const response = await axios.post(
        `${server}/vlog/comment/${vlogId}`,
        { comment },
        { withCredentials: true }
      );

      setNewComments(response.data.comment, "vlog");

      toast.success("Comment added successfully");
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.error || "Failed to add comment");
    }
  };

  const getCommentOnVlog = async (vlogId) => {
    try {
      console.log("Getting comments for post:", vlogId);

      const response = await axios.get(`${server}/vlog/comment/${vlogId}`, {
        withCredentials: true,
      });

      if (response.data?.comments) {
        setComments(response.data.comments, "vlog");
        toast.success("Comments fetched successfully");
      } else {
        toast.error("No comments found");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error(error.response?.data?.error || "Failed to fetch comments");
    }
  };

  return { commentOnVlog, getCommentOnVlog };
};
