import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useStateContext } from "../context/StateContext";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import {
  BuildingStorefrontIcon,
  HomeIcon,
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

// Left Header

const LeftHeader = () => {
  const [hasFocus, setHasFocus] = useState(false);
  const [input, setInput] = useState("");
  const { isMobile } = useStateContext();
  const router = useRouter();

  const handleSearch = (e) => {
    if (e && e.code === "Enter") {
      const search = input;
      setHasFocus(false);
      setInput("");
      console.log(search);
    }
  };
  return (
    <div className={`flex items-center gap-2 w-4/12 h-full`}>
      <img
        src="https://cdn-icons-png.flaticon.com/128/4494/4494464.png"
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={() => router.push("/")}
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

const CenterHeader = () => {
  const { activeMenu, setActiveMenu } = useStateContext();

  
  const CenterHeaderIcons = [
    {
      name: "Home",
      icon: <HomeIcon className="menu-icon text-blue-400 hover:bg-blue-50" />,
      activeIcon: <ActiveHomeIcon className="menu-icon text-blue-400" />,
      onClick: () => {
        router.push('/')
      },
    },
    {
      name: "Videos",
      icon: (
        <VideoCameraIcon className="menu-icon text-violet-400 hover:bg-violet-50" />
      ),
      activeIcon: (
        <ActiveVideoCameraIcon className="menu-icon text-violet-400" />
      ),
      onClick: () => {
        router.push('/videos')
      },
    },
    {
      name: "Shops",
      icon: (
        <BuildingStorefrontIcon className="menu-icon w-8 h-8 text-green-400 hover:bg-green-50" />
      ),
      activeIcon: (
        <ActiveBuildingStorefrontIcon className="menu-icon text-green-400" />
      ),
      onClick: () => {
        router.push('/shops')
      },
    },
    {
      name: "Groups",
      icon: (
        <UserGroupIcon className="menu-icon text-red-400 hover:bg-red-50" />
      ),
      activeIcon: <ActiveUserGroupIcon className="menu-icon text-red-400" />,
      onClick: () => {
        router.push('/groups')
      },
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

  return (
    <div className="flex items-center justify-between lg:w-4/12 h-full ">
      {CenterHeaderIcons?.map((icon) => (
        <span
          key={icon.name}
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
  const { RightHeaderIcons } = useStateContext();
  return (
    <div className="flex items-center justify-around ml-10 lg:w-3/12">
      {RightHeaderIcons?.map((element) => (
        <span
          onClick={element.onClick}
          key={element.name}
          className="hover:bg-gray-100 rounded-full"
        >
          {element.element}
        </span>
      ))}
    </div>
  );
};

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

export default Header;
