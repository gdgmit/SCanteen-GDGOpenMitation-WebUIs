import React, { useState } from "react";
import Navbar from "../Navbar";

export const MenuAdderCashier = () => {
  const [Items, setItems] = useState([
    { id: 1, name: "Dosa", quantity: 10, Price: 50, date: new Date().toLocaleDateString() },
    { id: 2, name: "Idly", quantity: 5, Price: 20, date: new Date().toLocaleDateString() },
  ]);

  const [formVisible, setFormVisible] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "",
    Price: "",
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedPrice, setEditedPrice] = useState("");

 const currentDate = formatDate(new Date());

  // Helper function to format the date to dd/mm/yyyy
  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.name && newItem.quantity && newItem.Price) {
      setItems([
        ...Items,
        { ...newItem, id: Date.now(), date: currentDate },
      ]);
      setNewItem({ name: "", quantity: "", Price: "" });
      setFormVisible(false);

      console.log("New Item added. Sync to DB:", {
        ...newItem,
        id: Date.now(),
        date: currentDate,
      });
    } else {
      alert("Please fill in all fields!");
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(Items.map((Item) => Item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleDeleteSelected = () => {
    setItems(Items.filter((Item) => !selectedItems.includes(Item.id)));
    setSelectedItems([]);
    console.log("Selected items deleted. updated DB: ", selectedItems);
  };

  const handleEditPrice = (id) => {
    setEditingItemId(id);
    const item = Items.find((item) => item.id === id);
    setEditedPrice(item.Price);
  };

  const handleSavePrice = (id) => {
    setItems(
      Items.map((item) =>
        item.id === id ? { ...item, Price: editedPrice } : item
      )
    );
    setEditingItemId(null);
    setEditedPrice("");
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setEditedPrice("");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="sticky top-0 z-20 shadow-md">
          <Navbar role="cashier" />
      </div>
      <div className="my-4 text-gray-600">Date: {currentDate}</div>

      {/* List of Items */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">LIST OF MENU ITEMS</h1>
        <table className="min-w-full table-auto border-collapse border rounded border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedItems.length === Items.length && Items.length > 0}
                />
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {Items.map((Item) => (
              <tr key={Item.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">
  <div className="flex justify-center items-center">
    <input
      type="checkbox"
      checked={selectedItems.includes(Item.id)}
      onChange={() => handleSelectItem(Item.id)}
    />
  </div>
</td>

                <td className="border border-gray-300 px-4 py-2">{Item.name}</td>
                <td className="border border-gray-300 px-4 py-2">{Item.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingItemId === Item.id ? (
                    <div className="flex items-center">
                      <input
                        type="number"
                        value={editedPrice}
                        onChange={(e) => setEditedPrice(e.target.value)}
                        className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleSavePrice(Item.id)}
                        className="ml-2 text-green-500 hover:text-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span>₹{Item.Price} </span>
                      <button
                        onClick={() => handleEditPrice(Item.id)}
                        className="ml-2 text-blue-500 hover:text-blue-700"
                      >
                        ✏️
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Selected Items Button */}
      {selectedItems.length > 0 && (
        <button
          onClick={handleDeleteSelected}
          className="m-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Delete Selected
        </button>
      )}

      {/* Add Item Button */}
      <button
        onClick={() => setFormVisible(!formVisible)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        {formVisible ? "Cancel" : "Add Item"}
      </button>

      {/* Add Item Form */}
      {formVisible && (
        <form onSubmit={handleAddItem} className="mt-4 bg-white shadow rounded-lg p-4 space-y-4">
          <h2 className="text-xl font-semibold">Add New Item</h2>
          <div>
            <label className="block text-gray-700">Item Name</label>
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Item name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              value={newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
              className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter quantity"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Price (₹)</label>
            <input
              type="number"
              value={newItem.Price}
              onChange={(e) => setNewItem({ ...newItem, Price: e.target.value })}
              className="w-full mt-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter purchase price"
              required
            />
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
            Add Item
          </button>
        </form>
      )}
    </div>
  );
};
