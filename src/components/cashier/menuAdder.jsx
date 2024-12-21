import { current } from "@reduxjs/toolkit";
import React, {useState} from "react";

 export const MenuAdder = () =>{
    const [Items, setItems] = useState([
        { id: 1, name: "Dosa",quantity: 10, Price: 50, date: new Date().toLocaleDateString() },
    { id: 2, name: "Idly",quantity: 5,  Price: 20, date: new Date().toLocaleDateString() },
    ]);

    const [formVisible, setFormVisible] = useState(false);
    const [newItem, setNewItem] = useState({
        name: "",
        quantity: "",
        Price: "",
    });

    const currentDate = new Date().toLocaleDateString();

    const handleAddItem = (e)=>{
        e.preventDefault();
        if(newItem.name && newItem.quantity &&newItem.Price){
            setItems([
                ...Items,
                {...newItem, id:Date.now(), date: currentDate},
            ]);
            setNewItem({name: "", quantity: "", Price: ""});
            setFormVisible(false);

            console.log("New Item added. Sync to DB:", {
        ...newItem,
        id: Date.now(),
        date: currentDate,
      });
        }
        else {
      alert("Please fill in all fields!");
     }
    };

    const handleDeleteItem = (id) =>{
        setItems(Items.filter((Item)=>Item.id!==id));

        console.log("Item deleted. updated db:",id);
        
    };

    return (
      <div className="p-6 bg-gray-100 min-h-screen">
     
      
      {/* Date Display */}
      <div className="mb-4 text-gray-600">Date: {currentDate}</div>

      {/* List of Items*/}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4" >LIST OF MENU ITEMS</h1>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-200">
                    <th className=" border border-gray-300 px-4 py-2 text-left">Name</th>
                    <th className=" border border-gray-300 px-4 py-2 text-left">Quantity</th>
                    <th className=" border border-gray-300 px-4 py-2 text-left">Price</th>
                    <th className=" border border-gray-300 px-4 py-2 text-left">Action</th>
                </tr>
            </thead>
            <tbody>
                {Items.map((Item)=>(
                    <tr key={Item.id}   className="hover:bg-gray-100">
                        <td className=" border border-gray-300 px-4 py-2">{Item.name}</td>
                        <td className=" border border-gray-300 px-4 py-2">{Item.quantity}</td>
                        <td className=" border border-gray-300 px-4 py-2">{Item.Price}</td>
                        <td className=" border border-gray-300 px-4 py-2">
                            <button onClick={()=> handleDeleteItem(Item.id)} >
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

      </div>

      {/* Add Item Button */}
      <button
        onClick={() => setFormVisible(!formVisible)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        {formVisible ? "Cancel" : "Add Item"}
      </button>

      {/* Add Item Form */}
      {formVisible && (
        <form
          onSubmit={handleAddItem}
          className="mt-4 bg-white shadow rounded-lg p-4 space-y-4"
        >
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
              onChange={(e) => setNewProvision({ ...newItem, quantity: e.target.value })}
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
              onChange={(e) =>
                setNewItem({ ...newItem, Price: e.target.value })
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
            Add Item
          </button>
        </form>
      )}
    </div>
  );
}

 