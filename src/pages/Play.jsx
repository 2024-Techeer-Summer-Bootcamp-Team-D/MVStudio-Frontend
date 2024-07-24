import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { getPlay } from '@/api/play';

const BackLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-left: 18%;
`;

function MusicPlayerSlider() {
  const duration = 200; // seconds
  const [position, setPosition] = useState(32);

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
              boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.16)',
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
      ></Box>
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
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
`;

const Subtitle = styled.div`
  font-size: 0.8rem;
  display: flex;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: 1rem;
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
  margin-top: 3rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.7rem;
`;

const UserInfo2 = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.8rem;
  margin-top: 0.7rem;
`;

const LyricsBox = styled.div`
  width: ${({ expanded }) => (expanded ? '30%' : '0%')};
  height: 39.95rem;
  display: flex;
  justify-content: start;
  align-items: start;
  margin-left: 2rem;
  margin-top: 3rem;
  position: relative;
  overflow: hidden; /* Ensure content does not overflow */
`;

const LyricsBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  background-image: ${({ coverImage }) =>
    coverImage ? `url(${coverImage})` : 'none'};
  background-size: cover;
  background-position: center;
  filter: blur(1.7rem);
  position: absolute;
  z-index: 1;
`;

const LyricsContent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
  border: 2px solid #5b5b5b;
  box-sizing: border-box;
  overflow: hidden;
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  padding-top: 2rem;
`;

const LyricsTitle = styled.div`
  position: relative;
  z-index: 2;
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
  text-align: left;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  padding-top: 2rem;
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

const ProfileImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 3rem;
  margin-top: 0.5rem;
`;

const VideoViews = styled.p`
  font-size: 0.8rem;
  color: white;
  margin-right: auto;
  margin-top: 0.3rem;
`;

const StyledButton = styled.button`
  width: 3rem;
  height: 2rem;
  border-radius: 1rem;
  background-color: #552e72;
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
  const location = useLocation();

  const [lyricsVisible, setLyricsVisible] = useState(true);
  const [playData, setPlayData] = useState(null);
  const [coverImage, setCoverImage] = useState('');

  const getQueryParam = (param) => {
    const params = new URLSearchParams(location.search);
    return params.get(param);
  };

  const id = getQueryParam('id');

  useEffect(() => {
    console.log('Current id:', id);
    if (id) {
      getPlay(id)
        .then((data) => {
          console.log('Fetched data:', data); // 데이터 로깅
          setPlayData(data);
          setCoverImage(data?.data?.cover_image || '');
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [id]);

  const toggleLyrics = () => {
    setLyricsVisible(!lyricsVisible);
  };

  return (
    <BackLayout>
      <PlayBox expanded={lyricsVisible}>
        <VideoContainer>
          {playData?.data?.mv_file ? (
            <StyledVideo controls>
              <source src={playData.data.mv_file} type="video/mp4" />
              Download the <a href={playData.data.mv_file}>MP4</a> video.
            </StyledVideo>
          ) : (
            <div>No video available</div>
          )}
        </VideoContainer>
        <StyledRow>
          <TextBox>
            <Title>{playData?.data?.subject || 'Loading...'}</Title>
            <UserInfo>
              <ProfileImage
                src={
                  playData?.data?.profile_image ||
                  'https://i.ibb.co/h8q8YgC/pro.jpg'
                }
                alt="Profile"
              />
              <UserInfo2>
                <Subtitle>
                  {playData?.data?.member_name || 'Loading...'}
                </Subtitle>
                <VideoViews>
                  {playData?.data?.views !== null &&
                  playData?.data?.views !== undefined
                    ? `${playData.data.views} Views`
                    : '0 Views'}
                </VideoViews>
              </UserInfo2>
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
      </PlayBox>

      <LyricsBox expanded={lyricsVisible}>
        <LyricsBackground coverImage={coverImage} />
        <LyricsContent>
          {playData?.data?.subject || 'Loading...'}
          <LyricsTitle>{playData?.data?.lyrics || 'Loading...'}</LyricsTitle>
        </LyricsContent>
      </LyricsBox>

      <StyledButton onClick={toggleLyrics}>
        {lyricsVisible ? 'Hide Lyrics' : 'Show Lyrics'}
      </StyledButton>
    </BackLayout>
  );
}

export default Play;
