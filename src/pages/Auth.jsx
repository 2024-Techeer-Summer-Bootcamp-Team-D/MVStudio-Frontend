import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
`;

const BackLayout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoldFont = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
`;

const MarginFont = styled.p`
  font-size: 0.875rem;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 1.25rem 0 1.875rem;
`;

const Description = styled.p`
  font-size: 1rem;
`;

const StyledForm = styled.form`
  background-color: #dbd7e6; // 배경 색
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

const StyledButton = styled.button`
  border-radius: 1.25rem;
  border: none;
  cursor: pointer;
  /* background-color: #170630; */
  background-color: ${(props) =>
    props.color === 'purple'
      ? '#170630'
      : props.color === 'white'
        ? '#fff'
        : 'transparent'};
  color: ${(props) =>
    props.color === 'purple'
      ? '#fff'
      : props.color === 'white'
        ? '#170630'
        : 'transparent'};
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.75rem 2.8125rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
`;

const Container = styled.div`
  background-color: #dbd7e6; // 배경색
  border-radius: 10px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 75%;
  min-width: 55rem;
  height: 60%;
  min-height: 30rem;
`;

const FormContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
`;

const SignInContainer = styled(FormContainer)`
  left: 0;
  width: 50%;
  z-index: 2;
  transform: ${({ rightPanelActive }) =>
    rightPanelActive ? 'translateX(100%)' : 'translateX(0)'};
`;

const SignUpContainer = styled(FormContainer)`
  left: 0;
  width: 50%;
  opacity: ${({ rightPanelActive }) => (rightPanelActive ? 1 : 0)};
  z-index: ${({ rightPanelActive }) => (rightPanelActive ? 5 : 1)};
  transform: ${({ rightPanelActive }) =>
    rightPanelActive ? 'translateX(100%)' : 'translateX(0)'};
  animation: ${({ rightPanelActive }) =>
    rightPanelActive ? 'show 0.6s' : 'none'};

  @keyframes show {
    0%,
    49.99% {
      opacity: 0;
      z-index: 1;
    }

    50%,
    100% {
      opacity: 1;
      z-index: 5;
    }
  }
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  transform: ${({ rightPanelActive }) =>
    rightPanelActive ? 'translateX(-100%)' : 'translateX(0)'};
`;

const StyledInput = styled.input`
  background-color: #ffffff;
  border: none;
  padding: 0.75rem 1rem;
  margin: 0.5rem 0;
  width: 100%;
`;

const Overlay = styled.div`
  background-color: #1a0e3b;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  transform: ${({ rightPanelActive }) =>
    rightPanelActive ? 'translateX(50%)' : 'translateX(0)'};
`;

const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

const OverlayLeft = styled(OverlayPanel)`
  transform: ${({ rightPanelActive }) =>
    rightPanelActive ? 'translateX(0)' : 'translateX(-20%)'};
`;

const OverlayRight = styled(OverlayPanel)`
  right: 0;
  transform: ${({ rightPanelActive }) =>
    rightPanelActive ? 'translateX(20%)' : 'translateX(0)'};
`;

const SignUpForm = () => (
  <StyledForm action="#">
    <BoldFont>Create Account</BoldFont>
    <Description>or use your ID for registration</Description>
    <StyledInput type="text" placeholder="Name" />
    <StyledInput type="id" placeholder="ID" />
    <StyledInput type="password" placeholder="Password" />
    <StyledButton color="purple">Sign Up</StyledButton>
  </StyledForm>
);

const SignInForm = () => (
  <StyledForm action="#">
    <BoldFont>LogIn</BoldFont>
    <Description>or use your account</Description>
    <StyledInput type="id" placeholder="ID" />
    <StyledInput type="password" placeholder="Password" />
    <StyledButton color="purple">LogIn</StyledButton>
  </StyledForm>
);

const App = () => {
  const [rightPanelActive, setRightPanelActive] = useState(false);

  return (
    <BackLayout>
      <GlobalStyle />
      <Container>
        <SignUpContainer rightPanelActive={rightPanelActive}>
          <SignUpForm />
        </SignUpContainer>
        <SignInContainer rightPanelActive={rightPanelActive}>
          <SignInForm />
        </SignInContainer>
        <OverlayContainer rightPanelActive={rightPanelActive}>
          <Overlay rightPanelActive={rightPanelActive}>
            <OverlayLeft rightPanelActive={rightPanelActive}>
              <BoldFont>Welcome Back!</BoldFont>
              <MarginFont>
                To keep connected with us please login with your personal info
              </MarginFont>
              <StyledButton
                color="white"
                onClick={() => setRightPanelActive(false)}
              >
                LogIn
              </StyledButton>
            </OverlayLeft>
            <OverlayRight rightPanelActive={rightPanelActive}>
              <BoldFont>Hello, Friend!</BoldFont>
              <MarginFont>
                Enter your personal details and start journey with us
              </MarginFont>
              <StyledButton
                color="white"
                onClick={() => setRightPanelActive(true)}
              >
                Sign Up
              </StyledButton>
            </OverlayRight>
          </Overlay>
        </OverlayContainer>
      </Container>
    </BackLayout>
  );
};

export default App;
