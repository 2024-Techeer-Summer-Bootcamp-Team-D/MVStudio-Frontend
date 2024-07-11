/* eslint-disable react/prop-types */
// src/components/Square.jsx
import React from 'react';
import styled from 'styled-components';

const SquareBox = styled.div`
  width: 100%;

  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  flex-direction: column;
`;
const BackgroundImg = styled.img`
  width: 50%;
  height: 50%;
`;

const Cover = styled.div`
  width: 100%;
  height: 100%;
  margin-top: -100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Square = ({ children }) => {
  return (
    <SquareBox>
      <BackgroundImg src="https://i.ibb.co/DRnrKKv/Base.png" />
      <Cover>{children}</Cover>
    </SquareBox>
  );
};

export default Square;
