import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import { GlobalStyles } from './GlobalStyles';
import './index.css';
import styled from 'styled-components';
import MainPage from './pages/MainPage';

const Backlayout = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
`;
function App() {
  return (
    <Backlayout>
      <Router>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Main" element={<MainPage />} />
        </Routes>
      </Router>
    </Backlayout>
  );
}

export default App;
