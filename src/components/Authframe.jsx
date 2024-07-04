/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Frame = styled.div`
  width: 45rem;
  height: 40rem;
  border-radius: 1rem;
  background: linear-gradient(to right, #2e172f, #150f11);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;
function Authframe({ children }) {
  return <Frame>{children}</Frame>;
}

export default Authframe;
