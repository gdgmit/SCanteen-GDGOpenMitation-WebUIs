
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import '../../index.css';
import {useParams} from 'react-router-dom';

const AdminDashBoard = () => {
  const { u_id } = useParams();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    regno: "",
    phone: ""
  });
  
    const [isEditPasswordModalOpen, setIsEditPasswordModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);  // State for status modal
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [headingText, setHeadingText] = useState("Welcome to Admin Dashboard");

     // Sample data (this would typically come from an API or database)
     const sampleProfiles = {
        "123": { name: "John Doe", email: "john@example.com", phone: "9000000001" },
        "456": { name: "Jane Smith", email: "jane@example.com", phone: "9000000002" },
        "789": { name: "Alice Brown", email: "alice@example.com", phone: "9000000003" }
      };

    useEffect(() => {
        if (sampleProfiles[u_id]) {
          setProfile({
            name: sampleProfiles[u_id].name,
            email: sampleProfiles[u_id].email,
            regno: u_id,
            phone: sampleProfiles[u_id].phone
          });
          setHeadingText("Welcome to Admin Dashboard");
        } else {
          setProfile({
            name: "----",
            email: "----",
            regno: "----",
            phone: "----"
          });
          setHeadingText("Admin User Not Found in System!");
        }
      }, [u_id]);
  
    const handlePasswordEditClick = () => {
      setIsEditPasswordModalOpen(true);
      setErrorMessage('');
      setSuccessMessage('');
    };
  
    const handleCloseModal = () => {
      setIsEditPasswordModalOpen(false);
    };
  
    const handleSaveChanges = (e) => {
      e.preventDefault();
    
      // Reset the messages before validation
      setErrorMessage('');
      setSuccessMessage('');
    
      // Validate the passwords
      if (!currentPassword || !newPassword || !confirmPassword) {
        setErrorMessage("All fields are required.");
        console.log("Error: All fields are required.");
        return;
      }
    
      if (newPassword !== confirmPassword) {
        setErrorMessage("New password and confirmation password do not match.");
        console.log("Error: Passwords do not match.");
        return;
      }
      
      // Password strength validation using regex
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!passwordRegex.test(newPassword)) {
          setErrorMessage("Password must be at least 8 characters long, contain a mix of uppercase and lowercase letters, numbers, and at least one special character.");
          console.log("Error: Password does not meet strength requirements.");
          return;
      }

      // If validation passes, set success message
      setSuccessMessage("Password changed successfully!");
      console.log("Success: Password changed successfully!");
    
      // Clear the fields after success
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    
      // Close the password edit modal
      handleCloseModal();
    
      // Open the status modal after password change
      setIsStatusModalOpen(true);
    };
      
    const handleCloseStatusModal = () => {
      setIsStatusModalOpen(false);
      setErrorMessage('');  // Optionally reset messages
      setSuccessMessage('');  // Optionally reset messages
    };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Header */}
      <header className="bg-gray-200 w-full py-3 text-center text-2xl font-bold fixed top-0 z-10">
        SCanteen
      </header>

      {/* Navbar */}
      <div>
        <Navbar role="admin" />
      </div>

      {/* Main/page Content */}
      <div className="pt-32 px-6 flex justify-center">
        <div className="max-w-3xl w-full">
          <h2 className="text-xl font-semibold mb-5 text-customBlue text-center">{headingText}</h2>

          {/* Profile Details Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-bold text-customBlue mb-4 text-center">Profile Details</h3>
            <div className="space-y-4">
              {/* Name and Reg Number aligned side by side */}
              <div className="flex justify-between">
                <div className="w-1/2 pr-2">
                  <label className="font-medium">Name:</label>
                  <div className="mt-1 px-3 py-1 bg-gray-100 rounded">{profile.name}</div>
                </div>
                <div className="w-1/2 pl-2">
                  <label className="font-medium">Reg Number:</label>
                  <div className="mt-1 px-3 py-1 bg-gray-100 rounded">{profile.regno}</div>
                </div>
              </div>

              {/* Email and Phone Number aligned side by side */}
              <div className="flex justify-between">
                <div className="w-1/2 pr-2">
                  <label className="font-medium">Email:</label>
                  <div className="mt-1 px-3 py-1 bg-gray-100 rounded">{profile.email}</div>
                </div>
                <div className="w-1/2 pl-2">
                  <label className="font-medium">Phone Number:</label>
                  <div className="mt-1 px-3 py-1 bg-gray-100 rounded">{profile.phone}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Password Edit Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold text-customBlue mb-2">Change Password</h3>
            <p className="mb-4">To change your password, click the button below.</p>
            <button
              onClick={handlePasswordEditClick}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
            >
              Edit Password
            </button>
          </div>

          {/* Password Edit Modal */}
          {isEditPasswordModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
              <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h3 className="text-lg font-semibold mb-4">Edit Password</h3>
                <form onSubmit={handleSaveChanges}>
                  <div className="mb-4">
                    <label htmlFor="current-password" className="block text-sm font-medium">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="current-password"
                      name="current-password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="new-password" className="block text-sm font-medium">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="new-password"
                      name="new-password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="confirm-password" className="block text-sm font-medium">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirm-password"
                      name="confirm-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded"
                      placeholder="Confirm new password"
                    />
                  </div>

                  {errorMessage && (
                    <div className="text-red-600 text-sm mb-4">
                      <strong>{errorMessage}</strong>
                    </div>
                  )}
                  {successMessage && (
                    <div className="text-green-600 text-sm mb-4">
                      <strong>{successMessage}</strong>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-customBlue text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Password Change Status Modal */}
          {isStatusModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
                  <div className="bg-white p-6 rounded-lg shadow-md w-96">
                    <h3 className="text-lg font-semibold mb-4">Password Change Status</h3>
                    <div className="mb-4">
                      {successMessage ? (
                        <p className="text-green-600">{successMessage}</p>
                      ) : errorMessage ? (
                        <p className="text-red-600">{errorMessage}</p>
                      ) : (
                        <p className="text-gray-600">No message available.</p>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={handleCloseStatusModal}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}


        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;

