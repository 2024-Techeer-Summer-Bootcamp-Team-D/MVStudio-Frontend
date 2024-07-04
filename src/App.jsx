import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import { GlobalStyles } from './GlobalStyles';
import './index.css';
import styled from 'styled-components';

const Backlayout = styled.div`
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
        </Routes>
      </Router>
    </Backlayout>
  );
}

export default App;
