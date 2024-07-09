import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Mypage from './Mypage';
import Search from './Search';
import App from '../App';
import Join from './Join';
import Play from './Play';

function AppRouter() {
  return (
    <Router>
      <App>
        <Routes>
          <Route path="/" element={<Mypage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/play" element={<Play />} />
        </Routes>
      </App>
    </Router>
  );
}

export default AppRouter;
