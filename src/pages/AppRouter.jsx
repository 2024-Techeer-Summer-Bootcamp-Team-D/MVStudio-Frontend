import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Mypage from './Mypage';
import Search from './Search';
import App from '../App';
import EditProfile from './EditProfile';

function AppRouter() {
  return (
    <Router>
      <App>
        <Routes>
          <Route path="/" element={<Mypage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/edit" element={<EditProfile />} />
        </Routes>
      </App>
    </Router>
  );
}

export default AppRouter;
