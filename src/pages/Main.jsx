import React from 'react';
import styled from 'styled-components';

const Backlayout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function Main() {
  return <Backlayout></Backlayout>;
}

export default Main;
