import * as React from 'react';
import PropTypes from 'prop-types';
import { styled as muiStyled } from '@mui/material/styles'; // 'styled'를 'muiStyled'로 변경
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';

import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import { useState, useEffect, useCallback } from 'react'; // React로부터 useState와 useEffect 가져오기
import styled, { css, keyframes } from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getGenre, getInstruments, getStyles } from '../api/musicVideos';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import GenreSwiperComponent from '@/components/GenreSwiper';
import StyleSwiperComponent from '@/components/StyleSwiper';
import InstSwiperComponent from '@/components/InstSwiper';
import { color } from 'framer-motion';

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
  background: #7c6bdd;
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
  width: 100%;
  height: 70%;
  gap: 3.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
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
`;

const Button = styled.button`
  background-image: url(${(props) => props.imageUrl});
  width: 15rem;
  height: 15rem;
  font-size: 3rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  margin-top: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  background-size: 300% 100%;
  border-radius: 0.7rem;
  transition: all 0.4s ease-in-out;
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
    outline: #8270db;
  }

  ${(props) =>
    props.clicked &&
    css`
      border: 0.1rem solid #ffffff;
    `}
`;

const TitleInput = styled.input`
  background-color: #29064d;
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
  margin-top: 2rem;
  margin-bottom: 2rem;

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
  align-items: center;
  width: 5%;
  cursor: pointer;
  color: ${(props) => (props.disabled ? 'transparent' : '#7b7b7b')};
  transform: ${(props) => (props.isPrev ? 'rotate(0deg)' : 'rotate(180deg)')};
  z-index: 2;
`;

const ViewContainer = styled.div`
  width: 80%;
  display: flex;
  overflow: hidden;
`;

const SubmitButton = styled.button`
  background: #7c6bdd;
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
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40rem;
  height: 30rem;
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

//프로그래스바 디자인 옵션
const StyledStepLabel = styled(StepLabel)`
  .MuiStepLabel-label {
    color: white !important;
    font-size: 0.8rem;
    font-family: suit;
    margin: 3.5rem;
  }
`;

const QontoStepIconRoot = muiStyled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',

  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = muiStyled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: 'rgb(124, 107, 221)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: 'rgb(124, 107, 221)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = muiStyled('div')(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  ...(ownerState.active && {
    backgroundColor: 'rgb(124, 107, 221)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundColor: 'rgb(124, 107, 221)',
  }),
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[600] : '#aaa',
    transform: 'scale(1.1)',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
  },
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, icon, onClick } = props;

  const icons = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
  };

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(icon);
    }
  }, [icon, onClick]);

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
      onClick={handleClick} // 클릭 이벤트 추가
    >
      {icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
  onClick: PropTypes.func,
};

const steps = [
  'Genre',
  'Instuctment',
  'Style',
  'Title',
  'Vocal',
  'Lnguage',
  'Tempo',
];

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
        const instruments = data.instruments;
        const doubledInstruments = [...instruments, ...instruments]; // 데이터를 두 번 반복하여 20개로 만듦
        setInstrumentsList(doubledInstruments);
        console.log('response(instrument):', doubledInstruments);
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
        const styles = data.data;
        const doubledStyles = [...styles, ...styles];
        setStylesList(doubledStyles);
      } catch {
        console.error('스타일 데이터 조회 오류');
      }
    };
    fetchStylesData();
  }, []);

  const handleCreateClick = () => {
    Swal.fire({
      title: 'Song Details',
      html: `
          <div>
              <strong>Title:</strong> ${songTitle} <br>
              <strong>Voice:</strong> ${voice} <br>
              <strong>Language:</strong> ${language} <br>
              <strong>Tempo:</strong> ${tempo} <br>
              <strong>Genre:</strong> ${genreList[genreId - 1]?.genre_name} <br>
              <strong>Instrument:</strong> ${selectedInstruments.join(', ')} <br>
              <strong>Style:</strong> ${stylesList[stylesId - 1]?.style_name}
          </div>
      `,
      icon: 'info', // 선택한 아이콘 (예: success, error, info, warning)
      showCancelButton: true, // 취소 버튼을 보여줄지 여부
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      customClass: {
        container: 'custom-swal-container', // 필요에 따라 사용자 정의 클래스 추가 가능
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleSubmit(); // 버튼 클릭 시 호출될 함수
      }
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInstrumentClick = (label, id) => {
    const isSelected = selectedInstruments.includes(label);
    if (isSelected) {
      setSelectedInstruments(
        selectedInstruments.filter((item) => item !== label),
      );
      setInstrumentsId(
        instrumentsId.filter((instrumentId) => instrumentId !== id),
      );
    } else {
      if (selectedInstruments.length < 2) {
        setSelectedInstruments([...selectedInstruments, label]);
        setInstrumentsId([...instrumentsId, id]);
      } else {
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

  const handleStepIconClick = (stepNumber) => {
    setStep(stepNumber);
  };

  return (
    <CreateContainer>
      <Stack sx={{ width: '88%' }} spacing={4}>
        <Stepper
          alternativeLabel
          activeStep={step - 1}
          connector={<ColorlibConnector />}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StyledStepLabel
                StepIconComponent={(props) => (
                  <ColorlibStepIcon
                    {...props}
                    icon={index + 1}
                    onClick={handleStepIconClick}
                  />
                )}
              >
                <stepText>{label}</stepText>
              </StyledStepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>

      <BigContainer>
        <StepContainer active={step === 1}>
          <TitleStyle1>장르를 선택해주세요</TitleStyle1>
          <TitleStyle2>*필수선택옵션입니다</TitleStyle2>
          <GenreContainer>
            <GenreSwiperComponent
              // key={`genreSwiper-${step}`}
              options={genreList}
              selectedId={genreId}
              onSelect={(id) => setGenreId(id)}
            />
          </GenreContainer>
          <JellyButton onClick={handleNextStep}>다음</JellyButton>
        </StepContainer>

        <StepContainer active={step === 2}>
          <TitleStyle1>악기를 선택해주세요</TitleStyle1>
          <TitleStyle2>*중복선택가능</TitleStyle2>
          <GenreContainer>
            <InstSwiperComponent
              key={`genreSwiper-${step}`}
              options={instrumentsList}
              selectedInstruments={selectedInstruments}
              instrumentsId={instrumentsId}
              onInstrumentClick={handleInstrumentClick}
            />
          </GenreContainer>
          <JellyButton onClick={handleNextStep}>다음</JellyButton>
        </StepContainer>

        <StepContainer active={step === 3}>
          <TitleStyle1>스타일을 선택해주세요</TitleStyle1>
          <TitleStyle2>*필수선택옵션입니다</TitleStyle2>
          <GenreContainer>
            <StyleSwiperComponent
              key={`genreSwiper-${step}`}
              options={stylesList}
              selectedId={stylesId}
              onSelect={(id) => setStylesId(id)}
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
                imageUrl={`url/to/your/image/${option}.jpg`}
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
          <JellyButton onClick={handleCreateClick}>완료</JellyButton>
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
                {shouldShowWarning &&
                  // 추가 로직이 필요한 경우 여기에 작성
                  null}
              </ModalText>
              <SubmitButton
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </SubmitButton>
            </ModalContainer>
          </>
        )}
        {isOpen || instrumentLimitExceeded}
      </BigContainer>
    </CreateContainer>
  );
};
export default Create;
