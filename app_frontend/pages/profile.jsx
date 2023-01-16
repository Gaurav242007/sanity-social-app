import Header from "../components/Header";
import Head from "next/head";
import { useStateContext } from "../context/StateContext";
import Banner from "../components/Profile/Banner";

const profile = () => {
  const { user, setUser } = useStateContext(); 
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
