/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ignorePath from '../util/igonerePath';

const Container = styled.div`
  background-color: #e3ecf1;
`;

const SidebarContainer = styled.div`
  background-color: #000000;
  position: relative;
  bottom: 0;
  left: 0;
  color: #fafafa;
  height: 100%;
  z-index: 99;
  width: 20rem;
  transform: translateX(${({ xPosition }) => -xPosition}px);
`;

const HomeItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  cursor: pointer;
  &:hover {
    background-color: #333333;
    border-radius: 1.2rem; /* Adjust as needed */
  }
`;

const CreateItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  cursor: pointer;
  &:hover {
    background-color: #333333;
    border-radius: 1.2rem;
  }
`;

const NavigationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  cursor: pointer;
  &:hover {
    background-color: #333333;
    border-radius: 1.2rem;
  }
`;

const NavigationText = styled.p`
  margin-left: 0.625rem;
  font-weight: 500;
  font-size: 1.5rem;
`;

const TrendingText = styled.p`
  margin-left: 0.625rem;
  padding-right: 2.5rem;
  font-weight: 500;
  font-size: 1.5rem;
`;

const ExpandButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  cursor: pointer;
`;

const ExpandIcon = styled(ArrowForwardIosIcon)`
  transform: ${({ isOpen }) => (isOpen ? 'rotate(90deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
`;

const Content = styled.div`
  padding: 1.25rem;
`;

const ExpandContainer = styled.div`
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: ${({ isOpen }) => (isOpen ? '1000px' : '0')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  overflow: hidden;
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
  font-size: 1.2rem;
`;

const Uploader = styled.div`
  font-size: 0.75rem;
  color: #a4a4a4;
`;

function Sidebar({ children }) {
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
          <HomeIcon />
          <NavigationText>Home</NavigationText>
        </HomeItem>
        <CreateItem>
          <AddIcon />
          <NavigationText>Create</NavigationText>
        </CreateItem>
        <NavigationItem>
          <PersonOutlineIcon />
          <NavigationText>Person</NavigationText>
        </NavigationItem>
        <NavigationItem>
          <WhatshotIcon />
          <TrendingText>Trending </TrendingText>
          <ExpandButton onClick={toggleExpand}>
            <ExpandIcon isOpen={isExpandOpen} />
          </ExpandButton>
        </NavigationItem>
        <ExpandContainer isOpen={isExpandOpen}>
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
      <Content>{children}</Content>
    </Container>
  );
}

export default Sidebar;
