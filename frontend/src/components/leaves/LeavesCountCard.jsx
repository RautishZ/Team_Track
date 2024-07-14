import React from "react";

const LeavesCountCard = ({ cards }) => {
  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-row items-center flex-wrap">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`flex items-center justify-center max-h-[120px] min-h-[120px] shadow-lg ${card.gradient} rounded-lg p-3 m-2 md:p-4 md:m-5 text-white flex-1`}
        >
          <div className="flex flex-col items-center justify-between">
            <h3 className="text-lg text-center">{card.title}</h3>
            <h2 className="text-2xl text-center">{card.count}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeavesCountCard;
