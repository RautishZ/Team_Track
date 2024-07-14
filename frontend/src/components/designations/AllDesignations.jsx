import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { Modal } from "react-bootstrap";
import API from "../../services/API";
import { toast } from "react-toastify";

function AllDesignations() {
  const [designations, setDesignations] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [designationDetails, setDesignationDetails] = useState({});

  useEffect(() => {
    fetchDesignations();
  }, []);

  const fetchDesignations = async () => {
    try {
      const response = await API.get("admin/designation/getall");
      console.log(response.data);
      setDesignations(response.data);
    } catch (error) {
      console.error("Error fetching designation data:", error);
    }
  };

  const editHandle = (designation) => {
    setLgShow(true);
    setDesignationDetails({
      designationId: designation.designationId,
      designationName: designation.designationName,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/admin/designation/update`, designationDetails);
      setLgShow(false);
      toast.success("Designation updated successfully!");
      fetchDesignations();
    } catch (error) {
      toast.error("Update failed!");
      console.error("Error updating designation:", error);
    }
  };

  return (
    <>
      <Modal
        size="md"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <h1 className="text-2xl text-center w-full">Update Designation</h1>
        </Modal.Header>
        <Modal.Body>
          <form className="space-y-4" onSubmit={submitHandler}>
            <div className="flex flex-col w-full">
              <label className="mb-1">Designation Name:</label>
              <input
                type="text"
                name="designationName"
                placeholder="Enter Designation Name"
                className="p-2 border-2 border-gray-300 rounded-md w-full"
                required
                value={designationDetails.designationName || ""}
                onChange={(e) =>
                  setDesignationDetails({
                    ...designationDetails,
                    designationName: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-end">
              <button
                className="bg-main1 text-white px-4 py-2 rounded-md hover:blur-4 transition duration-200"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <div className="flex flex-col items-center overflow-x-auto shadow-lg rounded-md">
        <div className="w-full">
          <table className="bg-white w-full min-w-max">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 md:px-6 py-3 text-center text-xs md:text-md text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Designation ID
                </th>
                <th className="px-2 md:px-6 py-3 text-center text-xs md:text-md text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Designation Name
                </th>
                <th className="px-2 md:px-6 py-3 text-center text-xs md:text-md text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {designations.map((designation) => (
                <tr key={designation.designationId}>
                  <td className="px-2 md:px-6 py-4 text-sm text-center md:text-md whitespace-nowrap">
                    {designation.designationId}
                  </td>
                  <td className="px-2 md:px-6 py-4 text-sm text-center md:text-md whitespace-nowrap">
                    {designation.designationName}
                  </td>
                  <td className="">
                    <div className="flex flex-row justify-center h-full items-center">
                      <div
                        className="p-2 hover:bg-gray-300 rounded-full cursor-pointer"
                        onClick={() => editHandle(designation)}
                      >
                        <FiEdit
                          title="Edit"
                          className="text-2xl text-blue-500"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AllDesignations;
