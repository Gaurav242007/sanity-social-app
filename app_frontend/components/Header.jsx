import React, { useState, useEffect } from "react";
import {
  BuildingStorefrontIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  VideoCameraIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as ActiveHomeIcon,
  BuildingStorefrontIcon as ActiveBuildingStorefrontIcon,
  VideoCameraIcon as ActiveVideoCameraIcon,
  UserGroupIcon as ActiveUserGroupIcon,
  NewspaperIcon as ActiveNewsPaperIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  BellIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { useStateContext } from "../context/StateContext";
import Sidebar from './Sidebar';

const Header = () => {
  const { isMobile } = useStateContext();

  return (
    <div className="px-2 flex items-center justify-between bg-white shadow h-[10vh]">
      <LeftHeader />
      {isMobile ? (
        <Sidebar />
      ) : (
        <>
          <CenterHeader />
          <RightHeader />
        </>
      )}
    </div>
  );
};

// Left Header

const LeftHeader = () => {
  const [hasFocus, setHasFocus] = useState(false);
  const [input, setInput] = useState("");
  const { isMobile } = useStateContext();

  const handleSearch = (e) => {
    if (e && e.code === "Enter") {
      const search = input;
      setHasFocus(false);
      setInput("");
      console.log(search);
    }
  };
  return (
    <div className={`flex items-center gap-2 ${isMobile ? 'w-4/12': 'w-10/12'} h-full`}>
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

const CentreIcons = [
  {
    name: "Home",
    icon: <HomeIcon className="menu-icon text-blue-400 hover:bg-blue-50" />,
    activeIcon: <ActiveHomeIcon className="menu-icon text-blue-400" />,
    onClick: () => {},
  },
  {
    name: "Videos",
    icon: (
      <VideoCameraIcon className="menu-icon text-violet-400 hover:bg-violet-50" />
    ),
    activeIcon: <ActiveVideoCameraIcon className="menu-icon text-violet-400" />,
    onClick: () => {},
  },
  {
    name: "Shops",
    icon: (
      <BuildingStorefrontIcon className="menu-icon text-green-400 hover:bg-green-50" />
    ),
    activeIcon: (
      <ActiveBuildingStorefrontIcon className="menu-icon text-green-400" />
    ),
    onClick: () => {},
  },
  {
    name: "Groups",
    icon: <UserGroupIcon className="menu-icon text-red-400 hover:bg-red-50" />,
    activeIcon: <ActiveUserGroupIcon className="menu-icon text-red-400" />,
    onClick: () => {},
  },
  {
    name: "News",
    icon: (
      <NewspaperIcon className="menu-icon  text-cyan-400 hover:bg-cyan-50" />
    ),
    activeIcon: <ActiveNewsPaperIcon className="menu-icon text-cyan-400" />,
    onClick: () => {
      console.log("News");
    },
  },
];

const RightHeaderIcons = [
  {
    element: (
      <div className="flex justify-between gap-2 p-2 cursor-pointer">
        <img
          src="https://cdn-icons-png.flaticon.com/128/4494/4494464.png"
          className="w-6 h- 6hover:scale-105"
        />
        <span className="font-bold">Gaurav</span>
      </div>
    ),
    onClick: () => {},
  },
  {
    element: <ChatBubbleOvalLeftEllipsisIcon className="menu-icon" />,
    onClick: () => {},
  },
  {
    element: <BellIcon className="menu-icon" />,
    onClick: () => {},
  },
  {
    element: <ArrowLeftOnRectangleIcon className="menu-icon" />,
    onClick: () => {},
  },
];

const CenterHeader = () => {
  const { activeMenu, setActiveMenu } = useStateContext();
  return (
    <div className="flex items-center justify-between lg:w-4/12 h-full ">
      {CentreIcons.map((icon) => (
        <span
          onClick={() => {
            icon.onClick();
            setActiveMenu(icon.name);
          }}
        >
          {icon.name === activeMenu ? icon.activeIcon : icon.icon}
        </span>
      ))}
    </div>
  );
};

const RightHeader = () => {
  return (
    <div className="flex items-center justify-around ml-10 lg:w-3/12">
      {RightHeaderIcons.map((element) => (
        <span className="hover:bg-gray-100 rounded-full">
          {element.element}
        </span>
      ))}
    </div>
  );
};


export default Header;
