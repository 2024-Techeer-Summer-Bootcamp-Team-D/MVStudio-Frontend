/* eslint-disable react/prop-types */
import React from 'react';
import './styles/index.css';
import './styles/swal.config.css';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import GlobalStyles from './styles/GlobalStyles';
import Service from './components/Service';

const BackLayout = styled.div`
  background-color: #05000a;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 5rem);
  min-height: calc(100vh - 5rem);
`;

function App({ children }) {
  return (
    <BackLayout>
      <GlobalStyles />
      <Navbar />
      <ContentArea>
        <Sidebar />
        <Service />
        {children}
      </ContentArea>
    </BackLayout>
  );
}

export default App;
