import React, { useState } from "react";
import { CameraIcon } from "@heroicons/react/24/solid";
import { useStateContext } from "../../context/StateContext";
import { client } from "../../client";
import { useRef } from "react";

const Banner = ({ user }) => {
  const { loading, setLoading, setUser } = useStateContext();
  const [hasHovered, setHasHovered] = useState(false);
  const [hasHoveredPhoto, setHasHoveredPhoto] = useState(false);
  const [wrongImageType, setWrongImageType] = useState(false);
  const imageRef = useRef();
  const bannerRef = useRef();

  const [bannerImage, setBannerImage] = useState(
    user?.bannerImageURL
      ? user.bannerImageURL
      : `https://source.unsplash.com/random/?nature`
  );
  const [profileImage, setProfileImage] = useState(user?.photoURL);

  const saveProfileImage = (e) => {
    const selectedFile = e.target.files[0];
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
          setProfileImage(document?.url);
          setUser({ ...user, photoURL: document?.url });
          client
            .patch(user?._id) // Document ID to patch
            .set({
              image: {
                _type: "image",
                asset: {
                  _type: "reference",
                  _ref: document?._id,
                },
              },
            }) // Shallow merge
            .commit() // Perform the patch and return a promise
            .then((updatedUser) => {
              localStorage.setItem(
                "user",
                JSON.stringify({
                  ...updatedUser,
                  photoURL: document?.url,
                })
              );
            })
            .catch((err) => {
              console.error(err.message);
            });
          setLoading(false);
        })

        .catch((error) => {
          console.log("Upload failed:", error.message);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

  const saveBannerImage = (e) => {
    console.log("uploading...");
    const selectedFile = e.target.files[0];
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
          setBannerImage(document?.url);
          setUser({ ...user, bannerImageURL: document?.url });
          client
            .patch(user?._id) // Document ID to patch
            .set({
              bannerImage: {
                _type: "image",
                asset: {
                  _type: "reference",
                  _ref: document?._id,
                },
              },
            }) // Shallow merge
            .commit() // Perform the patch and return a promise
            .then((updatedUser) => {
              localStorage.setItem(
                "user",
                JSON.stringify({
                  ...updatedUser,
                  bannerImageURL: document?.url,
                })
              );
            })
            .catch((err) => {
              console.error(err.message);
            });
          console.log(document);
          setLoading(false);
        })

        .catch((error) => {
          console.log("Upload failed:", error.message);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };
  return (
    <div>
      <div className="lg:w-8/12 w-full mx-auto">
        <div className="h-[40vh] w-full relative">
          <img
            src={bannerImage}
            className={`object-cover h-full w-full ${
              hasHovered ? "opacity-60" : "opacity-90"
            }`}
            alt="profile banner"
          />
          <input
            type="file"
            className="w-0 h-0"
            onChange={saveBannerImage}
            ref={bannerRef}
          />
          <CameraIcon
            className="menu-icon hover:bg-gray-100/20 text-gray-200 absolute top-4 hover:text-gray-100 left-4"
            onMouseEnter={() => setHasHovered(true)}
            onMouseLeave={() => setHasHovered(false)}
            onClick={() => bannerRef.current.click()}
          />
          <div className="w-32 h-32 bg-white rounded-full sticky flex items-center justify-center left-8 lg:mx-auto -my-16 z-[100]">
            <img
              src={profileImage}
              className={`cursor-pointer w-28 h-28 rounded-full hover:opacity-60  z-[100] group ${
                hasHoveredPhoto && "opacity-60"
              }`}
              onClick={() => imageRef.current.click()}
              onMouseEnter={() => setHasHoveredPhoto(true)}
              onMouseLeave={() => setHasHoveredPhoto(false)}
            />
            <input
              type="file"
              className="w-0 h-0"
              onChange={saveProfileImage}
              ref={imageRef}
            />
            <CameraIcon
              className={`font-semibold  z-[10000] text-gray-600 absolute left-12 top-12 menu-icon hover:text-gray-600 ${
                hasHoveredPhoto ? "block" : "hidden"
              }`}
            />
          </div>
          <div className="w-32 h-32 sticky flex items-center justify-center left-56 lg:mx-auto lg:-my-56 -my-44 z-[100]">
            <p className="font-bold text-2xl text-white">{user?.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
