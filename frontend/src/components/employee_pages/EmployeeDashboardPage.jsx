import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import API from "../../services/API";
import maleProfileImage from "../../assets/ProfileImage/m3.jpg";
import femaleProfileImage from "../../assets/ProfileImage/f2.jpg";

function EmployeeDashboardPage() {
  const [departmentHead, setDepartmentHead] = useState({});
  const [data, setData] = useState({
    totalTeamMembers: 0,
    attendanceStatus: 0,
    leavesApproved: 0,
    leavesPending: 0,
    leavesRejected: 0,
    totalPresentDays: 0,
    totalAbsentDays: 0,
    totalLeaveDays: 0,
    totalLateDays: 0,
  });
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.employee.employee);

  useEffect(() => {
    if (userDetails?.userId) {
      API.get(`/employee/dashboard/${userDetails.userId}`)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [userDetails]);

  useEffect(() => {
    if (userDetails?.departmentDetails?.employee?.employeeId) {
      API.get(
        `/departmentHead/${userDetails.departmentDetails.employee.employeeId}`
      )
        .then((response) => {
          console.log(response.data);
          setDepartmentHead(response.data);
        })
        .catch((error) => {
          console.error("Error fetching department head:", error);
        });
    }
  }, [userDetails]);

  const cards1 = [
    {
      title: "Team Members",
      count: data.totalTeamMembers,
      gradient: "bg-gradient-to-r from-indigo-500 to-blue-500",
      route: "/employee/myteams",
    },
    {
      title: "Today's Attendance",
      count: data.attendanceStatus || "Not Marked",
      gradient: "bg-gradient-to-r from-green-500 to-teal-500",
      route: "/employee/attendance",
    },
  ];
  const cards2 = [
    {
      title: "Attendance Status",
      count: {
        "Total Days":
          data.totalPresentDays +
          data.totalAbsentDays +
          data.totalLeaveDays +
          data.totalLateDays,
        Present: data.totalPresentDays,
        Absent: data.totalAbsentDays,
        "On Leave": data.totalLeaveDays,
        Late: data.totalLateDays,
      },
      gradient: "bg-gradient-to-r from-red-500 to-orange-500",
      route: "/employee/attendance",
    },
    {
      title: "Leaves Status",
      count: {
        approved: data.leavesApproved,
        pending: data.leavesPending,
        rejected: data.leavesRejected,
      },
      gradient: "bg-gradient-to-r from-red-500 to-orange-500",
      route: "/employee/leaves",
    },
  ];

  return (
    <div>
      <div className="flex flex-row items-center flex-wrap">
        {cards1.map((card, index) => (
          <div
            key={index}
            className={`flex items-center justify-center min-h-[120px] shadow-lg ${card.gradient} rounded-lg p-3 m-2 md:p-4 md:m-5 text-white flex-1 cursor-pointer`}
            onClick={() => navigate(card.route)}
          >
            <div className="flex flex-col items-center justify-between">
              <h3 className="text-lg text-center whitespace-nowrap">
                {card.title}
              </h3>
              {typeof card.count === "object" ? (
                Object.keys(card.count).map((key) => (
                  <h2
                    key={key}
                    className="text-sm text-center"
                  >{`${key}: ${card.count[key]}`}</h2>
                ))
              ) : (
                <h2 className="text-sm text-center">{card.count}</h2>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-row items-center flex-wrap">
        {cards2.map((card, index) => (
          <div
            className={` shadow-lg min-h-[280px] rounded-lg p-3 m-2 flex-1 cursor-pointer`}
          >
            <div>
              <h3 className="text-lg text-center whitespace-nowrap bg-main2 rounded-md">
                {card.title}
              </h3>
            </div>
            <div
              key={index}
              onClick={() => navigate(card.route)}
              className={`flex flex-col items-center justify-center rounded-lg  flex-1 cursor-pointer`}
            >
              <div className="flex flex-col items-center justify-between">
                {typeof card.count === "object" ? (
                  Object.keys(card.count).map((key) => (
                    <h2
                      key={key}
                      className="text-lg text-center"
                    >{`${key}: ${card.count[key]}`}</h2>
                  ))
                ) : (
                  <h2 className="text-sm text-center">{card.count}</h2>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

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

      {Object.keys(departmentHead).length > 0 && (
        <div className="flex flex-row items-center justify-center p-3 min-w-full mb-3">
          <div className="w-[800px] shadow-md py-3 px-2 border-2 rounded-lg">
            <h5 className="bg-main2 text-center p-1 rounded-md w-full">
              Department Head
            </h5>
            <div className="text-center w-full">
              <div className="mt-2 flex flex-col items-center sm:flex-row sm:justify-around sm:items-start">
                <div className="mb-3">
                  <div className="bg-main2 w-32 h-32 rounded-full outline-none shadow-md">
                    <img
                      src={
                        departmentHead.employeeDetails.gender === "MALE"
                          ? maleProfileImage
                          : femaleProfileImage
                      }
                      className="rounded-full outline-none"
                      alt="Profile"
                    />
                  </div>
                  <h5 className="font-bold text-lg">
                    {departmentHead.firstName + " " + departmentHead.lastName}
                  </h5>
                  <div className="bg-[#b39ddd] px-2 py-1 mt-2 rounded-md">
                    {departmentHead.designationDetails.designationName ||
                      "Not Assigned"}
                  </div>
                </div>

                <div className="w-full pt-3 sm:w-2/4 flex flex-col justify-start items-center sm:items-start border-t-2 sm:border-0">
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
                    <h6 className="text-sm">
                      Gender: {departmentHead.employeeDetails.gender}
                    </h6>
                  </div>
                  <div>
                    <h6 className="text-sm">
                      DOB: {departmentHead.employeeDetails.dateOfBirth}
                    </h6>
                  </div>
                  <div>
                    <h6 className="text-sm">
                      Member Since: {departmentHead.employeeDetails.hireDate}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeDashboardPage;
