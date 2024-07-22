import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
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
import { GetPlay } from '@/api/play';

const BackLayout = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  margin-left: 20%;
`;

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
  const [position, setPosition] = useState(32);

  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Slider
        aria-label="time-indicator"
        size="small"
        value={position}
        min={0}
        step={1}
        max={duration}
        onChange={(_, value) => setPosition(value)}
        sx={{
          color: 'rgba(97, 11, 108, 0.87)',
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
  );
}

const PlayBox = styled.div`
  width: ${({ expanded }) => (expanded ? '83%' : '70%')};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
  margin-left: 1rem;
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

const Subtitle = styled.div`
  font-size: 0.8rem;
  font-weight: normal;
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
  position: relative;
  border: none;
  cursor: pointer;
  &:hover span {
    visibility: visible;
    opacity: 1;
    bottom: -1.5rem;
  }
`;

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
  top: 125%;
  left: 50%;
  margin-left: -3rem;
  opacity: 0;
  transition:
    opacity 0.3s,
    bottom 0.3s;
  font-size: 1rem;
  &::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -0.5rem;
    border-width: 0.5rem;
    border-style: solid;
    border-color: transparent transparent #000 transparent;
  }
`;

const StyledYouTubeIcon = styled(YouTubeIcon)`
  color: white;
`;

const StyledInstagramIcon = styled(InstagramIcon)`
  color: white;
`;

const StyledShareIcon = styled(ShareIcon)`
  color: white;
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

const LyricsBox = styled.div`
  width: ${({ expanded }) => (expanded ? '30%' : '0%')};
  display: flex;
  justify-content: start;
  align-items: start;
  margin-left: 2rem;
  transition: width 0.5s ease-in-out;

  & > div {
    display: ${({ expanded }) => (expanded ? 'block' : 'none')};
    transition: display 0.5s ease-in-out;
  }
`;

const StyledDownloadIcon = styled(DownloadIcon)`
  color: white;
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

const styles = {
  blockquote: {
    margin: '2.5rem',
    width: '20rem',
    height: '33rem',
    fontFamily: 'suit',
    color: '#ffffff',
  },
  style1: {
    position: 'relative',
    background: '#350650',
    boxShadow: '0 0 .5rem rgba(0,0,0,.2) inset',
  },
  style1Before: {
    content: '""',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '1rem',
    height: '1rem',
    borderTop: '1rem solid #60478f',
    borderRight: '1rem solid #000000',
    boxShadow: '-.2rem -.2rem .25rem rgba(0,0,0,.1)',
  },
  style1After: {
    content: '""',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '1rem',
    height: '1rem',
    borderBottom: '1rem solid #000000',
    borderLeft: '1rem solid  #60478f',
  },
};

const StyledButton = styled.button`
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3b0547;
  position: relative;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 2rem;
  font-size: 0.5rem;
  color: #ffffff;

  &:hover {
    background-color: #7e4394;
  }
`;

function Play() {
  const { id } = useParams();
  const [paused, setPaused] = useState(false);
  const [lyricsVisible, setLyricsVisible] = useState(true);
  const [playData, setPlayData] = useState(null);

  useEffect(() => {
    if (id) {
      GetPlay({ mv_id: id }).then((data) => setPlayData(data));
    }
  }, [id]);

  const toggleLyrics = () => {
    setLyricsVisible(!lyricsVisible);
  };

  const mainIconColor = '#fff';

  return (
    <BackLayout>
      <PlayBox expanded={lyricsVisible}>
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
            <Title>{playData ? playData.title : 'Loading...'}</Title>
            <UserInfo>
              <PersonIcon sx={{ color: 'white', fontSize: '1rem' }} />
              <Subtitle>{playData ? playData.artist : 'Loading...'}</Subtitle>
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
      <LyricsBox expanded={lyricsVisible}>
        <div>
          <blockquote style={{ ...styles.blockquote, ...styles.style1 }}>
            <div style={styles.style1Before}></div>
            <div style={styles.style1After}></div>
          </blockquote>
        </div>
      </LyricsBox>
      <StyledButton onClick={toggleLyrics}>
        {lyricsVisible ? 'Hide Lyrics' : 'Show Lyrics'}
      </StyledButton>
    </BackLayout>
  );
}

export default Play;
