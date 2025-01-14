import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ role }) => {
  const sampleUserId = "123"; // Replace with dynamic logic if available
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks login state
  const [showAlert, setShowAlert] = useState(false); // Tracks alert modal visibility
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Define navigation items
  const navItems = {
    admin: [
      { path: `/admin/dashboard/${sampleUserId}`, label: "Dashboard" },
      {
        label: "Provisions",
        subItems: [
          { path: "/admin/provisions/new", label: "New Provision" },
          { path: "/admin/provisions/view", label: "View Provision" },
        ],
      },
      {path: "/admin/new_product", label: "Product Adder"},
      { path: "/admin/profitanalysis", label: "Profit Analysis" },
      { path: "/logout", label: "Logout" },
    ],
    cashier: [
      { path: `/cashier/dashboard/${sampleUserId}`, label: "Dashboard" },
      { path: "/cashier/orders", label: "Orders List" },
      { path: "/cashier/menu", label: "Menu Adder" },
      { path: "/logout", label: "Logout" },
    ],
    supplier: [
      { path: `/supplier/dashboard/${sampleUserId}`, label: "Dashboard" },
      { path: "/supplier/orders", label: "Orders List" },
      { path: "/supplier/menu", label: "Menu Adder" },
      { path: "/logout", label: "Logout" },
    ],
  };

  const items = navItems[role] || [];

  // Toggle dropdown visibility
  const toggleDropdown = () => setOpenDropdown((prev) => !prev);

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpenDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle logout behavior
  const handleLogout = () => {
    if (isLoggedIn) {
      navigate("/logout");
    } else {
      setShowAlert(true); // Show alert modal
    }
  };

  return (
    <>
      <nav className="bg-customNavbar text-black w-full fixed top-16 z-10">
        <ul className="flex justify-center space-x-6 p-2 text-black text-lg items-center">
          {items.map((item, index) => (
            <li key={index} className="relative flex items-center">
              {item.subItems ? (
                <div ref={dropdownRef}>
                  <button
                    onClick={toggleDropdown}
                    className="navbar-hover px-4 py-2 rounded focus:outline-none"
                  >
                    {item.label}
                  </button>
                  {openDropdown && (
                    <ul className="absolute bg-white text-black shadow-lg mt-2 py-2 rounded">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.path}
                            className="navbar-hover block px-4 py-2"
                            onClick={() => setOpenDropdown(false)}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : item.label === "Logout" ? (
                <button
                  onClick={handleLogout}
                  className="navbar-hover px-4 py-2 rounded"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  to={item.path}
                  className="navbar-hover px-4 py-2 rounded"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Custom Alert Modal */}
      {showAlert && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 50,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "20px",
              width: "90%",
              maxWidth: "400px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Not Logged In
            </h2>
            <p style={{ fontSize: "1rem", marginBottom: "20px" }}>
              You need to log in before logging out.
            </p>
            <button
              onClick={() => setShowAlert(false)}
              style={{
                display: "block",
                margin: "0 auto",
                padding: "10px 20px",
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
