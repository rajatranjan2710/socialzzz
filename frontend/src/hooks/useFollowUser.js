import axios from "axios";
import { server } from "../store/authStore";
import toast from "react-hot-toast";
import { useContentStore } from "../store/contentStore";

export const useFollowUser = () => {
  const { updateUser } = useContentStore();
  const followUser = async (userId) => {
    try {
      const res = await axios.post(
        `${server}/auth/follow/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      updateUser(res.data.updatedUser);
      //   toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    followUser,
  };
};
