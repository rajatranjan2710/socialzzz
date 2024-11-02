import React, { useEffect } from "react";
import { getTimestamp } from "../utils/timestamp";

// icons
import { RxCross2 } from "react-icons/rx";
import { useVlogReadStore } from "../store/vlogReadStore";
import { Link } from "react-router-dom";

const ReadVlog = () => {
  const { readVlog, setVlogRead } = useVlogReadStore();

  return (
    <div className="md:col-span-9 lg:col-span-8 col-span-12 w-full md:h-full h-[92vh]  sm:p-4 no-scrollbar overflow-y-scroll">
      <div className="overflow-y-scroll no-scrollbar bg-white  px-3 py-3 shadow-[0px_4px_10px_rgba(1,1,1,0.06)] h-[100%] rounded-xl pb-2 relative">
        <div id="content" className="overflow-y-scroll no-scrollbar h-[100%] ">
          {/* vlog header  */}
          <div className="flex items-center lg:px-4 ">
            <img
              src={
                readVlog.user.profile_picture ||
                "https://tse4.mm.bing.net/th/id/OIP.RmtUto6J3t46P2SKZ48SeQAAAA?w=202&h=112&c=7&r=0&o=5&dpr=1.5&pid=1.7"
              }
              alt="prfoile"
              className="w-[60px] h-[60px] object-cover rounded-full"
            />
            <div className="flex flex-col ml-4 flex-grow">
              <div className="font-semibold sm:text-lg  text-sm">
                {readVlog.user.username || "Unknown"}
              </div>
              <div className="sm:text-sm text-xs font-medium text-gray-600">
                @{"Unknown"}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium text-gray-600">
                {getTimestamp(readVlog.createdAt)}
              </div>
              <div className="absolute right-3 top-3 cursor-pointer">
                <Link to={`/`}>
                  <RxCross2
                    size={20}
                    color="gray"
                    onClick={() => setVlogRead(null)}
                  />
                </Link>
              </div>
            </div>
          </div>
          {/* vlog header ends  */}

          {/* vlog image  */}

          <img
            src={readVlog.media}
            alt="poster"
            //   width={"100%"}
            className="my-4 rounded-2xl w-[70%] object-cover mx-auto"
          />

          {/* vlog image ends  */}

          {/* vlog content  */}

          <div className="my-4 md:mx-8 mx-3">
            <h3 className="font-bold md:text-xl text-lg">{readVlog.title}</h3>
            <p className="text-gray-600 text-sm my-2">{readVlog.description}</p>
          </div>

          {/* vlog content ends  */}
        </div>
      </div>
    </div>
  );
};

export default ReadVlog;
