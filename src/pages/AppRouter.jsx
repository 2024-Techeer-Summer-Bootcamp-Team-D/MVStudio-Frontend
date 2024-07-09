import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Mypage from './Mypage';
import Search from './Search';
import App from '../App';
import ViewChart from './ViewChart';

function AppRouter() {
  return (
    <Router>
      <App>
        <Routes>
          <Route path="/" element={<Mypage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ViewChart" element={<ViewChart />} />
        </Routes>
      </App>
    </Router>
  );
}

export default AppRouter;
