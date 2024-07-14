import AddEmployeeButton from "../employees/AddEmployeeButton";
import AllEmployees from "../employees/AllEmployeesCard";
import { useState } from "react";
function Employee() {
  const [employees, setEmployees] = useState([]);
  return (
    <>
      <AddEmployeeButton
        employees={employees}
        setEmployees={setEmployees}
      ></AddEmployeeButton>
      <AllEmployees
        employees={employees}
        setEmployees={setEmployees}
      ></AllEmployees>
    </>
  );
}

export default Employee;
