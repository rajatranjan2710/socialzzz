import React from "react";
import loginCover from "../assets/night2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { loginValidate } from "../validators/validate";

const LoginPage = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { login } = useAuthStore();
  const navigate = useNavigate();

  const loginHandler = async () => {
    const validated = loginValidate({ username, password });
    if (!validated) {
      alert("Please enter valid username and password");
    } else {
      login({ username, password }, navigate);
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
          <h4 className="text-sm text-white">Dont have an account yet?</h4>
          <div className="py-[12px] bg-purple-400 px-6 rounded-3xl font-bold text-white cursor-pointer flex justify-center ">
            <Link to={"/signup"}>Create an account</Link>
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 bg-gray w-full relative flex justify-center items-center md:bg-white bg-[#f7f7f7]">
        <div
          id="login "
          className="md:absolute left-[-50px] bg-white  md:w-[100%] md:h-[90%] h-[80%] sm:w-[300px] w-[90%] rounded-3xl flex justify-center items-center md:border-none border  md:shadow-[1px_3px_10px_rgba(1,1,0,0.18)] "
        >
          <form action="">
            <h1 className="text-2xl font-bold text-purple-500 text-center">
              Welcome back!
            </h1>
            <h3 className="text-sm text-gray-500 text-center mb-5">
              Sign in to continue.
            </h3>
            <div className="flex flex-col my-3 gap-1">
              <label
                htmlFor="username"
                className="font-bold text-xs  md:text-black"
              >
                USERNAME
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="you@gmail.com"
                className="md:p-[0.7rem] p-3  rounded-md outline-none  text-sm px-3 md:shadow-[0px_4px_10px_rgba(0,0,0,0.15)] border"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col my-3 gap-1">
              <label
                htmlFor="password"
                className="font-bold text-xs  md:text-black"
              >
                PASSWORD
              </label>
              <input
                type="password"
                name="password"
                id="id"
                placeholder="you@gmail.com"
                className="md:p-[0.7rem] p-3 rounded-md outline-none  text-sm px-3 md:shadow-[0px_4px_10px_rgba(0,0,0,0.15)] border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="text-right text-sm text-gray-500">
              forgot password?
            </div>
            <div className="md:hidden flex flex-col my-3 gap-1 text-sm text-center">
              <Link to="/signup">Don't have an account yet?</Link>
            </div>
            <div
              className=" flex justify-center sm:py-3 py-2 w-3/5 rounded-md bg-purple-500 my-4 mx-auto text-white"
              onClick={loginHandler}
            >
              Login
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
