import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center drop-shadow-lg">
        Welcome to <span className="text-blue-500">SCanteen</span>
      </h1>
      <div className="flex flex-col md:flex-row md:gap-6 gap-4">
        <button className="bg-blue-500 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-blue-400 transition-all w-full md:w-auto text-center"
        onClick={() => navigate("/admin")}>
          Admin
        </button>
        <button className="bg-blue-500 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-blue-400 transition-all w-full md:w-auto text-center"
        onClick={() => navigate("/supplier")}>
          Supplier
        </button>
        <button className="bg-blue-500 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-blue-400 transition-all w-full md:w-auto text-center"
        onClick={() => navigate("/cashier")}>
          Cashier
        </button>
      </div>
    </div>
  );
}

export default App;
