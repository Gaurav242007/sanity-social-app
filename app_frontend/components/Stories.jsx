import React, { useState, useEffect } from "react";
import { useStateContext } from "../context/StateContext";
import { PlusIcon } from "@heroicons/react/24/outline";
import { client , urlFor} from "../client";
import { fetchUsers } from "../utils/queries";

const Stories = () => {
  const { user } = useStateContext();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    client
      .fetch(fetchUsers)
      .then((data) => {
        setUsers(data.filter(currentUser => currentUser.username !== user?.username));
        console.log(data.filter(currentUser => currentUser.username !== user?.username));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="flex my-2 items-center w-full h-44 scrollbar overflow-x-scroll overflow-y-hidden">
      <div className="w-28 h-44 relative m-2 shadow-sm">
        <img
          src={user?.photoURL || `https://source.unsplash.com/random/?human`}
          className="opacity-90 hover:opacity-70 transition cursor-pointer object-cover rounded-xl w-full h-full "
        />
        <PlusIcon className="menu-icon hover:shadow-md absolute left-4 top-4 border-2 border-white rounded-full bg-gray-700 text-white font-bold" />
        <span className="absolute bottom-4 text-sm left-4 text-white">
          Add to Story
        </span>
      </div>
      {users?.map((user) => (
        <div className="w-28 h-44 relative m-2 shadow-sm" key={user?._id}>
          <img
            src={`https://source.unsplash.com/random/?background`}
            className="opacity-90 hover:opacity-70 transition cursor-pointer object-cover rounded-xl w-full h-full "
          />
          <img src={urlFor(user?.image).width(200).url()} className="menu-icon w-10 h-10 hover:shadow-md absolute left-4 top-4 border-2 border-white rounded-full bg-white text-white font-bold" />
          <span className="absolute bottom-4 text-sm left-4 text-white">
            {user?.username}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
