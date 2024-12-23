import React, { useState } from "react";
import { ProvisionsPage } from "./ProvisionPage";
import { ProductManager } from "./ProductAdder";

function AdminUI() {
  const [currentPage, setCurrentPage] = useState("productManager");

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setCurrentPage("productManager")}
          className={`px-4 py-2 rounded-md ${
            currentPage === "productManager"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        >
          Product Manager
        </button>
        <button
          onClick={() => setCurrentPage("provisionsPage")}
          className={`px-4 py-2 rounded-md ${
            currentPage === "provisionsPage"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        >
          Provisions Page
        </button>
      </div>

      {/* Render the Selected Component */}
      <div>
        {currentPage === "productManager" && <ProductManager />}
        {currentPage === "provisionsPage" && <ProvisionsPage />}
      </div>
    </div>
  );
}

export default AdminUI;
