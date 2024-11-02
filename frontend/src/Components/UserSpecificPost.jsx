import React from "react";
import ShowPosts from "./ShowPosts";
import ShowVlog from "./ShowVlog";

const UserSpecificPost = () => {
  return (
    <div
      id="middle-content"
      className=" lg:col-span-8 md:col-span-9 col-span-12 bg-[#f7f7f7] w-full h-full p-4 overflow-y-scroll no-scrollbar"
    >
      <ShowPosts />
      <ShowVlog />
    </div>
  );
};

export default UserSpecificPost;
