import React, { useState } from "react";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  HandThumbUpIcon,
  EllipsisHorizontalIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { HandThumbUpIcon as ActiveHandThumbUpIcon } from "@heroicons/react/24/solid";
import { urlFor } from "../client";
import TimeAgo from "javascript-time-ago";

const Post = ({ title, image, _createdAt, postedBy, comments, likes }) => {
  const [hasLiked, setHasLiked] = useState(true);
  const timeAgo = new TimeAgo("en-US");
  return (
    <div className="w-full bg-white rounded-md shadow-sm my-2">
      <div className="flex items-center p-2 pb-4">
        <img
          src="https://source.unsplash.com/random/?human"
          className="w-10 h-10 rounded-full cursor-pointer hover:opacity-90"
        />
        <div className="flex items-start justify-center px-2 flex-col w-10/12">
          <span className="font-bold text-sm">{postedBy?.username}</span>
          <span className="text-gray-600 text-sm">
            {timeAgo.format(new Date(_createdAt))}
          </span>
        </div>
        <EllipsisHorizontalIcon className="hover:bg-gray-100 menu-icon text-gray-700" />
      </div>
      <span className="px-2 font-semibold">{title}</span>
      <img
        src={urlFor(image).width(800).url()}
        className="object-cover my-2 h-full w-full"
      />
      <div className="my-2 p-2 flex items-center justify-around">
        <span className="flex items-center">
          {hasLiked ? (
            <ActiveHandThumbUpIcon className="text-red-400 menu-icon hover:bg-red-100" />
          ) : (
            <HandThumbUpIcon className="menu-icon hover:bg-gray-100 text-gray-700" />
          )}
          <span>
            {likes?.length} {likes?.length <= 1 ? "Like" : "Likes"}
          </span>
        </span>
        <span className="flex items-center">
          <ChatBubbleOvalLeftEllipsisIcon className="menu-icon hover:bg-blue-100 text-blue-400" />
          <span>
            {comments?.length} {comments?.length <= 1 ? "Comment" : "Comments"}
          </span>
        </span>
        <span className="flex items-center">
          <ShareIcon className="menu-icon hover:bg-purple-100 text-purple-400" />
          <span>Share</span>
        </span>
      </div>
    </div>
  );
};

export default Post;
