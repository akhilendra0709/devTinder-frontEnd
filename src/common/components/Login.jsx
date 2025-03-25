import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import {useDispatch} from "react-redux";
import {addUser} from "../../utils/userSlice.js";
import {useNavigate} from "react-router";
import {BASE_URL} from "../../utils/constants";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      console.log(res?.data);
      dispatch(addUser(res?.data));
      navigate("/feed");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4 sm:px-0">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl rounded-xl p-6">
        <h2 className="text-3xl font-semibold text-center mb-4 text-base-content">
          Login
        </h2>
        <div className="card-body">
          <label className="form-control w-full">
            <span className="label-text font-medium text-base-content">
              Email
            </span>
            <input
              type="email"
              placeholder="Enter your email"
              value={emailId}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full mt-1 bg-base-200 text-base-content"
            />
          </label>

          <label className="form-control w-full mt-3 relative">
            <span className="label-text font-medium text-base-content">
              Password
            </span>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input input-bordered w-full mt-1 bg-base-200 text-base-content pr-12"
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

          <button className="btn btn-primary w-full mt-5" onClick={handleLogin}>
            Login
          </button>

          <div className="text-center mt-4">
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
