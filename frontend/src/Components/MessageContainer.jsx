import React, { useEffect, useLayoutEffect, useRef } from "react";
import Bubble from "./Bubble";
import { useChatStore } from "../store/chatStore";
import { useConversationStore } from "../store/conversationStore";
import { useFetchMessages } from "../hooks/useFetchMessages";
import { useSendMessage } from "../hooks/useSendMessage";
import { useListenMessage } from "../hooks/useListenMessage";

const MessageContainer = () => {
  const { selectedConversation } = useConversationStore();

  //socket for new messages

  // Socket event listener for new messages

  const { messagesArray } = useChatStore();

  //fetching messages

  const {
    loading,
    loadMoreMessages,
    hasMore,
    newAddedMessages,
    lastNewMessageRef,
  } = useFetchMessages();

  const { NewlyAddedMessageRef } = useSendMessage();

  const messageEndRef = useRef(null);

  useEffect(() => {
    const container = messageEndRef.current;
    // console.log("running more message effetc");
    const top = container.scrollTop;
    const handleScroll = () => {
      // Check if the container is scrolled to the top
      if (container.scrollTop === 0) {
        fetchMoreMessages();
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [newAddedMessages]);

  const fetchMoreMessages = () => {
    //api call
    loadMoreMessages();
  };

  // Scroll to bottom on new messages or when conversation changes
  useLayoutEffect(() => {
    const container = messageEndRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight; // Point to the latest message
    }
  }, [messagesArray, selectedConversation]); // Run when messages or conversation changes

  //last message of newly added message
  useEffect(() => {
    // console.log("scrolling to last new message");
    const container = messageEndRef.current;
    if (lastNewMessageRef.current && container) {
      container.scrollTop = 0; // Scroll to the top to show the last new message
      // Now scroll to the last message of added messages

      const messageElement = document.getElementById(
        lastNewMessageRef.current._id
      );

      console.log("message element : ", messageElement);
      if (messageElement) {
        // Point to the last new message by adjusting the scrollTop
        const offset = messageElement.offsetTop; // Get the top position of the new message
        container.scrollTop = offset; // Adjust the scroll position
      } else {
        console.log(
          "Message element not found:",
          lastNewMessageRef.current.messageId
        );
      }
    }
    //scroll to bottom whenever the logged in user sends message
    // console.log("message array", messagesArray);
    if (NewlyAddedMessageRef.current) {
      const newMessageElement = document.getElementById(
        NewlyAddedMessageRef.current._id
      );
      console.log("end refff");
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
      console.log("new message element : ", newMessageElement);
      NewlyAddedMessageRef.current = null;
    }
  }, [lastNewMessageRef.current, NewlyAddedMessageRef.current]);

  return (
    <div
      className="w-full overflow-y-scroll no-scrollbar  p-4 sm:max-h-[75vh] max-h-[80vh] flex flex-col"
      ref={messageEndRef}
    >
      {messagesArray.map((message) => (
        <Bubble
          message={message}
          userId={message.sender._id}
          key={message._id}
        />
      ))}
    </div>
  );
};

export default MessageContainer;
