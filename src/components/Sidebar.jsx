/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ignorePath from '../util/igonerePath';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import MovieIcon from '@mui/icons-material/Movie';

const Container = styled.div`
  background-color: #e3ecf1;
`;

const SidebarContainer = styled.div`
  background-color: #05000a;
  position: relative;
  color: #fafafa;
  height: 100%;
  z-index: 99;
  width: 18rem;
  border-right: 1px solid #380272;
  transform: translateX(${({ xPosition }) => -xPosition}px);
`;

const HomeItem = styled.div`
  display: flex;
  height: 3rem;
  align-items: center;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.25rem;
  cursor: pointer;
  &:hover {
    background-color: #333333;
    border-radius: 0.5rem; /* Adjust as needed */
  }
`;

const CreateItem = styled.div`
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

const MyStudio = styled.div`
  display: flex;
  height: 3rem;
  align-items: center;
  margin-left: 0.4rem;
  margin-right: 1rem;
  padding-left: 0.25rem;
  gap: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #333333;
    border-radius: 0.5rem;
  }
`;

const Statics = styled.div`
  display: flex;
  height: 3rem;
  align-items: center;
  margin-left: 0.4rem;
  margin-right: 1rem;
  padding-left: 0.25rem;
  gap: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #333333;
    border-radius: 0.5rem;
  }
`;

const NavigationText = styled.div`
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
  width: 3rem;
  height: 3rem;
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

const MyChannelContainer = styled.div`
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  display: flex;
  flex-direction: column;
  max-height: ${({ isOpen }) => (isOpen ? '1000px' : '0')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  overflow: hidden;
  transition:
    max-height 0.5s ease,
    opacity 0.5s ease;
`;

const EditMovieIcon = styled(MovieIcon)`
  margin-right: 0.6rem;
`;

const EditEqualizerIcon = styled(EqualizerIcon)`
  margin-right: 0.6rem;
`;

function Sidebar() {
  const [xPosition, setX] = useState(0);
  const [isExpandOpen, setExpandOpen] = useState(false);

  const side = useRef();

  const handleClose = (e) => {
    let sideArea = side.current;
    let sideChildren = side.current.contains(e.target);
    if (sideArea && !sideChildren) {
      setX(0);
    }
  };

  const toggleExpand = () => {
    setExpandOpen(!isExpandOpen);
  };

  useEffect(() => {
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
    };
  }, []);

  const isIgnoredPath = ignorePath().includes(location.pathname);

  if (isIgnoredPath) {
    return null;
  }

  return (
    <Container>
      <SidebarContainer ref={side} xPosition={xPosition}>
        <HomeItem>
          <HomeIcon fontSize="small" />
          <NavigationText>Home</NavigationText>
        </HomeItem>
        <CreateItem>
          <AddIcon fontSize="small" />
          <NavigationText>Create</NavigationText>
        </CreateItem>
        <NavigationItem onClick={toggleExpand}>
          <PersonOutlineIcon fontSize="small" />
          <NavigationText>You</NavigationText>
        </NavigationItem>
        <MyChannelContainer isOpen={isExpandOpen}>
          <MyStudio>
            <NavigationText>
              <EditMovieIcon fontSize="small" />
              My Studio
            </NavigationText>
          </MyStudio>
          <Statics>
            <NavigationText>
              <EditEqualizerIcon fontSize="small" />
              Statics
            </NavigationText>
          </Statics>
        </MyChannelContainer>
        <NavigationItem>
          <WhatshotIcon fontSize="small" />
          <TrendingText>Trending </TrendingText>
        </NavigationItem>
        <ExpandContainer>
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
        </ExpandContainer>
      </SidebarContainer>
    </Container>
  );
}

export default Sidebar;
