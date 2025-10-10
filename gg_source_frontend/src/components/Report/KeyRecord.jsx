import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const KeyRecord = () => {
  const [activation, setActivation] = useState([]); // table data
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch data from API
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/keyrecordreport");
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

  // 🔹 Filtered data (currently no filters, so same as activation)
  const filteredData = activation;

  // 🔹 Download Excel
  const downloadExcel = () => {
    if (!filteredData.length) {
      alert("No data available to download!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Key Record Report");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(fileData, "keyrecord_report.xlsx");
  };

  return (
    <div className="p-2 rounded-md shadow-2xl">
      {/* Header */}
      <div className="w-full py-2 flex justify-between bg-gray-300">
        <h2 className="px-2 font-semibold">Key Record</h2>
        <button
          onClick={downloadExcel}
          className="bg-blue-700 text-white px-3 mr-2 font-bold text-[12px] rounded-sm py-0.5"
        >
          Download
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
                <th className="px-4 py-2 text-[12px] text-left font-medium">Keys</th>
                <th className="px-4 py-2 text-[12px] text-left font-medium">Transaction Type</th>
                <th className="px-4 py-2 text-[12px] text-left font-medium">Key Type</th>
                <th className="px-4 py-2 text-[12px] text-left font-medium">Assigned Date</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-3 text-gray-500 italic">
                    No data found
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{item.keys}</td>
                    <td className="px-4 py-2">{item.transactionType}</td>
                    <td className="px-4 py-2">{item.keyType}</td>
                    <td className="px-4 py-2">{item.assignedDate}</td>
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

export default KeyRecord;
