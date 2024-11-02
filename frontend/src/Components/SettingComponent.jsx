import React, { useRef, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useAuthStore } from "../store/authStore";
import { useUpdateUserData } from "../hooks/useUpdateUserData";

const SettingComponent = () => {
  const { user } = useAuthStore();
  const [preview, setPreview] = useState(user?.profile_picture);
  const [updateData, setUpdateData] = useState({
    fullname: user?.fullname || "",
    username: user?.username || "",
    email: user?.email || "",
    birthday: "",
    location: user?.location || "",
    website: user?.website || "",
    bio: user?.bio || "",
    profilePicture: user?.profile_picture, // New state for profile picture
  });

  // Reference for the hidden file input
  const fileInputRef = useRef(null);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Function to handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdateData((prevData) => ({
        ...prevData,
        profilePicture: file, // Save selected file
      }));
      //preview image
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageReplaceClick = () => {
    // Trigger the file input click event
    fileInputRef.current.click();
  };

  const { updateUserData } = useUpdateUserData();

  const handleUpdate = () => {
    // Create a FormData instance
    const formData = new FormData();

    // Append each field to formData
    for (const key in updateData) {
      if (updateData[key]) {
        formData.append(key, updateData[key]);
      }
    }

    // Send the FormData in the API call
    updateUserData(formData);
  };

  return (
    <div
      id="middle-content"
      className="lg:col-span-8 md:col-span-9 col-span-12 bg-[#f7f7f7] w-full h-full sm:p-4 overflow-y-scroll no-scrollbar"
    >
      <div className="bg-white w-full h-full rounded-xl shadow-[1px_4px_10px_rgba(1,1,1,0.12)] sm:p-4 overflow-y-scroll no-scrollbar">
        <div className="account-info flex flex-col lg:mx-8 md:mx-4 m-4 lg:gap-4 md:gap-4 gap-2 h-[92%]">
          <h1 className="md:text-2xl text-xl font-bold">Account Information</h1>

          {/* Profile image */}
          <div className="flex gap-5 mt-6 mb-4">
            <img
              src={preview}
              alt="profile"
              className="md:w-[100px] md:h-[100px] w-[60px] h-[60px] object-cover rounded-2xl"
            />
            <div className="flex flex-col sm:gap-4 gap-1 justify-center">
              <div className="md:text-lg text-sm font-bold text-purple-500 font-sans">
                Profile Picture
              </div>
              <div className="flex md:gap-4 gap-2">
                <div
                  onClick={handleImageReplaceClick}
                  className="md:text-sm text-xs font-bold text-white bg-purple-500 rounded-xl md:px-4 md:py-3 p-2 flex items-center justify-center cursor-pointer"
                >
                  Replace
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <div className="text-sm font-bold text-purple-500 bg-white border border-black rounded-xl md:px-4 md:py-3 p-2 flex items-center gap-1 cursor-pointer">
                  <MdDeleteOutline size={20} color="gray" />
                  Delete
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <h2 className="md:text-xl text-lg font-bold text-gray-500">
            Basic Information
          </h2>
          <div className="grid grid-cols-12 my-4 gap-2">
            <div className="sm:col-span-6 col-span-12 flex flex-col gap-1 my-1">
              <label
                htmlFor="fullname"
                className="font-medium uppercase text-sm"
              >
                Name
              </label>
              <input
                type="text"
                id="fullname"
                placeholder={user?.fullname}
                value={updateData.fullname}
                onChange={handleChange}
                className="border-none outline-none bg-[#f7f7f7] py-3 px-4 shadow-[1px_4px_10px_rgba(1,1,1,0.09)] rounded-xl w-full"
              />
            </div>

            <div className="sm:col-span-6 col-span-12 flex flex-col gap-1 my-1">
              <label
                htmlFor="username"
                className="font-medium uppercase text-sm"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder={user?.username}
                value={updateData.username}
                className="border-none outline-none bg-[#f7f7f7] py-3 px-4 shadow-[1px_4px_10px_rgba(1,1,1,0.09)] rounded-xl w-full"
                disabled={true}
              />
            </div>

            <div className="sm:col-span-6 col-span-12 flex flex-col gap-1 my-1">
              <label htmlFor="email" className="font-medium uppercase text-sm">
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder={user?.email}
                value={updateData.email}
                onChange={handleChange}
                className="border-none outline-none bg-[#f7f7f7] py-3 px-4 shadow-[1px_4px_10px_rgba(1,1,1,0.09)] rounded-xl w-full"
              />
            </div>

            <div className="sm:col-span-6 col-span-12 flex flex-col gap-1 my-1">
              <label
                htmlFor="birthday"
                className="font-medium uppercase text-sm"
              >
                Birthday
              </label>
              <input
                type="date"
                id="birthday"
                placeholder="DD/MM/YYYY"
                value={updateData.birthday}
                onChange={handleChange}
                className="border-none outline-none bg-[#f7f7f7] py-3 px-4 shadow-[1px_4px_10px_rgba(1,1,1,0.09)] rounded-xl w-full text-gray-500"
              />
            </div>

            {/* Separator */}
            <div
              id="separator"
              className="border border-gray-300 mt-4 mb-2 col-span-12"
            ></div>

            <div className="sm:col-span-6 col-span-12 flex flex-col gap-1 my-1">
              <label
                htmlFor="location"
                className="font-medium uppercase text-sm"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                placeholder={user?.location}
                value={updateData.location}
                onChange={handleChange}
                className="border-none outline-none bg-[#f7f7f7] py-3 px-4 shadow-[1px_4px_10px_rgba(1,1,1,0.09)] rounded-xl w-full text-gray-500"
              />
            </div>

            <div className="sm:col-span-6 col-span-12 flex flex-col gap-1 my-1">
              <label
                htmlFor="website"
                className="font-medium uppercase text-sm"
              >
                Website
              </label>
              <input
                type="text"
                id="website"
                placeholder={user?.website}
                value={updateData.website}
                onChange={handleChange}
                className="border-none outline-none bg-[#f7f7f7] py-3 px-4 shadow-[1px_4px_10px_rgba(1,1,1,0.09)] rounded-xl w-full text-gray-500"
              />
            </div>

            <div className="sm:col-span-6 col-span-12 flex flex-col gap-1 my-1">
              <label htmlFor="bio" className="font-medium uppercase text-sm">
                Bio
              </label>
              <input
                type="text"
                id="bio"
                placeholder={user?.bio}
                value={updateData.bio}
                onChange={handleChange}
                className="border-none outline-none bg-[#f7f7f7] py-3 px-4 shadow-[1px_4px_10px_rgba(1,1,1,0.09)] rounded-xl w-full text-gray-500"
              />
            </div>
          </div>

          <div className="m-4 p-4">
            <div
              className="md:text-lg font-bold text-center bg-purple-500 text-white mx-auto p-2 rounded-xl w-[100px] cursor-pointer md:my-0 mb-10"
              onClick={handleUpdate}
            >
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingComponent;
