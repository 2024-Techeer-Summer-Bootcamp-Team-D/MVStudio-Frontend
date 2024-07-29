import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '@/App';
import Auth from './auth/Auth';
import Create from './Create';
import EditProfile from './user/EditProfile';
import LyricsSelect from './LyricsSelect';
import Main from '@/pages/main/Main';
import Mypage from './user/Mypage';
import OnBoardingPage from './OnBoardingPage';
import Pay from './Pay';
import Play from './play/Play';
import Register from './auth/Register';
import SaveTokens from './auth/SaveTokens';
import Search from './Search';
import ViewChart from './ViewChart';
import YtChannelRegister from './user/YtChannelRegister';
import Upload from './Upload';

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
          <Route path="/users" element={<YtChannelRegister />} />
          <Route path="/users/:username" element={<Mypage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/create" element={<Create />} />
          <Route path="/create/lyrics" element={<LyricsSelect />} />
          <Route path="/play" element={<Play />} />
          <Route path="/chart" element={<ViewChart />} />
          <Route path="/edit" element={<EditProfile />} />
          <Route path="/payment" element={<Pay />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </App>
    </Router>
  );
}

export default AppRouter;
