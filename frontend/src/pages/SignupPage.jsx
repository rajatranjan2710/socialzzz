import React, { useState } from "react";
import loginCover from "../assets/night2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { validateSignUp } from "../validators/validate";

const SignupPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [fullname, setFullName] = React.useState("");
  const [imagePreview, setImagePreview] = useState(null); // State for image preview URL
  const [imageFile, setImageFile] = useState(null); // State for actual image file

  const { user, signUp } = useAuthStore();
  const navigate = useNavigate();

  const signUpHandler = async () => {
    const validated = validateSignUp({ email, password, username, fullname });
    if (!validated) {
      alert("Please enter valid email, password, and username");
    } else {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("fullname", fullname);
      if (imageFile) {
        formData.append("profile_picture", imageFile); // Send the actual file to the backend
        // console.log(imageFile);
      }
      signUp(formData, navigate);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Set preview URL
      setImageFile(file); // Set the actual file to be sent
    }
  };

  return (
    <section
      id="login"
      className="w-screen h-screen bg-slate-200 grid grid-cols-12 overflow-x-hidden"
    >
      <div className="col-span-8 hidden md:block relative">
        <img
          src={loginCover}
          alt="cover"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] flex flex-col gap-2 items-center">
          <h1 className="text-2xl font-bold text-white ">Hey!!</h1>
          <h4 className="text-sm text-white">Already have an account?</h4>
          <div className="py-[12px] bg-purple-400 px-6 rounded-3xl font-bold text-white cursor-pointer flex justify-center ">
            <Link to={"/login"}>Login into your account</Link>
          </div>
        </div>
      </div>
      <div
        className="col-span-12 md:col-span-4 bg-gray w-full relative flex justify-center items-center
       md:bg-white  bg-[#f7f7f7]"
      >
        <div
          id="login "
          className="md:absolute left-[-50px] bg-white md:w-[100%] md:h-[90%] h-[90%] sm:w-[300px] w-[90%] rounded-3xl flex justify-center items-center md:border-none border md:shadow-[1px_3px_10px_rgba(1,1,0,0.18)]  "
        >
          <form action="">
            <h1 className="md:text-2xl text-xl font-bold text-purple-500 text-center">
              Welcome back!
            </h1>
            <h3 className="md:text-sm text-sm text-gray-500  text-center mb-5">
              Create an account
            </h3>
            <div className="flex my-3 justify-center">
              <label
                htmlFor="imageUpload"
                className="w-[80px] h-[80px] rounded-full bg-[#f5f5f5] flex items-center justify-center cursor-pointer overflow-hidden"
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div>Upload</div>
                )}
              </label>
              <input
                type="file"
                id="imageUpload"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="flex flex-col my-3 gap-1">
              <label
                htmlFor="username"
                className="font-bold text-xs md:text-black "
              >
                USERNAME
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="you@gmail.com"
                className="md:p-[0.7rem] p-2  rounded-md outline-none  text-sm px-3 md:shadow-[0px_4px_10px_rgba(0,0,0,0.15)] md:border-none border"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col my-3 gap-1">
              <label
                htmlFor="fullname"
                className="font-bold text-xs md:text-black "
              >
                FULL NAME
              </label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                placeholder="Rajat Ranjan"
                className="md:p-[0.7rem] p-2  rounded-md outline-none  text-sm px-3 md:shadow-[0px_4px_10px_rgba(0,0,0,0.15)] md:border-none border"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="flex flex-col my-3 gap-1">
              <label
                htmlFor="email"
                className="font-bold text-xs  md:text-black "
              >
                EMAIL
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="you@gmail.com"
                className="md:p-[0.7rem] p-2 rounded-md outline-none  text-sm px-3 md:shadow-[0px_4px_10px_rgba(0,0,0,0.15)] md:border-none border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col my-3 gap-1">
              <label
                htmlFor="password"
                className="font-bold text-xs  md:text-black "
              >
                PASSWORD
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="you@gmail.com"
                className="md:p-[0.7rem] p-2 rounded-md outline-none  text-sm px-3 md:shadow-[0px_4px_10px_rgba(0,0,0,0.15)]  md:border-none border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="text-right text-sm text-gray-500">
              forgot password?
            </div>
            <div className="md:hidden flex flex-col my-3 gap-1 text-sm text-center">
              <Link to="/login">Already have an account?</Link>
            </div>
            <div
              className=" flex justify-center sm:py-3 py-2 w-3/5 rounded-md bg-purple-500 my-4 mx-auto text-white cursor-pointer"
              onClick={signUpHandler}
            >
              Sign Up
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
