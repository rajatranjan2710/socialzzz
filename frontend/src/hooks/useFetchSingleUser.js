import { useState } from "react";
import { server } from "../store/authStore";
import axios from "axios";
import { useProfileContentStore } from "../store/profileContentStore";

export const useFetchSingleUser = () => {
  const { setSingleUser } = useProfileContentStore();
  const [isLoading, setLoading] = useState(true);

  const getSingleUser = async (id) => {
    setLoading(true);
    try {
      if (id === null) {
        return;
      }
      const response = await axios.get(`${server}/auth/${id}`, {
        withCredentials: true,
      });

      setSingleUser(response.data.user);
      setLoading(false);
      // console.log("user", response.data.user);
    } catch (error) {
      console.log("Error in fetching single user", error);
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, getSingleUser };
};
