import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import { useChatStore } from "../store/chatStore";
import { useConversationStore } from "../store/conversationStore";
import useSocketStore from "../store/socket.store";
import { useEffect, useRef } from "react";
import { useNotificationStore } from "../store/notification.store";

export const useListenMessage = () => {
  const { socket } = useSocketStore();
  const { setNewMessageRecivedToState, setLastMessageSent } = useChatStore();
  const { selectedConversation } = useConversationStore();
  const { user } = useAuthStore();
  const { setMessageNotification } = useNotificationStore();
  const selectedConversationRef = useRef(selectedConversation);

  useEffect(() => {
    // Update ref whenever selectedConversation changes
    selectedConversationRef.current = selectedConversation;
  }, [selectedConversation]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (data) => {
      setLastMessageSent(data);
      const currentConversation = selectedConversationRef.current;

      if (
        !currentConversation ||
        data.sender._id !==
          currentConversation?.participants.find((p) => p._id !== user._id)?._id
      ) {
        // Store as notification
        const existingNotifications =
          JSON.parse(localStorage.getItem("notifications")) || [];
        const newNotification = {
          sender: data.sender._id,
          message: data.content,
          timestamp: data.timestamp,
        };
        existingNotifications.push(newNotification);

        setMessageNotification(existingNotifications);
        localStorage.setItem(
          "notifications",
          JSON.stringify(existingNotifications)
        );
        toast.success("New Notification");
      } else {
        setNewMessageRecivedToState(data);
        toast.success("New message received");
      }
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [
    socket,
    setLastMessageSent,
    setNewMessageRecivedToState,
    setMessageNotification,
    user,
  ]);
};
