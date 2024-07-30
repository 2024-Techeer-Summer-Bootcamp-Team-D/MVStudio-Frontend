/* eslint-disable react/prop-types */
import React from 'react';
import './styles/index.css';
import './styles/swal.config.css';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import GlobalStyles from './styles/GlobalStyles';
import Service from './components/Service';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
  width: 100%;
  min-height: calc(100vh - 5rem);
  position: relative;
`;

const ChildrenWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: calc(100% - 15rem);
  height: 100%;
  min-height: 100%;
  position: relative;
`;

function App({ children }) {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <BackLayout className="back-layout">
        <GlobalStyles />
        <Navbar />
        <ContentArea className="content-area">
          <Sidebar />
          <Service />
          <ChildrenWrapper className="children-wrapper">{children}</ChildrenWrapper>
        </ContentArea>
      </BackLayout>
    </QueryClientProvider>
  );
}

export default App;
