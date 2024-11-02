import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  return (
    <div
      id="search-bar"
      className="col-span-12 py-2 px-4 bg-white h-12 flex justify-start items-center gap-2 md:mx-4 mx-1
           rounded-lg sm:shadow-[0px_4px_10px_rgba(1,1,1,0.07)] sm:border-none border"
    >
      <CiSearch size={25} color="gray" />
      <input
        type="text"
        placeholder="Search in socials..."
        className="w-full outline-none bg-transparent text-gray-500"
      />
      <div className="text-gray-400">FILTER</div>
    </div>
  );
};

export default SearchBar;
