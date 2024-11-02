import axios from "axios";
import { create } from "zustand";
import { server } from "./authStore";
import toast from "react-hot-toast";

export const useContentStore = create((set) => ({
  posts: [],
  users: [],
  vlogs: [],
  comments: null,
  vlogComments: null,
  setUsers: (data) => set({ users: data }),
  setPosts: (data) => set({ posts: data }),
  setVlogs: (data) => set({ vlogs: data }),
  setLikes: (id, user) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === id
          ? {
              ...post,
              likes: post.likes.includes(user._id)
                ? post.likes.filter((likeId) => likeId !== user._id) // Remove like if already liked
                : [...post.likes, user._id], // Add like if not liked
            }
          : post
      ),
    }));
  },

  setLikesOnVlogs: (id, user) => {
    set((state) => ({
      vlogs: state.vlogs.map((vlog) =>
        vlog._id === id
          ? {
              ...vlog,
              likes: vlog.likes.includes(user._id)
                ? vlog.likes.filter((likeId) => likeId !== user._id) // Remove like if already liked
                : [...vlog.likes, user._id], // Add like if not liked
            }
          : vlog
      ),
    }));
  },

  setNewComments: (comment, type) => {
    set((state) => {
      if (state.comments === null && type === "post") {
        return { comments: [comment] };
      } else if (state.vlogComments === null && type === "vlog") {
        return { vlogComments: [comment] };
      } else {
        if (type === "vlog") {
          console.log("else part");
          return { vlogComments: [comment, ...state.vlogComments] };
        } else {
          return { comments: [comment, ...state.comments] };
        }
      }
    });
  },

  setComments: (data, type) => {
    if (type === "vlog") {
      set({ vlogComments: data });
    } else {
      set({ comments: data });
    }
  },

  setCommentsToNull: (type) => {
    if (type === "vlog") {
      set({ vlogComments: null });
    } else {
      set({ comments: null });
    }
  },

  // Function to create a post
  createPost: async (formData) => {
    try {
      console.log("form data", formData.caption);
      console.log("form data", formData.media);

      const response = await axios.post(`${server}/posts/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the correct content type
        },
        withCredentials: true,
      });
      // Update posts state with the new post
      console.log("response got back", response.data.post);
      set((state) => ({ posts: [response.data.post, ...state.posts] }));
      toast.success("Post created successfully");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  },

  createVlog: async (formData) => {
    try {
      const response = await axios.post(`${server}/vlog/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      console.log("Vlog created", response.data.vlog);
      //   set({ vlogs: [response.data.vlog, ...state.vlogs] });
      toast.success("Vlog created successfully");
    } catch (error) {
      console.error("Error creating vlog:", error);
    }
  },

  updateUser: (data) => {
    set((state) => {
      const updatedUsers = state.users.map((user) =>
        user._id === data._id ? { ...user, ...data } : user
      );
      toast.success("User updated successfully");
      return { users: updatedUsers };
    });
  },
}));
