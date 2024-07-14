import { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import API from "../../services/API";

function AllDepartments() {
  const [departments, setDepartments] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [departmentDetails, setDepartmentDetails] = useState({});
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [departmentHeadId, setDepartmentHeadId] = useState("");

  const fetchDepartments = async () => {
    try {
      const response = await API.get("/admin/department/getall");
      console.log(response.data);
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching department data:", error);
      toast.error("Error fetching department data.");
    }
  };

  const fetchEmployeeDetails = async (departmentId) => {
    try {
      const response = await API.get(`/department/allusers/${departmentId}`);
      console.log(response.data);
      setEmployeeDetails(response.data);
    } catch (error) {
      console.error("Error fetching employee details:", error);
      toast.error("Error fetching employee details.");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const editHandle = (department) => {
    setLgShow(true);
    setDepartmentHeadId(
      department.employee ? department.employee.employeeId : ""
    );
    console.log(department);
    fetchEmployeeDetails(department.departmentId);
    setDepartmentDetails(department);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log(" hello " + departmentHeadId);

    try {
      await API.put(
        `/admin/department/update/${departmentHeadId}`,
        departmentDetails
      );
      setLgShow(false);
      toast.success("Updated successfully!");
      fetchDepartments();
    } catch (error) {
      toast.error("Update failed!");
      console.error("Error updating department:", error);
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
          <h1 className="text-2xl text-center w-full">Update Department</h1>
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
                  className="p-2 border-2 border-gray-300 rounded-md w-full"
                  required
                  value={departmentDetails.departmentName || ""}
                  onChange={(e) => {
                    setDepartmentDetails({
                      ...departmentDetails,
                      departmentName: e.target.value,
                    });
                  }}
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="mb-1">Department Head:</label>
                <select
                  className="p-2 border-2 border-gray-300 rounded-md w-full"
                  value={departmentHeadId}
                  onChange={(e) => {
                    setDepartmentHeadId(e.target.value);
                  }}
                >
                  <option value="">Select Department Head</option>
                  {employeeDetails.map((employee) => (
                    <option key={employee.userId} value={employee.userId}>
                      {employee.firstName} {employee.lastName}
                    </option>
                  ))}
                </select>
              </div>
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
                  Department ID
                </th>
                <th className="px-2 md:px-6 py-3 text-center text-xs md:text-md text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Department Name
                </th>
                <th className="px-2 md:px-6 py-3 text-center text-xs md:text-md text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Department Head
                </th>
                <th className="px-2 md:px-6 py-3 text-center text-xs md:text-md text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {departments.map((department) => (
                <tr key={department.departmentId}>
                  <td className="px-2 md:px-6 py-4 text-sm text-center md:text-md whitespace-nowrap">
                    {department.departmentId}
                  </td>
                  <td className="px-2 md:px-6 py-4 text-sm text-center md:text-md whitespace-nowrap">
                    {department.departmentName}
                  </td>
                  <td className="px-2 md:px-6 py-4 text-sm text-center md:text-md whitespace-nowrap">
                    {(department.employee &&
                      department.employee.firstName +
                        " " +
                        department.employee.lastName) ||
                      "N/A"}
                  </td>
                  <td className="">
                    <div className="flex flex-row justify-center h-full items-center">
                      <div
                        className="p-2 hover:bg-gray-300 rounded-full cursor-pointer"
                        onClick={() => editHandle(department)}
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

export default AllDepartments;
