import React, { useEffect, useState } from "react";
import Post from "./Post";
import { client } from "../client";
import { fetchPosts, fetchSearchPosts } from "../utils/queries";
import Spinner from "./Spinner";
import { useStateContext } from "../context/StateContext";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { searchString } = useStateContext();

  useEffect(() => {
    setLoading(true);
    if (searchString) {
      setLoading(true)
      const query = fetchSearchPosts(searchString);
      console.log(query)
      client.fetch(query).then((data) => {
        setPosts(data);
      });
      setLoading(false)
    } else {
      client
        .fetch(fetchPosts)
        .then((data) => {
          setPosts(data);
          setLoading(false);
          console.log(data);
        })
        .catch((err) => console.log(err));
    }
  }, [searchString]);
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
