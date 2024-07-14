import MyLeavePage from "../components/employee_pages/MyLeavePage";
import Employee from "../components/admin_pages/ManageEmployeePage";
import Department from "../components/admin_pages/ManageDepartmentPage";
import Designation from "../components/admin_pages/ManageDesignationPage";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import EmployeeDashboard from "../pages/EmployeeDashboard";
import CheckUserDetails from "./CheckUserDetails";
import EmployeeDashboardPage from "../components/employee_pages/EmployeeDashboardPage";
import MyAttendance from "../components/employee_pages/MyAttendance";
import MannageLeavePage from "../components/admin_pages/MannageLeavePage";
import MyTeams from "../components/employee_pages/MyTeams";
import MannageAttendance from "../components/admin_pages/MannageAttendance";
import AdminDashboardPage from "../components/admin_pages/AdminDashboardPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <CheckUserDetails>
        <Home></Home>
      </CheckUserDetails>
    ),
  },

  {
    path: "/login",

    element: <Login></Login>,
  },
  {
    path: "/admin",

    element: (
      <CheckUserDetails>
        <AdminDashboard></AdminDashboard>
      </CheckUserDetails>
    ),
    children: [
      {
        path: "",
        element: <AdminDashboardPage></AdminDashboardPage>,
      },
      {
        path: "leaves",
        element: <MannageLeavePage></MannageLeavePage>,
      },
      {
        path: "employee",
        element: <Employee></Employee>,
      },
      {
        path: "department",
        element: <Department></Department>,
      },
      {
        path: "Designation",
        element: <Designation></Designation>,
      },
      {
        path: "mannageattendance",
        element: <MannageAttendance></MannageAttendance>,
      },
    ],
  },

  {
    path: "/employee",
    element: (
      <CheckUserDetails>
        <EmployeeDashboard></EmployeeDashboard>
      </CheckUserDetails>
    ),

    children: [
      {
        path: "",
        element: <EmployeeDashboardPage></EmployeeDashboardPage>,
      },
      {
        path: "leaves",
        element: <MyLeavePage></MyLeavePage>,
      },
      {
        path: "attendance",
        element: <MyAttendance> </MyAttendance>,
      },

      {
        path: "myteams",
        element: <MyTeams> </MyTeams>,
      },
    ],
  },
]);

export { router };
