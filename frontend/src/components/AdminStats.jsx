import React from 'react';

function AdminStats({ label, value }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center transition hover:scale-105 hover:shadow-blue-200">
      <h3 className="text-3xl font-bold text-blue-700">{value}</h3>
      <p className="text-gray-600 mt-2">{label}</p>
    </div>
  );
}

export default AdminStats;
