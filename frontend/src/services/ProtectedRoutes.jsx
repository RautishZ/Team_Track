import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const role = useSelector((state) => state.employee.employee.role);

const ProtectedRoute = ({ children, allowedRoles }) => {
  if (role == allowedRoles) {
    return toast.info("You are Not Allowed");
  }

  return children;
};

export default ProtectedRoute;
