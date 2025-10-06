import React, { useState } from 'react';

const AddSuperDistributor = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    company: '',
    gst: '',
    dob: '',
    country: 'India',
    state: '',
    city: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-4">
        {/* Header */}
        <div className="bg-gray-400 p-2 mb-4">
          <h1 className="text-sm font-bold text-gray-800 ">
            Add New Super Distributor
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Row 1 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enter Name of Super</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Enter Email ID</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email ID"
              className="w-full px-2 py-0.5 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <p className="text-red-500 text-xs mt-1">Please enter a valid email id</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enter Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter Mobile Number"
              className="w-full px-2 py-0.5 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Row 2 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enter Company Name</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Enter GST Number</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Enter DOB</label>
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enter Country Name</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-2 py-0.5 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <option>India</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enter State Name</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Enter City Name</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Search for city"
              className="w-full px-2 py-0.5 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Row 4: Address, Password, Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enter Address</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Enter Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="......"
              className="w-full px-2 py-0.5 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enter Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Enter Confirm Password"
              className="w-full px-2 py-0.5 border border-gray-500 rounded-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-3 flex justify-center">
            <button
              type="submit"
              className="bg-blue-800 text-white text-sm font-bold py-0.5 px-32 rounded-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 "
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
