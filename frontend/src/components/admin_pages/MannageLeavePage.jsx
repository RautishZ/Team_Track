import LeavesCountCard from "../leaves/LeavesCountCard";
import { useEffect, useState } from "react";
import API from "../../services/API";
import LeavesManageTable from "../leaves/LeavesManageTable";

function MannageLeavePage() {
  const [leavesDetails, setLeavesDetails] = useState([]);

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const response = await API.get("admin/leaves/getall");
        console.log(response.data);
        setLeavesDetails(response.data);
      } catch (error) {
        console.error("Error fetching leave types:", error);
      }
    };

    fetchLeaveTypes();
  }, []);

  const pendingLeavesCount = leavesDetails.filter(
    (leave) => leave.leave.status === "Pending"
  ).length;
  const approvedLeavesCount = leavesDetails.filter(
    (leave) => leave.leave.status === "Approved"
  ).length;
  const rejectedLeavesCount = leavesDetails.filter(
    (leave) => leave.leave.status === "Rejected"
  ).length;
  const totalLeaveCount = leavesDetails.reduce(
    (acc, leave) => acc + (leave.leave.leaveCount || 0),
    0
  );
  const remainingLeavesCount = leavesDetails.length;

  const cards = [
    {
      title: "Pending Request ",
      count: pendingLeavesCount,
      gradient: "bg-gradient-to-r from-indigo-500 to-blue-500",
    },
    {
      title: "Approved Leaves",
      count: approvedLeavesCount,
      gradient: "bg-gradient-to-r from-lime-600 to-lime-500",
    },
    {
      title: "Rejected Leaves",
      count: rejectedLeavesCount,
      gradient: "bg-gradient-to-r from-red-500 to-orange-500",
    },
    {
      title: "Total Leaves",
      count: remainingLeavesCount,
      gradient: "bg-gradient-to-r from-blue-400 to-teal-400",
    },
  ];

  return (
    <>
      <LeavesCountCard cards={cards} />

      <LeavesManageTable
        leaves={leavesDetails}
        setLeavesDetails={setLeavesDetails}
      />
    </>
  );
}

export default MannageLeavePage;
