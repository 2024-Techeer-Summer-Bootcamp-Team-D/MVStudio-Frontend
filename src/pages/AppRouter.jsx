import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './Main';
import MainPage from './MainPage';
import OnBoardingPage from './OnBoardingPage';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/OnBoarding" element={<OnBoardingPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
