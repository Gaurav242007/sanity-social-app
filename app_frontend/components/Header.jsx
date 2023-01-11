import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <div className="px-2 flex items-center justify-between bg-white shadow h-[10vh]">
      <LeftHeader />
    </div>
  );
};

// Left Header

const LeftHeader = () => {
  const [hasFocus, setHasFocus] = useState(false);
  const [input, setInput] = useState("");

  const handleSearch = (e) => {
      if (e && e.code === "Enter") {
        const search = input;
      setHasFocus(false);
      setInput("");
      console.log(search);
    }
  };
  return (
    <div className="flex items-center gap-2 lg:w-3/12 h-full">
      <img
        src="https://cdn-icons-png.flaticon.com/128/4494/4494464.png"
        className="w-10 h-10 rounded-full"
      />
      <div
        className={`flex bg-gray-100 rounded-full pl-2 transition ${
          hasFocus && "ring-1 ring-indigo-400"
        }`}
      >
        <MagnifyingGlassIcon
          className={`w-6 z-[1000] text-gray-600 ${hasFocus && "hidden"}`}
        />
        <input
          type="text"
          className="bg-gray-100 px-1 text-gray-600 py-2 rounded-full focus:outline-none text-sm w-full"
          placeholder="Search..."
          onFocus={() => setHasFocus(true)}
          onBlur={() => {
            setHasFocus(false);
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => handleSearch(e)}
        />
      </div>
    </div>
  );
};

export default Header;
