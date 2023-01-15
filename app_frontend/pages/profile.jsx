import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Head from "next/head";
import { useStateContext } from "../context/StateContext";
import { useRouter } from "next/router";
import { urlFor } from "../client";
import Banner from "../components/Profile/Banner";

const profile = () => {
  const { user, setUser } = useStateContext();
  const router = useRouter();

  useEffect(() => {
    const saveUser = () => {
      const userDetails = JSON.parse(localStorage.getItem("user"));
      const photoURL = urlFor(JSON.parse(localStorage.getItem("user"))?.image)
        ?.width(200)
        ?.url();
      const bannerImageURL = urlFor(
        JSON.parse(localStorage.getItem("user"))?.bannerImage
      )
        ?.width(200)
        ?.url();

      setUser({ ...userDetails, photoURL, bannerImageURL });
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...userDetails,
          photoURL,
        })
      );
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
        <Banner user={user} />
      </div>
    </div>
  );
};

export default profile;
