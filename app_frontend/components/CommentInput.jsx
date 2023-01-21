import { useState, useRef } from "react";
import {
  FaceSmileIcon,
  LinkIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import EmojiPicker from "emoji-picker-react";
import { client } from "../client";
import { useStateContext } from "../context/StateContext";
import { useRouter } from "next/router";
import {v4 as uuidv4} from 'uuid';

const CommentInput = () => {
  const [emojiBar, setEmojiBar] = useState(false);
  const { user, setChatLoading, comments, setComments } = useStateContext();
  const [link, setLink] = useState("");
  const [isLink, setIsLink] = useState(false);
  const [image, setImage] = useState("");
  const [input, setInput] = useState("");
  const [wrongImageType, setWrongImageType] = useState(false);
  const {query } = useRouter();
  const {post} = query;
  
  const imageRef = useRef();

  const handleSend = () => {
    if (input || image || link) {
      setChatLoading(true);
      const textToSend = input;
      setInput("");

      const imageDoc = {
        _type: "comment",
        username: user?.username,
        userImage: user?.photoURL,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: image?._id,
          },
        },
        link: link,
        userId: user?._id,
        _key: uuidv4(),
        message: textToSend,
        timestamp: new Date()
      };
      const doc = {
        _type: "comment",
        userImage: user?.photoURL,
        username: user?.username,
        link: link,
        userId: user?._id,
        message: textToSend,
        _key: uuidv4(),
        timestamp: new Date()
      };
      client
        .patch(post)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', image ?[{...imageDoc}] : [{...doc}])
        .commit()
        .then((data) => {
        setComments(data?.comments);
        setChatLoading(false);
        setImage(null);
        setLink('');
        setIsLink(false)
        });
    }
  };

  const uploadImage = () => {
    const selectedFile = imageRef.current?.files[0];
    // uploading asset to sanity
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/svg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/tiff"
    ) {
      setWrongImageType(false);
      setChatLoading(true);
      client.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document) => {
          setImage(document);
          setChatLoading(false);
        })
        .catch((error) => {
          console.log("Upload failed:", error.message);
        });
    } else {
      setChatLoading(false);
      alert("wront file type");
    }
  };
  return (
    <div className="flex items-center w-full px-4">
      {emojiBar && (
        <div className="absolute bottom-16">
          <EmojiPicker
            className="z-[100]"
            onEmojiClick={(e) => {
              setInput(input.concat(e.emoji));
            }}
          />
        </div>
      )}
      <FaceSmileIcon
        className="menu-icon text-yellow-400 hover:bg-yellow-50"
        onClick={() => {
          setEmojiBar(!emojiBar);
          setIsLink(false);
        }}
      />
      <LinkIcon
        className="menu-icon text-purple-400 hover:bg-purple-50"
        onClick={() => {
          setIsLink(!isLink);
          setEmojiBar(false);
        }}
      />
      <PhotoIcon className="menu-icon text-blue-400 hover:bg-blue-50" onClick={() => imageRef.current.click()} />
      <input
        type="file"
        onChange={uploadImage}
        ref={imageRef}
        className="w-0 h-0"
      />
      <input
        className="input flex-1"
        onClick={() => {
          setEmojiBar(false);
          setIsLink(false);
        }}
        placeholder={`Comment, ${user?.username}`}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {isLink && (
        <div className="absolute bottom-14 left-8 w-[350px] bg-white flex rounded-md z-[1000]">
          <input
            className="input rounded-md flex-1 bg-gray-100 m-2 ring-0 text-blue-500"
            onClick={() => setEmojiBar(false)}
            placeholder={"ex. http://www:example.com"}
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          {link.length !== 0 && (
            <XMarkIcon
              onClick={() => setLink("")}
              className="menu-icon text-gray-500 hover:bg-gray-50 absolute -top-2 -right-2 hover:text-gray-600 transition w-6 h-6 bg-gray-100"
            />
          )}
        </div>
      )}
      {image?._id && (
        <div className="absolute bottom-14 left-8 w-14 flex rounded-md">
          <img
            className="flex-1 m-2 ring-0 rounded-full object-contain"
            src={image?.url}
          />
          {image && (
            <XMarkIcon
              onClick={() => setImage("")}
              className="menu-icon text-gray-500 hover:bg-gray-50 absolute -top-0 -right-6 hover:text-gray-600 transition w-6 h-6 bg-gray-100"
            />
          )}
        </div>
      )}
      <PaperAirplaneIcon
        className={`menu-icon text-blue-400 hover:bg-blue-50 ${
          input.trim().length === 0 && "opacity-60"
        }`}
        onClick={handleSend}
      />
    </div>
  );
};

export default CommentInput;
