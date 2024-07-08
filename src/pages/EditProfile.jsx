import React from 'react';
import styled from 'styled-components';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

const Setting = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15rem;
  padding-top: 3.5rem;
`;

const BigContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.2rem solid #5e3875;
  width: 43.75rem;
  height: 47.68rem;
  padding-left: 3.5rem;
`;
const Title = styled.div`
  font-family: 'SUIT', sans-serif;
  font-size: 2.25rem;
  color: #ffffff;
  padding-top: 3rem;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  padding-top: 2rem;
  align-items: center;
`;

const ProfileName = styled.p`
  font-size: 2rem;
  color: #ffffff;
  margin-right: 2rem;
  margin-bottom: 0.5rem;
`;

const ProImg = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
`;

const ProText = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommnetText = styled.p`
  font-size: 2rem;
  color: #ffffff;
  margin-right: 2rem;
  margin-top: 0;
`;
const CommnetEdit = styled.input`
  outline: none;
  border: none;
  background-color: rgba(156, 63, 228, 0.7);
  border-radius: 1.4rem;
  height: 3rem;
  margin-top: -1.2rem;
  color: #ffffff;
  width: 20rem;
`;

const ExtraContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  font-size: 1.5rem;
  color: #ffffff;
  padding-top: 2rem;
`;

const ExtraInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

const AfterChange = styled.p`
  text-decoration: underline;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background: linear-gradient(45deg, #b75dfd 30%, #ffa9a9 90%);
  border-radius: 1rem;
  width: 6.25rem;
  height: 3.125rem;
  font-size: 1.2rem;
  color: white;
  text-transform: none;
  font-family: 'SUIT';
  font-weight: 350;
`;

const LastSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 2rem;
`;

function EditProfile() {
  return (
    <Setting>
      <BigContainer>
        <Title>Profile</Title>
        <ProfileInfo>
          <ProImg
            src="https://i.ibb.co/tQJcHkm/Kakao-Talk-20221107-190554542-2.jpg"
            alt="남자 주인공"
          />
          <ProText>
            <ProfileName>권혁진</ProfileName>
            <CommnetText>Comment</CommnetText>
            <CommnetEdit placeholder="코멘트를 적어주세요..." />
          </ProText>
        </ProfileInfo>
        <ExtraContainer>
          <ExtraInfo>
            <LanguageOutlinedIcon />
            Country
          </ExtraInfo>
          <AfterChange> Republic of Korea</AfterChange>
          <ExtraInfo>
            <EditCalendarIcon />
            Birth Day
          </ExtraInfo>
          <AfterChange> 2001.12.10</AfterChange>
          <ExtraInfo>
            <YouTubeIcon />
            My Youtube
          </ExtraInfo>
          <AfterChange> https://youtube.com</AfterChange>
          <ExtraInfo>
            <InstagramIcon />
            My Instagram
          </ExtraInfo>
          <LastSection>
            <AfterChange> https://www.instagram.com</AfterChange>
            <Button>OK</Button>
          </LastSection>
        </ExtraContainer>
      </BigContainer>
    </Setting>
  );
}

export default EditProfile;
