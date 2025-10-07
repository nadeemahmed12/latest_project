import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";

const AddSuperDistributor = () => {
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
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Email validation handler
  const handleChangeEmail = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name === "email") {
      if (!emailPattern.test(value)) {
        setError("Please enter a valid email id");
      } else {
        setError("");
      }
    }
  };

  // General input change handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-md p-4">
        {/* Header */}
        <div className="bg-gray-400 p-2 mb-4">
          <h1 className="text-sm font-bold text-gray-700">
            Add New Super Distributor
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Row 1 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter Name of Super
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name Of Super"
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
              {/* Country Code Dropdown */}
              <select
                name="countryCode"
                value={formData.countryCode || "+91"}
                onChange={handleChange}
                className="border border-gray-500 rounded-l-sm px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
              >
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+33">🇫🇷 +33</option>
                <option value="+39">🇮🇹 +39</option>
                <option value="+81">🇯🇵 +81</option>
                <option value="+86">🇨🇳 +86</option>
                <option value="+971">🇦🇪 +971</option>
              </select>

              {/* Mobile Number Input */}
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
              placeholder="Enter GST Number"
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

          {/* Row 3: Country, State, City */}
          <div className="relative overflow-visible">
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
              <option>Canada</option>
              <option>Australia</option>
              <option>Germany</option>
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
              placeholder="Search for State"
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
              placeholder="Search for City"
              className="w-full px-2 py-0.5 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Row 4: Address, Password, Confirm Password */}
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
                className="w-full px-2 py-0.5 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-400 pr-8"
              />
              <span
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <BiHide size={20} /> : <BiShow size={20} />}
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
                className="w-full px-2 py-0.5 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-400 pr-8"
              />
              <span
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <BiHide size={20} />
                ) : (
                  <BiShow size={20} />
                )}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-3 flex justify-center">
            <button
              type="submit"
              className="bg-blue-800 text-white text-sm font-bold py-1 px-32 rounded-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSuperDistributor;
