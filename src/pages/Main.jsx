import React from 'react';
import styled from 'styled-components';

const BackLayout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function Main() {
  return <BackLayout></BackLayout>;
}

export default Main;
