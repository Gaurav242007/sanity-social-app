import React, { useEffect, useState } from "react";
import Post from "./Post";
import { client } from "../client";
import { fetchPosts } from "../utils/queries";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    client
      .fetch(fetchPosts)
      .then((data) => {
        setPosts(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="w-full flex flex-col items-center">
      {posts?.map((post) => (
        <Post key={post?._id} {...post} />
      ))}
    </div>
  );
};

export default Posts;
