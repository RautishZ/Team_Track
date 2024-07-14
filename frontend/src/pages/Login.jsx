import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { login } from "../services/LoginServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { all } from "axios";

function Login() {
  const [loginDetail, setLoginDetail] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      navigate("/");
    } else {
      setIsLoading(false);
    }
  }, [navigate]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setLoginDetail({ ...loginDetail, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(loginDetail, dispatch)();
      navigate("/");
      console.log("Login successful");
      toast.success("Login successful");
    } catch (error) {
      toast.error("Wrong Credentials");
      //setError(error.message);
      console.log(error);
    }

    console.log(loginDetail);
  };

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a spinner or any loading component
  }

  return (
    <div className="bg-main1-300 h-screen w-screen flex justify-center items-center">
      <div className="bg-white p-3 m-2 rounded-md shadow-lg max-w-md w-full">
        <h1 className="text-4xl mb-6 font-semibold text-center text-main1-400">
          Sign in
        </h1>
        <form onSubmit={submitHandler}>
          <div className="mb-8">
            <label
              htmlFor="email"
              className="text-2xl mb-2 block text-main1-400"
            >
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-2xl text-main1-300" />
              <input
                id="email"
                type="text"
                placeholder="Enter Email"
                name="email"
                className="border-b-4 py-2 pl-12 pr-5 rounded-md text-main1-400 font-semibold text-2xl w-full focus:border-main1-500 outline-none"
                onChange={inputHandler}
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="text-2xl mb-2 block text-main1-400"
            >
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-2xl text-main1-300" />
              <input
                id="password"
                type="password"
                placeholder="Enter Password"
                name="password"
                className="border-b-4 py-2 pl-12 pr-5 text-2xl text-main1-400 rounded-md w-full font-semibold focus:border-main1-500 outline-none"
                onChange={inputHandler}
              />
            </div>
          </div>
          {error && (
            <div className="mb-4 text-red-500 text-xl text-center">{error}</div>
          )}
          <button
            type="submit"
            className="bg-main1-500 w-full text-white py-3 px-4 rounded-md text-xl font-bold hover:bg-main1-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
