import React, { useState, useEffect } from "react";
import AppLayout from "../layouts/AppLayout";

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

  // Yahan aap API call karenge
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Aap yahan apna API endpoint dalenge /api/dashboard-stats
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
    return (
      <AppLayout
        header={
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome! Smart Key
          </h1>
        }
      >
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">Loading...</div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout
      header={
        <div className="flex items-center gap-4 justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome! Smart Key
          </h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded shadow cursor-pointer">
            Refresh
          </button>
        </div>
      }
    >
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Grid in the same order as statsData */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Available Smart Keys */}
            <div className="bg-white rounded-lg shadow p-3">
              <div className="text-3xl font-bold text-blue-600">
                {statsData.availableSmartKeys}
              </div>
              <div className="text-gray-600 mt-2">Available Smart Keys</div>
            </div>

            {/* Available Ultra Smart Keys */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl font-bold text-green-600">
                {statsData.availableUltraSmartKeys}
              </div>
              <div className="text-gray-600 mt-2">
                Available Ultra Smart Keys
              </div>
            </div>

            {/* Today's Activation Smart Keys */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl font-bold text-purple-600">
                {statsData.todayActivationSmartKeys}
              </div>
              <div className="text-gray-600 mt-2">
                Today's Activation Smart Keys
              </div>
            </div>

            {/* Today's Activation Ultra Smart Keys */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl font-bold text-orange-600">
                {statsData.todayActivationUltraSmartKeys}
              </div>
              <div className="text-gray-600 mt-2">
                Today's Activation Ultra Smart Keys
              </div>
            </div>

            {/* Total Active Clients */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl font-bold text-gray-800">
                {statsData.totalActiveClients.toLocaleString()}
              </div>
              <div className="text-gray-600 mt-2">Total Active Clients</div>
            </div>

            {/* Total Supers */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl font-bold text-orange-600">
                {statsData.totalSupers}
              </div>
              <div className="text-gray-600 mt-2">Total Supers</div>
            </div>

            {/* Total Distributors */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl font-bold text-blue-600">
                {statsData.totalDistributors}
              </div>
              <div className="text-gray-600 mt-2">Total Distributors</div>
            </div>

            {/* Total Dealers */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl font-bold text-green-600">
                {statsData.totalDealers}
              </div>
              <div className="text-gray-600 mt-2">Total Dealers</div>
            </div>

            {/* Total Sale Smart Keys */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl font-bold text-red-600">
                {statsData.totalSaleSmartKeys.toLocaleString()}
              </div>
              <div className="text-gray-600 mt-2">Total Sale Smart Keys</div>
            </div>

            {/* Total Sale Ultra Smart Keys */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl font-bold text-indigo-600">
                {statsData.totalSaleUltraSmartKeys.toLocaleString()}
              </div>
              <div className="text-gray-600 mt-2">
                Total Sale Ultra Smart Keys
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
