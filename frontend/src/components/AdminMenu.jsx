import React from "react";
import { FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function AdminMenu({ open, setOpen }) {
  return (
    <div className="">
      <ul className="list-none p-0">
        <div className="px-3 py-2">
          <li className="w-full my-1">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `w-full py-2 pl-4 no-underline flex items-center rounded-md text-lg text-white ${
                  isActive ? "bg-main2-400 shadow-md" : " hover:bg-main1-700"
                }`
              }
              onClick={() => {
                setOpen(!open);
              }}
            >
              <FaHome className="mr-2" /> Dashboard
            </NavLink>
          </li>

          <li className="w-full my-1">
            <NavLink
              to="/admin/leaves"
              className={({ isActive }) =>
                `w-full py-2 pl-4 no-underline flex items-center rounded-md text-lg text-white ${
                  isActive ? "bg-main2-400 shadow-md" : " hover:bg-main1-700"
                }`
              }
              onClick={() => {
                setOpen(!open);
              }}
            >
              <FaHome className="mr-2" /> Manage Leaves
            </NavLink>
          </li>
          <li className="w-full my-1">
            <NavLink
              to="/admin/mannageattendance"
              className={({ isActive }) =>
                `w-full py-2 pl-4 no-underline flex items-center rounded-md text-lg text-white ${
                  isActive ? "bg-main2-400 shadow-md" : " hover:bg-main1-700"
                }`
              }
              onClick={() => {
                setOpen(!open);
              }}
            >
              <FaHome className="mr-2" /> Manage Attendance
            </NavLink>
          </li>

          <li className="w-full my-1">
            <NavLink
              to="/admin/employee"
              className={({ isActive }) =>
                `w-full py-2 pl-4 no-underline flex items-center rounded-md text-lg text-white ${
                  isActive
                    ? "bg-main2-400 shadow-md "
                    : "text-white hover:bg-main1-700"
                }`
              }
              onClick={() => {
                setOpen(!open);
              }}
            >
              <FaHome className="mr-2" />
              Manage Employee
            </NavLink>
          </li>

          <li className="w-full my-1">
            <NavLink
              to="/admin/department"
              className={({ isActive }) =>
                `w-full py-2 pl-4 no-underline flex items-center rounded-md text-lg text-white ${
                  isActive ? "bg-main2-400 shadow-md" : " hover:bg-main1-700 "
                }`
              }
              onClick={() => {
                setOpen(!open);
              }}
            >
              <FaHome className="mr-2" />
              Manage Department
            </NavLink>
          </li>

          <li className="w-full my-1">
            <NavLink
              to="/admin/designation"
              className={({ isActive }) =>
                `w-full py-2 pl-4 no-underline flex items-center rounded-md text-lg text-white ${
                  isActive ? "bg-main2-400 shadow-md" : " hover:bg-main1-700 "
                }`
              }
              onClick={() => {
                setOpen(!open);
              }}
            >
              <FaHome className="mr-2 text-white" />
              Manage Designation
            </NavLink>
          </li>
        </div>
      </ul>
    </div>
  );
}

export default AdminMenu;
