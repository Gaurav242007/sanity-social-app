import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "../components/Header";
import { useStateContext } from "../context/StateContext";

const Home = () => {
  const {user} = useStateContext();
  const router = useRouter();

  useEffect(() => {
    if(!user) router.push('/login')
  }, [router, user])
  return (
    <div>
      <Head>
        <title>Sanity Social App</title>
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/128/4494/4494464.png" />
      </Head>
      <div>
        <Header />
      </div>
    </div>
  );
};

export default Home;
