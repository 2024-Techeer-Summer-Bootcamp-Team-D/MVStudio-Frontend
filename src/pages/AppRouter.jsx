import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mypage from './Mypage';
import Search from './Search';
import App from '../App';
import LyricsSelect from './LyricsSelect';
import MainPage from './MainPage';
import OnBoardingPage from './OnBoardingPage';
import Auth from './auth/Auth';
import Create from './Create';
import Play from './Play';
import ViewChart from './ViewChart';
import Main from './Main';
import EditProfile from './EditProfile';
import SaveTokens from './auth/SaveTokens';
import Register from './auth/Register';

function AppRouter() {
  return (
    <Router>
      <App>
        <Routes>
          <Route path="/" element={<OnBoardingPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/:loginType" element={<SaveTokens />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/test" element={<Main />} />
          <Route path="/users/:username" element={<Mypage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/lyricsselect" element={<LyricsSelect />} />
          <Route path="/onboarding" element={<OnBoardingPage />} />
          <Route path="/create" element={<Create />} />
          <Route path="/play" element={<Play />} />
          <Route path="/chart" element={<ViewChart />} />
          <Route path="/edit" element={<EditProfile />} />
        </Routes>
      </App>
    </Router>
  );
}

export default AppRouter;
