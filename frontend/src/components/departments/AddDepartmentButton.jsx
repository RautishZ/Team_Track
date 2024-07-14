import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { IoMdAddCircleOutline, IoMdSearch } from "react-icons/io";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addDepartment } from "../api/store/features/departmentSlice";
import API from "../../services/API";

function AddDepartmentButton() {
  const [lgShow, setLgShow] = useState(false);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    departmentName: "",
    departmentHead: "",
    searchBy: "",
    search: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    API.post("/admin/department/add", {
      departmentName: input.departmentName,
      departmentHead: input.departmentHead,
    })
      .then((response) => {
        const newDepartment = {
          departmentId: response.data,
          departmentName: input.departmentName,
        };
        dispatch(addDepartment(newDepartment));
        toast.success("Added successfully!");
        setLgShow(false);
      })
      .catch((error) => {
        toast.error("Adding Failed!");
        console.error("There was an error adding the department!", error);
      });
  };

  return (
    <>
      <div className="flex flex-row justify-between flex-wrap-reverse">
        <div className="flex items-center sm:justify-end justify-center w-full">
          <button
            className="bg-main1 shadow-lg text-white rounded-md p-2 mx-5 my-3 w-[200px] right-0 flex items-center justify-center"
            onClick={() => setLgShow(true)}
          >
            <IoMdAddCircleOutline size={20} className="mr-2 bg-transparent" />
            Add Department
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
          <h1 className="text-2xl text-center w-full">Add Department</h1>
        </Modal.Header>
        <Modal.Body>
          <form className="space-y-4" onSubmit={submitHandler}>
            <div className="flex flex-col sm:flex-row justify-between sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="flex flex-col w-full">
                <label className="mb-1">Department Name:</label>
                <input
                  type="text"
                  name="departmentName"
                  placeholder="Enter Department Name"
                  required
                  className="p-2 border-2 border-gray-300 rounded-md w-full"
                  onChange={handleInputs}
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

export default AddDepartmentButton;
