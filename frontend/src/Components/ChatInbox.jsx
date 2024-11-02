import React, { useEffect } from "react";
import { useFetchConversation } from "../hooks/useFetchConversation";
import { useContentStore } from "../store/contentStore";
import { useConversationStore } from "../store/conversationStore";
import { useAuthStore } from "../store/authStore";
import { useChatStore } from "../store/chatStore";
import { useNotificationStore } from "../store/notification.store";

const ChatInbox = () => {
  // State for search users
  const [searchedUser, setSearchedUser] = React.useState([]);
  const [searchParam, setSearchParam] = React.useState("");

  // Message array
  const { setMessagesArray } = useChatStore();
  const { loading, conversations } = useFetchConversation();
  const { users } = useContentStore();
  const { user } = useAuthStore();
  const {
    availableUsersForChat,
    setAvailableUsersForChat,
    selectedConversation,
    setSelectedConversation,
    setChat,
    ChatWhichIsSelected,
  } = useConversationStore();
  const { setMessageNotification, notifications } = useNotificationStore();

  useEffect(() => {
    setAvailableUsersForChat(conversations, users);
  }, [conversations, users]);

  // Effect for handling user search
  useEffect(() => {
    if (searchParam === "") {
      setSearchedUser([]);
    } else {
      searchUser(searchParam);
    }
  }, [searchParam]);

  const searchUser = (searchParam) => {
    const filteredUsers = availableUsersForChat.filter((user) =>
      user.username.toLowerCase().includes(searchParam.toLowerCase())
    );
    setSearchedUser(filteredUsers);
  };

  return (
    <div
      id="chat-inbox"
      className={`lg:col-span-3 sm:col-span-5 col-span-12 bg-[#f7f7f7] w-full h-full ${
        selectedConversation || ChatWhichIsSelected
          ? "sm:block hidden sm:col-span-0"
          : "block col-span-12"
      } sm:py-4 sm:px-2 p-0`}
    >
      <div className="bg-white w-full h-full rounded-xl shadow-[1px_4px_10px_rgba(1,1,1,0.06)] p-2">
        <div className="w-full flex justify-center my-2">
          <input
            type="text"
            placeholder="search users"
            className="w-[90%] p-2 outline-none border border-gray-400 rounded-3xl mx-auto"
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
          />
        </div>

        <div
          id="users"
          className="overflow-y-scroll no-scrollbar h-[80vh] mt-4"
        >
          {searchedUser.length > 0 ? (
            // Render searched users
            searchedUser.map((user) => (
              <div
                className="m-2 bg-white flex items-center p-3 rounded-lg shadow-[2px_2px_10px_rgba(1,1,1,0.12)] cursor-pointer"
                key={user._id}
                onClick={() => {
                  setSelectedConversation(null);
                  setChat(user);
                }}
              >
                <img
                  src={user.profile_picture}
                  alt="profile"
                  className="w-[40px] h-[40px] object-cover rounded-full"
                />
                <div className="flex flex-col ml-2 justify-center flex-grow">
                  <div className="text-sm font-semibold">{user.username}</div>
                  <div className="text-gray-500 text-sm font-sans">
                    Start a conversation
                  </div>
                </div>
              </div>
            ))
          ) : loading ? (
            <div>Loading</div>
          ) : conversations.length > 0 ? (
            // Render conversations
            conversations.map((conv) => (
              <div
                className="m-2 bg-white flex items-center p-3 rounded-lg shadow-[2px_2px_10px_rgba(1,1,1,0.12)] cursor-pointer"
                key={conv._id}
                onClick={() => {
                  setChat(null);
                  setSelectedConversation(conv, user, setMessageNotification);
                }}
              >
                <img
                  src={
                    conv?.participants?.find((p) => p._id !== user?._id)
                      .profile_picture
                  }
                  alt="profile"
                  className="w-[40px] h-[40px] object-cover rounded-full"
                />
                <div className="flex flex-col ml-2 justify-center flex-grow">
                  <div className="text-sm font-semibold">
                    {conv.participants.find((p) => p._id !== user._id).username}
                  </div>
                  <div className="text-gray-500 text-sm font-sans">
                    {conv?.last_message}
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-xs font-semibold text-gray-500">
                    3:45
                  </div>
                  {notifications &&
                    notifications?.filter(
                      (notification) =>
                        notification.sender ===
                        conv?.participants.find((p) => p._id !== user._id)._id
                    ).length > 0 && (
                      <div className="w-[20px] h-[20px] bg-red-500 rounded-full flex justify-center items-center text-xs">
                        <p className="text-white">{notifications?.length}</p>
                      </div>
                    )}
                </div>
              </div>
            ))
          ) : availableUsersForChat.length > 0 ? (
            // Render available users for chat
            availableUsersForChat.map((user) => (
              <div
                className="m-2 bg-white flex items-center p-3 rounded-lg shadow-[2px_2px_10px_rgba(1,1,1,0.12)] cursor-pointer"
                key={user._id}
                onClick={() => {
                  setSelectedConversation(null);
                  setChat(user);
                }}
              >
                <img
                  src={user.profile_picture}
                  alt="profile"
                  className="w-[40px] h-[40px] object-cover rounded-full"
                />
                <div className="flex flex-col ml-2 justify-center flex-grow">
                  <div className="text-sm font-semibold">{user.username}</div>
                  <div className="text-gray-500 text-sm font-sans">
                    Start a conversation
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No conversations or available users</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInbox;
