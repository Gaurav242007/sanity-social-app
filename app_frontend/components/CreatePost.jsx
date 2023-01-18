import { CloudArrowUpIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useRef, useState, useEffect } from "react";
import { useStateContext } from "../context/StateContext";
import Spinner from "./Spinner";
import { client } from "../client";
import { PaperAirplaneIcon, TrashIcon } from "@heroicons/react/24/solid";

const CreatePost = () => {
  const { user, loading, setLoading } = useStateContext();
  const inputRef = useRef();
  const imageRef = useRef();
  const [input, setInput] = useState("");
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);

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
      setLoading(true);
      client.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Upload failed:", error.message);
        });
    } else {
      setLoading(false);
      alert("wront file type");
    }
  };

  const savePost = () => {
    setLoading(true);
    const doc = {
      _type: "post",
      title: input,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset?._id,
        },
      },
      userId: user?._id,
      postedBy: {
        _type: "user",
        _ref: user?._id,
      },
      comments: [],
      likes: [],
    };

    client
      .create(doc)
      .then(() => {
        window.location.reload();
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="w-full flex flex-col justify-center shadow-sm my-2 bg-white p-2 rounded-xl">
      <div className="flex items-center w-full">
        <img
          src={user?.photoURL || `https://source.unsplash.com/random/?human`}
          className="menu-icon w-10 h-10"
        />
        <input
          className="input text-sm ring-0 focus:ring-1 flex-1"
          onChange={(e) => setInput(e.target.value)}
          placeholder={`What's on your mind, ${user?.username}?`}
          ref={inputRef}
        />
      </div>
      {loading && (
        <div className="mx-auto p-2">
          {" "}
          <Spinner />
        </div>
      )}
      {!imageAsset && (
        <div className="w-full px-4 flex items-center">
          <span
            onClick={() => imageRef.current.click()}
            className="flex items-center gap-2 w-4/12 hover:bg-gray-100 transition cursor-pointer p-2 rounded-xl"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/3792/3792702.png"
              className="w-4 h-4"
            />
            <span className="font-semibold text-sm text-gray-600">
              Image/Video
            </span>
          </span>
          <span className="flex items-center gap-2 w-4/12 hover:bg-gray-100 transition cursor-pointer p-2 rounded-xl">
            <img
              src="https://cdn-icons-png.flaticon.com/128/747/747968.png"
              className="w-4 h-4"
            />
            <span className="font-semibold text-sm text-gray-600">
              Tag Friends
            </span>
          </span>
          <span className="flex items-center gap-2 w-4/12 hover:bg-gray-100 transition cursor-pointer p-2 rounded-xl">
            <img
              src="https://cdn-icons-png.flaticon.com/128/2274/2274543.png"
              className="w-4 h-4"
            />
            <span className="font-semibold text-sm text-gray-600">
              Feeling/Activity
            </span>
          </span>
        </div>
      )}
      <div className="flex items-center  relative justify-center w-full">
        <input
          type="file"
          name="upload-image"
          onChange={uploadImage}
          className="w-0 h-0"
          ref={imageRef}
        />
        {imageAsset && input.trim().length >= 1 && (
          <PaperAirplaneIcon
            onClick={savePost}
            className="menu-icon text-blue-400 absolute right-4 bottom-10 hover:bg-blue-50 w-10 h-10 p-2"
          />
        )}
        {imageAsset && (
          <div className="relative h-full">
            <img
              src={imageAsset?.url}
              alt="uploaded-pic"
              className="h-80 w-80 rounded-md my-2 object-contain"
            />
            <button
              type="button"
              className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
              onClick={() => setImageAsset(null)}
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      <PlusCircleIcon
        className="menu-icon w-12 h-12 bg-white fixed bottom-4 right-10"
        onClick={() => inputRef.current.focus()}
      />
    </div>
  );
};

export default CreatePost;
