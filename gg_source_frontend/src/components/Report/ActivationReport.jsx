import React, { useState, useEffect } from "react";
import axios from "axios"; // we'll use axios for API calls
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ActivationReport = () => {
  const [sortOrder, setSortOrder] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [activation, setActivation] = useState([]); // table data
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // yahan apni API ka endpoint likho 👇
        const res = await axios.get("http://localhost:5000/api/activationreport");
        setActivation(res.data); // assume response is an array of objects
      } catch (err) {
        console.error("Error fetching stock data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // empty dependency means it runs only once

   // 🔹 Sort logic
  const sortedData = [...activation].sort((a, b) => {
    if (sortOrder === "low") return a.smartKeys - b.smartKeys;
    if (sortOrder === "high") return b.smartKeys - a.smartKeys;
    return 0;
  });

  // ✅ Fixed: Function to download Excel file
  const downloadExcel = () => {
    if (!sortedData.length) {
      alert("No data available to download!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(sortedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Activation Report");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(fileData, "activation_report.xlsx");
  };
  

  return (
    <div className="p-2 rounded-md shadow-2xl">
      <div className="w-full py-2 flex justify-between bg-gray-300">
        <h2 className="px-2 font-semibold">Activation Report</h2>
        <button  onClick={downloadExcel} className="bg-blue-700 text-white px-3 mr-2 font-bold text-[12px] rounded-sm py-0.5">
          Download
        </button>
      </div>

      {/* Filters Section */}
      <div className="flex space-x-6 mt-4">
        <div className="flex flex-col">
          <label htmlFor="searchName" className="text-sm mb-1 font-medium">
            Name
          </label>
          <input
            id="searchName"
            type="text"
            placeholder="Search Name"
            className="w-80 border border-gray-700 rounded-sm px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sort By */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Sort By:</label>
          <div className="flex items-center bg-gray-100 rounded-md overflow-hidden">
            <button
              onClick={() => setSortOrder("low")}
              className={`px-4 py-1 text-sm font-semibold transition-all duration-200 ${
                sortOrder === "low"
                  ? "bg-blue-400 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              Low
            </button>
            <button
              onClick={() => setSortOrder("high")}
              className={`px-4 py-1 text-sm font-semibold transition-all duration-200 ${
                sortOrder === "high"
                  ? "bg-blue-400 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              High
            </button>
            <button className="ml-6 px-28 py-1 bg-blue-800 text-white text-[12px] font-semibold rounded-sm">
              APPLY
            </button>
          </div>
        </div>
      </div>

      {/* Entries per page */}
      <div className="flex flex-col mt-4">
        <span>Show</span>
        <select
          value={entriesPerPage}
          onChange={(e) => setEntriesPerPage(Number(e.target.value))}
          className="border w-14 border-gray-300 rounded-sm py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto mt-4">
        {loading ? (
          <p className="text-center py-4 text-gray-600">Loading data...</p>
        ) : (
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-gray-50">
              <tr className="text-gray-600 border-b">
                <th className="px-4 py-2 text-[12px] text-left font-medium">Sr.</th>
                <th className="px-4 py-2 text-[12px] text-left font-medium">Super Name</th>
                <th className="px-4 py-2 text-[12px] text-left font-medium">Address</th>
                <th className="px-4 py-2 text-[12px] text-left font-medium">Mobile</th>
                <th className="px-4 py-2 text-[12px] text-left font-medium">Todays Activation</th>
                <th className="px-4 py-2 text-[12px] text-left font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {sortedData.slice(0, entriesPerPage).map((item, index) => (
                <tr key={item.id || index} className="hover:bg-gray-50 border-b">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{item.supername}</td>
                  <td className="px-4 py-2">{item.address}</td>
                  <td className="px-4 py-2">{item.mobile}</td>
                  <td className="px-4 py-2">{item.todyasActivation}</td>
                  <td className="px-4 py-2">{item.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ActivationReport;
