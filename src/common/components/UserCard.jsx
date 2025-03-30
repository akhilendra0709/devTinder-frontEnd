import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../../utils/feedSlice";

const UserCard = ({ data }) => {
  const dispatch = useDispatch();
  if (!data) return null;

  const { _id, firstName, lastName, age, gender, about, photoUrl } = data;
  const capitalize = (str) => (str ? str[0].toUpperCase() + str.slice(1) : "");

  const handleSendRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(_id));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-2xl rounded-3xl p-10 w-full max-w-lg sm:max-w-lg md:max-w-lg lg:max-w-lg transform hover:scale-105 transition-all duration-300">
        <div className="flex flex-col items-center text-center">
          <img
            src={photoUrl || "/default-avatar.png"}
            alt={firstName}
            className="w-40 h-40 rounded-full border-4 border-secondary shadow-md"
          />
          <h2 className="mt-6 text-3xl font-bold break-words max-w-full px-4">
            {capitalize(firstName)} {capitalize(lastName)}
          </h2>
          <p className="text-lg text-gray-200 mt-2">
            {capitalize(gender)}, {age} years old
          </p>
          <p className="text-lg text-gray-300 mt-4 px-6">
            {about || "No information provided"}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <button
              onClick={() => handleSendRequest("ignored", _id)}
              className="px-8 py-3 bg-primary text-white rounded-full shadow-md hover:bg-gray-600 transition-all transform hover:scale-110"
            >
              Ignore
            </button>
            <button
              onClick={() => handleSendRequest("interested", _id)}
              className="px-8 py-3 bg-secondary text-white rounded-full shadow-md hover:bg-secondary-dark transition-all transform hover:scale-110"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
