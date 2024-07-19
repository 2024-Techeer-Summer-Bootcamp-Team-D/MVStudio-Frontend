/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { postLogin, postRegister } from '../api/member';
import { useNavigate } from 'react-router-dom';
import { getCountries } from '../api/member';

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
`;

const Container = styled.div`
  background-color: #dfd4df;
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

const StyledInput = styled.input`
  background-color: #fbfafb;
  border-radius: 0.25rem;
  border: none;
  padding: 0.75rem 1rem;
  margin: 0.5rem 0;
  width: 90%;
  height: 3.125rem;
  font-size: 1rem;
`;

const Overlay = styled.div`
  /* background-color: rgba(37, 6, 46, 1); */
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
  height: 20rem;
  margin-bottom: 1rem;
`;

const SignUpForm = ({ successLogin }) => {
  const [countryList, setCountryList] = useState();
  const [idValue, setIdValue] = useState('');
  const [nicknameValue, setNicknameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordCheckValue, setPasswordCheckValue] = useState('');
  const [country, setCountry] = useState();
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState(dayjs());
  const [loginError, setLoginError] = useState('');

  const englishAndNumbersRegex = /^[A-Za-z0-9]+$/;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCountries();
        setCountryList(response.data);
      } catch {
        console.error('나라 데이터 조회 오류,,');
      }
    };
    fetchData();
  }, []);

  return (
    <StyledForm>
      <BoldFont>Create Account</BoldFont>
      <Description>or use your ID for registration</Description>
      <StyledInput
        type="text"
        placeholder="Enter your ID"
        value={idValue}
        onChange={(e) => setIdValue(e.target.value)}
      />
      <StyledInput
        type="text"
        placeholder="Enter your Nickname"
        value={nicknameValue}
        onChange={(e) => setNicknameValue(e.target.value)}
      />
      <StyledInput
        type="password"
        placeholder="Password"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
      />
      <StyledInput
        type="password"
        placeholder="Confirm Password"
        value={passwordCheckValue}
        onChange={(e) => setPasswordCheckValue(e.target.value)}
      />
      {/* 페이지 넘어가게(완) , 비밀번호 확인 , 길이제한 , 성별넣어주세요, 로컬스톨지 넣기(완), 닉네임 영어 넣기, 하잇 */}
      <div
        style={{
          width: '90%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '3%',
        }}
      >
        {/* 나라 선택 */}
        <FormControl
          sx={{
            m: -2,
            minWidth: '37%',
            margin: '0.5rem 0rem',
            bgcolor: '#fbfafb',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
          }}
        >
          <InputLabel id="country-label">Country</InputLabel>
          <Select
            labelId="country-label"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            autoWidth
            label="Country"
            sx={{ border: 'none' }}
          >
            {countryList?.map((data) => (
              <MenuItem key={data.id} value={data.id}>
                {data.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* 생일 날짜 선택 */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{
              m: -2,
              minWidth: '37%',
              margin: '0.5rem 0rem',
              bgcolor: '#fbfafb',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1rem',
            }}
            value={birthday}
            label="Birthday"
            onChange={(e) => setBirthday(e.target.value)}
          />
        </LocalizationProvider>

        {/* 성별 선택 */}
        <FormControl
          sx={{
            m: -2,
            minWidth: '20%',
            margin: '0.5rem 0rem',
            bgcolor: '#fbfafb',
            borderRadius: '0.5rem',
            fontSize: '1rem',
          }}
        >
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            autoWidth
            label="gender"
          >
            <MenuItem value="M">Male</MenuItem>
            <MenuItem value="F">Female</MenuItem>
          </Select>
        </FormControl>
      </div>
      {loginError && <ErrorContainer>{loginError}</ErrorContainer>}

      <StyledButton
        type="button"
        color="purple"
        onClick={() => {
          const validateInputs = () => {
            if (
              !idValue ||
              !nicknameValue ||
              !passwordValue ||
              !passwordCheckValue ||
              !gender ||
              !country
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

            if (nicknameValue.length > 10) {
              setLoginError('닉네임의 길이를 10글자 이내로 해주세요!');
              return false;
            }

            setLoginError(''); // Clear any existing error messages
            return true;
          };

          if (validateInputs()) {
            postRegister(
              idValue,
              passwordValue,
              nicknameValue,
              birthday.format('YYYY-MM-DD'),
              gender,
              parseInt(country, 10),
            )
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
      {loginError && <ErrorContainer>{loginError}</ErrorContainer>}
      <StyledButton
        type="button"
        color="purple"
        onClick={() =>
          postLogin(idValue, passwordValue)
            .then((resp) => {
              if ((resp.status === 201) & (resp.code === 'A002')) {
                successLogin(resp.id);
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

const Auth = () => {
  const [panelActive, setPanelActive] = useState('');
  const navigate = useNavigate();
  const successLogin = (id) => {
    console.log('함수 실행됨');
    console.log('id:', id);
    localStorage.setItem('memberId', id);
    // window.location.href = 'http://localhost:4173/mainpage';
    navigate(`/mainpage`);
  };

  return (
    <BackLayout>
      <CircleGlass src="https://i.ibb.co/f2gnqxw/image.png" />
      <SecondCircleGlass1 src="https://i.ibb.co/f2gnqxw/image.png" />
      <TwistGlass src="https://i.ibb.co/wLPMNtf/image.png" />
      <TearGlass1 src="https://i.ibb.co/jL01sDq/image.png" />
      <TearGlass2 src="https://i.ibb.co/jL01sDq/image.png" />
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
