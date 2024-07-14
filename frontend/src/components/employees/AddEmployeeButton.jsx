import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../services/API";

function AddEmployeeButton({ setEmployees }) {
  const [lgShow, setLgShow] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    dateOfBirth: "",
    hireDate: "",
    departmentId: "",
    designationId: "",
    role: "",
    gender: "",
    address: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails({ ...employeeDetails, [name]: value });
    console.log(employeeDetails);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(employeeDetails);
    API.post("/admin/employee/add", employeeDetails)
      .then((response) => {
        console.log(response.data);
        setLgShow(false);

        toast.success("Added successfully!");
        const fetchDesignations = async () => {
          const response = await API.get("/admin/employee/getall");
          console.log(response.data);
          setEmployees(response.data);
        };

        fetchDesignations();
      })
      .catch((error) => {
        toast.error("Adding Failed!");
        console.error("There was an error adding the user!", error);
      });
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await API.get("/admin/department/getall");
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const response = await API.get("/admin/designation/getall");
        setDesignations(response.data);
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    };

    fetchDesignations();
  }, []);

  return (
    <>
      <div className="flex items-center sm:justify-end justify-center">
        <button
          className="bg-main1 text-white rounded-md p-2 mx-5 my-3 w-[200px] right-0 flex items-center justify-center"
          onClick={() => setLgShow(true)}
        >
          <IoMdAddCircleOutline size={20} className="mr-2 bg-transparent" />
          Add Employee
        </button>
      </div>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <h1 className="text-2xl text-center w-full">Add Employee</h1>
        </Modal.Header>
        <Modal.Body>
          <form className="space-y-4" onSubmit={submitHandler}>
            <div className="flex flex-col sm:flex-row justify-between sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="flex flex-col w-full">
                <label className="mb-1">First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  className="p-2 border-2 border-gray-300 rounded-md w-full"
                  onChange={handleInputs}
                  required
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="mb-1">Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter Last Name"
                  className="p-2 border-2 border-gray-300 rounded-md"
                  onChange={handleInputs}
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
                  placeholder="Enter Email"
                  className="p-2 border-2 border-gray-300 rounded-md"
                  onChange={handleInputs}
                  required
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="mb-1">Phone:</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter Phone Number"
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
                  className="p-2 border-2 border-gray-300 rounded-md w-full"
                  onChange={handleInputs}
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div className="flex flex-col w-full">
                <label className="mb-1">Role :</label>
                <select
                  name="role"
                  className="p-2 border-2 border-gray-300 rounded-md w-full"
                  onChange={handleInputs}
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="EMPLOYEE">Employee</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="flex flex-col w-full">
                <label className="mb-1">Password :</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="p-2 border-2 border-gray-300 rounded-md w-full"
                  name="password"
                  onChange={handleInputs}
                  required
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="mb-1">Confirm Password:</label>
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
                <label className="mb-1">Department :</label>
                <select
                  name="departmentId"
                  className="p-2 border-2 border-gray-300 rounded-md w-full"
                  onChange={handleInputs}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  {departments.map((department) => (
                    <option
                      key={department.departmentId}
                      value={department.departmentId}
                    >
                      {department.departmentName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col w-full">
                <label className="mb-1">Designation :</label>
                <select
                  name="designationId"
                  className="p-2 border-2 border-gray-300 rounded-md w-full"
                  onChange={handleInputs}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Designation
                  </option>
                  {designations.map((designation) => (
                    <option
                      key={designation.designationId}
                      value={designation.designationId}
                    >
                      {designation.designationName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="flex flex-col w-full">
                <label className="mb-1">Date Of Birth :</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  className="p-2 border-2 border-gray-300 rounded-md w-full"
                  onChange={handleInputs}
                  required
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="mb-1">Joining Date :</label>
                <input
                  type="date"
                  name="hireDate"
                  className="p-2 border-2 border-gray-300 rounded-md w-full"
                  onChange={handleInputs}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="flex flex-col w-full">
                <label className="mb-1">Address : </label>
                <textarea
                  name="address"
                  onChange={handleInputs}
                  placeholder="Enter Address"
                  rows={2}
                  maxLength={100} // Set maximum character limit
                  className="p-2 border-2 border-gray-300 rounded-md w-full"
                  required
                />
                <p className="text-sm text-gray-500">
                  {(employeeDetails.address &&
                    employeeDetails.address.length) ||
                    0}{" "}
                  / 100 characters
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                className="bg-main1 text-white px-4 py-2 rounded-md hover:blur-4 transition duration-200"
                type="submit"
              >
                Done
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddEmployeeButton;
