import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests) || []; // Ensure requests is always an array

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };
  const reviewRequests = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
      console.log(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
    console.log(requests);
  }, []);

  if (requests.length === 0)
    return (
      <h2 className="text-4xl font-extrabold mb-8 text-center text-red-500 uppercase tracking-wide">
        No Requests
      </h2>
    );

  return (
    <div className="w-full max-w-5xl p-8 bg-base-100 shadow-2xl rounded-3xl mx-auto flex flex-col items-center min-h-[80vh] pb-16">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-primary uppercase tracking-wide">
        Connection Requests
      </h2>
      <div className="flex flex-col space-y-6 w-full">
        {requests.map((req) => (
          <div
            key={req._id}
            className="card bg-gradient-to-r from-base-200 to-base-300 shadow-lg p-6 rounded-2xl w-full flex flex-col sm:flex-row sm:items-center gap-6 hover:shadow-purple-500 transition-all duration-300 transform hover:scale-105"
          >
            <figure className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-primary shadow-lg flex-shrink-0 mx-auto sm:mx-0">
              <img
                src={req.fromUserId.photoUrl}
                alt={req.fromUserId.firstName}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-secondary capitalize">
                {req.fromUserId.firstName} {req.fromUserId.lastName}
              </h3>
              <p className="text-sm sm:text-md text-gray-700 italic mt-2">
                {req.fromUserId.about}
              </p>
              <p className="text-sm sm:text-md text-gray-500 mt-2">
                Age: <span className="font-semibold">{req.fromUserId.age}</span>
              </p>
            </div>
            <div className="flex flex-row justify-center sm:flex-col gap-2 mt-4 sm:mt-0 sm:ml-auto">
              <button
                onClick={() => reviewRequests("accepted", req._id)}
                className="px-4 sm:px-6 py-2 bg-secondary text-white rounded-full shadow-md hover:bg-secondary-dark transition-all transform hover:scale-110"
              >
                Accept
              </button>
              <button
                onClick={() => reviewRequests("rejected", req._id)}
                className="px-4 sm:px-6 py-2 bg-gray-500 text-white rounded-full shadow-md hover:bg-gray-600 transition-all transform hover:scale-110"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
