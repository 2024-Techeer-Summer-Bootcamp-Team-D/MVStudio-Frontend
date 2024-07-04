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
  position: fixed;
  top: 10%;
  bottom: 0;
  left: 0;
  color: #ffffff;
  height: 90%;
  z-index: 99;
  width: 15rem;
  transform: translateX(${({ xPosition }) => -xPosition}px);
`;

const HomeItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #333333;
  }
`;

const CreateItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #333333;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ffffff;
  margin: 10px 0;
`;

const NavigationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #333333;
  }
`;

const Myitem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
`;

const NavigationText = styled.span`
  margin-left: 10px;
`;

const TrendingText = styled.span`
  margin-left: 10px;
  padding-right: 5rem;
`;

const ExpandButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  cursor: pointer;
`;

const ExpandIcon = styled(ArrowForwardIosIcon)`
  transform: ${({ isOpen }) => (isOpen ? 'rotate(90deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
`;

const Content = styled.div`
  padding: 20px;
`;

const NavigationMyText = styled.span`
  margin-right: 1rem;
`;

const ExpandContainer = styled.div`
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  padding: 20px;
  display: flex;
`;

const Thumbnail = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  margin-left: 1.2rem;
  flex-direction: column;
  width: 100%;
`;

const ImageTitle = styled.div`
  font-weight: bold;
`;

const Uploader = styled.div`
  font-size: 12px;
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
          <Thumbnail
            src="https://i.ibb.co/Jn12dqF/unnamed.jpg"
            alt="Thumbnail"
          />
          <ThumbnailContainer>
            <ImageTitle>Image Title</ImageTitle>
            <Uploader>Uploader</Uploader>
          </ThumbnailContainer>
        </ExpandContainer>
      </SidebarContainer>
      <Content>{children}</Content>
    </Container>
  );
}

export default Sidebar;
