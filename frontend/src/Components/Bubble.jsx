import React from "react";
import { useAuthStore } from "../store/authStore";

const Bubble = ({ message, userId }) => {
  const { user } = useAuthStore();
  return (
    <div
      id={message._id}
      className={`sm:max-w-[300px] max-w-[80%] flex items-center gap-2 py-2  px-3 rounded-2xl ${
        userId === user._id
          ? "self-end bg-purple-200 sender"
          : "self-start bg-purple-500 text-white reciever"
      } my-2`}
    >
      <div className="text-sm w-full text-wrap break-words">
        {message.content}
      </div>
    </div>
  );
};

export default Bubble;
