import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';
import Search from './Search';
import App from '../App';

function AppRouter() {
  return (
    <Router>
      <App>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </App>
    </Router>
  );
}

export default AppRouter;
