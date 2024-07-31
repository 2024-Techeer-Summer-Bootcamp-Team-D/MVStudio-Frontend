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
import { getGenre, getInstruments, getStyles } from '../api/musicVideos';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/libs/stores/userStore';

import Swal from 'sweetalert2';
import GenreSwiperComponent from '@/components/GenreSwiper';
import StyleSwiperComponent from '@/components/StyleSwiper';
import InstSwiperComponent from '@/components/InstSwiper';

const check = import.meta.env.VITE_REACT_APP_IS_OPERATE;
let isOperate;
if (check === 'true') {
  isOperate = true;
} else {
  isOperate = false;
}
const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-100%);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

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
  margin-top: 2rem;
  &:hover {
    animation: ${jellyAnimation} 0.5s both;
  }
`;

const CreateContainer = styled.div`
  width: 100%;
  height: calc(100vh - 5rem);
  min-height: calc(100vh - 5rem);
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
  overflow: hidden;
`;

const StepContainer = styled.div`
  width: 80%;
  position: absolute;
  animation: ${(props) =>
    props.active
      ? css`
          ${slideIn} 0.5s ease-out
        `
      : props.leaving
        ? css`
            ${fadeOut} 0.5s ease-out
          `
        : 'none'};
  display: ${(props) => (props.active || props.leaving ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  opacity: ${(props) => (props.active ? 1 : 0)};
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
  background-image: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : 'none'};
  width: 15rem;
  height: 15rem;
  cursor: pointer;
  margin-top: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  background-size: cover;
  border-radius: 0.7rem;

  ${(props) =>
    props.clicked &&
    css`
      border: 0.2rem solid #ffffff;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
      transition: all 0.2s ease-in-out;
    `}
`;
const LanguageButton = styled.button`
  background-image: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : 'none'};
  width: 18rem;
  height: 12rem;
  cursor: pointer;
  margin-top: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  background-size: cover;
  background-position: center;
  border-radius: 0.7rem;

  ${(props) =>
    props.clicked &&
    css`
      border: 0.2rem solid #ffffff;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
      transition: all 0.2s ease-in-out;
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
  gap: 5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const GenreContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  width: 100%;
  justify-content: space-between;
  align-items: center;
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
  transition: 'all 0.6s ease-in-out',

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
      transition: 'all 0.3s ease-in-out',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: 'rgb(124, 107, 221)',
      transition: 'all 0.3s ease-in-out',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
    transition: 'all 0.3s ease-in-out',
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
  transition: 'all 0.3s ease-in-out',

  ...(ownerState.active && {
    backgroundColor: 'rgb(124, 107, 221)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    transition: 'all 0.3s ease-in-out',
  }),
  ...(ownerState.completed && {
    backgroundColor: 'rgb(124, 107, 221)',
    transition: 'all 0.6s ease-in-out',
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
  'Language',
  'Tempo',
];

const ButtonSetting = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  font-weight: 550;
  font-size: 1.1rem;
`;

const Create = () => {
  const [genreList, setGenreList] = useState([]);
  const [instrumentsList, setInstrumentsList] = useState([]);
  const [voice, setVoice] = useState('');
  const [language, setLanguage] = useState('');
  const [tempo, setTempo] = useState('');
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const [songTitle, setSongTitle] = useState('');
  const [genreId, setGenreId] = useState();
  const [instrumentsId, setInstrumentsId] = useState([]);
  const [stylesId, setStylesId] = useState();
  const [stylesList, setStylesList] = useState([]);
  const [step, setStep] = useState(1);
  const [activeStep, setActiveStep] = useState(1);
  const [previousStep, setPreviousStep] = useState(null);

  const VoiceArr = [
    {
      label: '남성 보컬',
      imageUrl: 'https://i.ibb.co/tm2441K/image.png',
    },
    {
      label: '여성 보컬',
      imageUrl: 'https://i.ibb.co/Lzd8D29/image.png',
    },
  ];
  const CountryArr = [
    {
      label: 'English',
      imageUrl: 'https://i.ibb.co/1Qx3LYb/IMG-0952.jpg',
      value: 'eng',
    },
    {
      label: '한국어',
      imageUrl: 'https://i.ibb.co/4VK2ytf/IMG-0955.jpg',
      value: 'Korean',
    },
    {
      label: '日本語',
      imageUrl: 'https://i.ibb.co/2h58CSp/IMG-0954.jpg',
      value: 'Japanese',
    },
  ];
  const TempoArr = [
    {
      label: 'Fast',
      imageUrl: 'https://i.ibb.co/C97QxKg/1.png',
    },
    {
      label: 'Normal',
      imageUrl: 'https://i.ibb.co/9bQTV6G/image.png',
    },
    {
      label: 'Slow',
      imageUrl: 'https://i.ibb.co/hDnty3R/image.jpg',
    },
  ];
  const credits = useUser((state) => state.credits);

  const isEnoughCredits = credits >= 20;

  console.log('credits:', isEnoughCredits);
  console.log('언어값 : ', language);

  useEffect(() => {
    // 장르데이터 호출
    const fetchGenreData = async () => {
      try {
        const data = await getGenre();
        setGenreList([...data.genres]);
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
        const doubledInstruments = [...instruments, ...instruments];
        setInstrumentsList(doubledInstruments);
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
              <strong>Style:</strong> ${stylesList[stylesId - 1]?.style_name}<br>
              <strong>현재 데모버전이라 생성이 불가능합니다</strong>
          </div>
      `,
      icon: 'info', // 선택한 아이콘 (예: success, error, info, warning)
      showCancelButton: true, // 취소 버튼을 보여줄지 여부
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      customClass: {
        container: 'custom-swal-container',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (isOperate) {
          // 이값에 따라 호출 될지 안될지 결정
          handleSubmit();
        }
      }
    });
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
        }).then(() => {});
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

  const handleNextStep = () => {
    if (step === 1 && !genreId) {
      {
        Swal.fire({
          icon: 'error',
          title: '필수 선택 옵션입니다.',
        }).then(() => {});
      }
      return;
    }

    if (step === 3 && !stylesId) {
      {
        Swal.fire({
          icon: 'error',
          title: '필수 선택 옵션입니다.',
        }).then(() => {});
      }
      return;
    }
    if (step === 4 && !songTitle) {
      {
        Swal.fire({
          icon: 'error',
          title: '필수 선택 옵션입니다.',
        }).then(() => {});
      }
      return;
    }
    if (step === 5 && !voice) {
      {
        Swal.fire({
          icon: 'error',
          title: '필수 선택 옵션입니다.',
        }).then(() => {});
      }
      return;
    }
    if (step === 6 && !language) {
      {
        Swal.fire({
          icon: 'error',
          title: '필수 선택 옵션입니다.',
        }).then(() => {});
      }
      return;
    }
    if (step === 7 && !tempo) {
      {
        Swal.fire({
          icon: 'error',
          title: '필수 선택 옵션입니다.',
        }).then(() => {});
      }
      return;
    }
    setStep((prevStep) => prevStep + 1);
    setPreviousStep(activeStep);
    setActiveStep((prevStep) => prevStep + 1);
    setTimeout(() => {
      setPreviousStep(null);
    }, 600);
  };

  const handleStepIconClick = (stepNumber) => {
    setPreviousStep(step);
    setStep(stepNumber);
    setActiveStep(stepNumber);
    setTimeout(() => {
      setPreviousStep(null);
    }, 600);
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
        <StepContainer active={step === 1} leaving={previousStep === 1}>
          <TitleStyle1>장르를 선택해주세요</TitleStyle1>
          <TitleStyle2>*필수선택옵션입니다</TitleStyle2>
          <GenreContainer>
            <GenreSwiperComponent
              options={genreList}
              selectedId={genreId}
              onSelect={(id) => setGenreId(id)}
            />
          </GenreContainer>
          <JellyButton onClick={handleNextStep}>다음</JellyButton>
        </StepContainer>
        <StepContainer active={step === 2} leaving={previousStep === 2}>
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
        <StepContainer active={step === 3} leaving={previousStep === 3}>
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
        <StepContainer active={step === 4} leaving={previousStep === 4}>
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
        <StepContainer active={step === 5} leaving={previousStep === 5}>
          <TitleStyle1>보이스를 선택해주세요</TitleStyle1>
          <TitleStyle2>*필수선택옵션입니다</TitleStyle2>
          <ChooseOption>
            {VoiceArr.map((option) => (
              <ButtonSetting key={option.label}>
                <Button
                  key={option.label}
                  imageUrl={option.imageUrl}
                  onClick={() => setVoice(option.label)}
                  clicked={voice === option.label}
                ></Button>
                {option.label}
              </ButtonSetting>
            ))}
          </ChooseOption>
          <JellyButton onClick={handleNextStep}>다음</JellyButton>
        </StepContainer>
        <StepContainer active={step === 6} leaving={previousStep === 6}>
          <TitleStyle1>언어를 선택해주세요</TitleStyle1>
          <TitleStyle2>*필수선택옵션입니다</TitleStyle2>
          <ChooseOption>
            {CountryArr.map((option) => (
              <ButtonSetting key={option.label}>
                <LanguageButton
                  key={option.label}
                  imageUrl={option.imageUrl}
                  onClick={() => setLanguage(option.value)}
                  clicked={language === option.value}
                ></LanguageButton>
                {option.label}
              </ButtonSetting>
            ))}
          </ChooseOption>
          <JellyButton onClick={handleNextStep}>다음</JellyButton>
        </StepContainer>
        <StepContainer active={step === 7}>
          <TitleStyle1>템포를 선택해주세요</TitleStyle1>
          <TitleStyle2>*필수선택옵션입니다</TitleStyle2>
          <ChooseOption>
            {TempoArr.map((option) => (
              <ButtonSetting key={option.label}>
                <Button
                  key={option.label}
                  imageUrl={option.imageUrl}
                  onClick={() => setTempo(option.label)}
                  clicked={tempo === option.label}
                ></Button>
                {option.label}
              </ButtonSetting>
            ))}
          </ChooseOption>
          <JellyButton onClick={handleCreateClick}>완료</JellyButton>
        </StepContainer>
      </BigContainer>
    </CreateContainer>
  );
};
export default Create;
