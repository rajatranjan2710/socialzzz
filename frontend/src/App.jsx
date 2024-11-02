import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"; // Add Navigate here
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
import PrivateRoute from "./Components/PrivateRoute";

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
    if (user) {
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
          element={
            isAuthenticated && user ? <Navigate to="/" /> : <LoginPage />
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated && user ? <Navigate to="/" /> : <SignupPage />
          }
        />
        <Route
          path="/vlog"
          element={
            <PrivateRoute>
              <VlogPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <SettingsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/chats"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
