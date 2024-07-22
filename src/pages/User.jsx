import React, { useState } from 'react';
import styled from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import { getList } from '../api/musicVideos';

const CreateContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-right: 6%;
  margin-top: 3rem;
`;

const TitleStyle = styled.p`
  font-family: 'SUIT', sans-serif;
  font-size: 1.5rem;
  color: #ffffff;
  font-weight: 700;
  margin-left: 3.2rem;
`;

const TitleStyle2 = styled.p`
  font-family: 'SUIT', sans-serif;
  font-size: 1rem;
  color: #ffffff;
  font-weight: 700;
  margin-top: -3.5rem;
  margin-left: 3.2rem;
`;

const TrendCoverBox = styled.div`
  transition: transform 0.5s ease-in-out;
  width: 26%;
  height: 26%;
  flex: 0 0 26%;
`;

const CoverBox = styled.div`
  transition: transform 0.5s ease-in-out;
  width: 14.75%;
  height: 14.75%;
  flex: 0 0 14.75%;
`;

const TrendRoundCover = styled.button`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 10%;
  width: 15.4rem;
  height: 15rem;
  position: relative;
  &:hover {
    filter: brightness(0.8);
  }

  &::after {
    content: '${(props) => props.label}';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 1.2rem;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
`;

const RoundCover = styled.button`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 10%;
  width: 8rem;
  height: 8rem;
  align-items: center;
  justify-content: center;
  position: relative;
  &:hover {
    filter: brightness(0.8);
  }

  &::after {
    content: '${(props) => props.label}';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 1.2rem;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
`;

const TrendArrowFunction = styled(ArrowForwardIosIcon)`
  display: flex;
  width: 3rem;
  margin-top: 7.8%;
  cursor: pointer;
  color: ${(props) => (props.disabled ? 'transparent' : '#7b7b7b')};
  transform: ${(props) => (props.isPrev ? 'rotate(0deg)' : 'rotate(180deg)')};
  z-index: 2;
`;

const ArrowFunction = styled(ArrowForwardIosIcon)`
  display: flex;
  margin-top: 4.5%;
  cursor: pointer;
  color: ${(props) => (props.disabled ? 'transparent' : '#7b7b7b')};
  transform: ${(props) => (props.isPrev ? 'rotate(0deg)' : 'rotate(180deg)')};
  z-index: 2;
`;

const TrendContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  width: 100%;
  margin-left: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  width: 100%;
  margin-left: 2rem;
`;

const TrendViewContainer = styled.div`
  width: 70rem;
  height: 15rem;
  gap: 2rem;
  display: flex;
  overflow: hidden;
  /* margin-left: -1rem; */
`;

const ViewContainer = styled.div`
  width: 70rem;
  height: 15rem;
  display: flex;
  overflow: hidden;
`;

const TrendList = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 8rem;
  transition: transform 0.5s ease-in-out;
  transform: ${({ currentIndex }) => `translateX(-${currentIndex * 26}%)`};
  position: relative;
`;

const Array2List = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 8rem;
  transition: transform 0.5s ease-in-out;
  transform: ${({ optionIndex }) => `translateX(-${optionIndex * 14.75}%)`};
  position: relative;
`;

const Array3List = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 8rem;
  transition: transform 0.5s ease-in-out;
  transform: ${({ array3Index }) => `translateX(-${array3Index * 14.75}%)`};
  position: relative;
`;

const TrendImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 22%;
  height: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  border-bottom-left-radius: 1.2rem;
  border-bottom-right-radius: 1.2rem;
  color: white;
  font-size: 0.8rem;
  top: 11rem;
`;

const FontMargin = styled.div`
  margin-left: 1rem;
  margin-top: 0.5rem;
`;

const SmallText = styled.div`
  font-size: 0.5rem;
`;

const ViewNumber = styled.div`
  font-size: 0.7rem;
  text-align: right;
  margin-right: 1rem;
  margin-top: -0.9rem;
`;

const ViewIcon = styled(VisibilityIcon)`
  color: #ffffff;
  margin-right: 0.3rem;
  margin-left: 11.3rem;
  margin-top: 0.6rem;
`;

const TitleText1 = styled.div`
  color: white;
  font-size: 0.7rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-top: 0.5rem;
  margin-left: 0.3rem;
`;

const TitleSmallText = styled.div`
  color: white;
  font-size: 0.5rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
`;

// const Array4List = styled.div`
//   display: flex;
//   flex-direction: row;
//   width: 100%;
//   height: 8rem;
//   transition: transform 0.5s ease-in-out;
//   transform: ${({ array4Index }) => `translateX(-${array4Index * 14.75}%)`};
//   position: relative;
// `;

function MainPageTest() {
  const TrendArray = [
    { src: 'https://i.ibb.co/Fn93yzJ/1.webp' },
    { src: 'https://i.ibb.co/vVhY1w6/2.webp' },
    { src: 'https://i.ibb.co/g6vLFDV/3.webp' },
    { src: 'https://i.ibb.co/99cZ04Y/4.webp' },
    { src: 'https://i.ibb.co/zxwxR63/5.webp' },
    { src: 'https://i.ibb.co/Fn93yzJ/1.webp' },
    { src: 'https://i.ibb.co/vVhY1w6/2.webp' },
    { src: 'https://i.ibb.co/g6vLFDV/3.webp' },
    { src: 'https://i.ibb.co/99cZ04Y/4.webp' },
    { src: 'https://i.ibb.co/zxwxR63/5.webp' },
  ];

  const Array1 = [
    { src: 'https://i.ibb.co/jZC1m8q/g.webp' },
    { src: 'https://i.ibb.co/7YxZwtQ/f.webp' },
    { src: 'https://i.ibb.co/SN6BBnq/aquaman-jps.jpg' },
    { src: 'https://i.ibb.co/vj4N7Kg/b.webp' },
    { src: 'https://i.ibb.co/cxwzVrb/cat.jpg' },
    { src: 'https://i.ibb.co/wQs8HBx/d.webp' },
    { src: 'https://i.ibb.co/wLF0GfS/c.webp' },
    { src: 'https://i.ibb.co/g6vLFDV/3.webp' },
    { src: 'https://i.ibb.co/99cZ04Y/4.webp' },
    { src: 'https://i.ibb.co/zxwxR63/5.webp' },
  ];

  const Array2 = [
    { src: 'https://i.ibb.co/mtJwVKQ/jknk.webp' },
    { src: 'https://i.ibb.co/q9W2Qhx/b1.webp' },
    { src: 'https://i.ibb.co/ryzdP1R/a.webp' },
    { src: 'https://i.ibb.co/NYthwKK/3c.webp' },
    { src: 'https://i.ibb.co/DkxF5fF/qwd-jpb.webp' },
    { src: 'https://i.ibb.co/rm30n24/efm.webp' },
    { src: 'https://i.ibb.co/cxwzVrb/cat.jpg' },
    { src: 'https://i.ibb.co/g6vLFDV/3.webp' },
    { src: 'https://i.ibb.co/99cZ04Y/4.webp' },
    { src: 'https://i.ibb.co/zxwxR63/5.webp' },
  ];

  //   const Array3 = [
  //     { src: 'https://i.ibb.co/Fn93yzJ/1.webp' },
  //     { src: 'https://i.ibb.co/vVhY1w6/2.webp' },
  //     { src: 'https://i.ibb.co/g6vLFDV/3.webp' },
  //     { src: 'https://i.ibb.co/99cZ04Y/4.webp' },
  //     { src: 'https://i.ibb.co/zxwxR63/5.webp' },
  //     { src: 'https://i.ibb.co/Fn93yzJ/1.webp' },
  //     { src: 'https://i.ibb.co/vVhY1w6/2.webp' },
  //     { src: 'https://i.ibb.co/g6vLFDV/3.webp' },
  //     { src: 'https://i.ibb.co/99cZ04Y/4.webp' },
  //     { src: 'https://i.ibb.co/zxwxR63/5.webp' },
  //   ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [optionIndex, setOptionIndex] = useState(0);
  const [array3Index, setarray3Index] = useState(0);
  //   const [array4Index, setarray4Index] = useState(0);

  const trendhandlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const trendhandleNext = () => {
    if (currentIndex < TrendArray.length - 5) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const moreOption = () => {
    if (optionIndex < Array1.length - 5) {
      setOptionIndex(optionIndex + 1);
    }
  };

  const prevOption = () => {
    if (optionIndex > 0) {
      setOptionIndex(optionIndex - 1);
    }
  };
  const array3Next = () => {
    if (array3Index < Array1.length - 5) {
      setarray3Index(array3Index + 1);
    }
  };

  const array3Pre = () => {
    if (array3Index > 0) {
      setarray3Index(array3Index - 1);
    }
  };
  //   const array4Next = () => {
  //     if (array4Index < Array1.length - 5) {
  //       setarray4Index(array4Index + 1);
  //     }
  //   };

  //   const array4Pre = () => {
  //     if (array4Index > 0) {
  //       setarray4Index(array4Index - 1);
  //     }
  //   };

  return (
    <CreateContainer>
      <TitleStyle>Most View</TitleStyle>
      <TrendContainer>
        <TrendArrowFunction
          onClick={trendhandlePrev}
          isPrev={false}
          fontSize="large"
          disabled={currentIndex === 0}
        />
        <TrendViewContainer>
          <TrendList currentIndex={currentIndex}>
            {TrendArray.map((cover, index) => (
              <TrendCoverBox key={index}>
                <TrendRoundCover src={cover.src} />
                <TrendImageOverlay>
                  <FontMargin>
                    La Vie en Rose
                    <SmallText>IZ*ONE</SmallText>
                  </FontMargin>
                  <ViewIcon sx={{ color: '#ffffff', fontSize: '0.8rem' }} />
                  <ViewNumber>1,027</ViewNumber>
                </TrendImageOverlay>
              </TrendCoverBox>
            ))}
          </TrendList>
        </TrendViewContainer>
        <TrendArrowFunction
          onClick={trendhandleNext}
          isPrev={true}
          fontSize="large"
          disabled={currentIndex === TrendArray.length - 5}
        />
      </TrendContainer>
      <TitleStyle>Recent Upload</TitleStyle>
      <Container>
        <ArrowFunction
          onClick={prevOption}
          isPrev={false}
          fontSize="small"
          disabled={optionIndex === 0}
        />
        <ViewContainer>
          <Array2List optionIndex={optionIndex}>
            {Array1.map((cover, index) => (
              <CoverBox key={index}>
                <RoundCover src={cover.src} />
                <TitleText1>
                  Title<TitleSmallText>Artist</TitleSmallText>
                </TitleText1>
              </CoverBox>
            ))}
          </Array2List>
        </ViewContainer>
        <ArrowFunction
          onClick={moreOption}
          isPrev={true}
          fontSize="small"
          disabled={optionIndex === Array1.length - 5}
        />
      </Container>
      <TitleStyle2>My Country Trend</TitleStyle2>
      <Container>
        <ArrowFunction
          onClick={array3Pre}
          isPrev={false}
          fontSize="small"
          disabled={array3Index === 0}
        />
        <ViewContainer>
          <Array3List array3Index={array3Index}>
            {Array2.map((cover, index) => (
              <CoverBox key={index}>
                <RoundCover src={cover.src} />
                <TitleText1>
                  Title<TitleSmallText>Artist</TitleSmallText>
                </TitleText1>
              </CoverBox>
            ))}
          </Array3List>
        </ViewContainer>
        <ArrowFunction
          onClick={array3Next}
          isPrev={true}
          fontSize="small"
          disabled={array3Index === Array2.length - 5}
        />
      </Container>
      {/* <TitleStyle2>Array3</TitleStyle2>
      <TrendContainer>
        <ArrowFunction
          onClick={array4Pre}
          isPrev={false}
          fontSize="small"
          disabled={array4Index === 0}
        />
        <ViewContainer>
          <Array4List array4Index={array4Index}>
            {Array3.map((cover, index) => (
              <CoverBox key={index}>
                <RoundCover src={cover.src} label={cover.label} />
              </CoverBox>
            ))}
          </Array4List>
        </ViewContainer>
        <ArrowFunction
          onClick={array4Next}
          isPrev={true}
          fontSize="small"
          disabled={array4Index === Array3.length - 5}
        />
      </TrendContainer> */}
    </CreateContainer>
  );
}

export default MainPageTest;
