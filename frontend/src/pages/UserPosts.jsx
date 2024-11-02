import React from "react";
import Navbar from "../Components/Navbar";
import RightSideComponent from "../Components/RightSideComponent";

const UserPosts = () => {
  return (
    <section
      id="home"
      className="w-screen h-screen bg-white grid grid-cols-12 relative "
    >
      {/* header  */}
      <Navbar />

      {/* setting content  */}
      <SettingComponent />

      {/* right side component visisble to bigger screens only  */}
      <RightSideComponent />
    </section>
  );
};

export default UserPosts;
