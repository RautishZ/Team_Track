import API from "./API";
import { setEmployeeDetails } from "../components/api/store/features/employeeSlice";
import { useDispatch } from "react-redux";


const RefreshUserDetails = async () => {
  const dispatch = useDispatch();
  try {
    const response = await API.get("/userdetails");
    console.log(response.data);
    dispatch(setEmployeeDetails(response.data));
  } catch (error) {
    console.log(error.message);
  }
};

export default RefreshUserDetails;
