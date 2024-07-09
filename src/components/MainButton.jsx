/* eslint-disable react/prop-types */
// src/components/StyledButton.jsx
import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: linear-gradient(45deg, #b75dfd 30%, #ffa9a9 90%);
  border-radius: 1rem;
  width: 20rem;
  height: 3rem;
  font-size: 1rem;
  color: white;
  text-transform: none;
  margin-top: 6rem;
`;

const MainButton = ({ onClick, children }) => {
  return <Button onClick={onClick}>{children}</Button>;
};

export default MainButton;
