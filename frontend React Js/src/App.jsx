
import Navbar from './components/Navigation';
import Dashboard from './components/DashboardInvestment';
import MyInvestments from './components/MyInvestments';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/Dashboard" />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/MyInvestments" element={<MyInvestments />} />
      </Routes>
    </Router>
  );
}

export default App;
