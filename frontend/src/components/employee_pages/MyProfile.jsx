import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../services/API";

function MyProfile({ employee, setEmployees, setLgShow }) {
  const [employeeDetails, setEmployeeDetails] = useState({
    userId: employee.userId,
    firstName: employee.firstName,
    lastName: employee.lastName,
    phoneNumber: employee.phoneNumber,
    email: employee.email,
    dateOfBirth: employee.employeeDetails.dateOfBirth,
    hireDate: employee.employeeDetails.hireDate,
    departmentId: employee.departmentDetails.departmentId,
    designationId: employee.designationDetails.designationId,
    role: employee.role,
    gender: employee.employeeDetails.gender,
    address: employee.employeeDetails.address,
    password: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails({ ...employeeDetails, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(employeeDetails);
    API.put("/profile/update", employeeDetails)

      .then((response) => {
        console.log(response.data);
        setLgShow(false);
        toast.success("Updated successfully!");
      })
      .catch((error) => {
        toast.error("Update Failed!");
        console.error("There was an error updating the employee!", error);
      });
  };

  return (
    <>
      <form className="space-y-4" onSubmit={submitHandler}>
        <div className="flex flex-col sm:flex-row justify-between sm:space-x-4 space-y-4 sm:space-y-0">
          <div className="flex flex-col w-full">
            <label className="mb-1">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={employeeDetails.firstName}
              onChange={handleInputs}
              placeholder="Enter First Name"
              className="p-2 border-2 border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="mb-1">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={employeeDetails.lastName}
              onChange={handleInputs}
              placeholder="Enter Last Name"
              className="p-2 border-2 border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between sm:space-x-4 space-y-4 sm:space-y-0">
          <div className="flex flex-col w-full">
            <label className="mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={employeeDetails.email}
              onChange={handleInputs}
              placeholder="Enter Email"
              className="p-2 border-2 border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="mb-1">Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={employeeDetails.phoneNumber}
              onChange={handleInputs}
              placeholder="Enter Phone Number"
              className="p-2 border-2 border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between sm:space-x-4 space-y-4 sm:space-y-0">
          <div className="flex flex-col w-full">
            <label className="mb-1">New Password :</label>
            <input
              type="password"
              placeholder="Enter New Password"
              className="p-2 border-2 border-gray-300 rounded-md w-full"
              name="password"
              onChange={handleInputs}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="mb-1">Confirm New Password:</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Enter Confirm Password"
              className="p-2 border-2 border-gray-300 rounded-md"
              onChange={handleInputs}
              required
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between sm:space-x-4 space-y-4 sm:space-y-0">
          <div className="flex flex-col w-full">
            <label className="mb-1">Gender:</label>
            <select
              name="gender"
              value={employeeDetails.gender}
              onChange={handleInputs}
              className="p-2 border-2 border-gray-300 rounded-md w-full"
              required
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label className="mb-1">Role:</label>
            <select
              name="role"
              value={employeeDetails.role}
              onChange={handleInputs}
              className="p-2 border-2 border-gray-300 rounded-md w-full bg-gray-200 text-red-500"
              required
              disabled
            >
              <option value="">Select Role</option>
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between sm:space-x-4 space-y-4 sm:space-y-0">
          <div className="flex flex-col w-full">
            <label className="mb-1">Department:</label>
            <input
              value={employee.departmentDetails.departmentName}
              readOnly
              className="p-2 border-2 border-gray-300 rounded-md bg-gray-200 text-red-500"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="mb-1">Designation:</label>
            <input
              value={employee.designationDetails.designationName}
              className="p-2 border-2 border-gray-300 rounded-md bg-gray-200 text-red-500"
              disabled
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between sm:space-x-4 space-y-4 sm:space-y-0">
          <div className="flex flex-col w-full">
            <label className="mb-1">Date of Birth:</label>
            <input
              type="date"
              name="dateOfBirth"
              value={employeeDetails.dateOfBirth}
              onChange={handleInputs}
              className="p-2 border-2 border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="mb-1">Hire Date:</label>
            <input
              type="date"
              name="hireDate"
              value={employeeDetails.hireDate}
              onChange={handleInputs}
              className="p-2 border-2 border-gray-300 rounded-md w-full bg-gray-200 text-red-500"
              required
              disabled
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between sm:space-x-4 space-y-4 sm:space-y-0">
          <div className="flex flex-col w-full">
            <label className="mb-1">Address :</label>
            <textarea
              name="address"
              value={employeeDetails.address}
              onChange={handleInputs}
              placeholder="Enter Address"
              rows={2}
              maxLength={100} // Set maximum character limit
              className="p-2 border-2 border-gray-300 rounded-md w-full"
              required
            />
            <p className="text-sm text-gray-500">
              {(employeeDetails.address && employeeDetails.address.length) || 0}{" "}
              / 100 characters
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-main1 text-white px-4 py-2 rounded-md hover:blur-4 transition duration-200"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
}

export default MyProfile;
