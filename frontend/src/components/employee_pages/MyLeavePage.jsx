import LeaveApplyButton from "../leaves/LeaveApplyButton";
import LeavesCountCard from "../leaves/LeavesCountCard";
import LeavesTable from "../leaves/LeavesTable";
import { useEffect, useState } from "react";
import API from "../../services/API";
import { useSelector } from "react-redux";

function MyLeavePage() {
  const leaves = useSelector((state) => state.employee.employee.leaveDetails);

  const [leaveTypes, setLeaveTypes] = useState([]);

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const response = await API.get("/leavetypes/getall");
        setLeaveTypes(response.data);
      } catch (error) {
        console.error("Error fetching leave types:", error);
      }
    };

    fetchLeaveTypes();
  }, []);

  const cards = [
    {
      title: "Annual Leaves",
      count: 34,
      gradient: "bg-gradient-to-r from-indigo-500 to-blue-500",
    },
    {
      title: "Medical Leaves",
      count: leaves.filter(
        (leave) => leave.leaveType.typeName === "Medical Leave"
      ).length,
      gradient: "bg-gradient-to-r from-lime-600 to-lime-500",
    },
    {
      title: "Other Leaves",
      count:
        leaves.length -
        leaves.filter((leave) => leave.leaveType.typeName === "Medical Leave")
          .length,
      gradient: "bg-gradient-to-r from-red-500 to-orange-500",
    },
    {
      title: "Remaining Leaves",
      count: 34 - leaves.length,

      gradient: "bg-gradient-to-r from-blue-400 to-teal-400",
    },
  ];

  return (
    <>
      <LeavesCountCard cards={cards} />
      <LeaveApplyButton leaveTypes={leaveTypes} />
      <LeavesTable leaveTypes={leaveTypes} />
    </>
  );
}

export default MyLeavePage;
