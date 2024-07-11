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

const BoldFont1 = styled.h1`
  font-family: 'suit';
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
  color: #ffffff;
  text-shadow:
    0 0 5px #ffffff30,
    0 0 10px #ffffff30,
    0 0 20px #ffffff30,
    0 0 40px #ffffff30;

  @keyframes neon {
    from {
      text-shadow:
        0 0 5px #ffffff50,
        0 0 10px #ffffff50,
        0 0 20px #ffffff50,
        0 0 40px #ffffff50;
    }
    to {
      text-shadow:
        0 0 10px #ffffff50,
        0 0 20px #ffffff50,
        0 0 30px #ffffff50,
        0 0 50px #ffffff50;
    }
  }
`;

const BoldFont2 = styled.h2`
  font-family: 'suit';
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
`;

const MarginFont = styled.p`
  font-family: 'suit';
  font-size: 0.875rem;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 0.5rem 0 0.5rem;
`;

const Description = styled.p`
  font-family: 'suit';
  font-size: 1rem;
  margin: 0.5rem 0 0.5rem;
`;

const StyledForm = styled.form`
  background-color: #dfd4df;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

const StyledButton = styled.button`
  margin-top: 3rem;
  border-radius: 1.25rem;
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    props.color === 'purple'
      ? '#0f0110'
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
  background-color: rgba(29, 5, 37, 0.9);
  border-radius: 10px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 75%;
  min-width: 60rem;
  height: 80%;
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
  background-color: rgba(250, 250, 250, 0.889);
  border-radius: 1rem;
  border: none;
  padding: 0.75rem 1rem;
  margin: 0.5rem 0;
  width: 90%;
  font-size: 1rem;
`;

const Overlay = styled.div`
  background-color: rgba(37, 6, 46, 0.9);
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

const SignUpForm = () => {
  const [idValue, setIdValue] = useState('');
  const [nicknameValue, setNicknameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordCheckValue, setPasswordCheckValue] = useState('');

  const handleIdChange = (e) => {
    const value = e.target.value;
    setIdValue(value);
    console.log('ID value:', value);
  };

  const handleNicknameChange = (e) => {
    const value = e.target.value;
    setNicknameValue(value);
    console.log('Nickname value:', value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPasswordValue(value);
    console.log('Password value:', value);
  };

  const handlePasswordCheckChange = (e) => {
    const value = e.target.value;
    setPasswordCheckValue(value);
    console.log('PasswordCheck value:', value);
  };
  return (
    <StyledForm action="#">
      <BoldFont2>Create Account</BoldFont2>
      <Description>or use your ID for registration</Description>
      <StyledInput
        type="text"
        placeholder="Enter your ID"
        value={idValue}
        onChange={handleIdChange}
      />
      <StyledInput
        type="text"
        placeholder="Enter your Nickname"
        value={nicknameValue}
        onChange={handleNicknameChange}
      />
      <StyledInput
        type="password"
        placeholder="Password"
        value={passwordValue}
        onChange={handlePasswordChange}
      />
      <StyledInput
        type="password"
        placeholder="Confirm Password"
        value={passwordCheckValue}
        onChange={handlePasswordCheckChange}
      />

      <StyledButton color="purple">Sign Up</StyledButton>
    </StyledForm>
  );
};

const SignInForm = () => {
  const [idValue, setIdValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const handleIdChange = (e) => {
    const value = e.target.value;
    setIdValue(value);
    console.log('ID value:', value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPasswordValue(value);
    console.log('Password value:', value);
  };

  return (
    <StyledForm action="#">
      <BoldFont2>LogIn</BoldFont2>
      <Description>or use your account</Description>
      <StyledInput
        type="text"
        placeholder="Enter your ID"
        value={idValue}
        onChange={handleIdChange}
      />
      <StyledInput
        type="password"
        placeholder="Enter your Password"
        value={passwordValue}
        onChange={handlePasswordChange}
      />
      <StyledButton color="purple">LogIn</StyledButton>
    </StyledForm>
  );
};

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

const TwistGlass = styled.img`
  width: 12rem;
  height: 12rem;
  position: absolute;
  margin-left: -5rem;
  margin-top: 52rem;
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

const TearGlass2 = styled.img`
  width: 5rem;
  height: 5rem;
  position: absolute;
  margin-left: -80rem;
  margin-top: 40rem;
  filter: blur(2px);
`;

const App = () => {
  const [rightPanelActive, setRightPanelActive] = useState(false);

  return (
    <BackLayout>
      <CircleGlass src="https://i.ibb.co/f2gnqxw/image.png" />
      <SecondCircleGlass1 src="https://i.ibb.co/f2gnqxw/image.png" />
      <TwistGlass src="https://i.ibb.co/wLPMNtf/image.png" />
      <TearGlass1 src="https://i.ibb.co/jL01sDq/image.png" />
      <TearGlass2 src="https://i.ibb.co/jL01sDq/image.png" />
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
              <BoldFont1>Welcome !</BoldFont1>
              <MarginFont>we are waiting for you</MarginFont>
              <StyledButton
                color="white"
                onClick={() => setRightPanelActive(false)}
              >
                LogIn
              </StyledButton>
            </OverlayLeft>
            <OverlayRight rightPanelActive={rightPanelActive}>
              <BoldFont1>Welcome Back!</BoldFont1>
              <MarginFont>welcomeback we missed you</MarginFont>
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
