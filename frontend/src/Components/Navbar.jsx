import React from "react";
// import { ReactComponent as myICon } from "../assets/header_logo.svg";

//icons

import { IoMdNotifications } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoHomeOutline } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { PiReadCvLogoFill } from "react-icons/pi"; //vlog
import { MdOutlineEmail } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import "../styles/style.css";
import { useNotificationStore } from "../store/notification.store";
import { useConversationStore } from "../store/conversationStore";

const Navbar = () => {
  //user
  const { user } = useAuthStore();

  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const logoutHandler = async () => {
    logout(navigate);
  };

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const dropDownRef = React.useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { selectedConversation, ChatWhichIsSelected } = useConversationStore();

  const {
    setIsNotificationOpen,
    isNotificationOpen,
    isNotificationOpenOnLargeScreen,
    setNotificationOpenOnLargeScreen,
    appNotifications,
    notifications,
  } = useNotificationStore();
  //open notifications on phone
  const openNotificationsHandler = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const openNotificationsHandlerOnLargeScreen = () => {
    setNotificationOpenOnLargeScreen(!isNotificationOpenOnLargeScreen);
  };

  let maxHeight = "0"; // Default height when closed
  if (isMenuOpen && dropDownRef.current) {
    maxHeight = "250px"; // Set to the scrollHeight when open
  }
  // console.log("appNotifications", appNotifications);
  const unreadNotifications = appNotifications?.filter(
    (notification) => notification.isRead === false
  );
  // console.log("unreadNotifications", notifications);

  return (
    <div
      id="header"
      className={`md:col-span-1 col-span-12 relative  lg:mx-2 mx-auto lg:flex items-center z-10   ${
        selectedConversation || ChatWhichIsSelected
          ? "col-span-0 hidden"
          : "col-span-12 block"
      }`}
    >
      <div className="lg:w-full lg:h-[95vh] h-[60px]  w-[100vw] mx-auto bg-purple-500 flex lg:flex-col justify-between md:items-center  items-center p-4  lg:shadow-[1px_4px_10px_rgba(10,10,1,0.36)] lg:rounded-lg">
        {/* seperator  */}
        <Logo className="block lg:hidden" />
        <div className="block lg:hidden lg:my-2 my-4 text-white text-lg font-serif">
          Socialite
        </div>
        <div id="icons" className=" lg:flex-col sm:gap-8 gap-1 lg:block hidden">
          <div className="hover:bg-purple-700  rounded-lg sm:p-2 p-1 transition-all">
            <Link to={"/"}>
              <IoHomeOutline size={25} color="white" />
            </Link>
          </div>
          <div className="hover:bg-purple-700 rounded-lg sm:p-2 p-1 transition-all">
            <Link to={"/settings"}>
              <IoMdSettings size={25} color="white" />
            </Link>
          </div>
          <div className="hover:bg-purple-700 rounded-lg sm:p-2 p-1 transition-all relative">
            <Link to={"/chats"}>
              <MdOutlineEmail size={25} color="white" />
            </Link>
            {notifications && notifications.length > 0 && (
              <div className="absolute bottom-[0px] right-[0px] h-[20px] w-[20px] bg-red-600 rounded-full flex items-center justify-center text-white">
                {notifications.length}
              </div>
            )}
          </div>
          <div className="hover:bg-purple-700 rounded-lg sm:p-2 p-1 transition-all sm:hidden block relative">
            <Link to={"/vlog"}>
              <PiReadCvLogoFill size={25} color="white" />
            </Link>
          </div>

          <div className="hover:bg-purple-700 rounded-lg sm:p-2 p-1 transition-all relative">
            <IoMdNotifications
              size={25}
              color="white"
              onClick={openNotificationsHandlerOnLargeScreen}
            />
            {appNotifications && unreadNotifications.length > 0 && (
              <div className="absolute bottom-[0px] right-[0px] h-[20px] w-[20px] bg-red-600 rounded-full flex items-center justify-center text-white">
                {unreadNotifications.length}
              </div>
            )}
          </div>

          <Link to={`/profile/${user?._id}`}>
            <div className="hover:bg-purple-700 rounded-lg sm:p-2 p-1 transition-all">
              <IoPerson size={25} color="white" />
            </div>
          </Link>
          <div className="hover:bg-purple-700 rounded-lg sm:p-2 p-1 transition-all lg:hidden block">
            <CiLogout size={25} color="white" onClick={logoutHandler} />
          </div>
        </div>

        {/* //hamburger */}
        <div className="lg:hidden block relative" onClick={toggleMenu}>
          <RxHamburgerMenu size={25} color="white" />
          {appNotifications && unreadNotifications.length > 0 && (
            <div className="absolute bottom-[-7px] right-[-7px] h-[20px] w-[20px] bg-red-600 rounded-full flex items-center justify-center text-white">
              {unreadNotifications.length}
            </div>
          )}
        </div>

        <div className="md:mx-0 sm:mx-4 mx-2 hover:bg-purple-700 rounded-lg sm:p-2 p-1 transition-all md:block hidden">
          <CiLogout size={25} color="white" onClick={logoutHandler} />
        </div>
      </div>

      {/* dopdown menu  */}
      <div
        className={`menu-container absolute top-[60px] left-0 bg-white z-10 w-full flex items-center justify-center flex-col pt-2 pb-4 ${
          isMenuOpen ? "open" : ""
        } lg:hidden block`}
        ref={dropDownRef}
        style={{
          maxHeight: maxHeight,
          opacity: isMenuOpen ? 1 : 0,
          transition:
            "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, opacity 0.3s ease-in-out",
        }}
      >
        <div
          className="hover:bg-purple-700  rounded-lg sm:p-2 p-1 transition-all"
          onClick={() => {
            toggleMenu();
            setIsNotificationOpen(false);
          }}
        >
          <Link to={"/"} className="text-purple-600 font-medium">
            Home{" "}
          </Link>
        </div>
        <div className="hover:bg-purple-700 rounded-lg sm:p-2 p-1 transition-all">
          <Link
            to={"/settings"}
            className="text-purple-600 font-medium"
            onClick={toggleMenu}
          >
            Settings
          </Link>
        </div>
        <div className="hover:bg-purple-700 rounded-lg sm:p-2 p-1 transition-all">
          <Link
            to={"/chats"}
            className="text-purple-600 font-medium"
            onClick={toggleMenu}
          >
            Chats
          </Link>
        </div>

        <div
          className="hover:bg-purple-700 rounded-lg sm:p-2 p-1 transition-all font-medium text-purple-600 flex items-center gap-2"
          onClick={() => {
            openNotificationsHandler();
            toggleMenu();
          }}
        >
          <Link to={"/"}>Notifications</Link>
          {appNotifications && unreadNotifications.length > 0 && (
            <div className=" bg-red-600 rounded-full flex items-center justify-center text-white h-[20px] w-[20px] ">
              {unreadNotifications.length}
            </div>
          )}
        </div>

        <div className="hover:bg-purple-700 rounded-lg sm:p-2 p-1 transition-all ">
          <Link
            to={`/profile/${user?._id}`}
            className="text-purple-600 font-medium"
            onClick={toggleMenu}
          >
            Profile
          </Link>
        </div>

        <div className="hover:bg-purple-700 rounded-lg sm:p-2 p-1 transition-all ">
          <div
            className="text-purple-600 font-medium"
            onClick={() => {
              setIsNotificationOpen(false);
              logoutHandler();
            }}
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
