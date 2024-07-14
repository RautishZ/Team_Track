import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import API from "../../services/API";
import { useNavigate } from "react-router-dom";
import maleProfileImage from "../../assets/ProfileImage/m3.jpg";
import femaleProfileImage from "../../assets/ProfileImage/f2.jpg";
import { useSelector } from "react-redux";

function MyTeams() {
  const userDetails = useSelector((state) => state.employee.employee);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await API.get(
          `department/allusers/${userDetails.departmentDetails.departmentId}`
        );
        console.log("Employees:", response.data);

        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const departmentHead = employees.find(
    (employee) =>
      userDetails.departmentDetails.employee != null &&
      userDetails.departmentDetails.employee.employeeId === employee.userId
  );

  // Remove department head from employees list
  const filteredEmployees = employees.filter(
    (employee) => employee.userId !== departmentHead?.userId
  );

  return (
    <div className="m-2 sm:mx-10 sm:px-10">
      <div className="bg-main1 rounded-md text-white p-4 m-3">
        <div className="text-center">
          <div className="text-xl font-bold inline-block">Department ID :</div>
          <div className="text-xl inline-block ml-2">
            {userDetails.departmentDetails.departmentId}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold inline-block">
            Department Name :
          </div>
          <div className="text-xl inline-block ml-2">
            {userDetails.departmentDetails.departmentName}
          </div>
        </div>
      </div>

      {departmentHead && (
        <div className="  flex flex-row items-center justify-center p-3  min-w-full  mb-3">
          <div className="w-[800px] shadow-md py-3 px-2 border-2 rounded-lg">
            <h5 className="bg-main2 text-center p-1 rounded-md w-full">
              Department Head
            </h5>

            <div className=" text-center w-full">
              <div className="mt-2 flex flex-col items-center sm:flex-row sm:justify-around sm:items-start ">
                <div className="mb-3">
                  <div className="bg-main2 w-32 h-32 rounded-full outline-none shadow-md ">
                    <img
                      src={
                        departmentHead.gender === "MALE"
                          ? maleProfileImage
                          : femaleProfileImage
                      }
                      className="rounded-full outline-none "
                      alt="Profile"
                    />
                  </div>

                  <h5 className="font-bold text-lg ">
                    {departmentHead.firstName + " " + departmentHead.lastName}
                  </h5>
                  <div className="bg-[#b39ddd] px-2 py-1 mt-2 rounded-md">
                    {departmentHead.designationName || "Not Assigned"}
                  </div>
                </div>

                <div className=" w-full pt-3 sm:w-2/4 flex flex-col justify-start items-center sm:items-start  border-t-2  sm:border-0">
                  <div className="mb-1">
                    <h6 className="text-sm">
                      Employee ID: {departmentHead.userId}
                    </h6>
                  </div>
                  <div className="mb-1">
                    <h6 className="text-sm">Email: {departmentHead.email}</h6>
                  </div>
                  <div>
                    <h6 className="text-sm">
                      Phone: {departmentHead.phoneNumber}
                    </h6>
                  </div>
                  <div>
                    <h6 className="text-sm">Gender: {departmentHead.gender}</h6>
                  </div>
                  <div>
                    <h6 className="text-sm">
                      DOB: {departmentHead.dateOfBirth}
                    </h6>
                  </div>
                  <div>
                    <h6 className="text-sm">
                      {" "}
                      Member Since: {departmentHead.hireDate}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
        {filteredEmployees.map((employee, index) => (
          <div
            key={index}
            className="max-w-[500px] bg-white shadow-md flex flex-col group items-center border-2 justify-center p-3 w-full rounded-md relative"
          >
            <div className="bg-main2 w-32 h-32 rounded-full outline-none shadow-md ">
              <img
                src={
                  employee.gender === "MALE"
                    ? maleProfileImage
                    : femaleProfileImage
                }
                className="rounded-full outline-none "
                alt="Profile"
              />
            </div>

            <div className="mt-2 text-center">
              <h5 className="font-bold text-lg">
                {employee.firstName + " " + employee.lastName}
              </h5>
              <div className="bg-[#b39ddd] px-2 py-1 mt-2 rounded-md">
                {employee.designationName || "Not Assigned"}
              </div>
              <div className="border-t mt-2 pt-2">
                <div className="mb-1">
                  <h6 className="text-sm">Employee ID: {employee.userId}</h6>
                </div>
                <div className="mb-1">
                  <h6 className="text-sm">Email: {employee.email}</h6>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyTeams;
