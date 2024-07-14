import { useState } from "react";
import { toast } from "react-toastify";
import API from "../../services/API";

const LeavesManageTable = ({ leaves, setLeavesDetails }) => {
  const handleStatusChange = (leaveId, newStatus) => {
    API.put(`/admin/leave/status/update?leaveId=${leaveId}&status=${newStatus}`)
      .then((response) => {
        toast.success("Leave status updated successfully!");
        setLeavesDetails((prevLeaves) =>
          prevLeaves.map((leaveItem) =>
            leaveItem.leave.leaveId === leaveId
              ? {
                  ...leaveItem,
                  leave: {
                    ...leaveItem.leave,
                    status: newStatus,
                  },
                }
              : leaveItem
          )
        );
      })
      .catch((error) => {
        toast.error("Error updating leave status!");
        console.error("Error updating leave status:", error);
      });
  };

  return (
    <div className="flex flex-col items-center overflow-x-auto shadow-lg rounded-md">
      <div className="w-full">
        <table className="bg-white w-full min-w-max">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 md:px-6 py-3 text-center text-xs md:text-md text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Leave ID
              </th>
              <th className="px-2 md:px-6 py-3 text-center text-xs md:text-md text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Name
              </th>
              <th className="px-2 md:px-6 py-3 text-center text-xs md:text-md text-gray-500 uppercase tracking-wider whitespace-nowrap">
                From Date
              </th>
              <th className="px-2 md:px-6 py-3 text-center text-xs md:text-md text-gray-500 uppercase tracking-wider whitespace-nowrap">
                To Date
              </th>
              <th className="px-2 md:px-6 py-3 text-center text-xs md:text-md text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Days
              </th>
              <th className="px-2 md:px-6 py-3 text-center text-xs md:text-md text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Type
              </th>
              <th className="px-2 md:px-6 py-3 text-center text-xs md:text-md text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Status
              </th>
              <th className="px-2 md:px-6 py-3 text-center text-xs md:text-md text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Reason
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {leaves.map(({ leave, name }) => (
              <tr key={leave.leaveId}>
                <td className="px-2 md:px-6 py-4 text-sm text-center md:text-md whitespace-nowrap">
                  {leave.leaveId}
                </td>
                <td className="px-2 md:px-6 text-sm text-center md:text-md whitespace-nowrap">
                  {name}
                </td>
                <td className="px-2 md:px-6 text-sm text-center md:text-md whitespace-nowrap">
                  {leave.startDate}
                </td>
                <td className="px-2 md:px-6 text-sm text-center md:text-md whitespace-nowrap">
                  {leave.endDate}
                </td>
                <td className="px-2 md:px-6 text-sm text-center md:text-md whitespace-nowrap">
                  {Math.ceil(
                    (new Date(leave.endDate) - new Date(leave.startDate)) /
                      (1000 * 60 * 60 * 24) +
                      1
                  )}
                </td>
                <td className="px-2 md:px-6 text-sm text-center md:text-md whitespace-nowrap">
                  {leave.leaveType && leave.leaveType.typeName}
                </td>
                <td className="px-2 md:px-6 text-sm text-center md:text-md whitespace-nowrap">
                  <select
                    value={leave.status}
                    onChange={(e) =>
                      handleStatusChange(leave.leaveId, e.target.value)
                    }
                    className={`${
                      leave.status === "Approved"
                        ? "bg-green-100 text-green-500"
                        : leave.status === "Pending"
                        ? "bg-yellow-100 text-yellow-500"
                        : "bg-red-100 text-red-500"
                    } p-2 rounded-md font-semibold `}
                    style={{ outline: "none", border: "none" }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-2 md:px-6 text-sm text-center md:text-md">
                  {leave.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeavesManageTable;
