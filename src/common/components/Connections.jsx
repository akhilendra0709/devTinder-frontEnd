import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (connections.length === 0)
    return (
      <h2 className="text-4xl font-extrabold mb-8 text-center text-red-500 uppercase tracking-wide">
        No Connections
      </h2>
    );
  return (
    <div className="w-full max-w-5xl p-8 bg-base-100 shadow-2xl rounded-3xl mx-auto flex flex-col items-center min-h-[80vh] pb-16">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-primary uppercase tracking-wide">
        Your Connections
      </h2>
      <div className="flex flex-col space-y-6 w-full">
        {connections.map((conn) => (
          <div
            key={conn._id}
            className="card bg-gradient-to-r from-base-200 to-base-300 shadow-lg p-6 rounded-2xl w-full flex flex-col sm:flex-row sm:items-center gap-6 hover:shadow-purple-500 transition-all duration-300 transform hover:scale-105"
          >
            <figure className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-primary shadow-lg flex-shrink-0 mx-auto sm:mx-0">
              <img
                src={conn.photoUrl}
                alt={conn.firstName}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-secondary capitalize">
                {conn.firstName} {conn.lastName}
              </h3>
              <p className="text-sm sm:text-md text-gray-700 italic mt-2">
                {conn.about}
              </p>
              <p className="text-sm sm:text-md text-gray-500 mt-2">
                Age: <span className="font-semibold">{conn.age}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
