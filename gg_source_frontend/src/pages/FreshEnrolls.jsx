import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const FreshEnrolls = () => {
  const [enrolls, setEnrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all, active, pending

  useEffect(() => {
    const fetchDistributors = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/userlist");
        setEnrolls(response.data);
      } catch (err) {
        console.error("Error fetching distributors:", err);
        setEnrolls([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDistributors();
  }, []);

  // 🔍 Filtered data
  const filtered = enrolls.filter((d) => {
    const matchesSearch =
      d.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.mobile?.includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" ||
      d.status?.toLowerCase() === statusFilter.toLowerCase();

    // Date filtering logic can be added here
    return matchesSearch && matchesStatus;
  });

  // 📁 Function to download Excel file
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filtered);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Distributors");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(fileData, "distributors.xlsx");
  };

  const handleApply = () => {
    // Apply filter logic here
    console.log("Applying filters:", { fromDate, toDate, statusFilter });
  };

  const handleReset = () => {
    setFromDate("");
    setToDate("");
    setSearchTerm("");
    setStatusFilter("all");
  };

  const formatDateDisplay = (date) => {
    if (!date) return "DD-MMMM-YYYY";
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = d.toLocaleString("en", { month: "long" });
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        Loading...
      </div>
    );

  return (
    <div className="flex-1 flex flex-col p-1 min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow p-6 flex flex-col flex-1 relative">
        {/* Header Row (Title + Download Button on same line) */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">User List</h1>
          <button
            onClick={downloadExcel}
            className="bg-blue-700 text-white px-5 py-2 rounded text-sm font-medium hover:bg-blue-600 transition duration-200"
          >
            DOWNLOAD
          </button>
        </div>

        {/* Date Filters and Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* From Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* To Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Date
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Buttons */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="flex gap-2">
              {["all", "active", "pending"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium capitalize transition ${
                    statusFilter === status
                      ? status === "active"
                        ? "bg-green-600 text-white"
                        : status === "pending"
                        ? "bg-yellow-600 text-white"
                        : "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-end gap-3">
            <button
              onClick={handleApply}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
            >
              APPLY
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 flex-1"
            >
              RESET
            </button>
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Show</span>
            <select
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            >
              {[10, 25, 50, 100].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-700">entries</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr className="border-b border-gray-200">
                {[
                  "Imei",
                  "Imei2",
                  "Mobile",
                  "Dealer",
                  "Distributor",
                  "Super",
                  "Key Type",
                  "Date",
                  "Status",
                  "Action",
                ].map((header, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-600  tracking-wider whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filtered.length > 0 ? (
                filtered.slice(0, entriesPerPage).map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {d.inval || "-"}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {d.inval2 || "-"}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {d.mobile}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {d.debate || "-"}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {d.distributor || d.name}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {d.report || "-"}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {d.keyType || "-"}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-900">
                      {d.date || d.dob || "-"}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          d.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : d.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {d.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm font-medium">
                      <div className="flex gap-3">
                        <button className="text-blue-600 hover:text-blue-800">
                          View
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="10"
                    className="px-6 py-12 text-center text-gray-500 text-lg font-medium"
                  >
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FreshEnrolls;
