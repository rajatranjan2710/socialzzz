import axios from "axios";
import { useContentStore } from "../store/contentStore";
import { server } from "../store/authStore";
import { useEffect, useState } from "react";

export const useFetchVlogs = () => {
  const [isLoading, setLoading] = useState(true);
  const { vlogs, setVlogs } = useContentStore();

  useEffect(() => {
    const fetchVlogs = async () => {
      // console.log("fetching posts");
      setLoading(true);
      try {
        const response = await axios.get(`${server}/vlog`, {
          withCredentials: true,
        });
        setVlogs(response.data.vlogs);
        setLoading(false);
        // console.log("vlogs", response.data.vlogs);
      } catch (error) {
        console.log("error in fetching all vlogs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVlogs();
  }, []);

  return { isLoading, vlogs };
};
