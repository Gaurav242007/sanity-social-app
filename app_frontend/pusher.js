import Pusher from "pusher";
import ClientPusher from "pusher-js";

const pusher = new Pusher({
  appId: "1540257",
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.NEXT_PUBLIC_PUSHER_SECRET,
  cluster: "ap2",
  useTLS: true,
});

export const clientPusher = new ClientPusher(
  process.env.NEXT_PUBLIC_PUSHER_KEY,
  {
    cluster: "ap2",
  }
);
