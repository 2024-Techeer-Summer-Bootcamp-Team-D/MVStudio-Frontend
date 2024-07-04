import React from 'react';
import styled from 'styled-components';

const Frame = styled.div`
  width: 45rem;
  height: 40rem;
  border-radius: 1rem;
  background: linear-gradient(to right, #2e172f, #150f11);
  display: flex;
`;
function Authframe() {
  return <Frame></Frame>;
}

export default Authframe;
