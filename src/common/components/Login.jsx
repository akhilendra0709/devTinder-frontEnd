import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice.js";
import { useNavigate } from "react-router";
import { BASE_URL } from "../../utils/constants";
import { Slide, toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { emailId, password },
        { withCredentials: true }
      );
      toast.success(res?.data?.message, {
        position: "top-center",
        autoClose: 1500,
        transition: Slide,
      });
      dispatch(addUser(res?.data?.data));
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      toast.error(error.response?.data?.message || "Login failed", {
        position: "top-center",
      });
    }
    setLoading(false);
  };

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, age, gender, emailId, password },
        { withCredentials: true }
      );
      toast.success(res?.data?.message, {
        position: "top-center",
        autoClose: 1500,
        transition: Slide,
      });
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
      toast.error(error.response?.data?.message || "Signup failed", {
        position: "top-center",
      });
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4 sm:px-0">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl rounded-xl p-6">
        <h2 className="text-3xl font-semibold text-center text-secondary">
          {isLogin ? "Login" : "Signup"}
        </h2>
        <div className="card-body">
          {!isLogin && (
            <>
              <label className="form-control w-full">
                <span className="label-text">First Name</span>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full"
                  aria-label="First Name"
                />
              </label>
              <label className="form-control w-full">
                <span className="label-text">Last Name</span>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full"
                  aria-label="Last Name"
                />
              </label>
              <label className="form-control w-full">
                <span className="label-text">Age</span>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input input-bordered w-full"
                  aria-label="Age"
                />
              </label>
              <label className="form-control w-full">
                <span className="label-text">Gender</span>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="select select-bordered w-full"
                  aria-label="Gender"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </label>
            </>
          )}
          <label className="form-control w-full">
            <span className="label-text">Email</span>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              aria-label="Email"
            />
          </label>
          <label className="form-control w-full relative">
            <span className="label-text">Password</span>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full pr-12"
                aria-label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 top-1/2 transform -translate-y-1/2 text-primary text-xl"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
          </label>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            className="btn btn-primary w-full mt-2"
            onClick={isLogin ? handleLogin : handleSignup}
            disabled={loading}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Signup"}
          </button>
          <div className="text-center mt-4">
            <a href="#" className="text-sm text-primary hover:underline mb-1">
              Forgot password?
            </a>
            <p
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-secondary hover:underline cursor-pointer mt-1"
            >
              {isLogin
                ? "Don't have an account? Signup"
                : "Existing User? Login Here"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
