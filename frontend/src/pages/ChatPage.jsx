import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import ChatInbox from "../Components/ChatInbox";
import ChatScreen from "../Components/ChatScreen";
import { useChatStore } from "../store/chatStore";
import { useConversationStore } from "../store/conversationStore";
import { useListenMessage } from "../hooks/useListenMessage";
import { useSetNotification } from "../hooks/useSetNotification";

const ChatPage = () => {
  const { setMessageArray } = useChatStore();
  const { setSelectedConversation } = useConversationStore();

  //notification
  useSetNotification();

  //use effect to remove message array when component unmounts
  useEffect(() => {
    return () => {
      setMessageArray([]);
      setSelectedConversation(null);
    };
  }, []);

  return (
    <section
      id="home"
      className="w-screen h-screen bg-[#f7f7f7] grid grid-cols-12 relative "
    >
      {/* header  */}
      <Navbar />

      {/* chat inox  */}
      <ChatInbox />

      {/* chat screen  */}
      <ChatScreen />
    </section>
  );
};

export default ChatPage;
