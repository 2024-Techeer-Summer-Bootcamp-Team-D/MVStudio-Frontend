import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mypage from './Mypage';
import Search from './Search';
import App from '../App';

function AppRouter() {
  return (
    <Router>
      <App>
        <Routes>
          <Route path="/" element={<Mypage />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </App>
    </Router>
  );
}

export default AppRouter;
