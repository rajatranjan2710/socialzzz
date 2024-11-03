import { create } from "zustand";
import axios from "axios";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  signUp: async (formdata, navigate) => {
    try {
      const response = await axios.post(`${server}/auth/register`, formdata, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        set({ user: response.data.user, isAuthenticated: true });
        navigate("/");
      }
      // console.log(response.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  },

  login: async ({ username, password }, navigate) => {
    try {
      const response = await axios.post(
        `${server}/auth/login`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data) {
        set({ user: response.data.user, isAuthenticated: true });
        console.log("navigating");
        navigate("/");
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  },

  logout: async (navigate) => {
    try {
      await axios.get(`${server}/auth/logout`, {
        withCredentials: true,
      });
      set({ user: null, isAuthenticated: false });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  },

  authCheck: async () => {
    // console.log("auth check");
    try {
      const response = await axios.get(`${server}/auth/authcheck`, {
        withCredentials: true,
      });

      // console.log("Status", response.data);

      if (response.data.success) {
        set({ user: response.data.user, isAuthenticated: true });
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } catch (error) {
      console.log("Error in authcheck", error);
      set({ user: null, isAuthenticated: false });
    }
  },

  updateUser: (data) => {
    set({ user: data });
  },
}));

export const server = `https://socialite-be79.onrender.com/api/v1`;
