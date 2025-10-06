import AppLayout from "../layouts/AppLayout";
import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";

const ChangePasswordByAdmin = () => {
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  return (
    <AppLayout>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
          Change Password By Admin
        </h2>
        {/* Form Start */}
        <form className="space-y-4">
          {/* Select Role Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Select Role Type
            </label>
            <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200">
              <option value="">Select User</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* Select User */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Select User
            </label>
            <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200">
              <option value="">Select User</option>
              <option value="user1">Chirag Gupta</option>
              <option value="user2">User 2</option>
            </select>
          </div>

          {/* Enter New MPIN */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Enter New Password
            </label>
            <div className="relative">
              <input
                type={showNewPass ? "text" : "password"}
                placeholder="Enter New Password"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 pr-10"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowNewPass((v) => !v)}
              >
                {showNewPass ? <BiShow size={20} /> : <BiHide size={20} />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Enter Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPass ? "text" : "password"}
                placeholder="Confirm New Password"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 pr-10"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPass((v) => !v)}
              >
                {showConfirmPass ? <BiShow size={20} /> : <BiHide size={20} />}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
        {/* Form End */}
      </div>
    </AppLayout>
  );
};

export default ChangePasswordByAdmin;
