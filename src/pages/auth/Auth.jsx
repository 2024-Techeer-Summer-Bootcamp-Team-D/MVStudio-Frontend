/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '@/utils/cookies';

// Material-UI
import GoogleIcon from '@mui/icons-material/Google';
import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

// API
import { postLogin, postRegister } from '@/api/member';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  .back-layout{
    justify-content: center;
    align-items: center;
  }
  .content-area{
    justify-content: center; 
    align-items: center; 
  }
  .children-wrapper{
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
`;

const BackLayout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ShadowFont = styled.h1`
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

const BoldFont = styled.h2`
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
  margin-top: 0.5rem;
  margin-bottom: 2.5rem;
`;

const Description = styled.p`
  font-family: 'suit';
  font-size: 1rem;
  margin-bottom: 0.5rem;
  margin: 1.5rem;
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
  margin-top: 2rem;
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
  &:props.active {
    transform: scale(0.95);
  }
  margin-bottom: 2rem;
`;

const Container = styled.div`
  background-color: #dfd4df;
  border-radius: 10px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 80%;
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
  transform: ${(props) =>
    props.active ? 'translateX(100%)' : 'translateX(0)'};
`;

const SignUpContainer = styled(FormContainer)`
  left: 0;
  width: 50%;
  opacity: ${(props) => (props.active ? 1 : 0)};
  z-index: ${(props) => (props.active ? 5 : 1)};
  transform: ${(props) =>
    props.active ? 'translateX(100%)' : 'translateX(0)'};
  animation: ${(props) => (props.active ? 'show 0.6s' : 'none')};

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
  transform: ${(props) =>
    props.active ? 'translateX(-100%)' : 'translateX(0)'};
`;

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: #fbfafb;
  border-radius: 0.25rem;
  border: none;
  margin: 0.5rem 0;
  width: 90%;
  height: 3.125rem;
  font-size: 1rem;
`;

const StyledInput = styled.input`
  border-radius: 0.25rem;
  border: none;
  /* padding: 0.75rem 1rem; */
  width: 100%;
  height: 100%;
  font-size: 1rem;
  background-color: #fbfafb;
`;

const Overlay = styled.div`
  background-image: url('https://i.ibb.co/72bmVLd/Group-1457.png');
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
  transform: ${(props) => (props.active ? 'translateX(50%)' : 'translateX(0)')};
`;

const ErrorContainer = styled.div`
  margin-top: 2rem;
  color: red;
  font-size: 1rem;
  font-weight: 550;
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
  transform: ${(props) =>
    props.active ? 'translateX(0)' : 'translateX(-20%)'};
`;

const OverlayRight = styled(OverlayPanel)`
  right: 0;
  transform: ${(props) => (props.active ? 'translateX(20%)' : 'translateX(0)')};
`;

const LogoImage = styled.img`
  width: 20rem;
  height: 18rem;
  margin-bottom: 1rem;
`;

const SocialLogin = styled.div`
  background-color: #d95140;
  border-radius: 0.25rem;
  border: none;
  width: 90%;
  height: 3.125rem;
  font-size: 1rem;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0.25rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: white;
  cursor: pointer;
`;
const handleSocialLogin = () => {
  window.location.href = `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/v1/oauth/login/google`;
};

const SignUpForm = ({ successLogin }) => {
  const [idValue, setIdValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordCheckValue, setPasswordCheckValue] = useState('');
  const [loginError, setLoginError] = useState('');

  const englishAndNumbersRegex = /^[A-Za-z0-9]+$/;

  return (
    <StyledForm>
      <BoldFont>Create Account</BoldFont>
      <SocialLogin onClick={() => handleSocialLogin()}>
        <GoogleIcon
          style={{
            display: 'flex',
            position: 'absolute',
            padding: '0.25rem',
            justifyContent: 'center',
            alignItems: 'center',
            width: '2rem',
            height: '2rem',
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          Sign Up with Google
        </div>
      </SocialLogin>
      <Description>or use your ID for registration</Description>
      <StyledInputContainer>
        <PersonIcon
          sx={{
            color: '#170630',
            fontSize: '1.75rem',
            marginLeft: '0.25rem',
          }}
        />
        <StyledInput
          type="text"
          placeholder="Enter your ID"
          value={idValue}
          onChange={(e) => setIdValue(e.target.value)}
        />
      </StyledInputContainer>
      <StyledInputContainer>
        <PersonIcon
          sx={{
            color: '#170630',
            fontSize: '1.75rem',
            marginLeft: '0.25rem',
          }}
        />
        <StyledInput
          type="text"
          placeholder="Enter your email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
        />
      </StyledInputContainer>
      <StyledInputContainer>
        <VpnKeyIcon
          sx={{
            color: '#170630',
            fontSize: '1.75rem',
            marginLeft: '0.25rem',
          }}
        />
        <StyledInput
          type="password"
          placeholder="Password"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
        />
      </StyledInputContainer>

      <StyledInputContainer>
        <VpnKeyIcon
          sx={{
            color: '#170630',
            fontSize: '1.75rem',
            marginLeft: '0.25rem',
          }}
        />
        <StyledInput
          type="password"
          placeholder="Confirm Password"
          value={passwordCheckValue}
          onChange={(e) => setPasswordCheckValue(e.target.value)}
        />
      </StyledInputContainer>
      {/* 페이지 넘어가게(완) , 비밀번호 확인 , 길이제한 , 성별넣어주세요, 로컬스톨지 넣기(완), 닉네임 영어 넣기, 하잇 */}

      {loginError && <ErrorContainer>{loginError}</ErrorContainer>}

      <StyledButton
        type="button"
        color="purple"
        onClick={() => {
          const validateInputs = () => {
            if (
              !idValue ||
              !emailValue ||
              !passwordValue ||
              !passwordCheckValue
            ) {
              setLoginError('입력하지 않은 칸이 있어요!');
              return false;
            }

            if (!englishAndNumbersRegex.test(idValue)) {
              setLoginError('ID는 영어로만 입력해 주세요!');
              return false;
            }

            if (passwordValue !== passwordCheckValue) {
              setLoginError('비밀번호가 일치하지 않습니다.');
              return false;
            }

            setLoginError(''); // Clear any existing error messages
            return true;
          };

          if (validateInputs()) {
            postRegister(idValue, emailValue, passwordValue)
              .then((resp) => {
                if (resp.status === 201 && resp.code === 'A001') {
                  successLogin(resp.id);
                } else if (resp.status === 200) {
                  setLoginError('입력하신 id가 이미 있어요!');
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }}
      >
        Sign Up
      </StyledButton>
    </StyledForm>
  );
};

const SignInForm = ({ successLogin }) => {
  const [idValue, setIdValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleIdChange = (e) => {
    const value = e.target.value;
    setIdValue(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPasswordValue(value);
  };

  return (
    <StyledForm>
      <BoldFont>LogIn</BoldFont>
      <SocialLogin onClick={() => handleSocialLogin()}>
        <GoogleIcon
          style={{
            display: 'flex',
            position: 'absolute',
            padding: '0.25rem',
            justifyContent: 'center',
            alignItems: 'center',
            width: '2rem',
            height: '2rem',
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          Login with Google
        </div>
      </SocialLogin>
      <Description>or use your account</Description>
      <StyledInputContainer>
        <PersonIcon
          sx={{
            color: '#170630',
            fontSize: '1.75rem',
            marginLeft: '0.25rem',
          }}
        />
        <StyledInput
          type="text"
          placeholder="Enter your ID"
          value={idValue}
          onChange={handleIdChange}
        />
      </StyledInputContainer>
      <StyledInputContainer>
        <VpnKeyIcon
          sx={{
            color: '#170630',
            fontSize: '1.75rem',
            marginLeft: '0.25rem',
          }}
        />
        <StyledInput
          type="password"
          placeholder="Enter your Password"
          value={passwordValue}
          onChange={handlePasswordChange}
        />
      </StyledInputContainer>
      {loginError && <ErrorContainer>{loginError}</ErrorContainer>}
      <StyledButton
        type="button"
        color="purple"
        onClick={() =>
          // postLogin(idValue, passwordValue)
          //   .then((resp) => {
          //     if ((resp.status === 201) & (resp.code === 'A002')) {
          //       successLogin(resp.id);
          //     } else {
          //       setLoginError('아이디와 비밀번호를 다시한번 확인해주세요!');
          //     }
          //   })
          //   .catch(() => {
          //     setLoginError('서버 오류입니다.');
          //   })
          postLogin(idValue, passwordValue)
            .then((resp) => {
              if (resp.access_token) {
                successLogin(resp.access_token);
              } else {
                setLoginError('아이디와 비밀번호를 다시한번 확인해주세요!');
              }
            })
            .catch(() => {
              setLoginError('서버 오류입니다.');
            })
        }
      >
        LogIn
      </StyledButton>
    </StyledForm>
  );
};

// const CircleGlass = styled.img`
//   width: 10rem;
//   height: 10rem;
//   position: fixed;
//   margin-left: 30rem;
//   margin-top: -60rem;
//   filter: blur(2px);
// `;

// const SecondCircleGlass1 = styled.img`
//   width: 7rem;
//   height: 7rem;
//   position: fixed;
//   margin-left: 105rem;
//   margin-top: 10rem;
//   filter: blur(2px);
// `;

// const TwistGlass = styled.img`
//   width: 12rem;
//   height: 12rem;
//   position: fixed;
//   margin-left: -20rem;
//   margin-top: 60rem;
//   filter: blur(2px);
// `;

// const TearGlass1 = styled.img`
//   width: 6rem;
//   height: 6rem;
//   position: fixed;
//   margin-left: 100rem;
//   margin-top: -20rem;
//   filter: blur(2px);
// `;

// const TearGlass2 = styled.img`
//   width: 5rem;
//   height: 5rem;
//   position: fixed;
//   margin-left: -115rem;
//   margin-top: 40rem;
//   filter: blur(2px);
// `;

// const StampGlass = styled.img`
//   width: 8rem;
//   height: 8rem;
//   position: fixed;
//   margin-left: -90rem;
//   margin-top: -45rem;
//   filter: blur(2px);
// `

const Auth = () => {
  const [panelActive, setPanelActive] = useState('');
  const navigate = useNavigate();
  const successLogin = (accessToken) => {
    console.log('함수 실행됌');
    // localStorage.setItem('memberId', id);
    setCookie('accessToken', accessToken);
    navigate('/main');
  };

  return (
    <BackLayout>
      {/* <CircleGlass src="https://i.ibb.co/f2gnqxw/image.png" />
      <SecondCircleGlass1 src="https://i.ibb.co/f2gnqxw/image.png" />
      <TwistGlass src="https://i.ibb.co/wLPMNtf/image.png" />
      <TearGlass1 src="https://i.ibb.co/jL01sDq/image.png" />
      <TearGlass2 src="https://i.ibb.co/jL01sDq/image.png" />
      <StampGlass src="https://i.ibb.co/XXzYTfy/image.png" /> */}
      <GlobalStyle />
      <Container>
        <SignUpContainer active={panelActive}>
          <SignUpForm successLogin={successLogin} />
        </SignUpContainer>
        <SignInContainer active={panelActive}>
          <SignInForm successLogin={successLogin} />
        </SignInContainer>
        <OverlayContainer active={panelActive}>
          <Overlay active={panelActive}>
            <OverlayLeft active={panelActive}>
              <ShadowFont>MVStudio</ShadowFont>
              <MarginFont>당신만의 음악을 만들어보세요</MarginFont>
              <LogoImage src="https://i.ibb.co/0q0D1Ch/HEADPHONES-5.png" />
              <MarginFont>계정이 있으신가요?</MarginFont>
              <div style={{ marginBottom: '-2.5rem' }} />
              <StyledButton color="white" onClick={() => setPanelActive('')}>
                LogIn
              </StyledButton>
            </OverlayLeft>
            <OverlayRight active={panelActive}>
              <ShadowFont>MVStudio</ShadowFont>
              <MarginFont>당신만의 음악을 만들어보세요</MarginFont>
              <LogoImage src="https://i.ibb.co/0q0D1Ch/HEADPHONES-5.png" />
              <MarginFont>계정이 없으신가요?</MarginFont>
              <div style={{ marginBottom: '-2.5rem' }} />
              <StyledButton
                color="white"
                onClick={() => setPanelActive('true')}
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

export default Auth;
