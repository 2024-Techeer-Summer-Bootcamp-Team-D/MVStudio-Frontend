import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Mypage from './Mypage';
import Search from './Search';
import App from '../App';
import Create from './Create';
import Join from './Join';
import LyricsSelect from './LyricsSelect';
import MainPage from './MainPage';
import OnBoardingPage from './OnBoardingPage';
import Play from './Play';
import ViewChart from './ViewChart';

function AppRouter() {
  return (
    <Router>
      <App>
        <Routes>
          <Route path="/MyPage" element={<Mypage />} />
          <Route path="/MainPage" element={<MainPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/lyricsselect" element={<LyricsSelect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/join" element={<Join />} />
          <Route path="/" element={<OnBoardingPage />} />
          <Route path="/play" element={<Play />} />
          <Route path="/Chart" element={<ViewChart />} />
        </Routes>
      </App>
    </Router>
  );
}

export default AppRouter;
