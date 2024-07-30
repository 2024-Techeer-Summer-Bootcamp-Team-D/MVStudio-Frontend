import React, { useState, useEffect } from 'react';
import { useUser } from '@/libs/stores/userStore';
import styled, { createGlobalStyle } from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Material UI
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import PersonIcon from '@mui/icons-material/Person';

// API
import { getCountries, patchMemberInfo } from '@/api/member';

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

const RegisterContainer = styled(FormContainer)`
  left: 0;
  width: 50%;
  opacity: 1;
  z-index: 5;
  transform: translateX(100%);
  animation: show 0.6s;
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
  transform: translateX(-100%);
`;

const Overlay = styled.div`
  background-image: url('https://i.ibb.co/72bmVLd/Group-1457.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorContainer = styled.div`
  margin-top: 2rem;
  color: red;
  font-size: 1rem;
  font-weight: 550;
`;

const LogoImage = styled.img`
  width: 20rem;
  height: 18rem;
  margin-bottom: 1rem;
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
  width: 100%;
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

const RegisterForm = () => {
  const [loginError, setLoginError] = useState('');
  const [nickname, setNickname] = useState('');
  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState();
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState(dayjs());

  const username = useUser((state) => state.username);

  const navigate = useNavigate();

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
      <BoldFont>Welcome to MVStudio!</BoldFont>

      <Description>Enter your information</Description>

      <div
        style={{
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '3%',
        }}
      >
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
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </StyledInputContainer>
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
            onChange={(e) => setBirthday(e)}
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

      {/* 페이지 넘어가게(완) , 비밀번호 확인 , 길이제한 , 성별넣어주세요, 로컬스톨지 넣기(완), 닉네임 영어 넣기, 하잇 */}

      {loginError && <ErrorContainer>{loginError}</ErrorContainer>}

      <StyledButton
        type="button"
        color="purple"
        onClick={() => {
          if (!nickname || !birthday || !gender || !country) {
            setLoginError('입력하지 않은 칸이 있어요!');
          } else {
            setLoginError('');
            console.log('country:', country);
            patchMemberInfo(
              username,
              nickname,
              '',
              country,
              dayjs(birthday).format('YYYY-MM-DD'),
              '',
              '',
              gender,
              '',
              '',
            ).then((response) => {
              if (response.status === 200) {
                navigate('/main');
              } else {
                setLoginError('회원가입에 실패했어요!');
              }
            });
          }
        }}
      >
        Sign Up
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

function Register() {
  return (
    <BackLayout>
      <CircleGlass src="https://i.ibb.co/f2gnqxw/image.png" />
      <SecondCircleGlass1 src="https://i.ibb.co/f2gnqxw/image.png" />
      <TwistGlass src="https://i.ibb.co/wLPMNtf/image.png" />
      <TearGlass1 src="https://i.ibb.co/jL01sDq/image.png" />
      <TearGlass2 src="https://i.ibb.co/jL01sDq/image.png" />
      <GlobalStyle />
      <Container>
        {/* 오른쪽 */}
        <RegisterContainer>
          <RegisterForm />
        </RegisterContainer>

        {/* 왼쪽 */}
        <OverlayContainer>
          <Overlay>
            <ShadowFont>MVStudio</ShadowFont>
            <MarginFont>당신만의 음악을 만들어보세요</MarginFont>
            <LogoImage src="https://i.ibb.co/0q0D1Ch/HEADPHONES-5.png" />
          </Overlay>
        </OverlayContainer>
      </Container>
    </BackLayout>
  );
}

export default Register;
