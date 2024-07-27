import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getList } from '@/api/musicVideos';
import WhatshotIcon from '@mui/icons-material/Whatshot';

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

function Header() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef([]);

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
              muted
              ref={(el) => (videoRefs.current[index] = el)}
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
    </BackLayout>
  );
}

export default Header;
