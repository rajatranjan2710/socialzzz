import React, { useEffect } from "react";
import { useConversationStore } from "../store/conversationStore";
import axios from "axios";
import { server } from "../store/authStore";
import { useChatStore } from "../store/chatStore";
import { useSendMessage } from "./useSendMessage";

export const useFetchConversation = () => {
  const [loading, setLoading] = React.useState(true);
  const { conversations, setConversations } = useConversationStore();
  const { lastMessageSent } = useChatStore();

  useEffect(() => {
    // console.log("Running the fecth conversation hook");
    const fetchConversation = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${server}/conversation`, {
          withCredentials: true,
        });
        setConversations(response.data.conversations);
        setLoading(false);
        // console.log("conversation got", response.data.conversations);
      } catch (error) {
        console.log("error in fetching conversation", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConversation();
  }, [lastMessageSent]);

  return { loading, conversations };
};
