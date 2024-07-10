/* eslint-disable react/prop-types */
// src/components/Square.jsx
import React from 'react';
import styled from 'styled-components';

const SquareBox = styled.div`
<<<<<<< HEAD
  width: 100%;

=======
  width: 20rem;
  height: 38rem;
  background-image: url(https://i.ibb.co/wRs9DPv/image-removebg-preview-5.png); /* 이미지 경로 */
  background-position: center; /* 이미지 위치 조정 */
  background-repeat: no-repeat; /* 이미지 반복 금지 */
>>>>>>> develop
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
<<<<<<< HEAD
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
=======
  border-radius: 1.2rem;
  position: relative; /* 필요 시 위치 설정 */
  word-break: break-all; /* 텍스트 줄 바꿈 */
  border-radius: 2rem;
>>>>>>> develop
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
