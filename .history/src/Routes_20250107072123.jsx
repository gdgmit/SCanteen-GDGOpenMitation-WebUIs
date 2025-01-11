import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminUI from "./components/admin";
import SupplierUI from "./components/supplier";
import CashierUI from "./components/cashier";
import SupplierOrders from "./components/supplier/orders";
import CashierOrders from "./components/cashier/orders";
import App from "./App";
import Provisions from "./components/admin/provisions";
import NewProvision from "./components/admin/provisions/new";
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

        <Route path="/admin/provisions/view" element={<Provisions />} />
        <Route path="/admin/provisions/new" element={<NewProvision />} />
        <Route path="/admin/profitanalysis" element={<ProfitAnalysis />} />
      </Routes>
    </Router>
  );
}

export default RoutesComponent;
