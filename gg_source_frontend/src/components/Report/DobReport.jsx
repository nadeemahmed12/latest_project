import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const DobReport = () => {
  const [activation, setActivation] = useState([]); // table data
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchName, setSearchName] = useState("");

  // 🔹 Fetch data from API
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/activationreport");
      setActivation(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Filter data locally (by name and date)
  const filteredData = activation.filter((item) => {
    const matchesName = item.name
      ?.toLowerCase()
      .includes(searchName.toLowerCase());
    const matchesDate =
      (!fromDate || new Date(item.dob) >= new Date(fromDate)) &&
      (!toDate || new Date(item.dob) <= new Date(toDate));
    return matchesName && matchesDate;
  });

  // 🔹 Download Excel
  const downloadExcel = () => {
    if (!filteredData.length) {
      alert("No data available to download!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DOB Report");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(fileData, "dob_report.xlsx");
  };

  // 🔹 Reset filters
  const resetFilters = () => {
    setFromDate("");
    setToDate("");
    setSearchName("");
  };

  return (
    <div className="p-2 rounded-md shadow-2xl">
      {/* Header */}
      <div className="w-full py-2 flex justify-between bg-gray-300">
        <h2 className="px-2 font-semibold">Super DOB Report</h2>
        <button
          onClick={downloadExcel}
          className="bg-blue-700 text-white px-3 mr-2 font-bold text-[12px] rounded-sm py-0.5"
        >
          Download
        </button>
      </div>

      {/* Filters */}
      <div className="flex space-x-6 mt-4">
        {/* Search by name */}
        <div className="flex flex-col">
          <label htmlFor="searchName" className="text-sm mb-1 font-medium">
            Name
          </label>
          <input
            id="searchName"
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search Name"
            className="w-80 border border-gray-700 rounded-sm px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* From Date */}
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From Date
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-60 border border-gray-400 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* To Date */}
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To Date
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-60 border border-gray-400 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Apply/Reset Buttons */}
      <div className="text-center space-x-8 mt-3">
        <button
          onClick={fetchData}
          className="text-white text-sm font-semibold px-32 rounded-sm py-1 bg-blue-800 hover:bg-blue-600"
        >
          APPLY
        </button>
        <button
          onClick={resetFilters}
          className="text-white text-sm font-semibold px-32 rounded-sm py-1 bg-blue-800 hover:bg-blue-600"
        >
          RESET
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-4">
        {loading ? (
          <p className="text-center py-4 text-gray-600">Loading data...</p>
        ) : (
          <table className="min-w-full border-collapse text-sm">
            <thead className="bg-gray-50">
              <tr className="text-gray-600 border-b">
                <th className="px-4 py-2 text-[12px] text-left font-medium">Sr.</th>
                <th className="px-4 py-2 text-[12px] text-left font-medium">Super Name</th>
                <th className="px-4 py-2 text-[12px] text-left font-medium">Company Name</th>
                <th className="px-4 py-2 text-[12px] text-left font-medium">Mobile Number</th>
                <th className="px-4 py-2 text-[12px] text-left font-medium">Date Of Birth</th>
                <th className="px-4 py-2 text-[12px] text-left font-medium">Age</th>
                <th className="px-4 py-2 text-[12px] text-left font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-3 text-gray-500 italic">
                    No data found
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.company}</td>
                    <td className="px-4 py-2">{item.mobile}</td>
                    <td className="px-4 py-2">{item.dob}</td>
                    <td className="px-4 py-2">{item.age}</td>
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

export default DobReport;
