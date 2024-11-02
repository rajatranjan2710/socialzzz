import axios from "axios";
import { useContentStore } from "../store/contentStore";
import { server } from "../store/authStore";
import { useEffect, useState } from "react";

export const useFetchPosts = () => {
  const [isPostLoading, setPostLoading] = useState(true);
  const { posts, setPosts } = useContentStore();

  useEffect(() => {
    const fetchPosts = async () => {
      // console.log("fetching posts");
      setPostLoading(true);
      try {
        const response = await axios.get(`${server}/posts`, {
          withCredentials: true,
        });
        setPosts(response.data.posts);
        setPostLoading(false);
        // console.log("posts", response.data.posts);
      } catch (error) {
        console.log("error in fetching all posts", error);
      } finally {
        setPostLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { isPostLoading, posts };
};
