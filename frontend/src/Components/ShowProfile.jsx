import React from "react";

// icons
import { RxCross2 } from "react-icons/rx";
import { useProfileContentStore } from "../store/profileContentStore";
import { useNavigate } from "react-router-dom";

const ShowProfile = () => {
  const { singleUser, setSingleUser } = useProfileContentStore();

  //navigate
  const navigate = useNavigate();

  const closeProfile = () => {
    setSingleUser(null);
  };

  return (
    <div
      id="show-profile"
      className="p-4 flex flex-col justify-start bg-purple-500 rounded-xl my-4 shadow-[1px_4px_10px_rgba(1,1,1,0.36)] "
    >
      {/* close button  */}
      <div id="back" className="self-end" onClick={closeProfile}>
        <RxCross2 size={20} color="white" />
      </div>

      {/* image + name + username */}

      <div className="flex items-center gap-4 justify-center">
        {/* image  */}
        <img
          src={singleUser.profile_picture}
          alt="profile"
          className="w-[80px] h-[80px] object-cover rounded-full my-4"
        />
        {/* name + username */}
        <div className="flex flex-col">
          <div className="text-white font-bold text-lg">
            {singleUser.fullname}
          </div>
          <div className="text-slate-100 font-normal text-sm">
            @{singleUser.username}
          </div>
        </div>

        {/* name+username ends */}
      </div>
      {/* image + name + username ends  */}

      {/* posts + followers + following  */}
      <div className="flex items-center gap-5 justify-center">
        {/* posts  */}
        <div id="followers" className="flex flex-col items-center">
          <div className="text-white font-bold text-sm">
            {singleUser.posts.length}
          </div>
          <div className="text-slate-100 font-normal text-sm">Posts</div>
        </div>
        {/* followers  */}
        <div id="followers" className="flex flex-col items-center ">
          <div className="text-white font-bold text-sm">
            {singleUser.followers.length}
          </div>
          <div className="text-slate-100 font-normal text-sm">Followers</div>
        </div>
        {/* following */}
        <div id="followers" className="flex flex-col items-center">
          <div className="text-white font-bold text-sm">
            {singleUser.following.length}
          </div>
          <div className="text-slate-100 font-normal text-sm">Following</div>
        </div>
      </div>
      {/* posts + followers + following ends  */}

      {/* bio  */}

      <div className="text-white text-center text-sm font-semibold my-4 ">
        <p className="mb-2">{singleUser.bio}</p>

        <p>🌍 {singleUser.location}</p>
      </div>
      {/* bio ends */}
    </div>
  );
};

export default ShowProfile;
