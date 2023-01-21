import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Header from "../../components/Header";
import { useStateContext } from "../../context/StateContext";
import { urlFor } from "../../client";
import CommentInput from "../../components/CommentInput";

// English.
import Comments from "../../components/Comments";
import ChatInput from "../../components/ChatInput";

const App = () => {
  const { setUser, user } = useStateContext();
  const router = useRouter();

  useEffect(() => {
    const saveUser = () => {
      const userDetails = JSON.parse(localStorage.getItem("user"));
      const photoURL = urlFor(JSON.parse(localStorage.getItem("user"))?.image)
        ?.width(200)
        ?.url();
      setUser({ ...userDetails, photoURL });
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...userDetails,
          photoURL,
        })
      );
    };
  }, [router]);

  return (
    <div>
      <Head>
        <title>Comments</title>
        <link
          rel="icon"
          href="https://cdn-icons-png.flaticon.com/128/4494/4494464.png"
        />
      </Head>
      <div>
        <Header />
        <Comments />
        {user && 
        <CommentInput />
        }
      </div>
    </div>
  );
};

export default App;
