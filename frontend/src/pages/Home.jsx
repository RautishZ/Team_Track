import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const userDetails = useSelector((state) => state.employee.employee);
  const navigate = useNavigate();

  console.log(userDetails);
  useEffect(() => {
    if (userDetails.role === "ADMIN") {
      navigate("/admin");
    } else if (userDetails.role === "EMPLOYEE") {
      navigate("/employee");
    } else {
      navigate("/login");
    }
  }, [userDetails, navigate]);

  return null;
}

export default Home;
