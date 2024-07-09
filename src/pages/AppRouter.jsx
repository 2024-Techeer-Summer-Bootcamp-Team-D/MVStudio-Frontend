import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Mypage from './Mypage';
import Search from './Search';
import App from '../App';
import Join from './Join';
import MainPage from './MainPage';
import OnBoardingPage from './OnBoardingPage';
import MainPageTest from './MainPageTest';

function AppRouter() {
  return (
    <Router>
      <App>
        <Routes>
          <Route path="/" element={<Mypage />} />
          <Route path="/MainPage" element={<MainPage />} />
          <Route path="/Test" element={<MainPageTest />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/Onboarding" element={<OnBoardingPage />} />
        </Routes>
      </App>
    </Router>
  );
}

export default AppRouter;
