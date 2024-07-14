import React, { useState, useEffect, useRef } from "react";
import { FiMenu } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { setEmployeeDetails } from "./api/store/features/employeeSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import maleProfileImage from "../assets/ProfileImage/m3.jpg";
import femaleProfileImage from "../assets/ProfileImage/f2.jpg";
import MyProfile from "./employee_pages/MyProfile";
import Modal from "react-bootstrap/Modal";

function NavBar({ open, setOpen }) {
  const dispatch = useDispatch();
  const [profileOpen, setProfileOpen] = useState(false);
  const userDetails = useSelector((state) => state.employee.employee);
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);
  const [lgShow, setLgShow] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const toggleMenu = () => {
    setProfileOpen(!profileOpen);
  };

  const handleClickOutside = (event) => {
    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(event.target)
    ) {
      setProfileOpen(false);
    }
  };

  useEffect(() => {
    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen]);

  const openProfileModal = (employee) => {
    setProfileOpen(false);
    setSelectedEmployee(employee);
    setLgShow(true);
  };

  return (
    <div>
      {/* Top Menu Bar */}
      <div className="bg-main1 shadow-lg fixed top-0 w-screen h-[60px] flex items-center justify-between px-5 z-50">
        <FiMenu
          className="text-main2 rounded-full text-3xl cursor-pointer"
          onClick={() => setOpen(!open)}
        />

        <div className="flex flex-row items-center">
          <div className="mr-3">
            <div className="text-md font-bold text-white">
              {userDetails.firstName} {userDetails.lastName}
            </div>
            <div className="text-xs text-white">
              {userDetails.designationDetails.designationName}
            </div>
          </div>

          <div ref={profileMenuRef} className="relative">
            <img
              src={
                userDetails.gender === "MALE"
                  ? maleProfileImage
                  : femaleProfileImage
              }
              className=" rounded-full w-[40px] outline-none cursor-pointer"
              onClick={toggleMenu}
              alt="Profile"
            />

            {profileOpen && (
              <div className="font-semibold shadow-xl w-[200px] absolute top-[50px] right-1 bg-main2-500 p-3 rounded-lg outline-none">
                <div className="text-md text-center">
                  Employee ID: {userDetails.userId}
                </div>

                <hr className="my-1 p-0" />
                <div
                  className="p-2 hover:bg-gray-300 rounded-md cursor-pointer"
                  onClick={() => openProfileModal(userDetails)}
                >
                  My Profile
                </div>
                <div
                  className="p-2 hover:bg-gray-300 rounded-md cursor-pointer"
                  onClick={() => {
                    localStorage.removeItem("token");
                    dispatch(setEmployeeDetails({}));
                    navigate("/login");
                    toast.success("Logout successful");
                  }}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for MyProfile */}
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <h1 className="text-2xl text-center w-full">My Profile</h1>
        </Modal.Header>
        <Modal.Body>
          {selectedEmployee && (
            <MyProfile
              employee={selectedEmployee}
              setEmployees={null} // Pass your setEmployees function here
              setLgShow={setLgShow}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default NavBar;
