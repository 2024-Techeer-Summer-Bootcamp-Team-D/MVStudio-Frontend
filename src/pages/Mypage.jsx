import React from 'react';
import LongCover from '../components/LongCover';
import styled from 'styled-components';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    gradient: {
      main: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    },
  },
});

const BigContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-left: 15rem;
  width: 100%;
`;
const MyContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 4rem;
  padding-left: 4rem;
  padding-bottom: 1rem;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 2rem;
  padding-left: 1rem;
`;

const AlbumContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 2.7rem;
`;

const Profile = styled.p`
  font-size: 2rem;
  color: #ffffff;
  margin-right: 2rem;
  text-decoration: underline;
`;

const Statistics = styled.p`
  font-size: 2rem;
  color: #ffffff;
  margin-right: 2rem;
  margin-left: 5rem;
`;

const ProImg = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
`;

const ProName = styled.div`
  font-size: 2rem;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const VideoCount = styled.div`
  font-size: 1.1rem;
  color: #a4a4a4;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 3rem;
`;

const ProText = styled.div`
  font-size: 1.4rem;
  color: #a4a4a4;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 1rem;
`;

const Divider = styled.div`
  height: 0.1rem;
  width: 70.5rem;
  background-color: #9f9e9e;
  margin-bottom: 2rem;
  padding: 0;
`;

const ExtraFunction = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 27rem;
  width: 15rem;
  height: 100%;
  padding-bottom: 0;
`;

const Button = styled.button`
  background: linear-gradient(45deg, #b75dfd 30%, #ffa9a9 90%);
  border-radius: 1rem;
  width: 9rem;
  height: 3rem;
  font-size: 1.2rem;
  color: white;
  text-transform: none;
  font-family: 'SUIT';
  font-weight: 350;
  margin-left: 9.5rem;
`;

const Youtube = styled.div`
  margin-top: 9rem;
  font-size: 1.2rem;
  color: #a4a4a4;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Instagram = styled.div`
  font-size: 1.2rem;
  color: #a4a4a4;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InstagramIconEdit = styled(InstagramIcon)`
  margin-right: 1rem;
`;

const YouTubeIconEdit = styled(YouTubeIcon)`
  margin-right: 1rem;
`;

const MyVideos = styled.p`
  font-size: 2rem;
  color: #ffffff;
  padding-left: 1rem;
  margin-top: 0;
`;

function Mypage() {
  const Myvideos = [
    {
      pic: 'https://i.ibb.co/sQ0Ts7X/x4jy1m2x5d-As-ZHfb-FK-Xwu-O3g-Rbr-Rq-m2jd-VYSlm7-A9-D6j9e-YFrm-Gk6-Zl-Ndhdz-CXT-o-Wk4-NGex-WLPheet-Q.jpg',
      title: '사랑인가봐',
      uploader: '권혁진',
      view: '0707',
      options: '흔들리는 내맘, 설렘, 첫만남',
      owner: true,
    },
    {
      pic: 'https://i.ibb.co/sQ0Ts7X/x4jy1m2x5d-As-ZHfb-FK-Xwu-O3g-Rbr-Rq-m2jd-VYSlm7-A9-D6j9e-YFrm-Gk6-Zl-Ndhdz-CXT-o-Wk4-NGex-WLPheet-Q.jpg',
      title: '사랑인가봐',
      uploader: '권혁진',
      view: '0707',
      options: '흔들리는 내맘, 설렘, 첫만남',
      owner: true,
    },
    {
      pic: 'https://i.ibb.co/sQ0Ts7X/x4jy1m2x5d-As-ZHfb-FK-Xwu-O3g-Rbr-Rq-m2jd-VYSlm7-A9-D6j9e-YFrm-Gk6-Zl-Ndhdz-CXT-o-Wk4-NGex-WLPheet-Q.jpg',
      title: '사랑인가봐',
      uploader: '권혁진',
      view: '0707',
      options: '흔들리는 내맘, 설렘, 첫만남',
      owner: true,
    },
    {
      pic: 'https://i.ibb.co/sQ0Ts7X/x4jy1m2x5d-As-ZHfb-FK-Xwu-O3g-Rbr-Rq-m2jd-VYSlm7-A9-D6j9e-YFrm-Gk6-Zl-Ndhdz-CXT-o-Wk4-NGex-WLPheet-Q.jpg',
      title: '사랑인가봐',
      uploader: '권혁진',
      view: '0707',
      options: '흔들리는 내맘, 설렘, 첫만남',
      owner: true,
    },
  ];
  return (
    <BigContainer>
      <TitleContainer>
        <Profile>Profile</Profile>
        <Statistics>My statistics</Statistics>
      </TitleContainer>
      <MyContainer>
        <ProImg
          src="https://i.ibb.co/tQJcHkm/Kakao-Talk-20221107-190554542-2.jpg"
          alt="남자 주인공"
        />
        <InfoContainer>
          <ProName>
            <PersonOutlineIcon fontSize="3rem" />
            권혁진
          </ProName>
          <VideoCount>동영상 24개</VideoCount>
          <ProText>
            <ChatOutlinedIcon />
            사랑, 그놈...{' '}
          </ProText>
        </InfoContainer>
        <ExtraFunction>
          <Button onClick={() => console.log('Edit button click')}>Edit</Button>
          <Youtube>
            <YouTubeIconEdit />
            https://www.youtube.com
          </Youtube>
          <Instagram>
            <ThemeProvider theme={theme}>
              <InstagramIconEdit color="gradient" />
            </ThemeProvider>
            https://www.instagram.com
          </Instagram>
        </ExtraFunction>
      </MyContainer>
      <Divider />
      <MyVideos>MyVideos</MyVideos>
      <AlbumContainer>
        {Myvideos.map((item, index) => (
          <LongCover key={index} {...item} />
        ))}
      </AlbumContainer>
    </BigContainer>
  );
}

export default Mypage;
