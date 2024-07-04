/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

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
  width: 15rem;
  transform: translateX(${({ xPosition }) => -xPosition}px);
`;

const HomeItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1.25rem 1.25rem;
  cursor: pointer;
  &:hover {
    background-color: #333333;
  }
`;

const CreateItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1.25rem 1.25rem;
  cursor: pointer;
  &:hover {
    background-color: #333333;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 0.01rem;
  background-color: #ffffff;
  margin: 0.625rem 0;
`;

const NavigationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1.25rem 1.25rem;
  cursor: pointer;
  &:hover {
    background-color: #333333;
  }
`;

const Myitem = styled.p`
  display: flex;
  align-items: center;
  padding: 1.25rem 1.25rem;
  font-weight: 500;
`;

const NavigationText = styled.p`
  margin-left: 0.625rem;
  font-weight: 500;
`;

const TrendingText = styled.p`
  margin-left: 0.625rem;
  padding-right: 4.5rem;
  font-weight: 500;
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

const NavigationMyText = styled.span`
  margin-right: 1rem;
  font-weight: 500;
`;

const ExpandContainer = styled.div`
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  padding: 1.25rem;
  display: flex; /* Always use flex to manage space */
  flex-direction: column; /* Items will be in column direction */
  gap: 1rem; /* Adjust spacing between items */
`;

const Thumbnail = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem; /* Adjust spacing between image and text */
`;

const ImageTitle = styled.div`
  font-weight: bold;
`;

const Uploader = styled.div`
  font-size: 0.75rem;
  color: #a4a4a4;
`;

function Sidebar({ children }) {
  const [xPosition, setX] = useState(0); // xPosition 상태를 0으로 초기화 (열린 상태)
  const [isExpandOpen, setExpandOpen] = useState(false); // ExpandContainer의 열림 상태를 관리

  const side = useRef();

  // 사이드바 외부 클릭 시 닫히는 함수
  const handleClose = (e) => {
    let sideArea = side.current;
    let sideChildren = side.current.contains(e.target);
    if (sideArea && !sideChildren) {
      setX(0);
    }
  };

  // Expand 버튼 클릭 시 ExpandContainer 열고 닫기
  const toggleExpand = () => {
    setExpandOpen(!isExpandOpen);
  };

  useEffect(() => {
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
    };
  }, []);

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
        <Divider />
        <Myitem>
          <NavigationMyText>나</NavigationMyText>
          <ArrowForwardIosIcon />
        </Myitem>
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
            <div>
              <ImageTitle>Title</ImageTitle>
              <Uploader>Uploader</Uploader>
            </div>
          </ThumbnailContainer>
          <ThumbnailContainer>
            <Thumbnail src="https://i.ibb.co/Jn12dqF/unnamed.jpg" alt="alt" />
            <div>
              <ImageTitle>Title</ImageTitle>
              <Uploader>Uploader</Uploader>
            </div>
          </ThumbnailContainer>
          <ThumbnailContainer>
            <Thumbnail src="https://i.ibb.co/Jn12dqF/unnamed.jpg" alt="alt" />
            <div>
              <ImageTitle>Title</ImageTitle>
              <Uploader>Uploader</Uploader>
            </div>
          </ThumbnailContainer>
          <ThumbnailContainer>
            <Thumbnail src="https://i.ibb.co/Jn12dqF/unnamed.jpg" alt="alt" />
            <div>
              <ImageTitle>Title</ImageTitle>
              <Uploader>Uploader</Uploader>
            </div>
          </ThumbnailContainer>
        </ExpandContainer>
      </SidebarContainer>
      <Content>{children}</Content>
    </Container>
  );
}

export default Sidebar;
