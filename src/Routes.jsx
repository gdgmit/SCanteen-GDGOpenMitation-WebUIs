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

// Admin components
import AdminLogin from "./components/admin/LoginPages/AdminLogin";
import AdminSignUp from "./components/admin/LoginPages/AdminSignUp";

// Supplier components
import SupplierLogin from "./components/supplier/LoginPages/SupplierLogin";
import SupplierSignUp from "./components/supplier/LoginPages/SupplierSignUp";

// Cashier components
import CashierLogin from "./components/cashier/LoginPages/CashierLogin";
import CashierSignUp from "./components/cashier/LoginPages/CashierSignUp";

import Navbar from "./components/Navbar";
import Provisions from "./components/admin/provisions";
import ProfitAnalysis from "./components/admin/profitanalysis";
import { ProvisionsPage } from "./components/admin/provisions/ProvisionPage";
import { ProductManager } from "./components/admin/ProductAdder";
import { MenuAdderCashier} from "./components/cashier/menuAdder";
import { MenuAdderSupplier } from "./components/supplier/menuAdder";



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


        {/* Login and Signup Routes for Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignUp />} />

        {/* Login and Signup Routes for Supplier */}
        <Route path="/supplier/login" element={<SupplierLogin />} />
        <Route path="/supplier/signup" element={<SupplierSignUp />} />

        {/* Login and Signup Routes for Cashier */}
        <Route path="/cashier/login" element={<CashierLogin />} />
        <Route path="/cashier/signup" element={<CashierSignUp />} />

        <Route path="/admin/dashboard/:u_id" element={<AdminDashBoard />} />
        <Route path="/cashier/dashboard/:u_id" element={<CashierDashBoard />} />
        <Route path="/supplier/dashboard/:u_id" element={<SupplierDashBoard />} />
        <Route path="/admin/provisions/new" element={<ProvisionsPage />} />
        <Route path="/admin/provisions/view" element={<Provisions />} />
        <Route path="/admin/profitanalysis" element={<ProfitAnalysis />} />
        <Route path="admin/new_product" element ={<ProductManager />} />
        <Route path= "/cashier/menu" element ={<MenuAdderCashier />}/>
        <Route path="/supplier/menu" element={<MenuAdderSupplier />} />

      </Routes>
    </Router>
  );
}

export default RoutesComponent;
