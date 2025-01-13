
import { useNavigate } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";

function CashierUI() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 px-6">
        {/* Upper Section - Welcome and Links */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mb-6">
          <h1 className="text-3xl font-bold text-center mb-2 drop-shadow-lg">
            Welcome to <span className="text-blue-500">Cashier Dashboard</span>
          </h1>
          <p className="text-lg mb-4 text-center drop-shadow-lg">
            Manage transactions and payments.
          </p>
          <div className="flex space-x-4 justify-center mb-6">
            <Link
              to="/cashier/login"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Login
            </Link>
            <Link
              to="/cashier/signup"
              className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Orders Button Section
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <button
            className="bg-blue-500 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-blue-400 transition-all w-full text-center"
            onClick={() => navigate("orders")}
          >
            Orders
          </button>
        </div> */}
      </div>
    </>
  );
}

export default CashierUI;

