import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminUI from "./components/admin";
import AdminDashBoard from "./components/admin/dashboard";
import CashierDashBoard from "./components/cashier/dashboard";
import SupplierDashBoard from "./components/supplier/dashboard";
import SupplierUI from "./components/supplier";
import CashierUI from "./components/cashier";
import SupplierOrders from "./components/supplier/orders";
import CashierOrders from "./components/cashier/orders";
import App from "./App"; 
import Navbar from "./components/Navbar";
import Provisions from "./components/admin/provisions";
import ProfitAnalysis from "./components/admin/profitanalysis";

function RoutesComponent() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminUI />} />
        <Route path="/supplier" element={<SupplierUI />} />
        <Route path="/cashier" element={<CashierUI />} />
        <Route path="/cashier/orders" element={<CashierOrders />} />
        <Route path="/supplier/orders" element={<SupplierOrders />} />

        <Route path="/admin/dashboard/:u_id" element={<><Navbar /><AdminDashBoard /></>} />
        <Route path="/cashier/dashboard/:u_id" element={<><Navbar /><CashierDashBoard /></>} />
        <Route path="/supplier/dashboard/:u_id" element={<><Navbar /><SupplierDashBoard /></>} />

        <Route path="/admin/provisions/view" element={<Provisions />} />
        <Route path="/admin/profitanalysis" element={<ProfitAnalysis />} />

      </Routes>
    </Router>
  );
}

export default RoutesComponent;
