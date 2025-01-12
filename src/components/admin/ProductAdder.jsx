import React, { useState } from "react";

export const ProductManager = () => {
  const [products, setProducts] = useState([
    { name: "Idly", price: 25 },
    { name: "Vada", price: 10 },
    { name: "Dosa", price: 30 },
  ]);

  const [newProduct, setNewProduct] = useState({ name: "", price: "" });
  const [editProductIndex, setEditProductIndex] = useState(null);
  const [editPrice, setEditPrice] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const addProduct = () => {
    if (newProduct.name && newProduct.price) {
      setProducts([...products, { ...newProduct, price: parseFloat(newProduct.price) }]);
      setNewProduct({ name: "", price: "" });
    }
  };

  const startEditing = (index) => {
    setEditProductIndex(index);
    setEditPrice(products[index].price);
  };

  const saveEdit = () => {
    const updatedProducts = [...products];
    updatedProducts[editProductIndex].price = parseFloat(editPrice);
    setProducts(updatedProducts);
    setEditProductIndex(null);
    setEditPrice("");
  };

  const cancelEdit = () => {
    setEditProductIndex(null);
    setEditPrice("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Product Manager</h2>

      {/* Add New Product */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
        <div className="flex gap-4">
          <input
            type="text"
            name="name"
            value={newProduct.name}
            placeholder="Product Name"
            onChange={handleInputChange}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="price"
            value={newProduct.price}
            placeholder="Selling Price"
            onChange={handleInputChange}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addProduct}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Product List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Product List</h3>
        {products.length > 0 ? (
          <ul className="space-y-4">
            {products.map((product, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-white p-4 rounded-md shadow"
              >
                <div>
                  <span className="font-medium text-gray-700">{product.name}</span> -{" "}
                  <span className="text-gray-600">₹{product.price.toFixed(2)}</span>
                </div>
                {editProductIndex === index ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={saveEdit}
                      className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEditing(index)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No products available.</p>
        )}
      </div>
    </div>
  );
};
