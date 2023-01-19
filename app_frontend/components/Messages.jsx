import { useEffect, useState } from "react";
import { client } from "../client";
import { useStateContext } from "../context/StateContext";
import { fetchChats } from "../utils/queries";
import Message from "./Message";
import Spinner from "./Spinner";

const Messages = () => {
  const { messages, chatLoading, setMessages, setChatLoading } =
    useStateContext();

  useEffect(() => {
    setChatLoading(true);
    client.fetch(fetchChats).then((data) => {
      setMessages(data);
      setChatLoading(false);
    });
  }, []);
  return (
    <div className="w-full h-[80vh] py-4 scrollbar flex-col">
      {messages.map((message) => (
        <Message key={message?._id} {...message} />
      ))}
      {chatLoading && (
        <div className="fixed flex w-full h-full items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Messages;
