import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import AddSuperDistributor from "./components/SuperDistributor/AddDistributor";
import ListOfDistributor from "./components/SuperDistributor/ListOfDistributor";
import ChangeMpin from "./pages/ChangeMpin";
import ChangePasswordByAdmin from "./pages/ChangePasswordByAdmin";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Layout wrapper: Sidebar + Top navbar har page pe */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addDistributor" element={<AddSuperDistributor />} />
          <Route path="/listofDistributor" element={<ListOfDistributor />} />
          <Route path="/changempin" element={<ChangeMpin />} />
          <Route path="/changepassadmin" element={<ChangePasswordByAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
