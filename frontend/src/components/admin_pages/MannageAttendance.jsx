import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "../../services/API";

function ManageAttendance() {
  const [users, setUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0]
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAttendanceData();
  }, [selectedDate]);

  const fetchAttendanceData = () => {
    setLoading(true);
    API.get(`/admin/attendance/${selectedDate}`)
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Error fetching data!");
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handleStatusChange = (userId, newStatus) => {
    const attendanceDetails = {
      userId: userId,
      attendanceStatus: newStatus,
      attendanceDate: selectedDate,
    };

    API.put(`/admin/attendance/status/update`, attendanceDetails)
      .then((response) => {
        toast.success("Attendance status updated successfully!");
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.userId === userId
              ? {
                  ...user,
                  attendanceDetails: user.attendanceDetails.map(
                    (detail, index) =>
                      index === 0 ? { ...detail, status: newStatus } : detail
                  ),
                }
              : user
          )
        );
      })
      .catch((error) => {
        toast.error("Error updating attendance status!");
        console.error("Error updating attendance status:", error);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center overflow-x-auto shadow-lg rounded-md">
      <div className="w-full">
        <div className="flex justify-center p-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={
              new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0]
            }
            className="p-2 rounded-md  text-2xl font-bold text-black border-black border-2 "
          />
        </div>
        {users.length === 0 ? (
          <p>No attendance data available for selected date.</p>
        ) : (
          <table className="bg-white w-full min-w-max">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 md:px-6 py-3 text-center text-xs md:text-md text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Employee ID
                </th>
                <th className="px-2 md:px-6 py-3 text-center text-xs md:text-md text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Name
                </th>
                <th className="px-2 md:px-6 py-3 text-center text-xs md:text-md text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Email
                </th>
                <th className="px-2 md:px-6 py-3 text-center text-xs md:text-md text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Department
                </th>
                <th className="px-2 md:px-6 py-3 text-center text-xs md:text-md text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Designation
                </th>
                <th className="px-2 md:px-6 py-3 text-center text-xs md:text-md text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.userId}>
                  <td className="px-2 md:px-6 py-4 text-sm text-center md:text-md whitespace-nowrap">
                    {user.userId}
                  </td>
                  <td className="px-2 md:px-6 text-sm text-center md:text-md whitespace-nowrap">
                    {`${user.employeeDetails.firstName} ${user.employeeDetails.lastName}`}
                  </td>
                  <td className="px-2 md:px-6 text-sm text-center md:text-md whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="px-2 md:px-6 text-sm text-center md:text-md whitespace-nowrap">
                    {user.departmentDetails.departmentName}
                  </td>
                  <td className="px-2 md:px-6 text-sm text-center md:text-md whitespace-nowrap">
                    {user.designationDetails.designationName}
                  </td>
                  <td className="px-2 md:px-6 text-sm text-center md:text-md whitespace-nowrap">
                    <select
                      value={user.attendanceDetails[0]?.status || "NotMarked"}
                      onChange={(e) =>
                        handleStatusChange(user.userId, e.target.value)
                      }
                      className={`${
                        user.attendanceDetails[0]?.status === "Present"
                          ? "bg-green-100 text-green-500"
                          : user.attendanceDetails[0]?.status === "Absent"
                          ? "bg-red-100 text-red-500"
                          : user.attendanceDetails[0]?.status === "Late"
                          ? "bg-yellow-100 text-yellow-500"
                          : user.attendanceDetails[0]?.status === "OnLeave"
                          ? "bg-blue-100 text-blue-500"
                          : "bg-gray-100 text-gray-500"
                      } p-2 rounded-md font-semibold text-center cursor-pointer transition duration-200 hover:ring-1 hover:ring-main2 focus:outline-none focus:ring-1 focus:ring-main2`}
                      style={{
                        outline: "none",
                        border: "none",
                        minWidth: "80px",
                      }}
                    >
                      <option value="NotMarked">Not Marked</option>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="OnLeave">On leave</option>
                      <option value="Late">Late</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ManageAttendance;
