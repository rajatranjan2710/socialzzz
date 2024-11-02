import { useEffect, useState } from "react";
import { useContentStore } from "../store/contentStore";
import axios from "axios";
import { server } from "../store/authStore";

export const useFetchAllUsers = () => {
  const [loading, setLoading] = useState(true);
  const { users, setUsers } = useContentStore();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${server}/auth/users`, {
          withCredentials: true,
        });
        setUsers(response.data.users);
        setLoading(false);
        // console.log("users", response.data.users);
      } catch (error) {
        console.log("error in fetching all users", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return { loading, users };
};
