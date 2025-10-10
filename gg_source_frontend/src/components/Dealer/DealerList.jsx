import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const DealerList = () => {
  const [Dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDistributors = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/list");
        setDealers(response.data);
      } catch (err) {
        console.error("Error fetching distributors:", err);
        setDealers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDistributors();
  }, []);

  // 🔍 Filtered data
  const filtered = Dealers.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.mobile.includes(searchTerm)
  );

  // 📁 Function to download Excel file
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filtered);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dealer");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(fileData, "dealer.xlsx");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        Loading...
      </div>
    );

  return (
    <div className="flex-1 flex flex-col p-1 min-h-screen">
      <div className="bg-white rounded shadow p-4 flex flex-col flex-1">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-bold text-gray-700">Dealer List</h1>

          <button
            onClick={downloadExcel}
            className="bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-600 transition duration-200"
          >

            DOWNLOAD
          </button>
        </div>

        {/* Controls */}
        <div className="flex justify-between mb-2 flex-col sm:flex-row gap-2">
          <div>
            Show{" "}
            <select
              className="border px-2 py-1 rounded"
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>{" "}
            entries
          </div>
          <div>
            Search:{" "}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-2 py-1 rounded"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Table */}
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-gray-50">
            <tr className="text-gray-600 border-b">
              {[
                "Sr.",
                "Name",
                "Company",
                "Mobile",
                "Distributor",
                "Smart keys",
                "Ultra Smart keys",
                "DOB",
                "Status",
                "Action",
              ].map((header, idx) => (
                <th
                  key={idx}
                  className="px-4 py-2 text-left text-gray-600 border-b whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filtered.slice(0, entriesPerPage).map((d, i) => (
              <tr key={d.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 whitespace-nowrap">{i + 1}</td>
                <td className="px-4 py-2 whitespace-nowrap">{d.name}</td>
                <td className="px-4 py-2 whitespace-nowrap">{d.company}</td>
                <td className="px-4 py-2 whitespace-nowrap">{d.mobile}</td>
                <td className="px-4 py-2 whitespace-nowrap">{d.distributor}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {d.smartkeys}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {d.ultrasmartKeys}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">{d.dob}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      d.status === "Active" ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {d.status}
                  </span>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="mt-2 text-sm text-gray-600">
          Showing 1 to {Math.min(entriesPerPage, filtered.length)} of{" "}
          {filtered.length} entries
        </div>
      </div>
    </div>
  );
};

export default DealerList;
