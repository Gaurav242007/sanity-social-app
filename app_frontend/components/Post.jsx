import React from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

const Post = () => {
  return (
    <div className="w-full bg-white rounded shadow-sm h-[400px] my-2">
      <div className="flex items-center p-2 pb-4">
        <img
          src="https://source.unsplash.com/random/?human"
          className="w-10 h-10 rounded-full cursor-pointer hover:opacity-90"
        />
        <div className="flex items-start justify-center px-2 flex-col w-10/12">
          <span className="font-bold text-sm">Gaurav</span>
          <span className="text-gray-600 text-sm">11 min</span>
        </div>
        <EllipsisHorizontalIcon className="hover:bg-gray-100 menu-icon text-gray-700" />
      </div>
      <span className="px-2">Hi welcome seem my post 🙂</span>
      <img
        src={`https://source.unsplash.com/random/?nature`}
        className="object-cover my-2 h-auto w-full"
      />
      <div className="my-2 p-2">fajlkfd</div>
    </div>
  );
};

export default Post;
