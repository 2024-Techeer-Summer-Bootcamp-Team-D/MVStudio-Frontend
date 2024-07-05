import React from 'react';
import './index.css';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import AppRouter from './pages/AppRouter';
import Navbar from './components/Navbar';

const Backlayout = styled.div`
  background-image: url(https://i.ibb.co/3TyNxtw/background.png);
  background-size: 500em 500rem;
  background-repeat: no-repeat;
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
      <Navbar />
      <ContentArea>
        <Sidebar />
        <AppRouter />
      </ContentArea>
    </Backlayout>
  );
}

export default App;
