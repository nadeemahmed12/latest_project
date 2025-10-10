import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";

const ChangeMyPassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your password change logic here
    console.log("Password change submitted:", formData);

    // Add validation and API call here
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password don't match!");
      return;
    }

    // If validation passes, proceed with password change
    alert("Password changed successfully!");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
        Change My Password
      </h2>

      {/* Form Start */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Current Password */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Enter Current Password
          </label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Enter Current Password"
              className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowCurrent((prev) => !prev)}
            >
              {showCurrent ? <BiShow size={20} /> : <BiHide size={20} />}
            </span>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Enter New Password
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter New Password"
              className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowNew((prev) => !prev)}
            >
              {showNew ? <BiShow size={20} /> : <BiHide size={20} />}
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Enter Confirm Password"
              className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowConfirm((prev) => !prev)}
            >
              {showConfirm ? <BiShow size={20} /> : <BiHide size={20} />}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition duration-200 font-medium"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeMyPassword;
