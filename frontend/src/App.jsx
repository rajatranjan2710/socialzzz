import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import SignupPage from "./pages/SignupPage";
import VlogPage from "./pages/VlogPage";
import SettingsPage from "./pages/SettingsPage";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/authStore";
import { Toaster } from "react-hot-toast";
import useSocketStore from "./store/socket.store";
import { useSetNotification } from "./hooks/useSetNotification";
import { useListenMessage } from "./hooks/useListenMessage";
import { useListenNotifications } from "./hooks/useListenNotifications";
import { useFetchNotifications } from "./hooks/useFetchNotifications";

const App = () => {
  //auth check
  const { isAuthenticated, authCheck, user } = useAuthStore();
  const { socket, connectSocket, disconnectSocket } = useSocketStore();

  //notification initialization
  // useSetNotification();

  React.useEffect(() => {
    authCheck();
  }, []);

  //socket connection

  React.useEffect(() => {
    // console.log("In socket connection --> App.jsx", isAuthenticated, user);
    if (user) {
      // console.log("SoccketConnected");
      connectSocket(user._id);
    } else {
      disconnectSocket();
    }

    return () => {
      disconnectSocket();
    };
  }, [user, connectSocket, disconnectSocket, isAuthenticated]);

  useListenMessage();
  useListenNotifications();

  useFetchNotifications();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Home /> : <LoginPage />}
        />
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={isAuthenticated ? <Home /> : <SignupPage />}
        />
        <Route path="/vlog" element={<VlogPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/chats" element={<ChatPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
