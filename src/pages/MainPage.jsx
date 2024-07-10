import React, { useState } from 'react';
import styled from 'styled-components';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 5rem;
  margin-left: 2rem;
  &:hover .overlay {
    opacity: 1;
  }
`;

const TrendImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 19rem;
  border-radius: 1.5rem;
  display: flex;
  margin-left: 2rem;
  margin-top: -1.5rem;
  transition: transform 0.5s ease;
  transform: translateX(${(props) => props.slideIndex * -25}%);
`;

const TrendImageContainer25 = styled.div`
  position: relative;
  width: 22.5%;
  height: 15rem;
  flex-shrink: 0;
`;

const TrendImageOverlay = styled.div`
  position: absolute;
  bottom: -2.5rem;
  width: 100%;
  height: 25%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  border-bottom-left-radius: 1.2rem;
  border-bottom-right-radius: 1.2rem;
  color: white;
  font-size: 0.8rem;
  margin-top: 4rem;
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
  margin-right: 4rem;
  margin-top: -1.1rem;
`;

const ViewIcon = styled(VisibilityIcon)`
  color: #ffffff;
  margin-right: 0.3rem;
  margin-left: 11.3rem;
  margin-top: 0.5rem;
`;

const TrendImage = styled.img`
  width: 15rem;
  height: 15rem;
  border-radius: 1.2rem;
  position: relative;
  margin-top: 2.5rem;
  margin-right: 1.4rem;
`;

const Image = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 0.5rem;
  position: relative;
  margin-right: 0.35rem;
`;

const Overlay = styled.div`
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
`;

const TrendText = styled.div`
  color: white;
  font-size: 1.3rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-left: 2.5rem;
  margin-top: 1rem;
`;

const RecentUploadedText = styled.div`
  color: white;
  font-size: 1.3rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-top: 4rem;
  margin-left: 2.1rem;
`;

const RecentViewText = styled.div`
  color: white;
  font-size: 1.3rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-top: 3rem;
  margin-left: 2.1rem;
`;

const MyCountyText = styled.div`
  color: white;
  font-size: 1.3rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-top: 3rem;
  margin-left: 2.1rem;
`;

const TitleText1 = styled.div`
  color: white;
  font-size: 0.7rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-top: 0.5rem;
  margin-left: 14rem;
`;

const TitleText2 = styled.div`
  color: white;
  font-size: 0.7rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-top: 0.5rem;
  margin-left: 8.9rem;
`;

const TitleSmallText = styled.div`
  color: white;
  font-size: 0.5rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
`;

const TextBox = styled.div`
  display: flex;
  margin-left: -12rem;
  margin-top: -0.5rem;
`;

const PagePart = styled.div`
  overflow-x: hidden;
`;

const RecentUploaded = styled.div`
  display: flex;
  margin-top: -4.4rem;
`;

const RecentView = styled.div`
  display: flex;
  margin-top: -4.4rem;
`;

const MyCountyTrend = styled.div`
  display: flex;
  margin-top: -4.4rem;
`;

const LeftButton = styled.button`
  cursor: pointer;
  padding: 10px;
  background-color: #a4a4a4;
  color: #000000;
  border: none;
  font-size: 0.5rem;
  border-radius: 1rem;
  position: absolute;
  top: 15.5rem;
  left: 15.5rem;
  z-index: 100;
`;

const RightButton = styled.button`
  cursor: pointer;
  padding: 10px;
  background-color: #a4a4a4;
  color: #000000;
  border: none;
  font-size: 0.5rem;
  border-radius: 1rem;
  position: absolute;
  left: 81.3rem;
  top: 15.5rem;
  z-index: 100;
`;

const MainPage = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const RightonClick = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % 4);
  };

  const LeftonClick = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + 4) % 4);
  };
  return (
    <PagePart>
      <TrendText>
        Trend
        <br />
        <SmallText>이거 보세요오~~~!!</SmallText>
      </TrendText>
      <LeftButton onClick={LeftonClick}>Left</LeftButton>
      <TrendImageContainer slideIndex={slideIndex}>
        <TrendImageContainer25>
          <TrendImage src="https://i.ibb.co/Fn93yzJ/1.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
          <TrendImageOverlay>
            <FontMargin>
              La Vie en Rose
              <SmallText>IZ*ONE</SmallText>
            </FontMargin>
            <ViewIcon sx={{ color: '#ffffff', fontSize: '0.8rem' }} />
            <ViewNumber>1,027</ViewNumber>
          </TrendImageOverlay>
        </TrendImageContainer25>
        <TrendImageContainer25>
          <TrendImage src="https://i.ibb.co/vVhY1w6/2.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
          <TrendImageOverlay>
            <FontMargin>
              La Vie en Rose
              <SmallText>IZ*ONE</SmallText>
            </FontMargin>
            <ViewIcon sx={{ color: '#ffffff', fontSize: '0.8rem' }} />
            <ViewNumber>1,027</ViewNumber>
          </TrendImageOverlay>
        </TrendImageContainer25>
        <TrendImageContainer25>
          <TrendImage src="https://i.ibb.co/g6vLFDV/3.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
          <TrendImageOverlay>
            <FontMargin>
              La Vie en Rose
              <SmallText>IZ*ONE</SmallText>
            </FontMargin>
            <ViewIcon sx={{ color: '#ffffff', fontSize: '0.8rem' }} />
            <ViewNumber>1,027</ViewNumber>
          </TrendImageOverlay>
        </TrendImageContainer25>
        <TrendImageContainer25>
          <TrendImage src="https://i.ibb.co/99cZ04Y/4.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
          <TrendImageOverlay>
            <FontMargin>
              La Vie en Rose
              <SmallText>IZ*ONE</SmallText>
            </FontMargin>
            <ViewIcon sx={{ color: '#ffffff', fontSize: '0.8rem' }} />
            <ViewNumber>1,027</ViewNumber>
          </TrendImageOverlay>
        </TrendImageContainer25>
        <TrendImageContainer25>
          <TrendImage src="https://i.ibb.co/99cZ04Y/4.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
          <TrendImageOverlay>
            <FontMargin>
              La Vie en Rose
              <SmallText>IZ*ONE</SmallText>
            </FontMargin>
            <ViewIcon sx={{ color: '#ffffff', fontSize: '0.8rem' }} />
            <ViewNumber>1,027</ViewNumber>
          </TrendImageOverlay>
        </TrendImageContainer25>
        <TrendImageContainer25>
          <TrendImage src="https://i.ibb.co/99cZ04Y/4.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
          <TrendImageOverlay>
            <FontMargin>
              La Vie en Rose
              <SmallText>IZ*ONE</SmallText>
            </FontMargin>
            <ViewIcon sx={{ color: '#ffffff', fontSize: '0.8rem' }} />
            <ViewNumber>1,027</ViewNumber>
          </TrendImageOverlay>
        </TrendImageContainer25>
      </TrendImageContainer>
      <RightButton onClick={RightonClick}>Right</RightButton>
      <RecentUploadedText>Most View</RecentUploadedText>
      <RecentUploaded>
        <ImageContainer>
          <Image src="https://i.ibb.co/Fn93yzJ/1.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/vVhY1w6/2.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/g6vLFDV/3.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/99cZ04Y/4.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/zxwxR63/5.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/ZYLvzjs/9.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/Fn93yzJ/1.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
        </ImageContainer>
      </RecentUploaded>
      <TextBox>
        <TitleText1>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText1>
        <TitleText2>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText2>
        <TitleText2>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText2>
        <TitleText2>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText2>
        <TitleText2>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText2>
        <TitleText2>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText2>
        <TitleText2>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText2>
      </TextBox>
      <RecentViewText>Recent uploaded</RecentViewText>
      <RecentView>
        <ImageContainer>
          <Image src="https://i.ibb.co/Fn93yzJ/1.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/vVhY1w6/2.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/g6vLFDV/3.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/99cZ04Y/4.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/zxwxR63/5.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/ZYLvzjs/9.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/Fn93yzJ/1.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
        </ImageContainer>
      </RecentView>
      <TextBox>
        <TitleText1>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText1>
        <TitleText2>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText2>
        <TitleText2>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText2>
        <TitleText2>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText2>
        <TitleText2>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText2>
        <TitleText2>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText2>
        <TitleText2>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText2>
      </TextBox>
      <MyCountyText>My country trend</MyCountyText>
      <MyCountyTrend>
        <ImageContainer>
          <Image src="https://i.ibb.co/Fn93yzJ/1.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/vVhY1w6/2.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/g6vLFDV/3.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/99cZ04Y/4.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/zxwxR63/5.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/ZYLvzjs/9.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
        </ImageContainer>
        <ImageContainer>
          <Image src="https://i.ibb.co/Fn93yzJ/1.webp" />
          <Overlay className="overlay">
            <PlayArrowIcon />
          </Overlay>
        </ImageContainer>
      </MyCountyTrend>
      <TextBox>
        <TitleText1>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText1>
        <TitleText2>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText2>
        <TitleText2>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText2>
        <TitleText2>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText2>
        <TitleText2>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText2>
        <TitleText2>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText2>
        <TitleText2>
          Title
          <TitleSmallText>Artist</TitleSmallText>
        </TitleText2>
      </TextBox>
    </PagePart>
  );
};

export default MainPage;
