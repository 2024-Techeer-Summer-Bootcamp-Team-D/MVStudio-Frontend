// src/components/Square.jsx
import React from 'react';
import styled from 'styled-components';

const SquareBox = styled.div`
  width: 20rem;
  height: 38rem;
  background-image: url(https://i.ibb.co/QbPDtwP/l-removebg-preview.png); /* 이미지 경로 */
  background-size: cover; /* 이미지 크기 조정 */
  background-position: center; /* 이미지 위치 조정 */
  background-repeat: no-repeat; /* 이미지 반복 금지 */
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  border-radius: 1.8rem;
  position: relative; /* 필요 시 위치 설정 */

  &::before,
  &::after {
    content: ' ';
    display: block;
    margin: 10px;
  }
`;

const Square = ({ children }) => {
  return <SquareBox>{children}</SquareBox>;
};

export default Square;
