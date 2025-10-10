import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import AddSuperDistributor from "./components/SuperDistributor/AddDistributor";
import ListOfDistributor from "./components/SuperDistributor/ListOfDistributor";
import AddDistributor from "./components/Distributor/AddDistributor";
import DistributorList from "./components/Distributor/DistibutorList";
import ChangeMpin from "./pages/ChangeMpin";
import ChangePasswordByAdmin from "./pages/ChangePasswordByAdmin";
import Login from "./pages/Login";
import ChangeMyPassword from "./pages/ChangeMyPassword";
import Banner from "./pages/Banner";
import Notification from "./pages/Notification";
import SalesReport from "./components/Report/SalesReport";
import StockReport from "./components/Report/StockReport";
import DealerList from "./components/Dealer/DealerList";
import FreshEnrolls from "./pages/FreshEnrolls";
import DeviceDetails from "./pages/DeviceDetails";
import LowActivationReport from "./components/Report/LowActivationReport";
import ActivationReport from "./components/Report/ActivationReport";
import DobReport from "./components/Report/DobReport";
import KeyRecord from "./components/Report/KeyRecord";
import AddDealer from "./components/Dealer/AddDealer";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Layout wrapper: Sidebar + Top navbar har page pe */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addsuperdistributor" element={<AddSuperDistributor />} />
          <Route path="/superdistributorlist" element={<ListOfDistributor />} />
          <Route path="/distributorlist" element={<DistributorList />} />
          <Route path="/changempin" element={<ChangeMpin />} />
          <Route path="/changepassadmin" element={<ChangePasswordByAdmin />} />
          <Route path="/changemypassword" element={<ChangeMyPassword />} />
          <Route path="/banner" element={<Banner />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/salereport" element={<SalesReport />} />
          <Route path="/stockreport" element={<StockReport />} />
          <Route path="/dealerlist" element={<DealerList />} />
          <Route path="/freshenrolls" element={<FreshEnrolls />} />
          <Route path="/devicedetail" element={<DeviceDetails />} />
          <Route path="/lowactivationreport" element={<LowActivationReport />} />
          <Route path="/activationreport" element={<ActivationReport />} />
          <Route path="/dobreport" element={<DobReport />} />
          <Route path="/keyrecord" element={<KeyRecord />} />
          <Route path="/adddealer" element={<AddDealer />} />
          <Route path="/adddistributor" element={<AddDistributor />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
