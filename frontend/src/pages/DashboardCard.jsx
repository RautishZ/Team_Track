const DashboardCard = ({ title, count, percentage, icon, gradient }) => {
  return (
    <div
      className={`flex items-center justify-center max-h-[150px] min-w-[270px] w-full max-w-[500px] shadow-lg ${gradient} rounded-lg p-3 m-2 md:p-4 md:m-5 text-white flex-1`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col justify-between">
          <h3 className="text-lg text-left">{title}</h3>
          <h2 className="text-2xl my-1">{count}</h2>
          <p className="text-sm">{percentage} Higher Than Last Month</p>
        </div>
        <div className="text-3xl mr-5">{icon}</div>
      </div>
    </div>
  );
};
export default DashboardCard;
