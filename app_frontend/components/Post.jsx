import React, { useEffect, useState } from "react";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  HandThumbUpIcon,
  EllipsisHorizontalIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  HandThumbUpIcon as ActiveHandThumbUpIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { client, urlFor } from "../client";
import TimeAgo from "javascript-time-ago";
import { useStateContext } from "../context/StateContext";
import { useRouter } from "next/router";
import {v4 as uuidv4} from 'uuid';

const Post = ({
  _id,
  title,
  image,
  _createdAt,
  username,
  userImage,
  comments,
  likes,
}) => {
  const { setLoading, user } = useStateContext();
  const [hasLiked, setHasLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(likes);
  const [isMenu, setIsMenu] = useState(false);
  const timeAgo = new TimeAgo("en-US");
  const router = useRouter();

  const handleDelete = () => {
    client
      .delete(_id)
      .then(() => {
        setLoading(true);
        window.location.reload();
      })
      .catch((e) => console.log(e));
  };

  const handleLike = () => {
    setHasLiked(!hasLiked)
    if(hasLiked){
      // remove the like document 
      client
        .patch(_id)
        .remove('after', 'likes[-1]', [{

        }])
        .commit()
        .then((data) => {
        });
    }
    else {
      // add new like document conatining user id
      
      client
        .patch(_id)
        .setIfMissing({ likes: [] })
        .insert('after', 'likes[-1]', [{
          userId: user?._id,
          _key: uuidv4()
        }])
        .commit()
        .then((data) => {
          
        });
    }
  }

  const handleHasLiked = () => {
    const isLikedByUser = likes.filter(like => like.userId === user?._id);
    setHasLiked(isLikedByUser.length > 0 ? true : false);
  }

  useEffect(() => {
    console.log('likes', likes)
    console.log('numLikes', numLikes)
    handleHasLiked();
  }, [numLikes])

  return (
    <div className="w-full bg-white rounded-md shadow-sm my-2">
      <div className="flex items-center p-2 pb-4">
        <img
          src={userImage || "https://source.unsplash.com/random/?human"}
          className="w-10 h-10 rounded-full cursor-pointer hover:opacity-90"
        />
        <div className="flex items-start justify-center px-2 flex-col w-10/12">
          <span className="font-bold text-sm">{username}</span>
          <span className="text-gray-600 text-sm">
            {timeAgo.format(new Date(_createdAt))}
          </span>
        </div>
        <div>
          <EllipsisHorizontalIcon
            className="hover:bg-gray-100 menu-icon text-gray-700"
            onClick={() => setIsMenu(!isMenu)}
          />
          {user && isMenu && (
            <div className="relative right-16 opacity-90">
              <div className="flex top-2 sm:flex-col flex-row justify-center shadow-sm bg-gray-50 rounded-md p-2 py-2 absolute">
                <div className="flex items-center justify-between p-2 px-2 transition my-1 hover:bg-gray-100 cursor-pointer rounded-xl">
                  <span className="sm:block hidden mr-2 text-sm">Edit</span>
                  <PencilSquareIcon className="menu-icon w-6 h-6 text-blue-400" />
                </div>

                <div
                  onClick={handleDelete}
                  className="flex items-center justify-between p-2 px-2 transition my-1 hover:bg-gray-100 cursor-pointer rounded-xl"
                >
                  <span className="sm:block hidden mr-2 text-sm">Delete</span>
                  <TrashIcon className="menu-icon w-6 h-6 text-red-400" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <span className="px-2 font-semibold">{title}</span>
      <img
        src={urlFor(image).width(800).url()}
        className="object-cover my-2 h-full w-full"
        onClick={() => setIsMenu(false)}
      />
      <div className="my-2 p-2 flex items-center justify-around">
        <span className="flex items-center">
          {hasLiked ? (
            <ActiveHandThumbUpIcon
              onClick={() => handleLike()}
              className="text-red-400 menu-icon hover:bg-red-100"
            />
          ) : (
            <HandThumbUpIcon
              onClick={() => handleLike()}
              className="menu-icon hover:bg-gray-100 text-gray-700"
            />
          )}
          <span>
            {numLikes?.length} {numLikes?.length <= 1 ? "Like" : "Likes"}
          </span>
        </span>
        <span className="flex items-center">
          <ChatBubbleOvalLeftEllipsisIcon onClick={() => router.push(`comments/${_id}`)} className="menu-icon hover:bg-blue-100 text-blue-400" />
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
