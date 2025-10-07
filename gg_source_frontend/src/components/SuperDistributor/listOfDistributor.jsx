import React, { useState, useEffect } from "react";

const ListOfDistributor = () => {
  const [distributors, setDistributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDistributors = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/list");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDistributors(data);
      } catch (error) {
        console.error("Error fetching distributors:", error);
        setDistributors([]); // fallback empty list
      } finally {
        setLoading(false);
      }
    };

    fetchDistributors();
  }, []);

  const filteredDistributors = distributors.filter(
    (distributor) =>
      distributor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      distributor.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      distributor.mobile?.includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50  flex items-center justify-center">
        <div className="text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 ">
      <div className=" mx-auto bg-white rounded-lg shadow-md ">
        {/* Header */}
        <div className="border-b bg-gray-400 p-2 mb-4">
          <h1 className="text-sm font-bold text-gray-800">
            Super Distributor List
          </h1>
        </div>

        {/* Controls */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Show</span>
                <select
                  value={entriesPerPage}
                  onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">Search:</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search"
                className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-gray-500">Sr.</th>
                <th className="px-4 py-2 text-left text-gray-500">Name</th>
                <th className="px-4 py-2 text-left text-gray-500">Company</th>
                <th className="px-4 py-2 text-left text-gray-500">Mobile</th>
                <th className="px-4 py-2 text-left text-gray-500">Admin</th>
                <th className="px-4 py-2 text-left text-gray-500">Smart keys</th>
                <th className="px-4 py-2 text-left text-gray-500">Smart free keys</th>
                <th className="px-4 py-2 text-left text-gray-500">Ultra Smart keys</th>
                <th className="px-4 py-2 text-left text-gray-500">Ultra Smart free keys</th>
                <th className="px-4 py-2 text-left text-gray-500">DOB</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredDistributors.slice(0, entriesPerPage).map((d, i) => (
                <tr key={d.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap">{i + 1}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{d.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{d.company}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{d.mobile}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{d.admin}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{d.smartKeys}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{d.smartFreeKeys}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{d.ultraSmartKeys}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{d.ultraSmartFreeKeys}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{d.dob}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Info */}
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 text-xs">
          Showing 1 to {Math.min(entriesPerPage, filteredDistributors.length)} of{" "}
          {filteredDistributors.length} entries
        </div>
      </div>
    </div>
  );
};

export default ListOfDistributor;
