import React, { useState } from 'react';
import styled from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const PageTitle = styled.div`
  padding: 2rem;
  font-size: 1.8rem;
  font-weight: 600;
  font-family: 'SUIT' sans-serif;
  color: #ffffff;
  margin-left: 2rem;
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
  padding-left: 5%;
`;

const RightContainer = styled.div`
  width: 55%;
  display: flex;
  flex-direction: column;
  padding-left: 5%;
  padding-right: 10%;
`;

const TitleStyle = styled.p`
  font-family: 'SUIT', sans-serif;
  font-size: 1.4rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  font-weight: 700;
`;

const Button = styled.button`
  background: linear-gradient(
    45deg,
    rgba(156, 106, 99, 0.8) 30%,
    rgba(111, 59, 151, 0.8) 90%
  );
  border-radius: 1rem;
  width: 7rem;
  height: 3rem;
  font-size: 1.1rem;
  color: white;
  font-weight: 500;
  border: none;
  outline: none;
  margin-right: 1rem;
`;

const SubmitButton = styled.button`
  background: linear-gradient(
    45deg,
    rgba(156, 106, 99, 0.8) 30%,
    rgba(111, 59, 151, 0.8) 90%
  );
  border-radius: 1rem;
  width: 20%;
  height: 3rem;
  font-size: 1.1rem;
  color: white;
  font-weight: 500;
  border: none;
  outline: none;
  margin-top: 5rem;
  margin-left: 35%;
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
`;
const RoundCover = styled.button`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  width: 86%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.2rem solid #ffffff;
  position: relative;
  &:hover {
    filter: brightness(0.8);
  }

  &::after {
    content: '${(props) => props.label}';
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    text-align: center;
    font-family: 'SUIT', sans-serif;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const CardList = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 8rem;
  transition: transform 0.5s ease-in-out;
  transform: ${({ currentIndex }) => `translateX(-${currentIndex * 16.7}%)`};
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
  padding-bottom: 5rem;
`;

const ViewContainer = styled.div`
  width: 95%;
  display: flex;
  overflow: hidden;
  padding-left: 1rem;
`;

const InstrumentList = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 8rem;
  transition: transform 0.5s ease-in-out;
  transform: ${({ optionIndex }) => `translateX(-${optionIndex * 20}%)`};
  position: relative;
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
    { src: 'https://picsum.photos/seed/21/100', label: 'POP' },
    { src: 'https://picsum.photos/seed/22/100', label: 'ROCK' },
    { src: 'https://picsum.photos/seed/23/100', label: 'JAZZ' },
    { src: 'https://picsum.photos/seed/24/100', label: 'CLASSICAL' },
    { src: 'https://picsum.photos/seed/25/100', label: 'HIP HOP' },
    { src: 'https://picsum.photos/seed/26/100', label: 'COUNTRY' },
    { src: 'https://picsum.photos/seed/27/100', label: 'BLUES' },
    { src: 'https://picsum.photos/seed/28/100', label: 'R&B' },
    { src: 'https://picsum.photos/seed/29/100', label: 'REGGAE' },
    { src: 'https://picsum.photos/seed/30/100', label: '응애' },
    { src: 'https://picsum.photos/seed/31/100', label: '사랑' },
    { src: 'https://picsum.photos/seed/32/100', label: 'ELECTRONIC' },
    { src: 'https://picsum.photos/seed/33/100', label: 'ELECTRONIC' },
    { src: 'https://picsum.photos/seed/34/100', label: 'ELECTRONIC' },
    { src: 'https://picsum.photos/seed/35/100', label: 'ELECTRONIC' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [optionIndex, setOptionIndex] = useState(0);

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

  return (
    <CreateContainer>
      <PageTitle>Create</PageTitle>
      <BigContainer>
        <LeftContainer>
          <TitleStyle>Title</TitleStyle>
          <TitleInput placeholder="Please enter a title" />
          <TitleStyle>Voice</TitleStyle>
          <ChooseOption>
            <Button>Female</Button>
            <Button>Male</Button>
          </ChooseOption>
          <TitleStyle>Language</TitleStyle>
          <ChooseOption>
            <Button>English</Button>
            <Button>한국어</Button>
            <Button>日本語</Button>
          </ChooseOption>
          <TitleStyle>Tempo</TitleStyle>
          <ChooseOption>
            <Button>Slow</Button>
            <Button>Normal</Button>
            <Button>Fast</Button>
          </ChooseOption>
        </LeftContainer>
        <RightContainer>
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
                    <RoundCover src={cover.src} label={cover.label} />
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
                {instrumentArray.map((cover, index) => (
                  <CoverBox key={index}>
                    <RoundCover src={cover.src} label={cover.label} />
                  </CoverBox>
                ))}
              </InstrumentList>
            </ViewContainer>
            <ArrowFunction
              onClick={moreOption}
              isPrev={true}
              fontSize="large"
              disabled={optionIndex === newCoverArray.length - 5}
            />
          </GenreContainer>
        </RightContainer>
      </BigContainer>
      <SubmitButton>Create</SubmitButton>
    </CreateContainer>
  );
}

export default Create;
