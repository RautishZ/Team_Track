import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { IoMdAddCircleOutline, IoMdSearch } from "react-icons/io";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import API from "../../services/API";

function AddDesignationButton() {
  const [lgShow, setLgShow] = useState(false);

  const [designationDetails, setDesignationDetails] = useState({
    designationName: "",
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setDesignationDetails({ ...designationDetails, [name]: value });
  };

  const submitHandler = (e) => {
    console.log(designationDetails);
    e.preventDefault();
    API.post("/admin/designation/add", designationDetails)
      .then((response) => {
        toast.success("Added successfully!");

        setLgShow(false);
      })
      .catch((error) => {
        toast.error("Adding Failed!");
        console.error("There was an error adding the user!", error);
      });
  };

  return (
    <>
      <div className="flex flex-row justify-between flex-wrap-reverse">
        <div className="flex items-center sm:justify-end justify-center w-full">
          <button
            className="bg-main1 text-white rounded-md  shadow-lg p-2 mx-5 my-3 w-[200px] right-0 flex items-center justify-center"
            onClick={() => setLgShow(true)}
          >
            <IoMdAddCircleOutline size={20} className="mr-2 bg-transparent" />
            Add Designation
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
          <h1 className="text-2xl text-center w-full">Add Designation</h1>
        </Modal.Header>
        <Modal.Body>
          <form className="space-y-4" onSubmit={submitHandler}>
            <div className="flex flex-col sm:flex-row justify-between sm:space-x-4 space-y-4  sm:space-y-0">
              <div className=" flex flex-col w-full">
                <label className="mb-1">Designation :</label>
                <input
                  type="text"
                  name="designationName"
                  placeholder="Enter Designation"
                  className="p-2 border-2 border-gray-300 rounded-md w-full"
                  required
                  onChange={handleInputs}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                className="bg-main1 text-white px-4 py-2 rounded-md hover:blur-4 transition duration-200"
                type=""
                onClick={(e) => {
                  console.log(designationDetails);
                }}
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

export default AddDesignationButton;
