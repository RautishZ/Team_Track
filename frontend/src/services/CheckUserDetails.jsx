import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "./API";
import { setEmployeeDetails } from "../components/api/store/features/employeeSlice";

function CheckUserDetails({ children }) {
  const userDetails = useSelector((state) => state.employee.employee);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await API.get("/userdetails");
        console.log(response.data);
        dispatch(setEmployeeDetails(response.data));
      } catch (error) {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    if (!userDetails || !userDetails.userId) {
      fetchUserDetails();
    } else {
      setLoading(false);
    }
  }, [userDetails, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userDetails || !userDetails.userId) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default CheckUserDetails;
