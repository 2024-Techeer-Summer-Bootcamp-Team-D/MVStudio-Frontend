/* OnBoardingPage.js */
import React from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  height: 500vh;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100vw;
`;

const Section = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  animation: ${slideIn} 1s ease forwards; /* Section이 나타날 때 slideIn 애니메이션 적용 */
`;

const Title = styled.div`
  color: white;
  font-size: 5.5rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-left: 10rem;
  margin-top: -20rem;
`;

const FirstText = styled.div`
  color: white;
  font-size: 3rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-left: 10rem;
  margin-top: 2rem;
`;

const GreyText = styled.div`
  color: gray;
`;

const PurpleText = styled.div`
  color: #421168;
`;

const Mac1 = styled.img`
  width: 42rem;
  height: 28rem;
  position: relative;
  margin-left: 10rem;
`;

const SecondText = styled.div`
  color: white;
  font-size: 2.5rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-left: 18rem;
`;

const Mac2 = styled.img`
  width: 42rem;
  height: 28rem;
  position: relative;
  margin-left: 8rem;
`;

const ThirdText = styled.div`
  color: white;
  font-size: 2.5rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-left: 7rem;
`;

const Connect = styled.div`
  display: flex;
`;

const Insta = styled.img`
  width: 35rem;
  height: 38rem;
  position: relative;
  margin-left: 5rem;
`;

const FourthText = styled.div`
  color: white;
  font-size: 2.5rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-left: 18rem;
`;

const FifthText = styled.div`
  color: white;
  font-size: 3rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-left: 30rem;
  margin-bottom: 5rem;
  text-align: center;
`;

const CircleGlass = styled.img`
  width: 10rem;
  height: 10rem;
  position: relative;
  margin-left: -4rem;
  margin-top: -45rem;
  filter: blur(2px);
`;

const SecondCircleGlass1 = styled.img`
  width: 8rem;
  height: 8rem;
  position: absolute;
  margin-left: 20rem;
  margin-top: -40rem;
  filter: blur(2px);
`;

const SecondCircleGlass2 = styled.img`
  width: 8rem;
  height: 8rem;
  position: absolute;
  margin-left: 85rem;
  margin-top: 45rem;
  filter: blur(2px);
`;

const FirstLeftGlass = styled.img`
  width: 20rem;
  height: 20rem;
  position: relative;
  margin-left: -16rem;
  margin-top: 25rem;
  filter: blur(2px);
`;

const TwistGlass = styled.img`
  width: 15rem;
  height: 15rem;
  position: absolute;
  margin-left: -5rem;
  margin-top: 50rem;
  filter: blur(2px);
`;

const TearGlass1 = styled.img`
  width: 5rem;
  height: 5rem;
  position: absolute;
  margin-left: 80rem;
  margin-top: 40rem;
  filter: blur(2px);
`;

const ReactGlass = styled.img`
  width: 15rem;
  height: 15rem;
  position: absolute;
  margin-left: 90rem;
  margin-top: 35rem;
  filter: blur(2px);
`;

const MainGlass = styled.img`
  width: 50rem;
  height: 50rem;
  position: absolute;
  margin-left: 73rem;
  filter: blur(2px);
`;

const StyledButton = styled.button`
  background-color: #3d0758;
  width: 13rem;
  height: 2.5rem;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  font-family: 'suit';
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  margin-top: 10rem;
  margin-left: -25.5rem;
`;

const handleClick = () => {};

const OnBoardingPage = () => {
  return (
    <Container>
      <Section>
        <CircleGlass src="https://i.ibb.co/f2gnqxw/image.png" />
        <FirstLeftGlass src="https://i.ibb.co/BzSg1mg/image.png" />
        <Title>MVStudio</Title>
        <FirstText>
          <GreyText>
            단
            <br />
            하나뿐인,
            <br />
          </GreyText>
          나만의
          <br />
          뮤직비디오
          <br />
        </FirstText>
        <MainGlass src="https://i.ibb.co/qsF0KL8/image.png" />
      </Section>
      <Section>
        <SecondCircleGlass1 src="https://i.ibb.co/f2gnqxw/image.png" />
        <SecondText>
          <GreyText>당신의 아이디어,</GreyText>
          모두 여기에.
        </SecondText>
        <Mac1 src="https://i.ibb.co/7NqqQkk/Second-Page-Mac-removebg-preview.png" />
        <SecondCircleGlass2 src="https://i.ibb.co/f2gnqxw/image.png" />
      </Section>
      <Section>
        <TwistGlass src="https://i.ibb.co/wLPMNtf/image.png" />
        <Mac2 src="https://i.ibb.co/h9R1pCh/qwdwqdqwd-removebg-preview.png" />
        <ThirdText>
          <GreyText>
            힙합부터
            <br />
            재즈까지,
          </GreyText>
          <Connect>
            <PurpleText>유니크한</PurpleText>&nbsp;뮤직비디오
          </Connect>
        </ThirdText>
        <TearGlass1 src="https://i.ibb.co/jL01sDq/image.png" />
      </Section>
      <Section>
        <FourthText>
          <Connect>
            <GreyText>나만의 뮤직비디오</GreyText>를
          </Connect>
          <Connect>
            <PurpleText>소셜 계정</PurpleText>에
          </Connect>
          손쉽게 공유
        </FourthText>
        <Insta src="https://i.ibb.co/WcQcFpM/qqefmqklem-removebg-preview.png" />
        <ReactGlass src="https://i.ibb.co/9rb8mGv/image.png" />
      </Section>
      <Section>
        <FifthText>
          모든 기능이 준비되어 있으니,
          <br /> 지금 한번 시도해 보세요.
        </FifthText>
        <StyledButton onClick={handleClick}>Start</StyledButton>
      </Section>
    </Container>
  );
};

export default OnBoardingPage;
