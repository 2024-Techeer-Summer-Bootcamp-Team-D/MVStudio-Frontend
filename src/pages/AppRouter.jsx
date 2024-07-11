import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mypage from './Mypage';
import Search from './Search';
import App from '../App';
import LyricsSelect from './LyricsSelect';
import MainPage from './MainPage';
import OnBoardingPage from './OnBoardingPage';
import Auth from './Auth';
import Create from './Create';
import Play from './Play';
import ViewChart from './ViewChart';
import Main from './Main';

function AppRouter() {
  return (
    <Router>
      <App>
        <Routes>
          <Route path="/" element={<OnBoardingPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/test" element={<Main />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/lyricsselect" element={<LyricsSelect />} />
          <Route path="/onboarding" element={<OnBoardingPage />} />
          <Route path="/create" element={<Create />} />
          <Route path="/play" element={<Play />} />
          <Route path="/chart" element={<ViewChart />} />
        </Routes>
      </App>
    </Router>
  );
}

export default AppRouter;
