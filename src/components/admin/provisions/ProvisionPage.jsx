import React, { useState } from "react";

export const ProvisionsPage = () => {
  const [provisions, setProvisions] = useState([
    {
      id: 1,
      name: "Rice",
      quantity: 10,
      purchasePrice: 500,
      date: new Date().toLocaleDateString(),
    },
    {
      id: 2,
      name: "Wheat",
      quantity: 5,
      purchasePrice: 200,
      date: new Date().toLocaleDateString(),
    },
  ]);

  const [formVisible, setFormVisible] = useState(false);
  const [newProvision, setNewProvision] = useState({
    name: "",
    quantity: "",
    purchasePrice: "",
  });

  const [selectedProvisions, setSelectedProvisions] = useState([]);

  const currentDate = formatDate(new Date());

  // Helper function to format the date to dd/mm/yyyy
  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const handleAddProvision = (e) => {
    e.preventDefault();
    if (newProvision.name && newProvision.quantity && newProvision.purchasePrice) {
      setProvisions([
        ...provisions,
        { ...newProvision, id: Date.now(), date: currentDate },
      ]);
      setNewProvision({ name: "", quantity: "", purchasePrice: "" });
      setFormVisible(false);

      console.log("New provision added. Sync to DB:", {
        ...newProvision,
        id: Date.now(),
        date: currentDate,
      });
    } else {
      alert("Please fill in all fields!");
    }
  };

  const handleDeleteSelected = () => {
    const updatedProvisions = provisions.filter(
      (provision) => !selectedProvisions.includes(provision.id)
    );
    setProvisions(updatedProvisions);
    setSelectedProvisions([]);
    console.log("Selected provisions deleted. Updated DB:", selectedProvisions);
  };

  const toggleProvisionSelection = (id) => {
    setSelectedProvisions((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProvisions(provisions.map((provision) => provision.id));
    } else {
      setSelectedProvisions([]);
    }
  };

  const calculateFinalTotal = () =>
    provisions.reduce(
      (total, provision) => total + provision.quantity * provision.purchasePrice,
      0
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Date Display */}
      <div className="mb-4 text-gray-600">Date: {currentDate}</div>

      {/* List of Provisions */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">LIST OF PROVISIONS</h1>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-center">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    selectedProvisions.length === provisions.length &&
                    provisions.length > 0
                  }
                />
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Quantity
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Purchase Price
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Total Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {provisions.map((provision) => (
              <tr key={provision.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedProvisions.includes(provision.id)}
                    onChange={() => toggleProvisionSelection(provision.id)}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {provision.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {provision.quantity}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                 ₹{provision.purchasePrice}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ₹{provision.quantity * provision.purchasePrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Final Total Amount */}
        <div className="mt-4 text-xl font-semibold">
          Total Amount: ₹{calculateFinalTotal()}
        </div>
      </div>

      {/* Delete Selected Button */}
      {selectedProvisions.length > 0 && (
        <button
          onClick={handleDeleteSelected}
          className="mt-4 mr-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Delete Selected
        </button>
      )}

      {/* Add Provision Button */}
      <button
        onClick={() => setFormVisible(!formVisible)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        {formVisible ? "Cancel" : "Add Provision"}
      </button>

      {/* Add Provision Form */}
      {formVisible && (
        <form
          onSubmit={handleAddProvision}
          className="mt-4 bg-white shadow rounded-lg p-4 space-y-4"
        >
          <h2 className="text-xl font-semibold">Add New Provision</h2>
          <div>
            <label className="block text-gray-700">Provision Name</label>
            <input
              type="text"
              value={newProvision.name}
              onChange={(e) =>
                setNewProvision({ ...newProvision, name: e.target.value })
              }
              className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter provision name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              value={newProvision.quantity}
              onChange={(e) =>
                setNewProvision({ ...newProvision, quantity: e.target.value })
              }
              className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter quantity"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Purchase Price (₹)</label>
            <input
              type="number"
              value={newProvision.purchasePrice}
              onChange={(e) =>
                setNewProvision({
                  ...newProvision,
                  purchasePrice: e.target.value,
                })
              }
              className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter purchase price"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Add Provision
          </button>
        </form>
      )}
    </div>
  );
};
