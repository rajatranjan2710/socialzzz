import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import ShowVlog from "../Components/ShowVlog";
import { useVlogReadStore } from "../store/vlogReadStore";
import ReadVlog from "../Components/ReadVlog";
import RightSideComponent from "../Components/RightSideComponent";
import { useFetchUserVlogs } from "../hooks/useFetchUserVlogs";

const VlogPage = () => {
  //phone screens

  const { readVlog } = useVlogReadStore();

  console.log("Vlog read :", readVlog);
  return (
    <section
      id="vlog"
      className="w-screen h-screen bg-white grid grid-cols-12 relative "
    >
      {/* header  */}
      <Navbar />

      {/* vlogs  */}
      {readVlog === null ? (
        <div className="col-span-12 sm:col-span-8 sm:hidden block overflow-x-scroll  no-scrollbar h-[80vh]">
          <ShowVlog />
        </div>
      ) : (
        <ReadVlog />
      )}

      <RightSideComponent />
    </section>
  );
};

export default VlogPage;
