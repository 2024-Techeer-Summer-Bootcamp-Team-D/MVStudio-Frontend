import * as React from 'react';
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
  margin-left: 8rem;
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
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <BackLayout>
      <MainBox1>
        <Logo>MVStudio</Logo>
        <Image1
          src="https://i.ibb.co/4YXMVtN/qwdascav-removebg-preview.png"
          alt=" Image "
        />
        <Image2
          src="https://i.ibb.co/9cGcVbX/qwasvzdv-removebg-preview.png"
          alt=" Image "
        />
      </MainBox1>
      <MainBox2>
        <Authframe>
          <TextContainer>
            <Title>Welcome !</Title>
            <Subtitle>we are waiting for you</Subtitle>
          </TextContainer>
          <AuthInput title="Username" type="text" />
          <AuthInput title="Nickname" type="text" />
          <AuthInput title="Password" type="password" />
          <AuthInput title="Passwordcheck" type="password" />
          <Wrapper>
            <Body>
              <FormControl sx={{ m: -2, minWidth: 260 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Country
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={age}
                  onChange={handleChange}
                  autoWidth
                  label="Country"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={20}>Korea</MenuItem>
                  <MenuItem value={21}>Japan</MenuItem>
                  <MenuItem value={22}>USA</MenuItem>
                </Select>
              </FormControl>
            </Body>
            <Body>
              <FormControl sx={{ m: -2, minWidth: 260 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={age}
                  onChange={handleChange}
                  autoWidth
                  label="Gender"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={20}>Woman</MenuItem>
                  <MenuItem value={21}>Man</MenuItem>
                </Select>
              </FormControl>
            </Body>
          </Wrapper>
          <Birthday>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="Basic date picker" />
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
