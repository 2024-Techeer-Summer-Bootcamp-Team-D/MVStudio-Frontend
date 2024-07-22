/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ignorePath from '../utils/igonerePath';

// Material-UI
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import MovieIcon from '@mui/icons-material/Movie';

const NAVBAR_HEIGHT = '0rem'; // 네비게이션 바의 높이 설정

const Container = styled.div`
  background-color: #05000a;
  height: 100vh;
  position: fixed;
  border-right: 1px solid #380272;
  top: ${NAVBAR_HEIGHT}; // 사이드바의 상단 위치를 네비게이션 바의 높이만큼 설정
`;

const SidebarContainer = styled.div`
  background-color: #05000a;
  color: #fafafa;
  height: calc(
    100vh - ${NAVBAR_HEIGHT}
  ); // 전체 높이에서 네비게이션 바의 높이를 뺌
  z-index: 99;
  width: 18rem;
  padding-top: ${NAVBAR_HEIGHT}; // 사이드바 내부의 컨텐츠를 네비게이션 바 높이만큼 아래로 밀어냄
  transform: translateX(${({ xPosition }) => -xPosition}px);
`;

const MenuItem = styled.button`
  display: flex;
  height: 3rem;
  align-items: center;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.25rem;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #333333;
    border-radius: 0.5rem;
  }
`;

const NavigationItem = styled.div`
  display: flex;
  height: 3rem;
  align-items: center;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.25rem;
  cursor: pointer;
  &:hover {
    background-color: #333333;
    border-radius: 0.5rem;
  }
`;

const MenuTitle = styled.div`
  margin-left: 0.625rem;
  font-weight: 500;
  font-size: 1.2rem;
  gap: 0.5rem;
`;

const TrendingText = styled.p`
  margin-left: 0.625rem;
  padding-right: 2.5rem;
  font-weight: 500;
  font-size: 1.2rem;
`;

const ExpandContainer = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition:
    max-height 0.5s ease,
    opacity 0.5s ease;
`;

const Thumbnail = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  align-items: column;
  gap: 1rem; /* Adjust spacing between image and text */
`;

const ImageTitle = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
`;

const Uploader = styled.div`
  font-size: 0.7rem;
  color: #a4a4a4;
`;

const Logo = styled.div`
  left: 1rem;
  font-family: 'SUIT', sans-serif;
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffffff;
  margin-left: 1rem;
  margin-bottom: 2rem;
  margin-top: 2rem;
`;

const EditMovieIcon = styled(MovieIcon)`
  margin-right: 0.6rem;
`;

const EditEqualizerIcon = styled(EqualizerIcon)`
  margin-right: 0.6rem;
`;

function Sidebar() {
  const navigate = useNavigate();

  if (ignorePath().includes(location.pathname)) {
    return null;
  }

  return (
    <Container>
      {/* Home 버튼 */}
      <MenuItem>
        <HomeIcon fontSize="small" />
        <MenuTitle>Home</MenuTitle>
      </MenuItem>

      {/* Create 버튼 */}
      <MenuItem>
        <AddIcon fontSize="small" />
        <MenuTitle>Create</MenuTitle>
      </MenuItem>

      {/* My Studio 버튼 */}
      <MenuItem>
        <EditMovieIcon fontSize="small" />
        <MenuTitle>My Studio</MenuTitle>
      </MenuItem>

      {/* Chart 버튼 */}
      <MenuItem>
        <EditEqualizerIcon fontSize="small" />
        <MenuTitle>Statics</MenuTitle>
      </MenuItem>

      {/* Trending 리스트 */}
      <NavigationItem>
        <WhatshotIcon fontSize="small" />
        <TrendingText>Trending </TrendingText>
      </NavigationItem>

      {/* Trending 리스트 확장 */}
      {/* <ExpandContainer>
        <ThumbnailContainer>
          <Thumbnail src="https://i.ibb.co/Jn12dqF/unnamed.jpg" alt="alt" />
          <InfoContainer>
            <ImageTitle>Title</ImageTitle>
            <Uploader>Uploader</Uploader>
          </InfoContainer>
        </ThumbnailContainer>
        <ThumbnailContainer>
          <Thumbnail src="https://i.ibb.co/Jn12dqF/unnamed.jpg" alt="alt" />
          <InfoContainer>
            <ImageTitle>Title</ImageTitle>
            <Uploader>Uploader</Uploader>
          </InfoContainer>
        </ThumbnailContainer>
        <ThumbnailContainer>
          <Thumbnail src="https://i.ibb.co/Jn12dqF/unnamed.jpg" alt="alt" />
          <InfoContainer>
            <ImageTitle>Title</ImageTitle>
            <Uploader>Uploader</Uploader>
          </InfoContainer>
        </ThumbnailContainer>
        <ThumbnailContainer>
          <Thumbnail src="https://i.ibb.co/Jn12dqF/unnamed.jpg" alt="alt" />
          <InfoContainer>
            <ImageTitle>Title</ImageTitle>
            <Uploader>Uploader</Uploader>
          </InfoContainer>
        </ThumbnailContainer>
        <ThumbnailContainer>
          <Thumbnail src="https://i.ibb.co/Jn12dqF/unnamed.jpg" alt="alt" />
          <InfoContainer>
            <ImageTitle>Title</ImageTitle>
            <Uploader>Uploader</Uploader>
          </InfoContainer>
        </ThumbnailContainer>
        <ThumbnailContainer>
          <Thumbnail src="https://i.ibb.co/Jn12dqF/unnamed.jpg" alt="alt" />
          <InfoContainer>
            <ImageTitle>Title</ImageTitle>
            <Uploader>Uploader</Uploader>
          </InfoContainer>
        </ThumbnailContainer>
        <ThumbnailContainer>
          <Thumbnail src="https://i.ibb.co/Jn12dqF/unnamed.jpg" alt="alt" />
          <InfoContainer>
            <ImageTitle>Title</ImageTitle>
            <Uploader>Uploader</Uploader>
          </InfoContainer>
        </ThumbnailContainer>
      </ExpandContainer> */}
    </Container>
  );
}

export default Sidebar;
