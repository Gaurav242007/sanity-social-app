import React from "react";
import { useStateContext } from "../context/StateContext";

const CreatePost = () => {
  const { user } = useStateContext();
  return (
    <div className="w-full flex flex-col justify-center shadow-sm my-2 bg-white p-2 rounded-xl">
      <div className="flex items-center w-full">
        <img
          src={user?.photoURL || `https://source.unsplash.com/random/?human`}
          className="menu-icon w-10 h-10"
        />
        <input
          className="input text-sm ring-0 focus:ring-1 flex-1"
          placeholder={`What's on your mind, ${user?.username}?`}
        />
      </div>
      <div className="w-full px-4 flex items-center">
        <span className="flex items-center gap-2 w-4/12 hover:bg-gray-100 transition cursor-pointer p-2 rounded-xl">
          <img
            src="https://cdn-icons-png.flaticon.com/128/3792/3792702.png"
            className="w-4 h-4"
          />
          <span className="font-semibold text-sm text-gray-600">
            Image/Video
          </span>
        </span>
        <span className="flex items-center gap-2 w-4/12 hover:bg-gray-100 transition cursor-pointer p-2 rounded-xl">
          <img
            src="https://cdn-icons-png.flaticon.com/128/747/747968.png"
            className="w-4 h-4"
          />
          <span className="font-semibold text-sm text-gray-600">
            Tag Friends
          </span>
        </span>
        <span className="flex items-center gap-2 w-4/12 hover:bg-gray-100 transition cursor-pointer p-2 rounded-xl">
          <img
            src="https://cdn-icons-png.flaticon.com/128/2274/2274543.png"
            className="w-4 h-4"
          />
          <span className="font-semibold text-sm text-gray-600">
            Feeling/Activity
          </span>
        </span>
      </div>
    </div>
  );
};

export default CreatePost;
