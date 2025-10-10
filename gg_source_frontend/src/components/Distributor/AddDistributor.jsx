import React, { useState, useEffect } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import axios from "axios";

const AddDistributor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    company: "",
    gst: "",
    dob: "",
    country: "India",
    state: "",
    city: "",
    address: "",
    password: "",
    confirmPassword: "",
    superDistributor: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [superDistributors, setSuperDistributors] = useState([]);
  const [loadingSuper, setLoadingSuper] = useState(true);

  // 🔹 Fetch super distributor list
  useEffect(() => {
    const fetchSuper = async () => {
      try {
        setLoadingSuper(true);
        const res = await axios.get("http://localhost:5000/api/superlist");
        setSuperDistributors(res.data); // API response data
      } catch (err) {
        console.error("Error fetching super distributors:", err);
      } finally {
        setLoadingSuper(false);
      }
    };
    fetchSuper();
  }, []);

  // 🔹 Email validation handler
  const handleChangeEmail = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name === "email") {
      if (!emailPattern.test(value)) setError("Please enter a valid email id");
      else setError("");
    }
  };

  // 🔹 General input handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="bg-gray-50 p-0">
      <div className="bg-white rounded-lg shadow-md p-4">
        {/* Header */}
        <div className="bg-gray-400 p-2 mb-4">
          <h1 className="text-sm font-bold text-gray-700">
            Add New Distributor
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Row 1 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter Name of Distributor
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name Of Distributor"
              className="w-full px-2 py-0.5 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter Email ID
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChangeEmail}
              placeholder="Enter Email ID"
              className="w-full px-2 py-0.5 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter Mobile Number
            </label>
            <div className="flex">
              <select
                name="countryCode"
                value={formData.countryCode || "+91"}
                onChange={handleChange}
                className="border border-gray-500 rounded-l-sm px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
              >
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+971">🇦🇪 +971</option>
              </select>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter Mobile Number"
                className="w-full px-2 py-0.5 border-t border-b border-r border-gray-500 rounded-r-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter Company Name
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter Company Name"
              className="w-full px-2 py-0.5 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter GST Number
            </label>
            <input
              type="text"
              name="gst"
              value={formData.gst}
              onChange={handleChange}
              placeholder="Enter GST Number (optional)"
              className="w-full px-2 py-0.5 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter DOB
            </label>
            <input
              type="text"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              placeholder="DD-MMMM-YYYY"
              className="w-full px-2 py-0.5 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Row 3 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter Country Name
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-2 py-0.5 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter State Name
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter State"
              className="w-full px-2 py-0.5 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter City Name
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter City"
              className="w-full px-2 py-0.5 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Row 4 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter Address"
              className="w-full px-2 py-0.5 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Passwords */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full px-2 py-0.5 border border-gray-500 rounded-sm pr-8 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <BiHide /> : <BiShow />}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Enter Confirm Password"
                className="w-full px-2 py-0.5 border border-gray-500 rounded-sm pr-8 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showConfirmPassword ? <BiHide /> : <BiShow />}
              </span>
            </div>
          </div>

          {/* 🔹 Super Distributor Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Super Distributor
            </label>
            <div className="relative">
              <select
                name="superDistributor"
                value={formData.superDistributor}
                onChange={handleChange}
                className="w-full px-2 py-0.5 border border-gray-500 rounded-sm appearance-none focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <option value="">Select Super Distributor</option>
                {loadingSuper ? (
                  <option>Loading...</option>
                ) : (
                  superDistributors.map((sd, idx) => (
                    <option key={idx} value={sd.name || sd.id}>
                      {sd.name || sd.id}
                    </option>
                  ))
                )}
              </select>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                ▼
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-3 flex justify-center">
            <button
              type="submit"
              className="bg-blue-800 text-white text-sm font-bold py-1 px-32 rounded-sm hover:bg-blue-700"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDistributor;
