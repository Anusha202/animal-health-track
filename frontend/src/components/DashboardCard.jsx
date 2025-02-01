// src/components/DashboardCard.jsx

import React from "react";

const DashboardCard = ({ icon, title, value }) => {
  return (
    <>
      <div className="w-full md:w-1/3 lg:w-1/4 bg-white shadow-md rounded-lg   p-5 mb-4">
        <div className="text-center">
          <div className="text-3xl mb-3 ">{icon}</div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-lg mt-2">{value}</p>
        </div>
      </div>
    </>
  );
};

export default DashboardCard;
