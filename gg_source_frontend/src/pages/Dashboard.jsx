import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [statsData, setStatsData] = useState({
    availableSmartKeys: 0,
    availableUltraSmartKeys: 0,
    todayActivationSmartKeys: 0,
    todayActivationUltraSmartKeys: 0,
    totalActiveClients: 0,
    totalSupers: 0,
    totalDistributors: 0,
    totalDealers: 0,
    totalSaleSmartKeys: 0,
    totalSaleUltraSmartKeys: 0,
  });

  const [loading, setLoading] = useState(true);

  // API call here for stats
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/dashboard-stats");
      const data = await response.json();

      setStatsData({
        availableSmartKeys: data.availableSmartKeys || 0,
        availableUltraSmartKeys: data.availableUltraSmartKeys || 0,
        todayActivationSmartKeys: data.todayActivationSmartKeys || 0,
        todayActivationUltraSmartKeys: data.todayActivationUltraSmartKeys || 0,
        totalActiveClients: data.totalActiveClients || 0,
        totalSupers: data.totalSupers || 0,
        totalDistributors: data.totalDistributors || 0,
        totalDealers: data.totalDealers || 0,
        totalSaleSmartKeys: data.totalSaleSmartKeys || 0,
        totalSaleUltraSmartKeys: data.totalSaleUltraSmartKeys || 0,
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stats boxes */}
        {Object.entries(statsData).map(([key, value]) => (
          <div
            key={key}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
          >
            <div className="text-3xl font-bold text-blue-600">{value}</div>
            <div className="text-gray-600 mt-2 text-center">
              {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
