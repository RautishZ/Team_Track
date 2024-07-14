import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../services/API";
import { useSelector, useDispatch } from "react-redux";
import { setEmployeeDetails } from "../api/store/features/employeeSlice";

function LeaveEditButton({ leaveDetails, lgShow, setLgShow, leaveTypes }) {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.employee.employee);
  const [leave, setLeave] = useState({
    leaveId: leaveDetails.leaveId,
    userId: userDetails.userId,
    typeId: leaveDetails.leaveType.typeId,
    startDate: leaveDetails.startDate,
    endDate: leaveDetails.endDate,
    description: leaveDetails.description,
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setLeave({ ...leave, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(leave);
    API.put("leave/update", leave)
      .then((response) => {
        API.get("/userdetails").then((response) => {
          dispatch(setEmployeeDetails(response.data));
        });
        toast.success("Update successfully!");
        setLgShow(false);
      })
      .catch((error) => {
        toast.error("Apply failed!");
        console.error("There was an error adding the leave!", error);
      });
  };

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (leave.startDate && leave.endDate) {
      if (leave.endDate < leave.startDate) {
        toast.error("End date cannot be earlier than start date!");
      }
    }
  }, [leave.startDate, leave.endDate]);

  return (
    <>
      <Modal
        size="md"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <h1 className="text-2xl text-center w-full">Update Leave</h1>
        </Modal.Header>
        <Modal.Body>
          <form className="space-y-4" onSubmit={submitHandler}>
            <div className="flex flex-col sm:flex-row justify-between sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="flex flex-col w-full">
                <label className="mb-1">From :</label>
                <input
                  type="date"
                  name="startDate"
                  min={today}
                  className="p-2 border-2 border-gray-300 rounded-md w-full"
                  value={leave.startDate}
                  onChange={handleInputs}
                  required
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="mb-1">To :</label>
                <input
                  type="date"
                  name="endDate"
                  min={leave.startDate || today}
                  className="p-2 border-2 border-gray-300 rounded-md w-full"
                  value={leave.endDate}
                  onChange={handleInputs}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="flex flex-col w-full">
                <label className="mb-1">Type :</label>
                <select
                  name="typeId"
                  className="p-2 border-2 border-gray-300 rounded-md w-full"
                  value={leave.typeId}
                  onChange={handleInputs}
                  required
                >
                  <option value="" disabled>
                    Select Leave Type
                  </option>
                  {leaveTypes.map((leaveType) => (
                    <option key={leaveType.typeId} value={leaveType.typeId}>
                      {leaveType.typeName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="flex flex-col w-full">
                <label className="mb-1">Reason :</label>
                <textarea
                  placeholder="Enter Reason"
                  rows={2}
                  name="description"
                  className="p-2 border-2 border-gray-300 rounded-md w-full"
                  value={leave.description}
                  onChange={handleInputs}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                className="bg-main1 text-white px-4 py-2 rounded-md hover:blur-4 transition duration-200"
                type="submit"
              >
                Done
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LeaveEditButton;
