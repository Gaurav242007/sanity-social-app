import { useRouter } from "next/router";
import { useState, useContext, createContext, useEffect } from "react";
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

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Home");
  const [activeSidebar, setActiveSidebar] = useState("Home");
  const [width, setWidth] = useState();
  const router = useRouter();
  const [isNotificationBar, setIsNotificationBar] = useState(false);
  const [searchString, setSearchString] = useState('');

  // Chats
  const [messages, setMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 1025;

  const CenterHeaderIcons = [
    {
      name: "Home",
      icon: <HomeIcon className="menu-icon text-blue-400 hover:bg-blue-50" />,
      activeIcon: <ActiveHomeIcon className="menu-icon text-blue-400" />,
      onClick: () => {
        router.push("/");
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
        router.push("/videos");
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
        router.push("/shops");
      },
    },
    {
      name: "Groups",
      icon: (
        <UserGroupIcon className="menu-icon text-red-400 hover:bg-red-50" />
      ),
      activeIcon: <ActiveUserGroupIcon className="menu-icon text-red-400" />,
      onClick: () => {
        router.push("/groups");
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

  const RightHeaderIcons = [
    {
      element: (
        <div className="flex justify-between gap-2 p-2 cursor-pointer">
          <img
            src={
              user?.photoURL ||
              "https://cdn-icons-png.flaticon.com/128/4494/4494464.png"
            }
            className="w-6 h- 6hover:scale-105 rounded-full"
          />
          <span className="font-bold text-sm">{user?.username}</span>
        </div>
      ),
      onClick: () => {
        router.push("/profile");
      },
      name: "Profile",
    },
    {
      element: <ChatBubbleOvalLeftEllipsisIcon className="menu-icon" />,
      onClick: () => {
        router.push("/chats");
      },
      name: "Chats",
    },
    {
      element: <BellIcon className="menu-icon" />,
      onClick: () => {
        setIsNotificationBar(!isNotificationBar);
      },
      name: "Notifications",
    },
    {
      element: <ArrowLeftOnRectangleIcon className="menu-icon" />,
      onClick: () => {
        router.push("/login");
        localStorage.clear();
      },
      name: "Signout",
    },
  ];

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        activeMenu,
        setActiveMenu,
        isMobile,
        activeSidebar,
        setActiveSidebar,
        CenterHeaderIcons,
        RightHeaderIcons,
        isNotificationBar,
        setIsNotificationBar,
        messages,
        setMessages,
        chatLoading,
        setChatLoading,
        searchString,
        setSearchString
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
