import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { IoMdAddCircleOutline, IoMdSearch } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../services/API";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEmployeeDetails } from "../api/store/features/employeeSlice";

function LeaveApplyButton({ setLeaves, leaveTypes }) {
  const [lgShow, setLgShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.employee.employee);
  const [leaveDetails, setLeaveDetails] = useState({
    userId: userDetails.userId,
    typeId: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setLeaveDetails({ ...leaveDetails, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    API.post("leave/add", leaveDetails)
      .then((response) => {
        API.get("/userdetails").then((response) => {
          dispatch(setEmployeeDetails(response.data));
        });
        toast.success("Added successfully!");
        setLgShow(false);
      })
      .catch((error) => {
        toast.error("Apply failed!");
        console.error("There was an error adding the leave!", error);
      });
  };

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (leaveDetails.startDate && leaveDetails.endDate) {
      if (leaveDetails.endDate < leaveDetails.startDate) {
        toast.error("End date cannot be earlier than start date!");
      }
    }
  }, [leaveDetails.startDate, leaveDetails.endDate]);

  return (
    <>
      <div className="flex flex-row justify-between flex-wrap-reverse mt-3">
        <div className="flex flex-row items-center sm:justify-end justify-center w-full">
          <button
            className="bg-main1 text-white rounded-md p-2 mx-5 my-3 w-[200px] right-0 flex items-center justify-center"
            onClick={() => setLgShow(true)}
          >
            <IoMdAddCircleOutline size={20} className="mr-2 bg-transparent" />
            Apply Leave
          </button>
        </div>
      </div>

      <Modal
        size="md"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <h1 className="text-2xl text-center w-full">Leave Apply</h1>
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
                  onChange={handleInputs}
                  required
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="mb-1">To :</label>
                <input
                  type="date"
                  name="endDate"
                  min={leaveDetails.startDate || today}
                  className="p-2 border-2 border-gray-300 rounded-md w-full"
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
                  onChange={handleInputs}
                  required
                  defaultValue=""
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

export default LeaveApplyButton;
