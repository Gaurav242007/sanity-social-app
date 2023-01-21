import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { client } from "../client";
import {fetchComments} from '../utils/queries';
import { useStateContext } from "../context/StateContext";
import Message from "./Message";
import Spinner from "./Spinner";

const Comments = () => {
  const {query} = useRouter();
  const { comments, setComments,commentsLoading, setCommentsLoading } =
    useStateContext();
    const {post} = query;
  const bottomRef = useRef();
  const router = useRouter();

  useEffect(() => {
    setCommentsLoading(true);
    const query = fetchComments(post)
    client.fetch(query).then((data) => {
      setComments(data[0]?.comments);
      setCommentsLoading(false);
    }).catch(err => {
      console.log(err)
      router.push('/');
    });
  }, [post]);

  useEffect(() => {
    // 👇️ scroll to bottom every time comments change
    bottomRef.current?.scrollIntoView();
  }, [comments]);
  return (
    <div className="w-full h-[80vh] py-4 scrollbar flex-col">
      {comments?.map((message) => (
        <Message key={message?._key} {...message} />
      ))}
      <div ref={bottomRef}></div>
      {commentsLoading && (
        <div className="fixed flex w-full h-full items-center justify-center">
          <Spinner />
        </div>
      )} 
    </div>
  );
};

export default Comments;
