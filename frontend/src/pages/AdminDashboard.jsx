import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import CheckLoginStatus from "../services/CheckLoginStatus";
import SideBar from "../components/SideBar";

function AdminDashboard() {
  const [open, setOpen] = useState(false);
  return (
    <CheckLoginStatus>
      <div className="bg-[#F9FBFD] h-screen">
        <NavBar open={open} setOpen={setOpen}></NavBar>

        <div className="flex flex-row">
          <div>
            <SideBar open={open} setOpen={setOpen}></SideBar>
          </div>

          <div className="w-full mt-[75px] p-3 ">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </CheckLoginStatus>
  );
}

export default AdminDashboard;
