import React from 'react';
import styled from 'styled-components';
import AuthFrame from '../components/AuthFrame';
import AuthInput from '../components/AuthInput';
import MainButton from '../components/MainButton';

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
  margin-top: 3rem;
  margin-bottom: 3rem; /* Title과 Input 사이 간격 설정 */
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

const TextBox = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  margin-right: 1rem;
`;

const RegisterText = styled.div`
  font-family: 'SUIT', sans-serif;
  font-size: 1rem;
  font-weight: normal;
  color: white;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.3rem;
`;

const BlueText = styled.span`
  color: blue;
`;

function Login() {
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
        <AuthFrame>
          <TextContainer>
            <Title>Welcome Back!</Title>
            <Subtitle>welcome back we missed you</Subtitle>
          </TextContainer>
          <AuthInput title="username" type="text" />
          <AuthInput title="password" type="password" />
          <MainButton>Sign In</MainButton>
          <TextBox>
            <RegisterText>
              If you don’t have account <BlueText>Register</BlueText>
            </RegisterText>
          </TextBox>
        </AuthFrame>
      </MainBox2>
    </BackLayout>
  );
}

export default Login;
