import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const Frame = styled.div`
  width: 90%;
  margin: 40px auto;
  text-align: center;
`;

const CustomButton = styled.button`
  width: 8rem;
  height: 2.5rem;
  color: #fff;
  border-radius: 1rem;
  padding: 0.6rem 1.8rem;
  font-family: 'suit', sans-serif;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  box-shadow:
    inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1),
    4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
  background: linear-gradient(0deg, #220057 0%, #360164 100%);
  border: none;

  ${(props) =>
    props.clicked &&
    css`
      box-shadow:
        4px 4px 6px 0 rgba(255, 255, 255, 0.2),
        -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
        inset -4px -4px 6px 0 rgba(255, 255, 255, 0.2),
        inset 4px 4px 6px 0 rgba(0, 0, 0, 0.4);
    `}
`;

const Main = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <Frame>
      <CustomButton
        className="custom-btn btn-2"
        clicked={isClicked}
        onClick={handleClick}
      >
        Female
      </CustomButton>
      <CustomButton
        className="custom-btn btn-2"
        clicked={isClicked}
        onClick={handleClick}
      >
        Male
      </CustomButton>
    </Frame>
  );
};

export default Main;
