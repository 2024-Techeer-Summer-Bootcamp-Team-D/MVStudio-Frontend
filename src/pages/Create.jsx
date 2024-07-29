import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getGenre, getInstruments, getStyles } from '../api/musicVideos';
import { useNavigate } from 'react-router-dom';
import ArrowBackBackIcon from '@mui/icons-material/ArrowBack';
import Swal from 'sweetalert2';

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
  width: 9rem;
  height: 3.5rem;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 3.2rem;
  background:#7C6BDD;
  color: white;
  border-radius: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    animation: ${jellyAnimation} 0.5s both;
  }
`;

const CreateContainer = styled.div`
  width: 100%;
  height: calc(100vh - 5rem);
  min-height: calc(100vh - 5rem);
  /* background-image: url('https://i.ibb.co/BfrvSHb/Voice.gif'); */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    /* backdrop-filter: blur(5px); */
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const BigContainer = styled.div`
  width: 80%;
  height:70%;
  gap: 3.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;
const ProgressBarContainer = styled.div`
width:100%;
height:30%;
display:flex;
justify-content:center;
flex-direction:column;
align-items:center;
`;


const ProgressBar = styled.div`
  width: 80%;
  height: 1rem;
  background: #444;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  position: relative;
`;

const Progress = styled.div`
  height: 100%;
  background:#7C6BDD;
  border-radius: 0.5rem;
  transition: width 0.3s ease;
  width: ${(props) => props.width}%;
`;

const StepContainer = styled.div`
  width: 80%;
  display: ${(props) => (props.active ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
`;

const TitleStyle1 = styled.p`
  font-family: 'SUIT', sans-serif;
  font-size: 1.4rem;
  color: #ffffff;
  margin-bottom: 0.8rem;
  font-weight: 700;
`;

const TitleStyle2 = styled.p`
  font-family: 'SUIT', sans-serif;
  font-size: 0.7rem;
  color: #c0c0c0;
  font-weight: 500;
  margin-bottom:2rem;
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
  margin-bottom: 1.5rem;
  background-image: linear-gradient(
    to right,
    #140421,
    #2a0650,
    #7200be,
    #3b005a
  );

  &:hover {
    background-position: 100% 0;
    transition: all 0.4s ease-in-out;
  }

  &:focus {
    outline:#8270DB;
  }

  ${(props) =>
    props.clicked &&
    css`
      border: 0.1rem solid #ffffff;
    `}
`;

const TitleInput = styled.input`
  background-color:#29064D;
  width: 80%;
  height: 4rem;
  outline: none;
  border-radius: 0.7rem;
  border: none;
  color: #ffffff;
  font-family: 'SUIT', sans-serif;
  font-weight: 600;
  font-size: 1.2rem;
  padding: 1rem;

  ::placeholder {
    color: #000000;
    font-size: 1.1rem;
    font-family: 'SUIT', sans-serif;
  }
`;

const ChooseOption = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const CoverBox = styled.div`
  transition: transform 0.5s ease-in-out;
  width: 16.7%;
  flex: 0 0 16.7%;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const GenreContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const ArrowFunction = styled(ArrowForwardIosIcon)`
display: flex;
align-items:center;
width: 5%;
cursor: pointer;
color: ${(props) => (props.disabled ? 'transparent' : '#7b7b7b')};
transform: ${(props) => (props.isPrev ? 'rotate(0deg)' : 'rotate(180deg)')};
z-index: 2;
`;
const BackButtonContainer = styled.div`
  width: 80%;
  height:1.5rem;
  margin-bottom:1rem;
`;

const BackButton = styled(ArrowBackBackIcon)`

display: flex;
width: 3rem;
height:1.5rem;

cursor: pointer;
color: white;
justify-content:flex-start;
align-items:flex-start;
`;
const ViewContainer = styled.div`
  width: 80%;
  display: flex;
  overflow: hidden;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  transition: transform 0.5s ease-in-out;
  transform: ${({ currentIndex }) => `translateX(-${currentIndex * 16.73}%)`};
`;

const SubmitButton = styled.button`
  background:#7C6BDD;
  border-radius: 1rem;
  width: 8rem;
  height: 3rem;
  font-size: 1rem;
  color: white;
  font-family: 'SUIT', sans-serif;
  margin-top: 2.5rem;
  font-weight: 550;
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
  display: flex;
  flex-direction: column;
  align-items: start;
  z-index: 99999;
  justify-content: space-between;
`;

const ModalText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  padding: 2rem;
`;

const GroupText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
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
`;

const ModalValue = styled.p`
  font-family: 'SUIT', sans-serif;
  font-size: 1rem;
  color: #ffffff;
  font-weight: 500;
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
const ConfirmButton = styled.button`
  background: linear-gradient(45deg, #b75dfd 30%, #ffa9a9 90%);
  border-radius: 1rem;
  width: 8rem;
  height: 3rem;
  font-size: 1rem;
  color: white;
  font-family: 'SUIT', sans-serif;
  font-weight: 550;
  align-self: flex-end;
  cursor: pointer;
`;

const Create = () => {
  const [genreList, setGenreList] = useState([]);
  const [instrumentsList, setInstrumentsList] = useState([]);
  const [voice, setVoice] = useState('');
  const [language, setLanguage] = useState('');
  const [tempo, setTempo] = useState('');
  const [instrumentLimitExceeded, setInstrumentLimitExceeded] = useState(false);
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const [songTitle, setSongTitle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentGenreIndex, setCurrentGenreIndex] = useState(0);
  const [currentInstrumentIndex, setCurrentInstrumentIndex] = useState(0);
  const [genreId, setGenreId] = useState();
  const [instrumentsId, setInstrumentsId] = useState([]);
  const [stylesId, setStylesId] = useState();
  const [stylesList, setStylesList] = useState([]);
  const [currentStylesIndex, setCurrentStylesIndex] = useState(0);
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 장르데이터 호출
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


  const handleCreateClick = () => {
      setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInstrumentClick = (label, id) => {
    const isSelected = selectedInstruments.includes(label);
    if (isSelected) {
      setSelectedInstruments(selectedInstruments.filter(item => item !== label));
      setInstrumentsId(instrumentsId.filter(instrumentId => instrumentId !== id));
    } else {
      if (selectedInstruments.length < 2) {
        setSelectedInstruments([...selectedInstruments, label]);
        setInstrumentsId([...instrumentsId, id]);
      } else{
          Swal.fire({
            icon: 'error',
            title: '악기는 두개이상 선택불가합니다.',
          }).then(() => {
            setInstrumentLimitExceeded(false);
          });
        }
        return;
      }
      };
  
  const handleSubmit = () => {
    const userPreferences = {
      genres_ids: genreId,
      instruments_ids: instrumentsId,
      style_id: stylesId,
      subject: songTitle,
      vocal: voice,
      language,
      tempo,
    };

    navigate('/create/lyrics', { state: userPreferences });
  };
  const navigate = useNavigate();

 
 

  const instrumentsCount = selectedInstruments.length;
  const shouldShowWarning = instrumentsCount >= 3;

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
  const handleNextStep = () => {
    if (step === 1 && !genreId) {
      {
        Swal.fire({
          icon: 'error',
          title: '필수 선택 옵션입니다.',
        }).then(() => {
          setIsOpen(false);
        });
      }
      return;
    }


    if (step === 3 && !stylesId) {
      {
        Swal.fire({
          icon: 'error',
          title: '필수 선택 옵션입니다.',
        }).then(() => {
          setIsOpen(false);
        });
      }
      return;
    }
    if (step === 4 && !songTitle) {
      {
        Swal.fire({
          icon: 'error',
          title: '필수 선택 옵션입니다.',
        }).then(() => {
          setIsOpen(false);
        });
      }
      return;
    }
    if (step === 5 && !voice) {
      {
        Swal.fire({
          icon: 'error',
          title: '필수 선택 옵션입니다.',
        }).then(() => {
          setIsOpen(false);
        });
      }
      return;
    }
    if (step === 6 && !language) {
      {
        Swal.fire({
          icon: 'error',
          title: '필수 선택 옵션입니다.',
        }).then(() => {
          setIsOpen(false);
        });
      }
      return;
    }
    if (step === 7 && !tempo) {
      {
        Swal.fire({
          icon: 'error',
          title: '필수 선택 옵션입니다.',
        }).then(() => {
          setIsOpen(false);
        });
      }
      return;
    }
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <CreateContainer>
      <ProgressBarContainer>
       <BackButtonContainer>
       {step > 1 && (
    <BackButton onClick={handlePrevStep} />
  )}
      </BackButtonContainer>
      
      <ProgressBar>
        <Progress width={(step / 7) * 100} />
      </ProgressBar>
      </ProgressBarContainer>
  
      <BigContainer>
      
        <StepContainer active={step === 1}>
          <TitleStyle1>장르를 선택해주세요</TitleStyle1>
          <TitleStyle2>*필수선택옵션입니다</TitleStyle2>
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
                      selected={genreId - 1 === index}
                      onClick={() => {
                        setGenreId(index + 1);
                      }}
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
          <JellyButton onClick={handleNextStep}>다음</JellyButton>
        </StepContainer>
  
        <StepContainer active={step === 2}>
          <TitleStyle1>악기를 선택해주세요</TitleStyle1>
          <TitleStyle2>*중복선택가능</TitleStyle2>
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
          <JellyButton onClick={handleNextStep}>다음</JellyButton>
        </StepContainer>
        
        <StepContainer active={step === 3}>
          <TitleStyle1>스타일을 선택해주세요</TitleStyle1>
          <TitleStyle2>*필수선택옵션입니다</TitleStyle2>
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
                      selected={stylesId - 1 === index}
                      onClick={() => setStylesId(index + 1)}
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
          <JellyButton onClick={handleNextStep}>다음</JellyButton>
        </StepContainer>
  
        <StepContainer active={step === 4}>
          <TitleStyle1>곡 제목을 입력해주세요</TitleStyle1>
          <TitleStyle2>*필수선택옵션입니다</TitleStyle2>
          <TitleInput
            type="text"
            placeholder="곡 제목"
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
          />
          <JellyButton onClick={handleNextStep}>다음</JellyButton>
        </StepContainer>
  
        <StepContainer active={step === 5}>
          <TitleStyle1>보이스를 선택해주세요</TitleStyle1>
          <TitleStyle2>*필수선택옵션입니다</TitleStyle2>
          <ChooseOption>
            {['여성 보컬', '남성 보컬'].map((option) => (
              <Button
                key={option}
                clicked={voice === option}
                onClick={() => setVoice(option)}
              >
                {option}
              </Button>
              
            ))}
          </ChooseOption>
          <JellyButton onClick={handleNextStep}>다음</JellyButton>
        </StepContainer>
  
        <StepContainer active={step === 6}>
          <TitleStyle1>언어를 선택해주세요</TitleStyle1>
          <TitleStyle2>*필수선택옵션입니다</TitleStyle2>
          <ChooseOption>
            {['한국어', '영어', '일본어'].map((option) => (
              <Button
                key={option}
                clicked={language === option}
                onClick={() => setLanguage(option)}
              >
                {option}
              </Button>
            ))}
          </ChooseOption>
          <JellyButton onClick={handleNextStep}>다음</JellyButton>
        </StepContainer>
  
        <StepContainer active={step === 7}>
          <TitleStyle1>템포를 선택해주세요</TitleStyle1>
          <TitleStyle2>*필수선택옵션입니다</TitleStyle2>
          <ChooseOption>
            {['느림', '보통', '빠름'].map((option) => (
              <Button
                key={option}
                clicked={tempo === option}
                onClick={() => setTempo(option)}
              >
                {option}
              </Button>
            ))}
          </ChooseOption>
          <SubmitButton onClick={handleCreateClick}>완료</SubmitButton>
        </StepContainer>
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
            <ModalItem>Voice :</ModalItem>{' '}
            <ModalValue>{voice}</ModalValue>
          </GroupText>
          <GroupText>
            <ModalItem>Language :</ModalItem>
            <ModalValue>{language}</ModalValue>
          </GroupText>
          <GroupText>
            <ModalItem>Tempo :</ModalItem>{' '}
            <ModalValue>{tempo}</ModalValue>
          </GroupText>
          <GroupText>
            <ModalItem>Genre :</ModalItem>
            <ModalValue>{genreList[genreId - 1]?.genre_name}</ModalValue>
          </GroupText>
          <GroupText>
            <InstrumentItem>Instrument :</InstrumentItem>
            <ModalValue>{selectedInstruments.join(', ')}</ModalValue>
          </GroupText>
          <GroupText>
            <ModalItem>style :</ModalItem>
            <ModalValue>
              {stylesList[stylesId - 1]?.style_name}
            </ModalValue>
          </GroupText>
          {shouldShowWarning && (
            // 추가 로직이 필요한 경우 여기에 작성
            null
          )}
        </ModalText>
        <ConfirmButton
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </ConfirmButton>
      </ModalContainer>
    </>
  )}
  {(isOpen || instrumentLimitExceeded)}

      </BigContainer>
    </CreateContainer>

  );
};
export default Create;