import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  getGenre,
  getInstruments,
  postLyrics,
  getStyles,
} from '../api/musicVideos';
import { useNavigate } from 'react-router-dom';

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
  margin-left: 78%;
  margin-bottom: 5%;
  width: 12rem;
  height: 3.6rem;
  font-size: 1rem;
  font-weight: 500;
  /* border: 0.1rem solid #ffffff; */
  background-image: linear-gradient(
    to right,
    #240b38,
    #50075f,
    #7200be,
    #3b005a
  );
  color: white; /* 텍스트의 색상을 지정합니다 */
  border-radius: 0.7rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    animation: ${jellyAnimation} 0.5s both;
    background-image: linear-gradient(
      to right,
      #240b38,
      #50075f,
      #7200be,
      #3b005a
    );
  }
`;

// const PageTitle = styled.div`
//   font-size: 1.8rem;
//   font-weight: 600;
//   font-family: 'SUIT' sans-serif;
//   color: #ffffff;
//   margin-top: 1%;
//   margin-bottom: 2%;
// `;

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
  align-content: center;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  padding: 3%;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  justify-content: center;
  height: 100%;
`;

const RightContainer = styled.div`
  width: 55%;
  display: flex;
  padding: 3%;
  flex-direction: column;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  justify-content: center;
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
  width: 10rem;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  height: 3.6rem;
  text-align: center;
  background-size: 300% 100%;
  border-radius: 0.7rem;
  transition: all 0.4s ease-in-out;
  background-image: linear-gradient(
    to right,
    #240b38,
    #50075f,
    #7200be,
    #3b005a
  );

  &:hover {
    background-position: 100% 0;
    transition: all 0.4s ease-in-out;
  }

  &:focus {
    outline: none;
  }

  ${(props) =>
    props.clicked &&
    css`
      border: 0.1rem solid #ffffff;
    `}
`;

const TitleInput = styled.input`
  display: flex;
  word-break: break-all;
  background: linear-gradient(to right, #240b38, #50075f, #3b005a);
  width: 90%;
  height: 8rem;
  outline: none;
  border-radius: 0.7rem;
  border: none;
  color: #ffffff;
  font-family: 'SUIT', sans-serif;
  font-weight: 600;
  font-size: 1.2rem;
  padding: 1rem;
  position: relative;
  overflow-wrap: break-word;
  text-align: left;
  vertical-align: top;
  padding-bottom: 4rem;
  margin-bottom: 3rem;
  ::placeholder {
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: #000000;
    font-size: 1.1rem;
    font-family: 'SUIT', sans-serif;
    max-width: calc(100% - 2rem);
  }
`;
const ChooseOption = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
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
  overflow: hidden;
  filter: brightness(0.8);

  &:hover {
    filter: brightness(0.6);
  }

  ${(props) =>
    props.selected &&
    css`
      border: 0.3rem solid #ffffff;
      filter: brightness(0.5);
    `}
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
  margin-top: 3rem;
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

const StylesList = styled.div`
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

// const ToThePaddingTop = styled.div`
//   padding-top: 4.5rem;
// `;

const ToTheMargin = styled.div`
  margin-top: 3.2rem;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  z-index: 9999;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40rem;
  height: 60%;
  background-color: #240b38;
  color: white;
  border-radius: 2rem;
  padding: 2rem;
  padding-left: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  z-index: 99999;
`;

const ModalText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const GroupText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.7rem;
  height: 12%;
`;

const ModalItem = styled.p`
  font-size: 1rem;
  color: rgba(205, 112, 238, 0.8);
  margin-left: 1rem;
  font-family: 'SUIT', sans-serif;
  display: flex;
  align-items: center;
  justify-content: start;
  font-weight: 550;
  width: auto;
`;

const InstrumentItem = styled.p`
  font-size: 1rem;
  color: rgba(205, 112, 238, 0.8);
  margin-left: 1rem;
  font-family: 'SUIT', sans-serif;
  display: flex;
  align-items: center;
  justify-content: start;
  font-weight: 550;
  min-width: 26%;
`;

const ModalValue = styled.p`
  font-family: 'SUIT', sans-serif;
  font-size: 1rem;
  color: #ffffff;
  font-weight: 500;
`;

const SubmitButton = styled.button`
  background: linear-gradient(45deg, #b75dfd 30%, #ffa9a9 90%);
  border-radius: 1rem;
  width: 8rem;
  height: 3rem;
  font-size: 1rem;
  color: white;
  text-transform: none;
  font-family: 'SUIT', sans-serif;
  margin-left: 14.5rem;
  margin-top: 2.5rem;
  font-size: 1.2rem;
  font-weight: 550;
  font-family: 'SUIT', sans-serif;
`;

const WarningMessage = styled.div`
  color: #ff0000;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 3rem;
  margin-top: 1rem;
`;

const WarningContainer = styled.div`
  display: flex;
`;

const Create = () => {
  const navigate = useNavigate();
  const goLyrics = () => {
    navigate('/LyricsSelect');
  };

  const click = () => {
    postLyrics(
      voice,
      language,
      tempo,
      selectedGenres,
      selectedInstruments,
      songTitle,
    );
    goLyrics();
  };

  // State 선언
  const [genreList, setGenreList] = useState([]);
  const [instrumentsList, setInstrumentsList] = useState([]);
  const [voice, setVoice] = useState('');
  const [language, setLanguage] = useState('');
  const [tempo, setTempo] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const [songTitle, setSongTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGenreIndex, setCurrentGenreIndex] = useState(0);
  const [currentInstrumentIndex, setCurrentInstrumentIndex] = useState(0);
  const [genreId, setGenreId] = useState([]);
  const [instrumentsId, setInstrumentsId] = useState([]);
  const [stylesId, setStylesId] = useState([]);
  const [stylesList, setStylesList] = useState([]);
  const [currentStylesIndex, setCurrentStylesIndex] = useState(0);
  const [selectedStyles, setSelectedStyles] = useState([]);

  // API 데이터 fetch
  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        const data = await getGenre();
        console.log('response(genre) : ', data.genres);
        setGenreList(data.genres);
      } catch {
        console.error('장르 데이터 조회 오류');
      }
    };
    fetchGenreData();
  }, []);

  useEffect(() => {
    const fetchInstrumentData = async () => {
      try {
        const data = await getInstruments();
        setInstrumentsList(data.instruments);
        console.log('response(instrument):', data.instruments);
      } catch {
        console.error('악기 데이터 조회 오류');
      }
    };
    fetchInstrumentData();
  }, []);

  useEffect(() => {
    const fetchStylesData = async () => {
      try {
        const data = await getStyles();
        console.log('response(style) : ', data.data);
        setStylesList(data.data);
      } catch {
        console.error('스타일 데이터 조회 오류');
      }
    };
    fetchStylesData();
  }, []);
  // 핸들러 함수들
  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleVoiceClick = (label) => {
    setVoice(label);
  };

  const handleLanguageClick = (label) => {
    setLanguage(label);
  };

  const handleTempoClick = (label) => {
    setTempo(label);
  };

  const handleGenreClick = (label, id) => {
    if (selectedGenres.includes(label)) {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== label));
    } else {
      setSelectedGenres([...selectedGenres, label]);
      setGenreId([...genreId, id]);
    }
  };

  const handleInstrumentClick = (label, id) => {
    if (selectedInstruments.includes(label)) {
      setSelectedInstruments(
        selectedInstruments.filter((instrument) => instrument !== label),
      );
    } else {
      setSelectedInstruments([...selectedInstruments, label]);
      setInstrumentsId([...instrumentsId, id]);
    }
  };

  const handleStylesClick = (label, id) => {
    if (selectedStyles.includes(label)) {
      setSelectedStyles(selectedStyles.filter((style) => style !== label));
    } else {
      setSelectedStyles([...selectedStyles, label]);
      setStylesId([...stylesId, id]);
    }
  };

  const handleSongTitleChange = (event) => {
    setSongTitle(event.target.value);
  };

  const genresCount = selectedGenres.length;
  const instrumentsCount = selectedInstruments.length;
  const shouldShowWarning = genresCount >= 3 || instrumentsCount >= 3;

  const handleGenrePrevClick = () => {
    if (currentGenreIndex > 0) {
      setCurrentGenreIndex(currentGenreIndex - 1);
    }
  };

  const handleGenreNextClick = () => {
    if (currentGenreIndex < genreList?.length - 6) {
      setCurrentGenreIndex(currentGenreIndex + 1);
    }
  };

  const handleInstrumentPrevClick = () => {
    if (currentInstrumentIndex > 0) {
      setCurrentInstrumentIndex(currentInstrumentIndex - 1);
    }
  };

  const handleInstrumentNextClick = () => {
    if (currentInstrumentIndex < instrumentsList.length - 6) {
      setCurrentInstrumentIndex(currentInstrumentIndex + 1);
    }
  };

  const handleStylesPrevClick = () => {
    if (currentStylesIndex > 0) {
      setCurrentStylesIndex(currentStylesIndex - 1);
    }
  };

  const handleStylesNextClick = () => {
    if (currentStylesIndex < stylesList.length - 6) {
      setCurrentStylesIndex(currentStylesIndex + 1);
    }
  };

  return (
    <CreateContainer>
      <BigContainer>
        <LeftContainer>
          <ToThePadding />
          <TitleStyle>Title</TitleStyle>
          <TitleInput
            placeholder="Please enter a title"
            onChange={handleSongTitleChange}
          />
          <TitleStyle>Voice</TitleStyle>
          <ChooseOption>
            <Button
              clicked={voice === 'Female'}
              onClick={() => handleVoiceClick('Female')}
            >
              Female
            </Button>
            <Button
              clicked={voice === 'Male'}
              onClick={() => handleVoiceClick('Male')}
            >
              Male
            </Button>
          </ChooseOption>
          <TitleStyle>Language</TitleStyle>
          <ChooseOption>
            <Button
              clicked={language === 'English'}
              onClick={() => handleLanguageClick('English')}
            >
              English
            </Button>
            <Button
              clicked={language === '한국어'}
              onClick={() => handleLanguageClick('한국어')}
            >
              한국어
            </Button>
            <Button
              clicked={language === '日本語'}
              onClick={() => handleLanguageClick('日本語')}
            >
              日本語
            </Button>
          </ChooseOption>
          <TitleStyle>Tempo</TitleStyle>
          <ChooseOption>
            <Button
              clicked={tempo === 'Slow'}
              onClick={() => handleTempoClick('Slow')}
            >
              Slow
            </Button>
            <Button
              clicked={tempo === 'Normal'}
              onClick={() => handleTempoClick('Normal')}
            >
              Normal
            </Button>
            <Button
              clicked={tempo === 'Fast'}
              onClick={() => handleTempoClick('Fast')}
            >
              Fast
            </Button>
          </ChooseOption>
        </LeftContainer>
        <RightContainer>
          <ToThePadding>
            <TitleStyle>Genre</TitleStyle>
            <GenreContainer>
              <ArrowFunction
                onClick={handleGenrePrevClick}
                disabled={currentGenreIndex === 0}
              />
              <ViewContainer>
                <CardList currentIndex={currentGenreIndex}>
                  {genreList?.map((option, index) => (
                    <CoverBox key={index}>
                      <RoundCover
                        src={option.genre_image_url}
                        selected={selectedGenres.includes(option.genre_name)}
                        onClick={() =>
                          handleGenreClick(option.genre_name, option.genre_id)
                        }
                      />
                      <CoverLabel>{option.genre_name}</CoverLabel>
                    </CoverBox>
                  ))}
                </CardList>
              </ViewContainer>
              <ArrowFunction
                onClick={handleGenreNextClick}
                disabled={currentGenreIndex === genreList?.length - 6}
                isPrev={true}
              />
            </GenreContainer>
          </ToThePadding>
          <ToTheMargin>
            <TitleStyle>Instrument</TitleStyle>
            <GenreContainer>
              <ArrowFunction
                onClick={handleInstrumentPrevClick}
                disabled={currentInstrumentIndex === 0}
              />

              <ViewContainer>
                <InstrumentList optionIndex={currentInstrumentIndex}>
                  {instrumentsList?.map((option, index) => (
                    <CoverBox key={index}>
                      <RoundCover
                        src={option.instrument_image_url}
                        selected={selectedInstruments.includes(
                          option.instrument_name,
                        )}
                        onClick={() =>
                          handleInstrumentClick(
                            option.instrument_name,
                            option.instrument_id,
                          )
                        }
                      />
                      <CoverLabel>{option.instrument_name}</CoverLabel>
                    </CoverBox>
                  ))}
                </InstrumentList>
              </ViewContainer>
              <ArrowFunction
                onClick={handleInstrumentNextClick}
                disabled={
                  currentInstrumentIndex === instrumentsList?.length - 6
                }
                isPrev={true}
              />
            </GenreContainer>
          </ToTheMargin>

          <ToTheMargin>
            <TitleStyle>Style</TitleStyle>
            <GenreContainer>
              <ArrowFunction
                onClick={handleStylesPrevClick}
                disabled={currentStylesIndex === 0}
              />
              <ViewContainer>
                <StylesList optionIndex={currentStylesIndex}>
                  {stylesList?.map((option, index) => (
                    <CoverBox key={index}>
                      <RoundCover
                        src={option.style_image_url}
                        selected={selectedStyles.includes(option.style_name)}
                        onClick={() =>
                          handleStylesClick(option.style_name, option.style_id)
                        }
                      />
                      <CoverLabel>{option.style_name}</CoverLabel>
                    </CoverBox>
                  ))}
                </StylesList>
              </ViewContainer>
              <ArrowFunction
                onClick={handleStylesNextClick}
                disabled={currentStylesIndex === stylesList.length - 6}
                isPrev
              />
            </GenreContainer>
          </ToTheMargin>
        </RightContainer>
      </BigContainer>
      <JellyButton onClick={handleCreateClick}>Create Song</JellyButton>
      {isModalOpen && (
        <>
          <Overlay />
          <ModalContainer>
            <ArrowBackIcon cursor="pointer" onClick={handleCloseModal} />
            <ModalText>
              <GroupText>
                <ModalItem>Title : </ModalItem>
                <ModalValue>{songTitle}</ModalValue>
              </GroupText>
              <GroupText>
                <ModalItem>Voice :</ModalItem> <ModalValue>{voice}</ModalValue>
              </GroupText>
              <GroupText>
                <ModalItem>Language :</ModalItem>
                <ModalValue>{language}</ModalValue>
              </GroupText>
              <GroupText>
                <ModalItem>Tempo :</ModalItem> <ModalValue>{tempo}</ModalValue>
              </GroupText>
              <GroupText>
                <ModalItem>Genre :</ModalItem>
                <ModalValue>{selectedGenres.join(', ')}</ModalValue>
              </GroupText>
              <GroupText>
                <InstrumentItem>Instrument :</InstrumentItem>
                <ModalValue>{selectedInstruments.join(', ')}</ModalValue>
              </GroupText>
              <GroupText>
                <ModalItem>style :</ModalItem>
                <ModalValue>{selectedStyles.join(', ')}</ModalValue>
              </GroupText>
              {shouldShowWarning && (
                <WarningContainer>
                  <WarningMessage>
                    너무 많은 옵션을 선택할 시 선택한 옵션 반영이 잘 되지 않을
                    수 있습니다.
                  </WarningMessage>
                </WarningContainer>
              )}
              <SubmitButton onClick={click}>Submit</SubmitButton>
            </ModalText>
          </ModalContainer>
        </>
      )}
    </CreateContainer>
  );
};

export default Create;
