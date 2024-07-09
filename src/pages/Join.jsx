import React, { useState } from 'react';
import styled from 'styled-components';
import Authframe from '../components/Authframe';
import AuthInput from '../components/AuthInput';
import MainButton from '../components/MainButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const BackLayout = styled.div`
  background-color: #0b0310;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const MainBox1 = styled.div`
  flex-direction: column;
  width: 40%;
  height: 100%;
  display: flex;
`;

const Logo = styled.div`
  font-family: 'SUIT', sans-serif;
  font-size: 6rem;
  width: 18rem;
  height: 18rem;
  margin-top: 5rem;
  margin-left: 6rem;
  font-weight: bold; /* Bold체로 설정 */
  color: #ffffff;
`;

const Image1 = styled.img`
  width: 18rem;
  height: 18rem;
  margin-top: -7rem;
  margin-left: 8rem;
`;

const Image2 = styled.img`
  position: relative;
  width: 13rem;
  height: 13rem;
  margin-left: 25rem;
`;

const MainBox2 = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 중앙 정렬 */
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-family: 'SUIT', sans-serif; /* 폰트 패밀리 설정 */
  font-size: 3rem; /* 폰트 크기 설정 */
  color: white; /* 글자 색상 설정 */
  margin: 0; /* 여백 제거 */
  font-weight: bold; /* 두껍게 설정 */
`;

const Subtitle = styled.h2`
  font-family: 'SUIT', sans-serif; /* 폰트 패밀리 설정 */
  font-size: 1rem; /* 폰트 크기 설정 */
  color: white; /* 글자 색상 설정 */
  margin: 0; /* 여백 제거 */
  font-weight: normal; /* 보통 체 설정 */
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3.65rem;
  margin-top: 1rem;
`;

const Body = styled.div`
  background: linear-gradient(
    145deg,
    rgba(250, 242, 255, 0.15),
    rgba(230, 230, 250, 0.1)
  );
  width: 15rem;
  height: 3rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid #a4a4a4;
  margin-bottom: 2rem;
`;

const Birthday = styled.div`
  background: linear-gradient(
    145deg,
    rgba(250, 242, 255, 0.15),
    rgba(230, 230, 250, 0.1)
  );
  width: 15rem;
  height: 3rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid #a4a4a4;
  margin-right: 20rem;
`;

function Join() {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');

  const handleUsernameChange = (e) => {
    console.log('username: ', username);
    setUsername(e.target.value);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordCheckChange = (e) => {
    setPasswordCheck(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <BackLayout>
      <MainBox1>
        <Logo>MVStudio</Logo>
        <Image1
          src="https://i.ibb.co/4YXMVtN/qwdascav-removebg-preview.png"
          alt="Logo Image"
        />
        <Image2
          src="https://i.ibb.co/9cGcVbX/qwasvzdv-removebg-preview.png"
          alt="Other Image"
        />
      </MainBox1>
      <MainBox2>
        <Authframe>
          <TextContainer>
            <Title>Welcome!</Title>
            <Subtitle>We are waiting for you</Subtitle>
          </TextContainer>
          <AuthInput
            title="Username"
            type="text"
            placeholder="이름을 입력하세요"
            value={username}
            onChange={handleUsernameChange}
          />
          <AuthInput
            title="Nickname"
            type="text"
            placeholder="닉네임을 입력하세요"
            value={nickname}
            onChange={handleNicknameChange}
          />
          <AuthInput
            title="Password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={handlePasswordChange}
          />
          <AuthInput
            title="Password Check"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            value={passwordCheck}
            onChange={handlePasswordCheckChange}
          />
          <Wrapper>
            <Body>
              <FormControl sx={{ m: -2, minWidth: 260 }}>
                <InputLabel id="country-label">Country</InputLabel>
                <Select
                  labelId="country-label"
                  id="country"
                  value={country}
                  onChange={handleCountryChange}
                  autoWidth
                  label="Country"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Korea">Korea</MenuItem>
                  <MenuItem value="Japan">Japan</MenuItem>
                  <MenuItem value="USA">USA</MenuItem>
                </Select>
              </FormControl>
            </Body>
            <Body>
              <FormControl sx={{ m: -2, minWidth: 260 }}>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  value={gender}
                  onChange={handleGenderChange}
                  autoWidth
                  label="Gender"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Woman">Woman</MenuItem>
                  <MenuItem value="Man">Man</MenuItem>
                </Select>
              </FormControl>
            </Body>
          </Wrapper>
          <Birthday>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="Select Your Birthday" />
              </DemoContainer>
            </LocalizationProvider>
          </Birthday>
          <MainButton>Register</MainButton>
        </Authframe>
      </MainBox2>
    </BackLayout>
  );
}

export default Join;
