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
      if (feed) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFeed();
    console.log(feed);
  }, []);

  return (
    <div className="flex justify-center my-10">
      <UserCard data={feed} />
    </div>
  );
};
export default Feed;
