/* eslint-disable react/prop-types */
import React from 'react';
import './index.css';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

const BackLayout = styled.div`
  background-color: #0f0e0f;
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

function App({ children }) {
  return (
    <BackLayout>
      <Navbar />
      <ContentArea>
        <Sidebar />
        {children}
      </ContentArea>
    </BackLayout>
  );
}

export default App;
