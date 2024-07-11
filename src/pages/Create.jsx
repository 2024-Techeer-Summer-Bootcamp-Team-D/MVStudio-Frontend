import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const jellyAnimation = keyframes`
  25% {
    transform: scale(0.9, 1.1);
  }

  50% {
    transform: scale(1.1, 0.9);
  }

  75% {
    transform: scale(0.95, 1.05);
  }
`;

const JellyButton = styled.button`
  margin-left: 35%;
  margin-top: 2%;
  width: 20%;
  height: 3rem;
  font-size: 1.4rem;
  font-weight: 500;
  background: linear-gradient(
    45deg,
    rgba(156, 106, 99, 0.8) 30%,
    rgba(111, 59, 151, 0.8) 90%
  );
  color: white; /* 텍스트의 색상을 지정합니다 */
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    animation: ${jellyAnimation} 0.5s both;
    background: linear-gradient(
      45deg,
      rgba(156, 106, 99, 0.8) 30%,
      rgba(111, 59, 151, 0.8) 90%
    );
  }
`;

const PageTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  font-family: 'SUIT' sans-serif;
  color: #ffffff;
  margin-left: 12%;
  margin-top: 1%;
  margin-bottom: 2%;
`;

const CreateContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const BigContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  margin-left: 12%;
  padding-left: 2rem;
  background: #180131;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
`;

const RightContainer = styled.div`
  width: 55%;
  display: flex;
  flex-direction: column;
  margin-right: 12%;
  background: #180131;
  padding-left: 2rem;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;

const TitleStyle = styled.p`
  font-family: 'SUIT', sans-serif;
  font-size: 1.4rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  font-weight: 700;
`;

const CustomButton = styled.button`
  width: 7rem;
  height: 2.5rem;
  color: #fff;
  border-radius: 1rem;
  padding: 0.6rem 1.8rem;
  font-family: 'suit', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  box-shadow:
    inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1),
    4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
  background: linear-gradient(
    45deg,
    rgba(156, 106, 99, 0.8) 30%,
    rgba(111, 59, 151, 0.8) 90%
  );
  border: none;

  ${(props) =>
    props.clicked &&
    css`
      box-shadow:
        4px 4px 6px 0 rgba(255, 255, 255, 0.2),
        -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
        inset -4px -4px 6px 0 rgba(255, 255, 255, 0.2),
        inset 4px 4px 6px 0 rgba(0, 0, 0, 0.4);
    `}
`;

const TitleInput = styled.input`
  background: linear-gradient(
    45deg,
    rgba(156, 106, 99, 0.8) 30%,
    rgba(111, 59, 151, 0.8) 90%
  );
  width: 18.87rem;
  height: 1.12rem;
  padding: 1rem;
  border-radius: 1.3rem;
  box-shadow:
    inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1),
    4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
  border: none;
  color: #ffffff;
  font-family: 'SUIT', sans-serif;
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 3rem;
  ::placeholder {
    color: #000000;
    font-size: 1.1rem;
    font-family: 'SUIT', sans-serif;
  }
`;

const ChooseOption = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
  margin-bottom: 3rem;
`;

const CoverBox = styled.div`
  transition: transform 0.5s ease-in-out;
  width: 16.7%;
  flex: 0 0 16.7%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const RoundCover = styled.button`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
  border: 0.2rem solid #ffffff;
  overflow: hidden;

  &:hover {
    filter: brightness(0.8);
  }
`;

const CoverLabel = styled.span`
  color: white;
  font-weight: bold;
  font-size: 0.875rem;
  text-align: center;
  font-family: 'SUIT', sans-serif;
  margin-top: 0.5rem;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 8rem;
  transition: transform 0.5s ease-in-out;
  transform: ${({ currentIndex }) => `translateX(-${currentIndex * 16.73}%)`};
  position: relative;
`;

const ArrowFunction = styled(ArrowForwardIosIcon)`
  display: flex;
  width: 5%;
  margin-top: 2.5rem;
  cursor: pointer;
  color: ${(props) => (props.disabled ? 'transparent' : '#7b7b7b')};
  transform: ${(props) => (props.isPrev ? 'rotate(0deg)' : 'rotate(180deg)')};
  z-index: 2;
`;

const GenreContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  width: 100%;
`;

const ViewContainer = styled.div`
  width: 50rem;
  display: flex;
  overflow: hidden;
`;

const InstrumentList = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 8rem;
  transition: transform 0.5s ease-in-out;
  transform: ${({ optionIndex }) => `translateX(-${optionIndex * 16.73}%)`};
  position: relative;
`;

const ToThePadding = styled.div`
  padding-top: 1.5rem;
`;

const ToThePaddingTop = styled.div`
  padding-top: 4.5rem;
`;

const ToTheMargin = styled.div`
  margin-top: 3.2rem;
`;

function Create() {
  const newCoverArray = [
    { src: 'https://picsum.photos/seed/1/100', label: 'POP' },
    { src: 'https://picsum.photos/seed/2/100', label: 'ROCK' },
    { src: 'https://picsum.photos/seed/3/100', label: 'JAZZ' },
    { src: 'https://picsum.photos/seed/4/100', label: 'CLASSICAL' },
    { src: 'https://picsum.photos/seed/5/100', label: 'HIP HOP' },
    { src: 'https://picsum.photos/seed/6/100', label: 'COUNTRY' },
    { src: 'https://picsum.photos/seed/7/100', label: 'BLUES' },
    { src: 'https://picsum.photos/seed/8/100', label: 'R&B' },
    { src: 'https://picsum.photos/seed/9/100', label: 'REGGAE' },
    { src: 'https://picsum.photos/seed/10/100', label: '응애' },
    { src: 'https://picsum.photos/seed/11/100', label: '사랑' },
    { src: 'https://picsum.photos/seed/12/100', label: 'ELECTRONIC' },
    { src: 'https://picsum.photos/seed/13/100', label: 'ELECTRONIC' },
    { src: 'https://picsum.photos/seed/14/100', label: 'ELECTRONIC' },
    { src: 'https://picsum.photos/seed/15/100', label: 'ELECTRONIC' },
  ];

  const instrumentArray = [
    { src: 'https://picsum.photos/seed/16/100', label: 'GUITAR' },
    { src: 'https://picsum.photos/seed/17/100', label: 'BASS' },
    { src: 'https://picsum.photos/seed/18/100', label: 'DRUMS' },
    { src: 'https://picsum.photos/seed/19/100', label: 'PIANO' },
    { src: 'https://picsum.photos/seed/20/100', label: 'VOCALS' },
    { src: 'https://picsum.photos/seed/21/100', label: 'ACOUSTIC' },
    { src: 'https://picsum.photos/seed/22/100', label: 'ELECTRIC' },
    { src: 'https://picsum.photos/seed/23/100', label: 'SYNTH' },
    { src: 'https://picsum.photos/seed/24/100', label: 'VIOLIN' },
    { src: 'https://picsum.photos/seed/25/100', label: 'CELLO' },
    { src: 'https://picsum.photos/seed/26/100', label: 'FLUTE' },
    { src: 'https://picsum.photos/seed/27/100', label: 'SAXOPHONE' },
    { src: 'https://picsum.photos/seed/28/100', label: 'TRUMPET' },
    { src: 'https://picsum.photos/seed/29/100', label: 'TROMBONE' },
    { src: 'https://picsum.photos/seed/30/100', label: 'HARP' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [optionIndex, setOptionIndex] = useState(0);
  const [voice, setVoice] = useState(null);
  const [language, setLanguage] = useState(null);
  const [tempo, setTempo] = useState(null);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < newCoverArray.length - 5) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const moreOption = () => {
    if (optionIndex < instrumentArray.length - 5) {
      setOptionIndex(optionIndex + 1);
    }
  };

  const prevOption = () => {
    if (optionIndex > 0) {
      setOptionIndex(optionIndex - 1);
    }
  };

  const handleVoice = (value) => {
    setVoice(value === voice ? null : value);
  };

  const handleLanguage = (value) => {
    setLanguage(value === language ? null : value);
  };

  const handleTempo = (value) => {
    setTempo(value === tempo ? null : value);
  };

  return (
    <CreateContainer>
      <PageTitle>Create</PageTitle>
      <BigContainer>
        <LeftContainer>
          <ToThePadding />
          <TitleStyle>Title</TitleStyle>
          <TitleInput placeholder="Please enter a title" />
          <TitleStyle>Voice</TitleStyle>
          <ChooseOption>
            <CustomButton
              clicked={voice === 'Female'}
              onClick={() => handleVoice('Female')}
            >
              Female
            </CustomButton>
            <CustomButton
              clicked={voice === 'Male'}
              onClick={() => handleVoice('Male')}
            >
              Male
            </CustomButton>
          </ChooseOption>
          <TitleStyle>Language</TitleStyle>
          <ChooseOption>
            <CustomButton
              clicked={language === 'English'}
              onClick={() => handleLanguage('English')}
            >
              English
            </CustomButton>
            <CustomButton
              clicked={language === '한국어'}
              onClick={() => handleLanguage('한국어')}
            >
              한국어
            </CustomButton>
            <CustomButton
              clicked={language === '日本語'}
              onClick={() => handleLanguage('日本語')}
            >
              日本語
            </CustomButton>
          </ChooseOption>
          <TitleStyle>Tempo</TitleStyle>
          <ChooseOption>
            <CustomButton
              clicked={tempo === 'Slow'}
              onClick={() => handleTempo('Slow')}
            >
              Slow
            </CustomButton>
            <CustomButton
              clicked={tempo === 'Normal'}
              onClick={() => handleTempo('Normal')}
            >
              Normal
            </CustomButton>
            <CustomButton
              clicked={tempo === 'Fast'}
              onClick={() => handleTempo('Fast')}
            >
              Fast
            </CustomButton>
          </ChooseOption>
        </LeftContainer>
        <RightContainer>
          <ToThePaddingTop />
          <TitleStyle>Genre</TitleStyle>
          <GenreContainer>
            <ArrowFunction
              onClick={handlePrev}
              isPrev={false}
              fontSize="large"
              disabled={currentIndex === 0}
            />
            <ViewContainer>
              <CardList currentIndex={currentIndex}>
                {newCoverArray.map((cover, index) => (
                  <CoverBox key={index}>
                    <RoundCover src={cover.src} />
                    <CoverLabel>{cover.label}</CoverLabel>
                  </CoverBox>
                ))}
              </CardList>
            </ViewContainer>
            <ArrowFunction
              onClick={handleNext}
              isPrev={true}
              fontSize="large"
              disabled={currentIndex === newCoverArray.length - 5}
            />
          </GenreContainer>
          <ToTheMargin />
          <TitleStyle>Instrument</TitleStyle>
          <GenreContainer>
            <ArrowFunction
              onClick={prevOption}
              isPrev={false}
              fontSize="large"
              disabled={optionIndex === 0}
            />
            <ViewContainer>
              <InstrumentList optionIndex={optionIndex}>
                {newCoverArray.map((cover, index) => (
                  <CoverBox key={index}>
                    <RoundCover src={cover.src} />
                    <CoverLabel>{cover.label}</CoverLabel>
                  </CoverBox>
                ))}
              </InstrumentList>
            </ViewContainer>
            <ArrowFunction
              onClick={moreOption}
              isPrev={true}
              fontSize="large"
              disabled={optionIndex === instrumentArray.length - 5}
            />
          </GenreContainer>
        </RightContainer>
      </BigContainer>
      <JellyButton>create</JellyButton>
    </CreateContainer>
  );
}

export default Create;
