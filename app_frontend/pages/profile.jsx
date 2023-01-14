import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Head from "next/head";
import { useStateContext } from "../context/StateContext";
import { useRouter } from "next/router";
import { urlFor } from "../client";
import { CameraIcon } from "@heroicons/react/24/solid";

const profile = () => {
  const { user, setUser } = useStateContext();
  const router = useRouter();
  const [hasHovered, setHasHovered] = useState(false);
  const [hasHoveredPhoto, setHasHoveredPhoto] = useState(false);

  useEffect(() => {
    const saveUser = () => {
      const userDetails = JSON.parse(localStorage.getItem("user"));
      const photoURL = urlFor(JSON.parse(localStorage.getItem("user"))?.image)
        ?.width(200)
        ?.url();
      setUser({ ...userDetails, photoURL });
    };
    localStorage.getItem("user") !== null ? saveUser() : router.push("/login");
  }, [router]);

  return (
    <div>
      <Head>
        <title>Profile | {user?.username}</title>
        <link
          rel="icon"
          href="https://cdn-icons-png.flaticon.com/128/4494/4494464.png"
        />
      </Head>
      <div className="w-full h-full">
        <Header />
        <div className="lg:w-8/12 w-full mx-auto">
          <div className="h-[40vh] w-full relative">
            <img
              src={
                user?.banner
                  ? user.banner
                  : `https://source.unsplash.com/random/?nature`
              }
              className={`object-cover h-full w-full ${
                hasHovered && "opacity-60"
              }`}
              alt="profile banner"
            />
            <CameraIcon
              className="menu-icon hover:bg-gray-100/20 text-gray-200 absolute top-4 hover:text-gray-100 left-4"
              onMouseEnter={() => setHasHovered(true)}
              onMouseLeave={() => setHasHovered(false)}
            />
            <div className="w-32 h-32 bg-white rounded-full sticky flex items-center justify-center mx-auto -my-16 z-[100]">
              <img
                src={user?.photoURL}
                className={`cursor-pointer w-28 h-28 rounded-full hover:opacity-60  z-[100] group ${hasHoveredPhoto && "opacity-60"}`}
                onMouseEnter={() => setHasHoveredPhoto(true)}
                onMouseLeave={() => setHasHoveredPhoto(false)}
              />
                <CameraIcon
                className={`font-semibold  z-[10000] text-gray-600 absolute left-12 top-12 menu-icon hover:text-gray-600 ${hasHoveredPhoto ? 'block' :'hidden'}`}
                
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default profile;
