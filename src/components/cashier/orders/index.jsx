import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const CashierOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/data/scanteen_orders_sampledata.json");
        const data = await response.json();
        setOrders(data.filter((order) => order.payment_mode === 'cash' && order.payment_status === 'not paid' && order.isScanned === false));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleSetPaid = (orderID) => {
    // TODO: Implement API call to mark order as paid

    // Remove order from the list
    console.log(`Order ${orderID} marked as paid.`);
    setOrders((prev) => prev.filter((order) => order.order_ID !== orderID));
  };

  return (
    <div className="p-4 w-full mx-auto bg-[#D9D9D96B] min-h-[100vh]">
      <h1 className="text-2xl font-bold mb-4 text-center">Current Orders</h1>

      {/* Orders List */}
      <div className="transition-all h-full">
        {orders.map((order) => (
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
                onClick={() => handleSetPaid(order.order_ID)}
              >
                Set Paid
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CashierOrders;
