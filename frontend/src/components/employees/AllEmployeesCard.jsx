import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import API from "../../services/API";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import maleProfileImage from "../../assets/ProfileImage/m3.jpg";
import femaleProfileImage from "../../assets/ProfileImage/f2.jpg";

import UpdateEmployee from "./updateEmployee";

function AllEmployees({ employees, setEmployees }) {
  const [lgShow, setLgShow] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const openUpdateModal = (employee) => {
    setSelectedEmployee(employee);
    setLgShow(true);
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await API.get("/admin/employee/getall");
        console.log(response.data);
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees data:", error);
      }
    };

    fetchEmployees();
  }, [setEmployees]);

  return (
    <div className="m-2 sm:mx-10 sm:px-10">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
        {employees.map((employee, index) => (
          <div
            key={index}
            className="max-w-[500px] bg-white shadow-md flex flex-col group items-center border-2 justify-center p-3 w-full rounded-md relative hover:border-main1 cursor-pointer"
            onClick={() => openUpdateModal(employee)} // Open modal on click
          >
            <div className="w-full relative">
              <FaRegEdit className="text-2xl text-main1 group-hover:scale-110 absolute -right-3 -top-3" />
            </div>
            <div className="bg-main2 w-32 h-32 rounded-full outline-none shadow-md">
              <img
                src={
                  employee.employeeDetails.gender === "MALE"
                    ? maleProfileImage
                    : femaleProfileImage
                }
                className="rounded-full outline-none cursor-pointer"
                alt="Profile"
              />
            </div>
            <div>
              <h5 className="pt-2">
                {employee.firstName + " " + employee.lastName}
              </h5>
            </div>
            <div>
              <h6 className="bg-[#b39ddd] p-2 rounded-md">
                {(employee.designationDetails &&
                  employee.designationDetails.designationName) ||
                  "Not Assigned"}
              </h6>
            </div>
            <div>
              <h6 className="p-2 rounded-md whitespace-nowrap">
                Employee ID : {employee.userId}
              </h6>
            </div>
            <div>
              <h6 className="p-2 rounded-md whitespace-nowrap">
                Email : {employee.email}
              </h6>
            </div>
            <div>
              <h6 className="p-2 rounded-md whitespace-nowrap">
                Phone : {employee.phoneNumber}
              </h6>
            </div>
          </div>
        ))}
      </div>

      {/* UpdateEmployee Modal */}
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <h1 className="text-2xl text-center w-full">Update Employee</h1>
        </Modal.Header>
        <Modal.Body>
          {selectedEmployee && (
            <UpdateEmployee
              employee={selectedEmployee}
              setEmployees={setEmployees}
              setLgShow={setLgShow}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AllEmployees;
