import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { client, urlFor } from "../client";
import { useStateContext } from "../context/StateContext";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";

// Icons
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import Spinner from "../components/Spinner";
import { fetchLoginUser, fetchUsers } from "../utils/queries";
import Alert from "../components/Alert";

const Login = () => {
  const { user } = useStateContext();
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("user") !== null) router.push("/");
  }, [router]);

  const [loginMode, setLoginMode] = useState(true);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [fields, setFields] = useState(true);
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);
  const { loading, setLoading } = useStateContext();
  const [alert, setAlert] = useState("");

  const uploadImage = (e) => {
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
          setImageAsset(document);
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

  const saveUser = () => {
    if (username && email && imageAsset?._id && validator.isEmail(email)) {
      setLoading(true);
      client.fetch(fetchUsers).then((data) => {
        const signup_user = data.filter(
          (user) => user?.username === username || user?.email === email
        );
        if (signup_user.length !== 0) {
          // User did sign up

          setAlert("account_already_exist");
          setTimeout(() => {
            setAlert("");
          }, 2000);
        } else {
          // User has not sign up yet
          const doc = {
            _type: "user",
            _id: uuidv4(),
            username,
            email,
            image: {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: imageAsset?._id,
              },
            },
          };

          client
            .createIfNotExists(doc)
            .then(() => {
              localStorage.setItem("user", JSON.stringify(doc));
              router.push('/profile');
              window.location.reload();
            })
            .catch((e) => console.log(e));
        }
      });
      setLoading(false);
    } else {
      setFields(false);

      setTimeout(() => {
        setFields(true);
      }, 2000);
    }
  };

  const handleLogin = () => {
    if (username && email && validator.isEmail(email)) {
      setLoading(true);
      client
        .fetch(fetchUsers)
        .then((data) => {
          const signup_user = data.filter(
            (user) => user?.username === username && user?.email === email
          );
          if (signup_user.length !== 0) {
            // User did sign up
            const query = fetchLoginUser(username, email);
            client.fetch(query).then((data) => {
              localStorage.setItem("user", JSON.stringify(data));
              console.log(data);
              console.log(query);
              router.push('/profile');
              window.location.reload();
            });
          } else {
            // User has not sign up yet
            setAlert("account_not_found");
            setTimeout(() => {
              setAlert("");
            }, 2000);
          }
        })
        .catch((e) => console.log(e));
      setLoading(false);
    } else {
      setFields(false);

      setTimeout(() => {
        setFields(true);
      }, 2000);
    }
  };
  return (
    <div>
      <Head>
        <title>{loginMode ? "Login" : "Sign up"}</title>
        <link
          rel="icon"
          href="https://cdn-icons-png.flaticon.com/128/4494/4494464.png"
        />
      </Head>
      {alert == "account_not_found" && (
        <Alert message="No user found with the credentials. Please Signup" />
      )}
      {alert == "account_already_exist" && (
        <Alert message="A user already registered with that email. Try difference one or Login?" />
      )}

      <div className="flex items-center justify-center w-full h-auto flex-col">
        <img
          src="https://cdn-icons-png.flaticon.com/128/4494/4494464.png"
          className="w-10 h-10 rounded-full my-2"
        />
        <p className="text-4xl uppercase font-bold mb-4">
          {loginMode ? "Login" : "Signup"}
        </p>
        <input
          type="text"
          className="input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!fields && (
          <p className="text-xl text-red-500">
            Please fill all the fields correctly.
          </p>
        )}
        {loading && <Spinner />}

        {!loginMode && (
          <div className="w-80 h-80 my-10">
            {wrongImageType && (
              <p className="text-xl text-red-500">It&apos;s wrong file type.</p>
            )}
            {!imageAsset ? (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <CloudArrowUpIcon className="w-6 h-6 text-gray-700" />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>

                  <p className="mt-32 text-gray-700">
                    Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or
                    TIFF less than 20MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="uploaded-pic"
                  className="h-full w-full"
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
        )}

        <button
          onClick={() => (loginMode ? handleLogin() : saveUser())}
          className="px-4 py-2 active:scale-105 transition rounded-full text-xl mb-6 bg-indigo-300 hover:bg-indigo-400 text-white"
        >
          {loginMode ? "Login" : "Sign up"}
        </button>

        {loginMode ? (
          <p className="text-sm text-center">
            Not have an account yet?{" "}
            <span
              className="font-bold text-blue-400 cursor-pointer"
              onClick={() => setLoginMode(false)}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="text-sm text-center">
            Already have an account?{" "}
            <span
              className="font-bold text-blue-400 cursor-pointer"
              onClick={() => setLoginMode(true)}
            >
              Login
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
