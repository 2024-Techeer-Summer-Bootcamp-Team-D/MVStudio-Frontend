/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';

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
  margin-left: 20%;
  margin-right: 20%;
  width: 60%;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 2rem;
  padding-left: 1rem;
  width: 100%;
`;

const Profile = styled.p`
  font-size: 1.2rem;
  color: #ffffff;
  margin-right: 2rem;
`;

const ProImg = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  flex-shrink: 0;
`;

const ProName = styled.div`
  font-size: 1rem;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 4rem;
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
  font-size: 1rem;
  color: #a4a4a4;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 1rem;
`;

const ExtraFunction = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  padding-bottom: 0;
  margin-top: 1rem;
`;

const InstagramIconEdit = styled(InstagramIcon)`
  margin-right: 1rem;
  color: #a4a4a4;
`;

const YouTubeIconEdit = styled(YouTubeIcon)`
  margin-right: 1rem;
  color: #a4a4a4;
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-left: 1rem;
  margin-top: 1rem;
`;

const Tab = styled.div`
  font-size: 1.2rem;
  color: #ffffff;
  margin-right: 2rem;
  padding-bottom: 0.3rem;
  cursor: pointer;
  border-bottom: ${(props) =>
    props.active ? '0.2rem solid rgba(139, 139, 139, 0.7)' : 'none'};
  /* border-radius: 0.2rem; */
  margin-bottom: 0.2rem;
`;

const AlbumContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 80%;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 1rem;
  transition: 0.3s;
`;

const AlbumCoverContainer = styled.div`
  position: relative;
  cursor: pointer;

  &:hover .overlay {
    opacity: 1;
  }
`;

const AlbumCoverImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  opacity: 0;
  gap: 1rem;
  transition: opacity 0.3s ease-in-out;
`;

const OverlayText = styled.p`
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 550;
  gap: 0.5rem;
`;

const AlbumCover = ({ pic, title, view }) => (
  <AlbumCoverContainer>
    <AlbumCoverImage src={pic} alt={title} />
    <Overlay className="overlay">
      <OverlayText>{title}</OverlayText>
      <OverlayText>
        <VisibilityIcon /> {view}
      </OverlayText>
    </Overlay>
  </AlbumCoverContainer>
);

const MyContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 72.5%;
  height: 14rem;
  padding-right: 2rem;
  padding-left: 5rem;
  padding-bottom: 1rem;
  margin-top: 2rem;
  align-items: center;
  border-bottom: 0.2rem solid rgba(139, 139, 139, 0.7);
`;

const ProfileName = styled.p`
  font-size: 1.4rem;
  width: 7rem;
`;

const Button15 = styled.button`
  width: 6rem;
  background: #6a069c;
  border: none;
  z-index: 1;
  position: relative;
  padding: 10px 20px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  overflow: hidden;
  border-radius: 1rem;
  outline: none;
  font-family: 'SUIT', sans-serif;

  &:hover {
    color: #fff;
  }

  &:after {
    content: '';
    width: 6rem;
    height: 100%;
    top: 0;
    right: 0;
    z-index: -1;
    background-color: #663dff;
    border-radius: 5px;
    box-shadow:
      inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
      7px 7px 20px 0px rgba(0, 0, 0, 0.1),
      4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  &:hover:after {
    left: 0;
    width: 100%;
  }

  &:active {
    top: 2px;
  }
`;

function Mypage() {
  const [activeTab, setActiveTab] = useState('My Videos');

  const Myvideos = [
    {
      pic: 'https://i.ibb.co/Jn12dqF/unnamed.jpg',
      title: '사랑인가봐',
      view: '0707',
    },
    {
      pic: 'https://i.ibb.co/r5LYBrq/Khbujpf3-Vt7-XREZy-SOLv-Ynfg-Fypr7-KHSx-q9-N5r8ezs-GZkv-Vq-CLom3-St-WLt-XJTY5mk2-VMp-ZICPA4-E-w544-h.jpg',
      title: '사랑인가봐',
      view: '0707',
    },
    {
      pic: 'https://i.ibb.co/sQ0Ts7X/x4jy1m2x5d-As-ZHfb-FK-Xwu-O3g-Rbr-Rq-m2jd-VYSlm7-A9-D6j9e-YFrm-Gk6-Zl-Ndhdz-CXT-o-Wk4-NGex-WLPheet-Q.jpg',
      title: '사랑인가봐',
      view: '0707',
    },
    {
      pic: 'https://i.ibb.co/sQ0Ts7X/x4jy1m2x5d-As-ZHfb-FK-Xwu-O3g-Rbr-Rq-m2jd-VYSlm7-A9-D6j9e-YFrm-Gk6-Zl-Ndhdz-CXT-o-Wk4-NGex-WLPheet-Q.jpg',
      title: '사랑인가봐',
      view: '0707',
    },
  ];

  const RecentlyViewed = [
    {
      pic: 'https://i.ibb.co/Fn93yzJ/1.webp',
      title: '사랑인가봐',
      view: '0707',
    },
    {
      pic: 'https://i.ibb.co/vVhY1w6/2.webp',
      title: '사랑인가봐',
      view: '0707',
    },
    {
      pic: 'https://i.ibb.co/g6vLFDV/3.webp',
      title: '사랑인가봐',
      view: '0707',
    },
    {
      pic: 'https://i.ibb.co/99cZ04Y/4.webp',
      title: '사랑인가봐',
      view: '0707',
    },
  ];

  return (
    <BigContainer>
      <TitleContainer>
        <Profile>Profile</Profile>
      </TitleContainer>
      <MyContainer>
        <ProImg
          src="https://i.ibb.co/tQJcHkm/Kakao-Talk-20221107-190554542-2.jpg"
          alt="남자 주인공"
        />
        <InfoContainer>
          <ProName>
            <ProfileName>권혁진</ProfileName>
            <Button15>Edit</Button15>
          </ProName>
          <VideoCount>동영상 24개</VideoCount>
          <ProText>
            <ChatOutlinedIcon />
            사랑, 그놈...
          </ProText>
          <ExtraFunction>
            <YouTubeIconEdit fontSize="medium" />
            <ThemeProvider theme={theme}>
              <InstagramIconEdit color="gradient" fontSize="medium" />
            </ThemeProvider>
          </ExtraFunction>
        </InfoContainer>
      </MyContainer>
      <TabContainer>
        <Tab
          active={activeTab === 'My Videos'}
          onClick={() => setActiveTab('My Videos')}
        >
          My Videos
        </Tab>
        <Tab
          active={activeTab === 'Recently Viewed'}
          onClick={() => setActiveTab('Recently Viewed')}
        >
          Recently Viewed
        </Tab>
      </TabContainer>
      <AlbumContainer>
        {(activeTab === 'My Videos' ? Myvideos : RecentlyViewed).map(
          (item, index) => (
            <AlbumCover key={index} {...item} />
          ),
        )}
      </AlbumContainer>
    </BigContainer>
  );
}

export default Mypage;
