import React from "react";
import { useStateContext } from "../context/StateContext";
import TimeAgo from "javascript-time-ago";
import { urlFor } from "../client";
import { useRouter } from "next/router";

const Message = ({
  message,
  userId,
  username,
  _createdAt,
  userImage,
  link,
  image,
  timestamp
}) => {
  const { user } = useStateContext();
  const timeAgo = new TimeAgo("en-US");
  const router = useRouter();

  return user?._id === userId ? (
    <div className="flex items-center ml-auto mr-4 w-60 my-2">
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center w-full justify-between">
          <span className="text-[10px] text-gray-400 font-semibold">
            {username}
          </span>
          <span className="text-[10px] text-gray-400 font-semibold">
            {timeAgo?.format(new Date(_createdAt || timestamp))}
          </span>
        </div>
        <div className="w-full bg-purple-600 text-white p-2 pr-4 rounded-l-md m-2 rounded-t-md">
          {message}
          {link && (
            <>
              <br />
              <a target="_blank" className="text-blue-200 w-full" href={link}>
                {link.length > 15 ? `${link.slice(0, 15)}...` : link}
              </a>
            </>
          )}
          {image && (
            <>
              <br />
              <img
                src={urlFor(image).width(200).url()}
                className="my-2 rounded cursor-pointer hover:opacity-90 transition w-full h-auto object-contain"
              />
            </>
          )}
        </div>
      </div>

      <img src={userImage} className="menu-icon w-12 h-12 mt-8" onClick={() => router.push("/profile")} />
    </div>
  ) : (
    <div className="flex items-center mr-4 w-60 my-2">
      <img src={userImage} className="menu-icon w-12 h-12 mt-8" />
      <div className="flex flex-col items-center w-full">
        <div className="flex items-center w-full justify-between">
          <span className="text-[10px] text-gray-400 font-semibold">
            {username}
          </span>
          <span className="text-[10px] text-gray-400 font-semibold">
            {timeAgo?.format(new Date(_createdAt || timestamp))}
          </span>
        </div>
        <div className="w-full bg-white/70 text-gray-700 p-2 pr-4 rounded-r-md m-2 rounded-t-md">
          {message}
          {link && (
            <>
              <br />
              <a target="_blank" className="text-blue-500 w-full" href={link}>
                {link.length > 15 ? `${link.slice(0, 15)}...` : link}
              </a>
            </>
          )}
          {image && (
            <>
              <br />
              <img
                src={urlFor(image).width(200).url()}
                className="my-2 rounded cursor-pointer hover:opacity-90 transition w-full h-auto object-contain"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
