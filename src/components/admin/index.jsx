
import React from "react";
import { Link } from "react-router-dom";

function AdminUI() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-4 drop-shadow-lg">
        Welcome to <span className="text-blue-500">Admin Dashboard</span>
      </h1>
      <p className="text-lg mb-4 drop-shadow-lg">
        Manage your reports, products, dashboard and do analysis here with ease.
      </p>
      <div className="flex space-x-4">

        <Link
          to="/admin/login"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Login
        </Link>
        <Link
          to="/admin/signup"
          className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
        >
          Sign Up
        </Link>

      </div>
    </div>
  );
}

export default AdminUI;
