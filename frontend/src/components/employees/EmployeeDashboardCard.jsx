import {
  FiFileText,
  FiCheckCircle,
  FiBriefcase,
  FiUmbrella,
} from "react-icons/fi";
import DashboardCard from "../../pages/DashboardCard";
function EmployeeDashboardCard() {
  return (
    <div className="">
      <div className="flex flex-col items-center m-3 sm:flex-wrap sm:flex-row sm:justify-center sm:mx-5">
        <DashboardCard
          title="New Tickets"
          count="23"
          percentage="18%"
          icon={<FiFileText />}
          gradient="bg-gradient-to-r from-indigo-500 to-blue-500"
        />
        <DashboardCard
          title="Ticket Resolved"
          count="20"
          percentage="21%"
          icon={<FiCheckCircle />}
          gradient="bg-gradient-to-r from-lime-600 to-lime-500"
        />
        <DashboardCard
          title="Project Assigned"
          count="13"
          percentage="37%"
          icon={<FiBriefcase />}
          gradient="bg-gradient-to-r from-red-500 to-orange-500"
        />
        <DashboardCard
          title="Available Leaves"
          count="34"
          percentage="10%"
          icon={<FiUmbrella />}
          gradient="bg-gradient-to-r from-blue-400 to-teal-400"
        />
      </div>
    </div>
  );
}

export default EmployeeDashboardCard;
