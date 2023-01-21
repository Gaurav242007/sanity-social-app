import { useEffect, useRef, useState } from "react";
import { client } from "../client";
import { useStateContext } from "../context/StateContext";
import { fetchChats } from "../utils/queries";
import Message from "./Message";
import Spinner from "./Spinner";

const Messages = () => {
  const { messages, chatLoading, setMessages, setChatLoading } =
    useStateContext();
  const bottomRef = useRef();

  useEffect(() => {
    setChatLoading(true);
    client.fetch(fetchChats).then((data) => {
      setMessages(data);
      setChatLoading(false);
    });
  }, []);

  useEffect(() => {
    const query = `*[_type == "chat"]`;
    const params = {};
    client.listen(query).subscribe((update) => {
      console.log(update.result);
      setMessages([...messages, update.result]);
      console.log(messages);
    });
  }, []);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView();
  }, [messages]);
  return (
    <div className="w-full h-[80vh] py-4 scrollbar flex-col">
      {messages.map((message) => (
        <Message key={message?._id} {...message} />
      ))}
      <div ref={bottomRef}></div>
      {chatLoading && (
        <div className="fixed flex w-full h-full items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Messages;
