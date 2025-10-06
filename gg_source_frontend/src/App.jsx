import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Dashboard from './pages/Dashboard';
import AddSuperDistributor from './components/SuperDistributor/AddDistributor';
import ListOfDistributor from './components/SuperDistributor/ListOfDistributor';

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout wrapper: Sidebar + Top navbar har page pe */}
        <Route element={<AppLayout />}>
          <Route index element={<Dashboard />} /> {/* Default route */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addDistributor" element={<AddSuperDistributor />} />
          <Route path="/listofDistributor" element={<ListOfDistributor />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
