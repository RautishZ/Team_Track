import AdminMenu from "./AdminMenu";

import { useSelector } from "react-redux";
import EmployeeMenu from "./EmployeeMenu";

function SideBar({ open, setOpen }) {
  const userDetails = useSelector((state) => state.employee.employee);
  return (
    <div
      className={`fixed lg:relative shrink-0 top-0 left-0 h-full w-[250px] mt-[60px] z-40 transition-transform duration-300 ${
        open ? "translate-x-0 bg-main1" : "translate-x-full hidden"
      }`}
    >
      <div className="relative h-full bg-main1 w-[250px]">
        <div className="sticky top-[60px]">
          {userDetails.role === "ADMIN" && (
            <AdminMenu open={open} setOpen={setOpen} />
          )}
          {userDetails.role === "EMPLOYEE" && (
            <EmployeeMenu open={open} setOpen={setOpen} />
          )}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
