import React from "react";
import Navbar from "../Components/Navbar";

//icons
import CreatePost from "../Components/CreatePost";
import ShowPosts from "../Components/ShowPosts";
import ShowVlog from "../Components/ShowVlog";

import SearchBar from "../Components/SearchBar";
import { useVlogReadStore } from "../store/vlogReadStore";
import ReadVlog from "../Components/ReadVlog";
import RightSideComponent from "../Components/RightSideComponent";
import { useAuthStore } from "../store/authStore";
import { useNotificationStore } from "../store/notification.store";
import ShowNotification from "../Components/ShowNotification";
import ShowUsers from "../Components/ShowUsers";

const Home = () => {
  //checkig isProfile open

  const { user } = useAuthStore();
  // console.log("user", user);
  const { readVlog } = useVlogReadStore();
  const { isNotificationOpen, notifications } = useNotificationStore();

  // console.log("isNotificationOpen", isNotificationOpen);
  const [content, setContent] = React.useState("posts");

  const setContentHandler = (content) => {
    setContent(content);
  };

  return (
    <section
      id="home"
      className="w-screen h-screen bg-[#f7f7f7] grid grid-cols-12 relative "
    >
      {/* Header Section */}

      <Navbar />

      {/* drawer section  */}
      <div className="absolute bottom-0 w-full flex gap-4 lg:hidden bg-purple-500 text-white p-2 items-center justify-between z-10">
        <div
          className="font-semibold text-center flex-1 py-1"
          onClick={() => setContentHandler("posts")}
        >
          Posts
        </div>
        <div
          className="font-semibold flex-1  text-center py-1 sm:hidden block"
          onClick={() => setContentHandler("vlogs")}
        >
          Vlogs
        </div>
        <div
          className="font-semibold flex-1 text-center py-1"
          onClick={() => setContentHandler("follow")}
        >
          Follow
        </div>
      </div>

      {/* content section  */}
      {isNotificationOpen ? (
        // <ShowNotification />
        <div className="col-span-12 bg-white">
          <ShowNotification />
        </div>
      ) : (
        <>
          <div
            id="middle-content"
            className="sm:col-span-12 md:col-span-12 lg:col-span-8 col-span-12 bg-[#f7f7f7] w-full h-full grid grid-cols-12 p-4"
          >
            <SearchBar />

            {/* post Section */}

            <div
              id="content"
              className="sm:col-span-6  col-span-12 h-[80vh]   overflow-y-scroll sm:p-4  py-2 no-scrollbar md:mt-8 mt-4"
            >
              {content === "posts" && (
                <>
                  <CreatePost />
                  <ShowPosts />
                </>
              )}
              {content === "vlogs" && <ShowVlog />}
              {content === "follow" && <ShowUsers />}
            </div>

            {/* vlog section  */}
            <div className="col-span-6 hidden sm:block overflow-x-scroll md:py-0 md:px-4 px-1 py-4 no-scrollbar mt-6 h-[80vh]">
              <ShowVlog />
            </div>
          </div>

          {/* right most home section  */}
          <RightSideComponent />
        </>
      )}
    </section>
  );
};

export default Home;
