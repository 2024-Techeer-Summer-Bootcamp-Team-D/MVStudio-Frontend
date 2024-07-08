import React from 'react';
import styled from 'styled-components';

const MainPageWrapper = styled.div`
  background-image: url(https://i.ibb.co/F5pG38h/qwdascscwec-removebg-preview.png);
  background-size: 25em 23rem;
  background-position: 14rem 6rem;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
`;

const MainText = styled.div`
  color: white;
  top: 10rem;
  left: 17em;
  font-size: 2.5rem;
  position: absolute;
  font-weight: 700;
  font-family: 'suit';
`;

const MainPage = () => {
  return (
    <MainPageWrapper>
      <MainText>
        단
        <br />
        하나뿐인,
        <br />
        나만의
        <br />
        뮤직비디오
        <br />
      </MainText>
    </MainPageWrapper>
  );
};

export default MainPage;
