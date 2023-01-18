import React, { useEffect, useState } from "react";
import Post from "./Post";
import { client } from "../client";
import { fetchPosts } from "../utils/queries";
import { useStateContext } from "../context/StateContext";
import Spinner from "./Spinner";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { loading, setLoading } = useStateContext();

  useEffect(() => {
    setLoading(true);
    client
      .fetch(fetchPosts)
      .then((data) => {
        setPosts(data);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="w-full flex flex-col items-center">
      {loading && <Spinner />}
      {posts?.map((post) => (
        <Post key={post?._id} {...post} />
      ))}
    </div>
  );
};

export default Posts;
