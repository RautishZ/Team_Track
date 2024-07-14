import React, { useState } from "react";
import { useSelector } from "react-redux";

function MyAttendance() {
  const attendances = useSelector(
    (state) => state.employee.employee.attendanceDetails
  );

  const [year, setYear] = useState("2024");

  const months = [
    { name: "January", days: 31 },
    { name: "February", days: 29 },
    { name: "March", days: 31 },
    { name: "April", days: 30 },
    { name: "May", days: 31 },
    { name: "June", days: 30 },
    { name: "July", days: 31 },
    { name: "August", days: 31 },
    { name: "September", days: 30 },
    { name: "October", days: 31 },
    { name: "November", days: 30 },
    { name: "December", days: 31 },
  ];

  const getStatusAbbreviation = (status) => {
    switch (status) {
      case "Present":
        return "P";
      case "Absent":
        return "A";
      case "Late":
        return "L";
      case "OnLeave":
        return "O";
      default:
        return "";
    }
  };

  const getAttendanceForDate = (date) => {
    const attendance = attendances.find((a) => a.date === date);
    return attendance ? getStatusAbbreviation(attendance.status) : ""; // Return empty string if attendance data doesn't exist
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  return (
    <div className="">
      <h1 className="text-center p-2">My Attendance</h1>
      <div className="p-3 mt-2 flex flex-col shadow-lg justify-center items-center sm:justify-around sm:flex-row">
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between">
          <div className="font-bold mr-2 flex justify-center items-center">
            <div className="flex items-center justify-center rounded-full w-[35px] h-[35px] bg-green-500">
              P
            </div>
            &nbsp; Present
          </div>
          <div className="font-bold mr-2 flex justify-center items-center">
            <div className="flex items-center justify-center rounded-full w-[35px] h-[35px] bg-red-500">
              A
            </div>
            &nbsp; Absent
          </div>
          <div className="font-bold mr-2 flex justify-center items-center">
            <div className="flex items-center justify-center rounded-full w-[35px] h-[35px] bg-yellow-500">
              L
            </div>
            &nbsp; Late
          </div>

          <div className="font-bold mr-2 flex justify-center items-center">
            <div className="flex items-center justify-center rounded-full w-[35px] h-[35px] bg-blue-500">
              O
            </div>
            &nbsp; On Leave
          </div>
        </div>

        <div className="p-3">
          <span className="font-bold mr-2 text-2xl">
            Search by Year: &nbsp;
          </span>

          <input
            type="number"
            name="search"
            value={year}
            onChange={handleYearChange}
            className="text-xl p-2 bg-transparent border-2 max-w-xs"
            min="2020"
            max="2100"
          />
        </div>
      </div>

      <div className="flex flex-col overflow-x-auto shadow-lg ">
        <div className="w-full">
          <table className="bg-white w-full min-w-max">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 md:px-6 py-3 text-center text-xs md:text-md text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Month
                </th>
                {Array.from({ length: 31 }, (_, i) => (
                  <th
                    key={i + 1}
                    className="px-2 md:px-6 py-3 text-center text-xs md:text-md text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    {i + 1}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {months.map((month, monthIndex) => (
                <tr key={month.name} className="hover:bg-gray-200">
                  <td className="px-1 md:px-5 py-3 text-sm text-center md:text-md whitespace-nowrap font-bold">
                    {month.name}
                  </td>
                  {Array.from({ length: 31 }, (_, dayIndex) => {
                    const date = `${year}-${String(monthIndex + 1).padStart(
                      2,
                      "0"
                    )}-${String(dayIndex + 1).padStart(2, "0")}`;
                    const status = getAttendanceForDate(date);
                    return (
                      <td
                        key={date}
                        className={`px-1 md:px-5 py-3 text-sm text-center md:text-md whitespace-nowrap hover:bg-blue-200 ${
                          dayIndex < month.days ? "" : "bg-gray-100"
                        }`}
                      >
                        <div
                          className={`flex items-center font-bold justify-center rounded-full min-w-[35px] min-h-[35px] ${
                            status === "P"
                              ? "bg-green-500"
                              : status === "A"
                              ? "bg-red-500"
                              : status === "L"
                              ? "bg-yellow-500"
                              : status === "O"
                              ? "bg-blue-500"
                              : ""
                          }`}
                        >
                          {dayIndex < month.days ? status : ""}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyAttendance;
