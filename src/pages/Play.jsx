import React from 'react';
import styled from 'styled-components';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import LyricsCover from '../components/LyricsCover';
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';

const IconBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const TinyText = styled(Typography)`
  font-size: 0.75rem;
  opacity: 0.38;
  font-weight: 500;
  letter-spacing: 0.2;
  color: white;
`;

function MusicPlayerSlider() {
  const theme = useTheme();
  const duration = 200; // seconds
  const [position, setPosition] = React.useState(32);

  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Box
        sx={{
          borderRadius: 2,
          backgroundColor: theme.palette.background.black,
        }}
      >
        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => setPosition(value)}
          sx={{
            color: (theme.palette.mode = 'rgba(97, 11, 108, 0.87)'),
            height: 4,
            '& .MuiSlider-thumb': {
              width: 8,
              height: 8,
              transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&::before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === 'dark'
                    ? 'rgb(255 255 255 / 16%)'
                    : 'rgb(0 0 0 / 16%)'
                }`,
              },
              '&.Mui-active': {
                width: 15,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(position)}</TinyText>
          <TinyText>-{formatDuration(duration - position)}</TinyText>
        </Box>
      </Box>
    </Box>
  );
}

const PlayBox = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column; /* PlayBox를 세로로 정렬 */
  align-items: center; /* 가운데 정렬 */
`;

// ShareBox styled-component
const ShareBox = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
`;

const TextBox = styled.div`
  color: #ffffff;
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: start;
`;

const Title = styled.div`
  font-size: 1rem; /* 글자 크기 */
  font-weight: bold; /* 글자 두껍게 */
`;

const Subtitle = styled.div`
  font-size: 0.8rem; /* 글자 크기 */
  font-weight: normal; /* 일반체 */
  align-items: center;
  display: flex;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const Button = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #552e72;
  position: relative; /* Tooltip을 위해 추가 */
  border: none; /* 테두리 제거 */

  &:hover span {
    visibility: visible;
    opacity: 1;
    bottom: -1.5rem; /* 호버 시 텍스트 위치 조정 */
  }
`;

// Tooltip styled-component
const Tooltip = styled.span`
  visibility: hidden;
  width: 6rem;
  background-color: #000;
  color: #fff;
  text-align: center;
  border-radius: 0.5rem;
  padding: 0.5rem;
  position: absolute;
  z-index: 1;
  top: 125%; /* Tooltip 위치 */
  left: 50%;
  margin-left: -3rem; /* Tooltip 중앙 정렬 */
  opacity: 0;
  transition:
    opacity 0.3s,
    bottom 0.3s; /* 투명도 및 위치 전환 트랜지션 */
  font-size: 1rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 100%; /* Tooltip 위 삼각형 위치 */
    left: 50%;
    margin-left: -0.5rem;
    border-width: 0.5rem;
    border-style: solid;
    border-color: transparent transparent #000 transparent;
  }
`;

// YouTube 아이콘을 스타일링한 컴포넌트
const StyledYouTubeIcon = styled(YouTubeIcon)`
  color: white; /* 아이콘 색상 */
`;

// Instagram 아이콘을 스타일링한 컴포넌트
const StyledInstagramIcon = styled(InstagramIcon)`
  color: white; /* 아이콘 색상 */
`;

const StyledShareIcon = styled(ShareIcon)`
  color: white; /* 아이콘 색상 */
`;

const VideoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

// LyricsBox styled-component
const LyricsBox = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
`;

const StyledDownloadIcon = styled(DownloadIcon)`
  color: white; /* 아이콘 색상 */
`;
const StyledVideo = styled.video`
  width: 100%;
`;

const StyledRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
`;

function Play() {
  const theme = useTheme();
  const [paused, setPaused] = React.useState(false);
  const mainIconColor = (theme.palette.mode = '#fff');
  return (
    <>
      <PlayBox>
        <VideoContainer>
          <StyledVideo controls>
            <source src="/media/cc0-videos/flower.webm" type="video/webm" />
            <source src="/media/cc0-videos/flower.mp4" type="video/mp4" />
            Download the
            <a href="/media/cc0-videos/flower.webm">WEBM</a>
            or
            <a href="/media/cc0-videos/flower.mp4">MP4</a>
            video.
          </StyledVideo>
        </VideoContainer>
        <StyledRow>
          <TextBox>
            <Title>Ocean Song</Title>
            <UserInfo>
              <PersonIcon sx={{ color: 'white', fontSize: '1rem' }} />
              <Subtitle>King Jinwoo</Subtitle>
            </UserInfo>
          </TextBox>
          <ShareBox>
            <ButtonBox>
              <Button>
                <StyledDownloadIcon fontSize="small" />
                <Tooltip>Download</Tooltip>
              </Button>
              <Button>
                <StyledShareIcon fontSize="small" />
                <Tooltip>Share</Tooltip>
              </Button>
              <Button>
                <StyledYouTubeIcon fontSize="small" />
                <Tooltip>YouTube</Tooltip>
              </Button>
              <Button>
                <StyledInstagramIcon fontSize="small" />
                <Tooltip>Instagram</Tooltip>
              </Button>
            </ButtonBox>
          </ShareBox>
        </StyledRow>
        <MusicPlayerSlider />

        <IconBox>
          <IconButton aria-label="previous song">
            <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
          <IconButton
            aria-label={paused ? 'play' : 'pause'}
            onClick={() => setPaused(!paused)}
          >
            {paused ? (
              <PlayArrowRounded
                sx={{ fontSize: '3rem' }}
                htmlColor={mainIconColor}
              />
            ) : (
              <PauseRounded
                sx={{ fontSize: '3rem' }}
                htmlColor={mainIconColor}
              />
            )}
          </IconButton>
          <IconButton aria-label="next song">
            <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
        </IconBox>
      </PlayBox>
      <LyricsBox>
        <LyricsCover>가사가사가사가사</LyricsCover>
      </LyricsBox>
    </>
  );
}

export default Play;
