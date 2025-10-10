import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const SalesReport = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("");

  // 🔹 Fetch Sales Data
  const fetchSalesData = async (filter = "") => {
    try {
      setLoading(true);
      let url = "http://localhost:5000/api/salesreport";
      if (filter) url += `?filter=${filter}`;
      const res = await axios.get(url);
      setSalesData(res.data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  // 🔹 Filter Click Handler
  const handleFilterClick = (filterType) => {
    setActiveFilter(filterType);
    fetchSalesData(filterType);
  };

  // ✅ DOWNLOAD EXCEL FUNCTION
  const downloadExcel = () => {
    if (!salesData.length) {
      alert("No data available to download!");
      return;
    }

    // Optional: format column names for Excel
    const formattedData = salesData.map((item, index) => ({
      "Sr. No": index + 1,
      Name: item.name,
      "Smart Keys": item.smartKeys,
      "Smart Free Keys": item.smartFreeKeys,
      "Ultra Smart Keys": item.ultraSmartKeys,
      "Ultra Smart Free Keys": item.ultraSmartFreeKeys,
    }));

    // Convert JSON → Sheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");

    // Convert sheet to Excel buffer
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // Create Blob and save file
    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(fileData, "sales_report.xlsx");
  };

  return (
    <div className="p-3 rounded-md shadow-2xl">
      {/* Header + Download Button */}
      <div className="w-full bg-gray-300 flex justify-between items-center px-2">
        <h1 className="p-2 font-semibold">Sales Report</h1>
        <button
          onClick={downloadExcel}
          className="bg-blue-700 text-white px-3 font-bold text-[12px] rounded-sm py-1 hover:bg-blue-600 transition duration-200"
        >
          DOWNLOAD
        </button>
      </div>

      {/* Filters Section */}
      <div className="mt-4">
        <div className="flex items-end space-x-4">
          {/* Name Search */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Search name"
              className="w-xl border border-gray-400 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex space-x-2 mb-1">
            <p
              onClick={() => handleFilterClick("week")}
              className={`rounded-full px-3 py-1 text-sm font-semibold cursor-pointer transition ${
                activeFilter === "week"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              Last Week
            </p>
            <p
              onClick={() => handleFilterClick("month")}
              className={`rounded-full px-3 py-1 text-sm font-semibold cursor-pointer transition ${
                activeFilter === "month"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              Last Month
            </p>
          </div>
        </div>

        {/* Date Filters */}
        <div className="flex items-end space-x-4 mt-4">
          {/* From Date */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-70 border border-gray-400 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* To Date */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-70 border border-gray-400 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Apply/Reset Buttons */}
      <div className="text-center space-x-8 mt-3">
        <button
          onClick={() => fetchSalesData()}
          className="text-white text-sm font-semibold px-32 rounded-sm py-1 bg-blue-800 hover:bg-blue-600"
        >
          APPLY
        </button>
        <button
          onClick={() => {
            setActiveFilter("");
            fetchSalesData();
          }}
          className="text-white text-sm font-semibold px-32 rounded-sm py-1 bg-blue-800 hover:bg-blue-600"
        >
          RESET
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto mt-3">
        {loading ? (
          <p className="text-center py-4 text-gray-600">Loading data...</p>
        ) : (
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-gray-50">
              <tr className="text-gray-600 border-b">
                <th className="px-4 py-2 text-left font-medium">Sr.</th>
                <th className="px-4 py-2 text-left font-medium">Name</th>
                <th className="px-4 py-2 text-left font-medium">Smart Keys</th>
                <th className="px-4 py-2 text-left font-medium">Smart Free Keys</th>
                <th className="px-4 py-2 text-left font-medium">Ultra Smart Keys</th>
                <th className="px-4 py-2 text-left font-medium">Ultra Smart Free Keys</th>
                <th className="px-4 py-2 text-left font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {salesData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-3 text-gray-500 italic">
                    No data found
                  </td>
                </tr>
              ) : (
                salesData.map((item, index) => (
                  <tr key={item.id || index} className="hover:bg-gray-50 border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.smartKeys}</td>
                    <td className="px-4 py-2">{item.smartFreeKeys}</td>
                    <td className="px-4 py-2">{item.ultraSmartKeys}</td>
                    <td className="px-4 py-2">{item.ultraSmartFreeKeys}</td>
                    <td className="px-4 py-2">
                      <button className="text-white px-2 py-1 rounded-md bg-blue-700">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SalesReport;
