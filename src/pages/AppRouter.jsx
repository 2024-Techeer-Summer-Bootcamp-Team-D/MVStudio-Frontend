import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Main from './Main';
import Mypage from './Mypage';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mypage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
