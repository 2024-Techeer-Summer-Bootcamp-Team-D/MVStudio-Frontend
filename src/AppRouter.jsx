import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Auth from './pages/auth/Auth';
import Create from './pages/create/Create';
import EditProfile from './pages/user/EditProfile';
import LyricsSelect from './pages/create/LyricsSelect';
import Main from './pages/Main';
import Mypage from './pages/user/Mypage';
import OnBoardingPage from './pages/OnBoardingPage';
import Pay from './pages/Pay';
import Play from './pages/Play';
import Register from './pages/auth/Register';
import SaveTokens from './pages/auth/SaveTokens';
import Search from './pages/Search';
import ViewChart from './pages/ViewChart';
import YtChannelRegister from './pages/user/YtChannelRegister';

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
        </Routes>
      </App>
    </Router>
  );
}

export default AppRouter;
