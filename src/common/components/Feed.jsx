import { BASE_URL } from "../../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../utils/feedSlice.js";
import axios from "axios";
import { useEffect } from "react";
import UserCard from "./UserCard.jsx";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  const getFeed = async () => {
    try {
      // if (feed) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log({ data: res?.data?.data });

      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFeed();
    console.log(feed);
  }, []);
  if (!feed) return;
  if (feed.length === 0) {
    return (
      <h2 className="text-4xl font-extrabold mb-8 text-center text-teal-500 uppercase tracking-wide">
        No New Users
      </h2>
    );
  }
  return (
    <div className="flex justify-center my-10">
      <UserCard data={feed?.[0]} />
    </div>
  );
};
export default Feed;
