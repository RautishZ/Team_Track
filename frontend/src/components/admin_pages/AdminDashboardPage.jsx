import React, { useEffect } from "react";
import API from "../../services/API";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function AdminDashboardPage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    API.get("/admin/dashboard")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const cards = [
    {
      title: "Total Employees",
      count: data.totalEmployees,
      gradient: "bg-gradient-to-r from-indigo-500 to-blue-500",
    },
    {
      title: "Total Departments",
      count: data.totalDepartments,
      gradient: "bg-gradient-to-r from-lime-600 to-lime-500",
    },
    {
      title: "Total Designations",
      count: data.totalDesignations,
      gradient: "bg-gradient-to-r from-red-500 to-orange-500",
    },
  ];

  const cards2 = [
    {
      title: "Today Attendance",
      count: {
        Present: data.totalPresentToday || 0,
        Absent: data.totalAbsentToday || 0,
        Late: data.totalLateToday || 0,
        "On Leave": data.totalOnLeaveToday || 0,
        "Not Marked":
          data.totalEmployees -
            (data.totalPresentToday +
              data.totalAbsentToday +
              data.totalLateToday +
              data.totalOnLeaveToday) || 0,
      },

      route: "/admin/mannageattendance",
    },
    {
      title: "Leaves Status",
      count: {
        approved: data.totalApprovedLeaves || 0,
        pending: data.totalPendingLeaves || 0,
        rejected: data.totalRejectedLeaves || 0,
      },
      gradient: "bg-gradient-to-r from-red-500 to-orange-500",
      route: "/employee/leaves",
    },
  ];

  return (
    <div>
      <div className="flex flex-row items-center flex-wrap">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`flex items-center justify-center max-h-[120px] min-h-[120px] shadow-lg ${card.gradient} rounded-lg p-3 m-2 md:p-4 md:m-5 text-white flex-1`}
            onClick={() => {
              if (index === 0) {
                navigate("/admin/employee");
              } else if (index === 1) {
                navigate("/admin/department");
              } else if (index === 2) {
                navigate("/admin/designation");
              } else if (index === 3) {
                navigate("/admin/mannageattendance");
              }
            }}
          >
            <div className="flex flex-col items-center justify-between">
              <h3 className="text-lg text-center">{card.title}</h3>
              <h2 className="text-2xl text-center">{card.count}</h2>
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
    </div>
  );
}

export default AdminDashboardPage;
