import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "../components/Header";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../client";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const Home = () => {
  const { user, setUser } = useStateContext();
  const router = useRouter();

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
        <title>Sanity Social App</title>
        <link
          rel="icon"
          href="https://cdn-icons-png.flaticon.com/128/4494/4494464.png"
        />
      </Head>
      <div>
        <Header />
        {user?.photoURL}
        {user?.username}
      </div>

      <PlusCircleIcon className="menu-icon w-12 h-12 bg-white fixed bottom-4 right-10" />
    </div>
  );
};

export default Home;
