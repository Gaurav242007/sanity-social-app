import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import EmojiPicker from "emoji-picker-react";
import { useRef } from "react";
import { useState } from "react";
import { useStateContext } from "../context/StateContext";

const ChatInput = () => {
  const [emojiBar, setEmojiBar] = useState(false);
  const { user } = useStateContext();
  const [input, setInput] = useState();
  const inputRef = useRef();
  return (
    <div className="flex items-center w-full px-4">
      {emojiBar && (
        <div className="absolute bottom-16">
          <EmojiPicker className="z-[100]" />
        </div>
      )}
      <FaceSmileIcon
        className="menu-icon text-yellow-400 hover:bg-yellow-50"
        onClick={() => setEmojiBar(!emojiBar)}
        onEmojiClick={(e) => {
          console.log(e)
          setInput(input.concat(e.emoji));
          inputRef.current.focus();
        }}
      />
      <input
        className="input flex-1"
        onClick={() => setEmojiBar(false)}
        placeholder={`Message, ${user?.username}`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <PaperAirplaneIcon className="menu-icon text-blue-400 hover:bg-blue-50" />
    </div>
  );
};

export default ChatInput;
