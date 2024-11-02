import axios from "axios";

import toast from "react-hot-toast";
import { useContentStore } from "../store/contentStore";

export const useLikeAndDislikePost = () => {
  const { setLikes, setLikesOnVlogs } = useContentStore();
  const likePost = async (id, user) => {
    console.log(id);
    try {
      const response = await axios.post(
        `https://socialite-snowy.vercel.app/api/v1/posts/like/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      toast.success("Post liked");
      setLikes(id, user);
    } catch (error) {
      toast.error("Error liking post");
      console.log("Error liking post", error);
    }
  };

  const likeVlog = async (id, user) => {
    try {
      const response = await axios.post(
        `https://socialite-snowy.vercel.app/api/v1/vlog/like/${id}`,
        {},
        { withCredentials: true }
      );
      console.log(response.data);
      setLikesOnVlogs(id, user);
    } catch (error) {
      console.log(error);
    }
  };

  return { likePost, likeVlog };
};
