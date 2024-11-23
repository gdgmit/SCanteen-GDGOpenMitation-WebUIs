import { useNavigate } from "react-router-dom";

function CashierUI() {
    const navigate = useNavigate();
    return (
      <>
      Cashier UI here
      <br/>
      <button
        className="bg-blue-500 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-blue-400 transition-all w-[200px] text-center m-4"
        onClick={() => navigate("orders")}
      >
        Orders
      </button>
    </>
    );
  }
  
  export default CashierUI;
  