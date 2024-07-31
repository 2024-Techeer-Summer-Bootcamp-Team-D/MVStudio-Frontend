import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getList } from '@/api/musicVideos';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { IconWrapper } from './Main';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InfoIcon from '@mui/icons-material/Info';
import VideoItem from './VideoItem';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Slider from '@mui/material/Slider';

const BackLayout = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100%;
  overflow: hidden;
  position: relative;
  color: white;
  aspect-ratio: 10 / 3;
  height: auto;
  margin-bottom: -7rem;

  &:hover .visible {
    opacity: 1;
  }
`;

const VideoContainer = styled.div`
  display: flex;
  min-width: 100%;
  top: 0;
  transition:
    transform 1s ease-in-out,
    opacity 0.2s ease-in-out;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transform: ${({ currentIndex }) => `translateX(-${currentIndex * 100}%)`};
`;

const VideoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  height: 100%;
  background-color: black;
  color: white;
  gap: 1rem;
`;

const Video = styled.video`
  display: flex;
  width: 100%;
  height: auto;
`;

const VideoBlur = styled.h2`
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 3%;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1));
  padding-bottom: 6%;
  gap: 0.25rem;
`;

const RankComment = styled.div`
  display: flex;
  align-items: center;
  z-index: 5;
  gap: 0.5rem;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const OpacityButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  z-index: 8;
  cursor: pointer;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 20%;
  top: 15%;
  right: 1.5%;
`;

const VolumeContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 5%;
  right: 4.5%;
  align-items: center;

  &:hover + .volume-slider {
    opacity: 1;
  }
`;

const StyledVolumeIconButton = styled(IconButton)`
  &:hover + .volume-slider {
    opacity: 1;
  }
`;

const StyledSlider = styled(Slider)`
  opacity: 0;
  transition: opacity 0.3s ease;
  color: #370080; /* 슬라이더 색상을 보라색으로 변경 */
  &:hover {
    opacity: 1;
  }
  & .MuiSlider-thumb {
    color: #370080; /* 슬라이더의 thumb 색상 변경 */
  }

  & .MuiSlider-track {
    color: #370080; /* 슬라이더의 track 색상 변경 */
  }

  & .MuiSlider-rail {
    color: #370080; /* 슬라이더의 rail 색상 변경 */
  }
`;

function Header() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [infoHover, setInfoHover] = useState(false);
  const [isMute, setIsMute] = useState(true);
  const [volume, setVolume] = useState(50);

  const videoRefs = useRef([]);
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['musicVideos'],
    queryFn: () => getList(1, 10, 'recently_viewed', undefined),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 9);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (videoRefs.current[currentIndex]) {
      videoRefs.current.forEach((video, index) => {
        if (index === currentIndex) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    }
  }, [currentIndex]);

  return (
    <BackLayout>
      {data?.music_videos.map((video, index) => (
        <VideoContainer
          key={index}
          currentIndex={currentIndex}
          isActive={index === currentIndex}
        >
          <VideoWrapper>
            <Video
              src={video.mv_file}
              muted={isMute}
              ref={(el) => {
                videoRefs.current[index] = el;
                if (el) {
                  el.volume = volume / 250; // 소리 20%
                }
              }}
              autoPlay={index === currentIndex}
            />
            <VideoBlur>
              <RankComment>
                <WhatshotIcon
                  fontSize="medium"
                  sx={{
                    display: 'flex',
                    marginTop: '-0.15rem',
                    color: 'red',
                  }}
                />
                <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
                  # {index + 1}
                </span>{' '}
                Trending Music Video
              </RankComment>
              {video.subject}
            </VideoBlur>
          </VideoWrapper>
        </VideoContainer>
      ))}
      <OpacityButton
        className="visible"
        onClick={() =>
          navigate(`/play?id=${data?.music_videos[currentIndex].id}`)
        }
      >
        {/* 볼륨 컨테이너 */}
        <VolumeContainer onClick={(event) => event.stopPropagation()}>
          {/* 음소거 on/off 버튼 */}
          <StyledVolumeIconButton
            onClick={(event) => {
              event.stopPropagation();
              setIsMute((prev) => !prev);
            }}
          >
            {isMute ? (
              <VolumeOffIcon sx={{ color: 'white' }} />
            ) : (
              <VolumeUpIcon sx={{ color: 'white' }} />
            )}
          </StyledVolumeIconButton>

          {/* 볼륨 조절 슬라이더 */}
          <StyledSlider
            aria-label="Volume"
            orientation="vertical"
            valueLabelDisplay="auto"
            defaultValue={volume}
            onChange={(event, newValue) => {
              event.stopPropagation();
              setVolume(newValue);
            }}
            sx={{
              height: '7rem',
              opacity: 0,
            }}
            className="volume-slider"
          />
        </VolumeContainer>

        {/* information 버튼 */}
        <IconButton
          style={{ position: 'absolute', top: '5%', right: '1%' }}
          onMouseEnter={() => setInfoHover(true)}
          onMouseLeave={() => setInfoHover(false)}
        >
          <InfoIcon sx={{ color: 'white' }} />
        </IconButton>

        {/* 호버시 출력되는 information */}
        {infoHover && (
          <InfoContainer hover={infoHover}>
            <VideoItem video={data?.music_videos[currentIndex]} pageSize={1} />
          </InfoContainer>
        )}

        {/* 왼쪽 버튼 */}
        <IconWrapper>
          <IconButton
            sx={{ width: '2.5rem', color: 'white' }}
            onClick={(event) => {
              event.stopPropagation();
              setCurrentIndex((prevIndex) => (prevIndex + 8) % 9);
            }}
          >
            <ArrowForwardIosIcon
              sx={{
                width: '100%',
                height: 'auto',
                transform: 'scaleX(-1)',
              }}
            />
          </IconButton>
        </IconWrapper>

        {/* 오른쪽 버튼 */}
        <IconWrapper>
          <IconButton
            sx={{ width: '2.5rem', color: 'white' }}
            onClick={(event) => {
              event.stopPropagation();
              setCurrentIndex((prevIndex) => (prevIndex + 1) % 9);
            }}
          >
            <ArrowForwardIosIcon
              sx={{
                width: '100%',
                height: 'auto',
              }}
            />
          </IconButton>
        </IconWrapper>
      </OpacityButton>{' '}
    </BackLayout>
  );
}

export default Header;
