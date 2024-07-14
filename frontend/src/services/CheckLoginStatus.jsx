import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setLoginState } from "../components/api/store/features/loginSlice";

const CheckLoginStatus = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setLoginState(true));
    }
  }, [dispatch]);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default CheckLoginStatus;
