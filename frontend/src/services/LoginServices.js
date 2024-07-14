import axios from "axios";
import { setLoginState } from "../components/api/store/features/loginSlice";


export const login = (userDetail, dispatch) => async () => {
  try {
    const response = await axios.post("http://localhost:8080/login", userDetail);

    if (response.data.token) {

      dispatch(setLoginState(true));
      localStorage.setItem("token", response.data.token);
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
