import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { Slide, toast } from "react-toastify";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setAge(user.age);
    setGender(user.gender);
    setAbout(user.about);
    setPhotoUrl(user.photoUrl);
  }, [user]);

  const handleSubmit = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res?.data);
      dispatch(addUser(res?.data?.data));
      toast.success("Profile Updated Successfully", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
        transition: Slide,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setAge(user.age);
    setGender(user.gender);
    setAbout(user.about);
    setPhotoUrl(user.photoUrl);
    setError("");
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-base-100 p-6 gap-10">
      <div className="w-full max-w-lg bg-base-200 shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-semibold text-center mb-4 text-base-content">
          Edit Profile
        </h2>
        <div className="space-y-4">
          <label className="block">
            <span className="text-base-content font-medium">First Name</span>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-base-100 text-base-content"
              placeholder="Enter your first name"
            />
          </label>

          <label className="block">
            <span className="text-base-content font-medium">Last Name</span>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-base-100 text-base-content"
              placeholder="Enter your last name"
            />
          </label>

          <label className="block">
            <span className="text-base-content font-medium">Age</span>
            <input
              type="number"
              value={age}
              onChange={(e) =>
                setAge(e.target.value ? Number(e.target.value) : "")
              }
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-base-100 text-base-content"
              placeholder="Enter your age"
            />
          </label>

          <label className="block">
            <span className="text-base-content font-medium">Gender</span>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-base-100 text-base-content"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </label>

          <label className="block">
            <span className="text-base-content font-medium">About</span>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-base-100 text-base-content"
              rows="3"
              placeholder="Tell us about yourself"
            ></textarea>
          </label>

          <label className="block">
            <span className="text-base-content font-medium">
              Profile Picture URL
            </span>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 bg-base-100 text-base-content"
              placeholder="Enter your profile picture URL"
            />
          </label>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="flex justify-center gap-4 mt-4">
            <button
              className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-all cursor-pointer"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
            <button
              className="px-6 py-2 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500 transition-all"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      {/* TODO:Add sonner after profile updates */}
      <Card user={{ firstName, lastName, age, gender, about, photoUrl }} />
    </div>
  );
};

export default EditProfile;
