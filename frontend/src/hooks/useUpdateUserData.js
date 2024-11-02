import axios from "axios";
import { server, useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

export const useUpdateUserData = () => {
  const { updateUser } = useAuthStore();

  const updateUserData = async (data) => {
    console.log("data", data);
    try {
      const res = await axios.put(`${server}/auth/user`, data, {
        withCredentials: true,
      });

      console.log("res", res.data);
      toast.success("User updated successfully");
      updateUser(res.data.user);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  return { updateUserData };
};
