import axios from "axios";
import { server } from "../store/authStore";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import { useChatStore } from "../store/chatStore";

export const useSendMessage = () => {
  const [isSent, setIsSent] = useState(false);
  const NewlyAddedMessageRef = useRef(null);
  const { setNewMessageToState } = useChatStore();
  const { setLastMessageSent } = useChatStore();
  const sendMessage = async (receiver, message) => {
    setIsSent(false);
    const content = { content: message };

    try {
      // console.log("debug in useSendMessage");
      const response = await axios.post(
        `${server}/message/sendmessage/${receiver}`,
        content,
        {
          withCredentials: true,
        }
      );

      // console.log(response.data);
      NewlyAddedMessageRef.current = response.data.messageData;
      setIsSent((prev) => !prev);
      // console.log("set is sent to true");

      setLastMessageSent(response.data.messageData);
      setNewMessageToState(response.data.messageData);

      toast.success("Message sent successfully");
    } catch (error) {
      setIsSent(false);
      console.log(error);
      toast.error(error.response.data.error);
    }
  };

  return { isSent, sendMessage, NewlyAddedMessageRef };
};
