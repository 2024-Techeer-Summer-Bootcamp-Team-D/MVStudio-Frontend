import React from 'react';
import './index.css';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import AppRouter from './pages/AppRouter';

const Backlayout = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: row;
`;

function App() {
  return (
    <Backlayout>
      <ContentArea>
        <Sidebar />
        <AppRouter />
      </ContentArea>
    </Backlayout>
  );
}

export default App;
