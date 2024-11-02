import { useState } from "react";
import { useVlogReadStore } from "../store/vlogReadStore";
import axios from "axios";
import { server } from "../store/authStore";

export const useFetchUserVlogs = () => {
  const [loading, setLoading] = useState(true);
  const [userVlogs, setUserVlogs] = useState([]);

  const fetchUserVlogs = async (id) => {
    setLoading(true);
    try {
      // console.log("jadhadhajdhaj");
      const response = await axios.get(`${server}/vlog/${id}`, {
        withCredentials: true,
      });
      setUserVlogs(response.data.vlogs);
      setLoading(false);
      // console.log("user vlogs", response.data.vlogs);
    } catch (error) {
      console.log("Error in fetching user vlogs", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, userVlogs, fetchUserVlogs };
};
