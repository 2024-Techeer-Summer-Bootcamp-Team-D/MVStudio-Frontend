import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '@/App';
import Auth from './auth/Auth';
import Create from './Create';
import EditProfile from './EditProfile';
import LyricsSelect from './LyricsSelect';
import Main from '@/pages/Main';
import Mypage from './Mypage';
import OnBoardingPage from './OnBoardingPage';
import Pay from './Pay';
import Play from './Play';
import Register from './auth/Register';
import SaveTokens from './auth/SaveTokens';
import Search from './Search';
import ViewChart from './ViewChart';

function AppRouter() {
  return (
    <Router>
      <App>
        <Routes>
          <Route path="/" element={<OnBoardingPage />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/:loginType" element={<SaveTokens />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/main" element={<Main />} />
          <Route path="/users/:id" element={<Mypage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/lyricsselect" element={<LyricsSelect />} />
          <Route path="/create" element={<Create />} />
          <Route path="/play" element={<Play />} />
          <Route path="/chart" element={<ViewChart />} />
          <Route path="/edit" element={<EditProfile />} />
          <Route path="/payment" element={<Pay />} />
        </Routes>
      </App>
    </Router>
  );
}

export default AppRouter;
