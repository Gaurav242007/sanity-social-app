import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "../components/Header";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../client";
import Home from '../components/Home';

const App = () => {
  const { user, setUser } = useStateContext();
  const router = useRouter();

  useEffect(() => {
    const saveUser = () => {
      const userDetails = JSON.parse(localStorage.getItem("user"));
      const photoURL = urlFor(JSON.parse(localStorage.getItem("user"))?.image)
        ?.width(200)
        ?.url();
        setUser({ ...userDetails, photoURL });
        localStorage.setItem("user", JSON.stringify({
          ...userDetails, photoURL
        }));
        
      };
      localStorage.getItem("user") !== null ? saveUser() : router.push("/login");
  }, [router]);

  return (
    <div>
      <Head>
        <title>Social App</title>
        <link
          rel="icon"
          href="https://cdn-icons-png.flaticon.com/128/4494/4494464.png"
        />
      </Head>
      <div>
        <Header />
        <Home />
      </div>
    </div>
  );
};

export default App;
