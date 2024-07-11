import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mypage from './Mypage';
import Search from './Search';
import App from '../App';
import LyricsSelect from './LyricsSelect';
import MainPage from './MainPage';
import OnBoardingPage from './OnBoardingPage';
import MainPageTest from './MainPageTest';
import Auth from './Auth';

function AppRouter() {
  return (
    <Router>
      <App>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Mypage />} />
          <Route path="/MainPage" element={<MainPage />} />
          <Route path="/Test" element={<MainPageTest />} />
          <Route path="/search" element={<Search />} />
          <Route path="/lyricsselect" element={<LyricsSelect />} />
          <Route path="/Onboarding" element={<OnBoardingPage />} />
        </Routes>
      </App>
    </Router>
  );
}

export default AppRouter;
