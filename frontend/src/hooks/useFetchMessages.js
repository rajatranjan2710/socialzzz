import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/chatStore";
import axios from "axios";
import { server } from "../store/authStore";
import toast from "react-hot-toast";
import { useConversationStore } from "../store/conversationStore";

export const useFetchMessages = () => {
  const { messagesArray, setMessageArray } = useChatStore();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // Keeps track of the current page for pagination
  const [newAddedMessages, setNewAddedMessages] = useState([]);
  const [hasMore, setHasMore] = useState(true); // Indicates if there are more messages to load
  const { selectedConversation } = useConversationStore();
  const lastNewMessageRef = useRef(null); //reference to last new message

  useEffect(() => {
    const fetchMessages = async () => {
      // console.log("fetching messages in use fetch");
      if (!selectedConversation?._id || !hasMore) return; // Ensure conversation is selected and there's more to fetch

      setLoading(true);
      try {
        const response = await axios.get(
          `${server}/message/${selectedConversation._id}?page=${page}&limit=20`,
          { withCredentials: true }
        );

        const fetchedMessages = response.data.messages;

        setNewAddedMessages(fetchedMessages);

        if (fetchedMessages.length === 0) {
          setHasMore(false); // No more messages to load
        } else {
          // Prepend the new batch of messages to the existing array
          if (messagesArray.length !== 0) {
            lastNewMessageRef.current = fetchedMessages[0];
            console.log("lastNewMessageRef", lastNewMessageRef);
          }
          setMessageArray(fetchedMessages);
        }

        toast.success("Messages fetched successfully");
      } catch (error) {
        console.error(error);
        toast.error("Error fetching messages");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedConversation, page]); // Refetch when the conversation or page changes

  // Function to load the next page (called when the user scrolls up)
  const loadMoreMessages = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1); // Increment page to fetch older messages
    }
  };

  return {
    loading,
    messagesArray,
    loadMoreMessages,
    hasMore,
    newAddedMessages,

    lastNewMessageRef,
  };
};
