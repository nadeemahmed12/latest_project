const DeviceDetails = () => {
  return (
    <div className="bg-white p-2 space-y-4 rounded-md shadow-sm">
      
      <div className="border-b bg-gray-200 p-2 ">
        <h1 className="text-sm font-bold text-gray-800">Device Details</h1>
      </div>
        {/* Label */}
      <label className="block text-sm font-medium text-gray-700">
        Search with Loan ID or IMEI Number
      </label>

      {/* Input and Button Container */}
      <div className="flex gap-2">
        {/* Input Field */}
        <input
          type="text"
          placeholder="Enter Loan ID or IMEI Number"
          className="w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        {/* Search Button */}
        <button
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md 
                     hover:bg-blue-700 transition duration-200 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default DeviceDetails;
