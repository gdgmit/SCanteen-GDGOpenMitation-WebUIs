import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminUI from "./components/admin";
import SupplierUI from "./components/supplier";
import CashierUI from "./components/cashier";
import App from "./App"; 

function RoutesComponent() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminUI />} />
        <Route path="/supplier" element={<SupplierUI />} />
        <Route path="/cashier" element={<CashierUI />} />
      </Routes>
    </Router>
  );
}

export default RoutesComponent;
