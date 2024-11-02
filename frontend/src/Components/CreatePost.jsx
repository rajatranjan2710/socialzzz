import React, { useState } from "react";
import avatar from "../assets/img_avatar.png";

//icons
import { FaCamera } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { validatePost, validateVlog } from "../validators/validate";
import { useContentStore } from "../store/contentStore";

const CreatePost = () => {
  //states for input
  const [contentToPost, setContentToPost] = useState("post");
  const [caption, setCaption] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //states for media
  const [media, setmedia] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  //function to upload media
  const { createPost, createVlog } = useContentStore();

  // Function to handle media upload
  const handlemediaUpload = (event) => {
    const file = event.target.files[0]; // Get the first file
    if (file) {
      setmedia(file); // Create a URL for the media preview
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Function to handle the click of the "Plus" icon
  const handlePlusClick = () => {
    console.log("clicked");
    document.getElementById("fileInput").click(); // Trigger file input click
  };

  //create clog or post
  const handleSubmit = async () => {
    // if post is created
    if (contentToPost === "post") {
      const validate = validatePost({ caption });

      //if not validated
      if (!validate) {
        alert("invalid post");
        return;
      }

      //if validated
      const formData = new FormData();
      formData.append("caption", caption);
      if (media) {
        console.log("media", media);
        formData.append("media", media); // Append media as a file
      }

      //creating post
      createPost(formData);
    }
    // if vlog is created
    else if (contentToPost === "vlog") {
      const formData = new FormData();

      //if not validated
      const validate = validateVlog({ title, description, media });
      if (!validate) {
        alert("invalid vlog");
        return;
      }

      //if validated
      formData.append("title", title);
      formData.append("description", description);
      formData.append("media", media);

      //creating vlog
      createVlog(formData);
    }
  };

  return (
    <div
      id="create-post"
      className="w-full flex flex-col  p-4 px-8 bg-white sm:shadow-[0px_4px_10px_rgba(1,1,1,0.07)] rounded-xl sm:border-none border"
    >
      <div className="flex gap-4 items-center">
        <img src={avatar} alt="" className="w-[40px] h-[40px]" />
        <p className="text-sm font-semibold text-gray-500">
          What are you thinking?
        </p>
      </div>
      <div className="w-full my-4">
        {contentToPost === "post" ? (
          <div className="w-full flex flex-col gap-1">
            <label
              htmlFor="caption"
              className="text-gray-500 font-semibold capitalize text-sm"
            >
              Caption
            </label>
            <input
              type="text"
              placeholder="Add a caption"
              name="caption"
              id="caption"
              className="w-full border border-gray-300 outline-none rounded-xl px-4 py-2 "
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />

            {media && (
              <div className="mt-4">
                <img
                  src={previewUrl}
                  alt="Uploaded"
                  className="w-full h-auto rounded-[5px]"
                />
              </div>
            )}
          </div>
        ) : (
          <div w-full my-4>
            <div className="w-full flex flex-col gap-1 mb-2">
              <label
                htmlFor="title"
                className="text-gray-500 font-semibold capitalize text-sm"
              >
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Add a caption"
                name="title"
                id="title"
                className="w-full border border-gray-300 outline-none rounded-xl px-4 py-2 "
              />
            </div>
            <div className="w-full flex flex-col gap-1 mb-2">
              <label
                htmlFor="description"
                className="text-gray-500 font-semibold capitalize text-sm"
              >
                Description
              </label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Add description"
                name="description"
                id="description"
                className="w-full border border-gray-300 outline-none rounded-xl px-4 py-2 "
              />
              <div className="flex justify-center items-center min-h-10 w-full bg-[#f1e3e3] rounded-xl">
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handlemediaUpload}
                />
                {media ? (
                  <div className="mt-4">
                    <img
                      src={previewUrl}
                      alt="Uploaded"
                      className="w-full h-auto rounded-[5px]"
                    />
                  </div>
                ) : (
                  <FaPlus size={20} color="#a855f7" onClick={handlePlusClick} />
                )}
              </div>
            </div>
          </div>
        )}

        {/* media Preview */}
      </div>

      <div className="flex justify-between">
        <div id="icons" className="flex gap-1 justify-start items-center">
          <div
            className="p-2 hover:bg-gray-200 rounded-full scale-110 transition-all"
            onClick={() => setContentToPost("post")}
          >
            <FaCamera size={20} color="#a855f7" />
          </div>
          <div
            className="p-2 hover:bg-gray-200  scale-110 transition-all rounded-full"
            onClick={() => setContentToPost("vlog")}
          >
            <FaVideo size={20} color="#a855f7" />
          </div>
          <div
            className="p-2 hover:bg-gray-200 rounded-full scale-110 transition-all"
            onClick={handlePlusClick}
          >
            <FaPlus size={20} color="#a855f7" />
          </div>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }} // Hide the file input
            accept="image/*" // Only accept medias
            onChange={handlemediaUpload} // Call the function on file selection
          />
        </div>
        <div
          className="text-sm font-semibold text-white cursor-pointer bg-purple-500 px-4 py-1 rounded-lg flex items-center"
          onClick={handleSubmit}
        >
          Share
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
