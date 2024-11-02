import React from "react";
import { useChatStore } from "../store/chatStore";
import { FaEllipsisV } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { RiSendPlaneLine } from "react-icons/ri";
import MessageContainer from "./MessageContainer";
import { useConversationStore } from "../store/conversationStore";
import { useAuthStore } from "../store/authStore";
import { useSendMessage } from "../hooks/useSendMessage";
import toast from "react-hot-toast";

const ChatScreen = () => {
  const [sentMessage, setSentMessage] = React.useState("");
  const [displayMessage, setDisplayMessage] = React.useState("");

  const { setMessageArray } = useChatStore();
  const { isSent, sendMessage } = useSendMessage();
  const { user } = useAuthStore();

  const {
    selectedConversation,
    setSelectedConversation,
    ChatWhichIsSelected,
    setChat,
  } = useConversationStore();

  // console.log("selectedConversation", selectedConversation);

  const sendMessageHandler = async (e) => {
    if (e.key === "Enter") {
      if (sentMessage.length <= 0) {
        toast.error("Please enter a message");
        return;
      }
      const recieverId =
        selectedConversation?.participants.find((p) => p._id !== user._id)
          ._id || ChatWhichIsSelected._id;

      sendMessage(recieverId, sentMessage);

      setSentMessage("");
    }
  };

  return (
    <div
      id="chat-inbox"
      className={`lg:col-span-8 sm:col-span-7 bg-[#f7f7f7] w-full h-full ${
        selectedConversation || ChatWhichIsSelected
          ? "col-span-12"
          : "col-span-0"
      } sm:py-4 sm:px-2 p-0`}
    >
      <div className="bg-white w-full h-full rounded-xl shadow-[1px_4px_10px_rgba(1,1,1,0.06)] relative">
        {(selectedConversation || ChatWhichIsSelected) && (
          <>
            <div className="w-full bg-purple-500 p-2 sm:px-4 px-2 sm:rounded-t-xl flex items-center">
              <IoIosArrowBack
                size={20}
                color="white"
                className="sm:hidden block mr-2"
                onClick={() => {
                  if (selectedConversation) {
                    setSelectedConversation(null);
                    setMessageArray([]);
                  } else {
                    setChat(null);
                  }
                }}
              />
              <img
                src={
                  selectedConversation
                    ? selectedConversation.participants.find(
                        (p) => p._id !== user._id
                      ).profile_picture
                    : ChatWhichIsSelected?.profile_picture
                }
                alt="profile"
                className="w-[50px] h-[50px] object-cover rounded-full"
              />
              <div className="flex flex-col ml-2 justify-center flex-grow">
                <div className="text-sm font-semibold text-white">
                  {selectedConversation
                    ? selectedConversation.participants.find(
                        (p) => p._id !== user._id
                      ).username
                    : ChatWhichIsSelected?.username}
                </div>
                <div className="flex items-center gap-1">
                  <div className="text-sm font-semibold text-white">Online</div>
                  <div className="bg-green-400 w-3 h-3 rounded-full"></div>
                </div>
              </div>
              <div>
                <FaEllipsisV size={20} color="white" />
              </div>
            </div>
            <MessageContainer displayMessage={displayMessage} />
            <div className="px-4 w-full flex justify-center bg-gray-400">
              <div className="w-[90%] px-4 absolute md:bottom-2 lg:bottom-[30px] bottom-6 flex items-center border rounded-lg justify-center bg-white">
                <input
                  type="text"
                  placeholder="send message"
                  className="w-full outline-none p-2 rounded-lg text-wrap text-ellipsis"
                  value={sentMessage}
                  onChange={(e) => setSentMessage(e.target.value)}
                  onKeyDownCapture={(e) => sendMessageHandler(e)}
                />
                <RiSendPlaneLine size={20} color="purple" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatScreen;
