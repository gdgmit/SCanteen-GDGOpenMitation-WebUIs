import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const SupplierOrders = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("paid");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/data/scanteen_orders_sampledata.json");
        const data = await response.json();
        console.log("Orders fetched:", data);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handlesetDelivered = (orderID) => {
    console.log(`Order ${orderID} marked as paid.`);
    setOrders((prev) => prev.filter((order) => order.order_ID !== orderID));
  };

  return (
    <div className="w-full bg-[#D9D9D96B]">

      {/* Tabs */}
      <div className="flex justify-center border-b mb-4 bg-[#D9D9D99E] w-full">
        <button
          className={`px-4 py-2 transition-all  h-16 flex-1 ${
            activeTab === "not_paid"
              ? "border-b-2 border-r-2 border-[#5777C7] font-bold bg-[#d0d0d09e]"
              : "text-gray-950"
          }`}
          onClick={() => setActiveTab("not_paid")}
        >
          Scanned Orders
        </button>
        <button
          className={`px-4 py-2 transition-all flex-1 ${
            activeTab === "paid"
              ? "border-b-2 border-l-2 border-[#5777C7] font-bold bg-[#d0d0d09e]"
              : "text-gray-950"
          }`}
          onClick={() => setActiveTab("paid")}
        >
          Pending Scans
        </button>
      </div>

      {/* Orders List */}
      <div className="transition-all h-full pb-4">
        {orders
          .filter((order) =>
            activeTab === "paid"
              ? order.payment_status === "paid"
              : order.payment_status === "not paid"
          )
          .map((order) => (
            <div
            key={order.order_ID}
            className="border border-[] bg-white rounded-3xl w-[90%] p-4 mb-4 flex flex-col mx-auto sm:flex-row justify-between items-start sm:items-stretch shadow-lg"
          >
            {/* Left Container */}
            <div className="flex-1 ml-3">
              <h3 className="font-bold text-lg mb-2" >
                Order ID: <span className="text-[#5777C7] "> {order.order_ID} </span>
              </h3>
              {order.items.map((item, idx) => (
                <p key={idx} className="text-gray-700">
                  {item.name} x <span className="text-[#5777C7] "> {item.quantity} </span>
                </p>
              ))}
              <p className="font-bold mt-2">Total: ₹{order.total_amount}</p>
            </div>

              {/* Right Container */}
              <div className="sm:w-[150px] w-full flex flex-col justify-between mr-3">
              <p className="text-sm text-black py-3 sm:py-0 text-end">
                 {dayjs(order.order_date, "DD-MM-YYYY hh.mm:ss A").format("DD/MM hh.mm A")}
              </p>
              <button
                className="bg-[#5777C7] text-white px-4 py-2 rounded-full hover:bg-[#2250c7] transition"
                onClick={() => handlesetDelivered(order.order_ID)}
                >
                  Set Delivered
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SupplierOrders;
