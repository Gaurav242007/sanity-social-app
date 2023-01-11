import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { client, urlFor } from "../client";
import { useStateContext } from "../context/StateContext";
import { v4 as uuidv4 } from "uuid";

// Icons
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/solid";
import Spinner from "../components/Spinner";

const Login = () => {
  const { user } = useStateContext();
  const router = useRouter();
  useEffect(() => {
    if (user) router.push("/");
  }, [router, user]);

  const [loginMode, setLoginMode] = useState(false);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);
  const { loading, setLoading } = useStateContext();

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
    if (username && email && imageAsset?._id) {
      setLoading(true);
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
          setLoading(false);
          console.log(doc)
          localStorage.setItem(
              'user', 
                JSON.stringify({
                ...doc, image: urlFor(doc.image.width(200).url)
              })
          )
          router.push("/", { replace: true });
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <div>
      <Head>
        <title>{loginMode ? 'Login' : 'Sign up'}</title>
        <link
          rel="icon"
          href="https://cdn-icons-png.flaticon.com/128/4494/4494464.png"
        />
      </Head>

      <div className="flex items-center justify-center w-full h-auto flex-col">
        <img
          src="https://cdn-icons-png.flaticon.com/128/4494/4494464.png"
          className="w-10 h-10 rounded-full my-2"
        />
        <p className="text-4xl uppercase font-bold mb-4">{loginMode ? 'Login' : 'Signup'}</p>
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
        <div className="w-80 h-80 my-10">
          {loading && <Spinner />}

          {!email ||
            !imageAsset?._id ||
            (!username && (
              <p className="text-xl text-red-500">
                Please fill all the fields.
              </p>
            ))}

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
        <button
          onClick={() => saveUser()}
          disabled={!username && !imageAsset?._id && !email}
          className="px-4 py-2 active:scale-105 transition rounded-full text-xl mb-6 bg-indigo-300 hover:bg-indigo-400 text-white"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Login;
