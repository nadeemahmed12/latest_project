import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ChangeMpin from './pages/ChangeMpin';
import ChangePasswordByAdmin from './pages/ChangePasswordByAdmin';  
import Login from './pages/Login';
import Logout from './pages/Logout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/changeMpin" element={<ChangeMpin />} />
        <Route path="/changepassbyadmin" element={<ChangePasswordByAdmin />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;