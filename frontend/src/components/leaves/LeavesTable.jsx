import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { setEmployeeDetails } from "../api/store/features/employeeSlice";
import API from "../../services/API";
import { toast } from "react-toastify";
import LeaveEditButton from "./LeaveEditButton";
import { useState } from "react";

const LeavesTable = ({ leaveTypes }) => {
  const [lgShow, setLgShow] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const leaves = useSelector((state) => state.employee.employee.leaveDetails);
  const dispatch = useDispatch();

  const editHandler = (leave) => {
    console.log(leave);
    setSelectedLeave(leave);
    setLgShow(true);
  };

  const deleteHandler = (leaveId) => {
    API.delete(`leave/delete/${leaveId}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Leave Deleted Successfully");
          API.get("/userdetails").then((response) => {
            dispatch(setEmployeeDetails(response.data));
          });
        }
      })
      .catch((error) => {
        toast.error("Error deleting leave");
        console.error("Error Deleting Leave:", error);
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
                Apply Date
              </th>
              <th className="px-2 md:px-6 py-3 text-center text-xs md:text-md text-gray-500 uppercase tracking-wider whitespace-nowrap">
                From Date
              </th>
              <th className="px-2 md:px-6 py-3 text-center text-xs md:text-md text-gray-500 uppercase tracking-wider whitespace-nowrap">
                To Date
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
              <th className="px-2 md:px-6 py-3 text-center text-xs md:text-md text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {leaves.map((leave) => (
              <tr key={leave.leaveId}>
                <td className="px-2 md:px-6 py-4 text-sm text-center md:text-md whitespace-nowrap">
                  {leave.leaveId}
                </td>
                <td className="px-2 md:px-6 text-sm text-center md:text-md whitespace-nowrap">
                  {leave.dateApplied}
                </td>
                <td className="px-2 md:px-6 text-sm text-center md:text-md whitespace-nowrap">
                  {leave.startDate}
                </td>
                <td className="px-2 md:px-6 text-sm text-center md:text-md whitespace-nowrap">
                  {leave.endDate}
                </td>
                <td className="px-2 md:px-6 text-sm text-center md:text-md whitespace-nowrap">
                  {leave.leaveType && leave.leaveType.typeName}
                </td>
                <td
                  className={`px-2 md:px-6 text-sm text-center md:text-md whitespace-nowrap`}
                >
                  <div
                    className={` ${
                      leave.status === "Approved"
                        ? "p-1 rounded-3xl border-2 border-green-500 font-semibold text-green-500"
                        : leave.status === "Pending"
                        ? "p-1 rounded-3xl border-2 border-yellow-500 font-semibold text-yellow-500"
                        : "p-1 rounded-3xl border-2 border-red-500 font-semibold text-red-500"
                    }`}
                  >
                    {leave.status}
                  </div>
                </td>
                <td className="px-2 md:px-6 text-sm text-center md:text-md">
                  {leave.description}
                </td>
                {leave.status === "Pending" && (
                  <td className="">
                    <div className="flex flex-row justify-center h-full items-center">
                      <div
                        className="p-2 hover:bg-gray-300 rounded-full cursor-pointer"
                        onClick={() => editHandler(leave)}
                      >
                        <FiEdit
                          title="Edit"
                          className="text-2xl text-blue-500"
                        />
                      </div>
                      <div
                        className="p-1 hover:bg-gray-300 rounded-full cursor-pointer"
                        onClick={() => deleteHandler(leave.leaveId)}
                      >
                        <MdDeleteOutline
                          title="Delete"
                          className="text-3xl text-red-500"
                        />
                      </div>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {lgShow && selectedLeave && (
        <LeaveEditButton
          leaveDetails={selectedLeave}
          lgShow={lgShow}
          setLgShow={setLgShow}
          leaveTypes={leaveTypes}
        />
      )}
    </div>
  );
};

export default LeavesTable;
